#!/usr/bin/env node
const http = require('http');
const mockserver = require('mockserver');
var WebsocketsMock = require('./websockets.js');
const argv = require('yargs').argv;
const fs = require('fs');
const portWS = argv.portWS || 9003;

process.on('SIGINT', () => { console.log("Bye bye!"); process.exit(); });

var server = new WebsocketsMock(portWS);

fs.watch('./mocks', (curr, prev) => {
  console.log(`reloading mock websocket`);
  server.close();
  delete require.cache[require.resolve('./websockets.js')]
  WebsocketsMock = require('./websockets.js')
  server = new WebsocketsMock(portWS);
});
