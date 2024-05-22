const express = require('express');
const path = require('path');
const fs = require('fs');
const http = require('http');
const https = require('https');
const seedrandom = require('seedrandom');
const socketIo = require('socket.io');
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

// const httpsOptions = {
// 	cert: fs.readFileSync(path.join(__dirname, 'cert', 'nn_inventor_city.crt')),
// 	ca: fs.readFileSync(path.join(__dirname, 'cert', 'nn_inventor_city.ca-bundle')),
// 	key: fs.readFileSync(path.join(__dirname, 'cert', 'ssl_nn_inventor_city_PK.key')),
// };

// https server not needed, since NGINX is used as a reverse proxy
/*
const httpsOptions = {
	cert: fs.readFileSync(
		path.join("/etc/pki/tls/certs", "nn_inventor_city_chain.crt")
	),
	key: fs.readFileSync(path.join("/etc/pki/tls/certs", "nn_inventor_city.key")),
};
*/

const server = http.createServer(app);
// const httpsServer = https.createServer(httpsOptions, app);

const io = socketIo(server, {
	cors: {
		origin: '*',
		methods: ['GET', 'POST'],
	},
});

app.use(express.static(path.join(__dirname, '../build')));

app.get('*', function (req, res) {
	if (process.env.LOGNAME == 'ubuntu' && req.get('x-forwarded-proto').indexOf('https') == -1) {
		res.redirect('https://' + req.hostname + req.url);
	}
	res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

let counter = 0;
let classrooms = {};
let lastRequest = {};

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
const listAllKeys = (thisIp) => {
	var params = {
		Bucket: 'predictapie',
	};
	return new Promise((resolve, reject) => {
		let allKeys = [];
		let knownIpNum = [];
		s3.listObjectsV2(params, function (err, data) {
			if (err) {
				console.log(err, err.stack);
			} else {
				var contents = data.Contents;
				contents.forEach(function (content) {
					allKeys.push(content.Key);
					if (content.Key.includes(thisIp)) {
						knownIpNum.push({ key: content.Key, ip: thisIp, date: content.LastModified });
					}
				});

				if (data.IsTruncated) {
					params.ContinuationToken = data.NextContinuationToken;
					listAllKeys(thisIp);
				}
			}
			resolve({ allKeys: allKeys, allIps: knownIpNum });
		});
	});
};

//Generate Unique ID for NN and rate llimit based on IP
async function generateId(id, thisIp) {
	let rateLimit = 10;
	let timeOutRec = 600000;
	let res = await listAllKeys(thisIp);
	let allKeys = res.allKeys;
	let allIps = res.allIps;

	let max = 0;

	for (let i = 0; i < allIps.length; i++) {
		let date = allIps[i].date.getTime();
		if (max < date) max = date;
	}

	let isUnique = true;
	if (allIps.length > rateLimit && Date.now() - max < timeOutRec) {
		console.log('Consecutive Neural Network Sharing rate has been exceeded, please try again in 10 minutes.');
		return { status: -1, message: 'Consecutive Neural Network Sharing rate has been exceeded, please try again in 10 minutes.' };
	}
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
		return generateId(newId, thisIp);
	}
}

//Retrieve Neural Network from DB
// Updated to use the new S3 bucket and simpler filename for easier retrieval
const retrieveNN = (id) => {
  const params = {
      Bucket: 'predictapie-ca', // Updated bucket name
      Key: `${id}.json` // Construct the file key directly from the id
  };

  return new Promise((resolve, reject) => {
      s3.getObject(params, function(err, data) {
          if (err) {
              console.log('Error retrieving file:', err.stack);
              resolve(false); // Resolve as false if the file is not found or an error occurs
          } else {
              resolve(data.Body.toString()); // Return the content of the file
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
  // Updated to use the new S3 bucket and simpler filename for easier retrieval
  socket.on('save-network', (network, callback) => {
    // Validate JSON and check for secret
    try {
        JSON.parse(network.data);
        const secret = process.env.DATA_SECRET;
        if (!network.data.includes(secret.replace(/'/g, '"'))) {
            throw 'Secret Not Passed';
        }
    } catch (e) {
        callback({
            status: -1,
            message: 'Error',
        });
        return;
    }

    // Rate limit check
    const ipHash = require('crypto')
        .createHmac('sha256', process.env.IP_HASH_SECRET)
        .update(socket.request.headers['x-forwarded-for'] || socket.request.connection.remoteAddress)
        .digest('hex');

    const timeLimit = 5000; // 5 seconds
    if (lastRequest.ipHash === ipHash && Date.now() - lastRequest.time < timeLimit) {
        console.log('Rate limit exceeded, please try again in 5 seconds.');
        callback({
            status: -1,
            message: 'Rate limit exceeded, please try again in 5 seconds.',
        });
        return;
    }

    // Assign a unique ID to the network
    network.id = uuidv4();

    const networkData = JSON.stringify({
        id: network.id,
        data: network.data,
        ipAddress: ipHash,
        date: network.dateTime,
    });

    const params = {
        Bucket: 'predictapie-ca', // Updated bucket name
        Body: networkData,
        Key: `${network.id}.json` // Simplified key with the .json extension
    };

    s3.upload(params, function (err, data) {
        if (err) {
            console.error('Error saving neural network:', err);
            callback({ status: -1, message: 'Error saving data' });
            return;
        }
        console.log('Neural Network Saved Successfully');

        // Update last request details
        lastRequest = {
            ipHash: ipHash,
            time: Date.now(),
        };

        callback({
            id: network.id,
            data: network.data,
            ipAddress: ipHash,
            date: network.dateTime,
            status: 1,
        });
    });
});


	// Check for Environment Variables
	socket.on('check-env', (callback) => {
		let tempArr = [];
		tempArr.push(process.env.AWS_ACCESS_KEY_ID, process.env.AWS_SECRET_ACCESS_KEY, process.env.DB, process.env.IP_HASH_SECRET);
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

server.listen(3001, () => console.log(`http server on port 3001`));
// httpsServer.listen(444, () => console.log(`Secure server on port 444`));
