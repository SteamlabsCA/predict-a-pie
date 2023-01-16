const express = require("express");
const path = require("path");
const fs = require("fs");
const http = require("http");
const https = require("https");
const seedrandom = require("seedrandom");
const socketIo = require("socket.io");
var AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const s3 = new AWS.S3();
var config = new AWS.Config({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

AWS.config = config;

const app = express();

let server, httpsServer, io;

if (process.env.NODE_ENV === "development") {
  server = http.createServer(app);
  httpsServer = https.createServer(app);

  io = socketIo(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });
} else if (process.env.NODE_ENV === "staging") {
  httpsOptions = {
    cert: fs.readFileSync(
      path.join("/etc/pki/tls/certs", "nn-staging_inventor_city_chain.crt")
    ),
    key: fs.readFileSync(
      path.join("/etc/pki/tls/certs", "nn-staging_inventor_city_PK.key")
    ),
  };

  server = http.createServer(app);
  httpsServer = https.createServer(httpsOptions, app);

  io = socketIo(httpsServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });
} else if (process.env.NODE_ENV === "production") {
  httpsOptions = {
    cert: fs.readFileSync(path.join(__dirname, "cert", "nn_inventor_city.crt")),
    ca: fs.readFileSync(
      path.join(__dirname, "cert", "nn_inventor_city.ca-bundle")
    ),
    key: fs.readFileSync(
      path.join(__dirname, "cert", "ssl_nn_inventor_city_PK.key")
    ),
  };

  server = http.createServer(app);
  httpsServer = https.createServer(httpsOptions, app);

  io = socketIo(httpsServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });
}

app.use(express.static(path.join(__dirname, "../build")));

app.get("*", function (req, res) {
  if (
    process.env.LOGNAME == "ubuntu" &&
    req.get("x-forwarded-proto").indexOf("https") == -1
  ) {
    res.redirect("https://" + req.hostname + req.url);
  }
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});

let counter = 0;
let classrooms = {};
let lastRequest = {};

// Dictionary of words for classroom code
let dictionary = [
  "apple",
  "apricot",
  "berry",
  "blackberry",
  "blueberry",
  "cherry",
  "chocolate",
  "cinnamon",
  "keylime",
  "lemon",
  "maple",
  "nut",
  "peach",
  "pecan",
  "pistachio",
  "pumpkin",
  "raspberry",
  "strawberry",
  "sugar",
  "vanilla",
  "walnut",
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
  return code.join("-");
};

// Get all the Bucket Keys
const listAllKeys = (thisIp) => {
  var params = {
    // Bucket: "predictapie",
    Bucket: process.env.AWS_BUCKET_NAME,
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
            knownIpNum.push({
              key: content.Key,
              ip: thisIp,
              date: content.LastModified,
            });
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
    console.log(
      "Consecutive Neural Network Sharing rate has been exceeded, please try again in 10 minutes."
    );
    return {
      status: -1,
      message:
        "Consecutive Neural Network Sharing rate has been exceeded, please try again in 10 minutes.",
    };
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
    let newId = `${baseId}.${baseId.hashCode().toString().replace(/-/g, "_")}`;
    return generateId(newId, thisIp);
  }
}

//Retrieve Neural Network from DB
const retrieveNN = (id) => {
  var params = {
    Bucket: "predictapie",
  };
  return new Promise((resolve, reject) => {
    let found = false;
    s3.listObjectsV2(params, function (err, data) {
      if (err) {
        console.log(err, err.stack);
      } else {
        var contents = data.Contents;
        contents.forEach(function (content) {
          if (content.Key.includes(id)) {
            found = true;
            var params = {
              Bucket: "predictapie",
              Key: content.Key,
            };
            s3.getObject(params, function (err, data) {
              if (err) {
                console.log("Error", err.stack);
              } else {
                resolve(data.Body.toString());
              }
            });
          }
        });
        if (!found) resolve(found);
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

io.on("connection", (socket) => {
  console.log("New client connected");
  socket.emit("user-id", socket.id);

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
      io.to(classroom.participants[i]).emit("classroom-updated", classroom);
    }
  };

  // Create new classroom
  socket.on("create-classroom", () => {
    const code = generateClassroomCode(counter++);
    classrooms[code] = {
      code: code,
      hostId: socket.id,
      recipes: [],
      reclassifications: [],
      participants: [socket.id],
    };
    console.log(`Created classroom: ${code}, 1 participant(s)`);
    socket.emit("classroom-created", code);
    onUpdateClassroom(classrooms[code]);
  });

  // Join classroom
  socket.on("join-classroom", (code) => {
    if (classrooms[code]) {
      classrooms[code].participants.push(socket.id);
      console.log(
        `Joined classroom: ${code}, ${classrooms[code].participants.length} participant(s)`
      );
      socket.emit("classroom-joined", code);
      onUpdateClassroom(classrooms[code]);
    } else {
      socket.emit("error", "Invalid classroom code");
    }
  });

  // Leave classroom
  socket.on("leave-classroom", () => {
    for (const i in classrooms) {
      classrooms[i].participants = classrooms[i].participants.filter(
        (id) => id !== socket.id
      );
      if (classrooms[i].participants.length === 0) {
        console.log(`Closed classroom: ${classrooms[i].code}`);
        delete classrooms[i];
      }
    }
  });

  // Save recipe
  socket.on("save-recipe", (recipe) => {
    let classroom = findClassroom();
    if (classroom) {
      console.log(`Recipe ${recipe.name} saved in classroom ${classroom.code}`);
      recipe.userId = socket.id;
      classroom.recipes.push(recipe);
      onUpdateClassroom(classroom);
    }
  });

  // Reclassify recipe
  socket.on("reclassify-recipe", (reclassification) => {
    let classroom = findClassroom();
    if (classroom) {
      console.log(`Reclassification saved in classroom ${classroom.code}`);
      reclassification.userId = socket.it;
      classroom.reclassifications.push(reclassification);
      onUpdateClassroom(classroom);
    }
  });

  // Save Neural Network
  socket.on("retrieve-network", (hashID, callback) => {
    retrieveNN(hashID).then((res) => {
      callback(res);
    });
  });

  // Save Neural Network
  socket.on("save-network", (network, callback) => {
    //Check to make sure data is a JSON object and includes the secret
    try {
      JSON.parse(network.data);
      let secret = process.env.DATA_SECRET;
      if (!network.data.includes(secret.replace(/'/g, '"'))) {
        throw "Secret Not Passed";
      }
    } catch (e) {
      callback({
        status: -1,
        message: "Error",
      });
      return -1;
    }

    let ipHash = require("crypto")
      .createHmac("sha256", process.env.IP_HASH_SECRET)
      .update(
        socket.request.headers["x-forwarded-for"] ||
          socket.request.connection.remoteAddress
      )
      .digest("hex");

    let timeLimit = 5000;
    if (
      lastRequest.ipHash === ipHash &&
      Date.now() - lastRequest.time < timeLimit
    ) {
      console.log(
        "Consecutive Neural Network Sharing rate has been exceeded, please try again in 5 seconds."
      );
      callback({
        status: -1,
        message:
          "Consecutive Neural Network Sharing rate has been exceeded, please try again in 5 seconds.",
      });
      return -1;
    }

    network.id = uuidv4();

    generateId(
      `${network.id}.${network.id.hashCode().toString().replace(/-/g, "_")}`,
      ipHash
    ).then((res) => {
      if (res.status !== -1) {
        let networkData = JSON.stringify({
          id: res,
          data: network.data,
          ipAddress: ipHash,
          date: network.dateTime,
        });

        var params = {
          Bucket: "predictapie",
          Body: networkData,
          Key: `${res}^${ipHash}`,
        };
        s3.upload(params, function (err, data) {
          console.log("Neural Network Shared");
        });
        lastRequest = {
          ipHash: ipHash,
          time: Date.now(),
        };

        callback({
          id: res,
          data: network.data,
          ipAddress: ipHash,
          date: network.dateTime,
          status: 1,
        });
      } else {
        callback(res);
      }
    });
  });

  // Check for Environment Variables
  socket.on("check-env", (callback) => {
    let tempArr = [];
    tempArr.push(
      process.env.AWS_ACCESS_KEY_ID,
      process.env.AWS_SECRET_ACCESS_KEY,
      process.env.DB,
      process.env.IP_HASH_SECRET
    );
    for (let i = 0; i < tempArr.length; i++) {
      if (tempArr[i] === "" || tempArr[i] === undefined) {
        callback(false);
      }
    }
    callback(true);
  });

  // User disconnected
  socket.on("disconnect", () => {
    console.log("Client disconnected");

    // Remove participant from classrooms
    for (const i in classrooms) {
      classrooms[i].participants = classrooms[i].participants.filter(
        (id) => id !== socket.id
      );
      if (classrooms[i].participants.length === 0) {
        console.log(`Closed classroom: ${classrooms[i].code}`);
        delete classrooms[i];
      }
    }
  });
});

server.listen(8080, () => console.log(`Server is running on port 8080`));
httpsServer.listen(443, () => console.log(`Secure server on port 443`));
