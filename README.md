# How to configure Typescript in NodeJS

1. Create our project folder.
2. Create our package.json with ```yarn init -y```.
3. Create our tsconfig.json file ```tsc --init```.
4. (Optional) Create a dist/build file for the outpufile and a src file for our code.
5. Set output and root Directories in ```tsconfig.json``` file.
6. Set ```  "moduleResolution": "node"``` in tsconfig.json file.
7. Set ``` "sourceMap": true```
8. Install typescript,ts-node packages and types
9. Define the scripts in your package.json file.
```
 "scripts": {
    "start": "node ./build/index.js",
    "build": "tsc -p .",
    "dev": "nodemon ./src/index.ts"
  },
```

# Install Socket IO

To implement web sockets using Socket IO run the following:
 1. ```yarn add socket.io``` to install node modules.

In conjunction with Express
Starting with 3.0, express applications have become request handler functions that you pass to http or http Server instances. You need to pass the Server to socket.io, and not the express application function. Also make sure to call .listen on the server, not the app.
```
const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
io.on('connection', () => { /* … */ });
server.listen(3000);
```