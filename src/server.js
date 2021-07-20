const express = require('express');
const path = require('path');
const http = require('http');
const seedrandom = require('seedrandom');
const socketIo = require('socket.io');
const { networkInterfaces } = require('os');
var AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const s3 = new AWS.S3();
var config = new AWS.Config({
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	region: process.env.REGION,
});

AWS.config = config;

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
	cors: {
		origin: '*',
		methods: ['GET', 'POST'],
	},
	maxHttpBufferSize: 3e6,
});

app.use(express.static(path.join(__dirname, '../build')));

app.get('*', function (req, res) {
	res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

let counter = 0;
let classrooms = {};

// Dictionary of words for classroom code
let dictionary = [
	'apple',
	'apricot',
	'berry',
	'blackberry',
	'blueberry',
	'cherry',
	'chocolate',
	'cinnamon',
	'keylime',
	'lemon',
	'maple',
	'nut',
	'peach',
	'pecan',
	'pistachio',
	'pumpkin',
	'raspberry',
	'strawberry',
	'sugar',
	'vanilla',
	'walnut',
];

const seed = Math.floor(Math.random() * 1000);

// Generate classroom code
generateClassroomCode = (id) => {
	seedrandom(seed, { global: true });
	let code = [];
	let clone = [...dictionary];
	let whole;
	do {
		// Shuffle dictionary
		for (let i = clone.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[clone[i], clone[j]] = [clone[j], clone[i]];
		}

		// Select word for 'clone.length' place value
		whole = Math.floor(id / clone.length);
		if (whole > 0) {
			code.push(clone[whole]);
			id = id - whole * clone.length;
			clone.splice(whole, 1);
		} else {
			code.push(clone[id % clone.length]);
		}
	} while (whole > 0);
	return code.join('-');
};

// Get all the Bucket Keys
const listAllKeys = () => {
	var params = {
		Bucket: 'predictapie',
	};
	return new Promise((resolve, reject) => {
		let allKeys = [];
		s3.listObjectsV2(params, function (err, data) {
			if (err) {
				console.log(err, err.stack);
			} else {
				var contents = data.Contents;
				contents.forEach(function (content) {
					allKeys.push(content.Key);
				});

				if (data.IsTruncated) {
					params.ContinuationToken = data.NextContinuationToken;
					listAllKeys();
				}
			}
			resolve(allKeys);
		});
	});
};

//Generate Unique ID for NN
async function generateId(id) {
	let allKeys = await listAllKeys();
	let isUnique = true;

	for (let i = 0; i < allKeys.length; i++) {
		if (id === allKeys[i]) {
			isUnique = false;
			break;
		}
	}
	if (isUnique) {
		return id;
	} else {
		let baseId = uuidv4();
		let newId = `${baseId}.${baseId.hashCode().toString().replace(/-/g, '_')}`;
		return generateId(newId);
	}
}

//Retrieve Neural Network from DB
const retrieveNN = (id) => {
	var params = {
		Bucket: 'predictapie',
	};
	return new Promise((resolve, reject) => {
		s3.listObjectsV2(params, function (err, data) {
			if (err) {
				console.log(err, err.stack);
			} else {
				var contents = data.Contents;
				contents.forEach(function (content) {
					if (content.Key.includes(id)) {
						var params = {
							Bucket: 'predictapie',
							Key: content.Key,
						};
						s3.getObject(params, function (err, data) {
							if (err) {
								console.log('Error', err.stack);
							} else {
								resolve(data.Body.toString());
							}
						});
					}
				});
			}
		});
	});
};

//String hash for url
String.prototype.hashCode = function () {
	var hash = 0;
	if (this.length == 0) {
		return hash;
	}
	for (var i = 0; i < this.length; i++) {
		var char = this.charCodeAt(i);
		hash = (hash << 5) - hash + char;
		hash = hash & hash;
	}
	return hash;
};

//Get User IP Address
function getIP() {
	const getLocalExternalIP = () =>
		[]
			.concat(...Object.values(networkInterfaces()))
			.filter((details) => details.family === 'IPv4' && !details.internal)
			.pop().address;

	return getLocalExternalIP();
}

io.on('connection', (socket) => {
	console.log('New client connected');
	socket.emit('user-id', socket.id);

	// Find participant's classroom
	const findClassroom = () => {
		for (const i in classrooms) {
			if (classrooms[i].participants.includes(socket.id)) {
				return classrooms[i];
			}
		}
	};

	// Notify participants of update to classroom
	const onUpdateClassroom = (classroom) => {
		for (const i in classroom.participants) {
			io.to(classroom.participants[i]).emit('classroom-updated', classroom);
		}
	};

	// Create new classroom
	socket.on('create-classroom', () => {
		const code = generateClassroomCode(counter++);
		classrooms[code] = {
			code: code,
			hostId: socket.id,
			recipes: [],
			reclassifications: [],
			participants: [socket.id],
		};
		console.log(`Created classroom: ${code}, 1 participant(s)`);
		socket.emit('classroom-created', code);
		onUpdateClassroom(classrooms[code]);
	});

	// Join classroom
	socket.on('join-classroom', (code) => {
		if (classrooms[code]) {
			classrooms[code].participants.push(socket.id);
			console.log(`Joined classroom: ${code}, ${classrooms[code].participants.length} participant(s)`);
			socket.emit('classroom-joined', code);
			onUpdateClassroom(classrooms[code]);
		} else {
			socket.emit('error', 'Invalid classroom code');
		}
	});

	// Leave classroom
	socket.on('leave-classroom', () => {
		for (const i in classrooms) {
			classrooms[i].participants = classrooms[i].participants.filter((id) => id !== socket.id);
			if (classrooms[i].participants.length === 0) {
				console.log(`Closed classroom: ${classrooms[i].code}`);
				delete classrooms[i];
			}
		}
	});

	// Save recipe
	socket.on('save-recipe', (recipe) => {
		let classroom = findClassroom();
		if (classroom) {
			console.log(`Recipe ${recipe.name} saved in classroom ${classroom.code}`);
			recipe.userId = socket.id;
			classroom.recipes.push(recipe);
			onUpdateClassroom(classroom);
		}
	});

	// Reclassify recipe
	socket.on('reclassify-recipe', (reclassification) => {
		let classroom = findClassroom();
		if (classroom) {
			console.log(`Reclassification saved in classroom ${classroom.code}`);
			reclassification.userId = socket.it;
			classroom.reclassifications.push(reclassification);
			onUpdateClassroom(classroom);
		}
	});

	// Save Neural Network
	socket.on('retrieve-network', (hashID, callback) => {
		retrieveNN(hashID).then((res) => {
			callback(res);
		});
	});

	// Save Neural Network
	socket.on('save-network', (network, callback) => {
		// console.log(Buffer.byteLength(network.data) / 1024 / 1024);
		network.id = uuidv4();

		generateId(`${network.id}.${network.id.hashCode().toString().replace(/-/g, '_')}`).then((res) => {
			let networkData = JSON.stringify({
				id: res,
				data: network.data,
				ipAddress: getIP(),
				date: network.dateTime,
			});

			var params = { Bucket: 'predictapie', Body: networkData, Key: res };
			s3.upload(params, function (err, data) {
				console.log(err, data);
			});
			callback({
				id: res,
				data: network.data,
				ipAddress: getIP(),
				date: network.dateTime,
			});
		});
	});

	// Check for Environment Variables
	socket.on('check-env', (callback) => {
		let tempArr = [];
		tempArr.push(process.env.AWS_ACCESS_KEY_ID, process.env.AWS_SECRET_ACCESS_KEY, process.env.DB);
		for (let i = 0; i < tempArr.length; i++) {
			if (tempArr[i] === '' || tempArr[i] === undefined) {
				callback(false);
			}
		}
		callback(true);
	});

	// User disconnected
	socket.on('disconnect', () => {
		console.log('Client disconnected');

		// Remove participant from classrooms
		for (const i in classrooms) {
			classrooms[i].participants = classrooms[i].participants.filter((id) => id !== socket.id);
			if (classrooms[i].participants.length === 0) {
				console.log(`Closed classroom: ${classrooms[i].code}`);
				delete classrooms[i];
			}
		}
	});
});

server.listen(process.env.PORT || 8080);
console.log('Server started');
