/* eslint-disable @typescript-eslint/no-require-imports */
const jsonServer = require('json-server');
const path = require('path'); // Adicione isso
const server = jsonServer.create();

const router = jsonServer.router(path.join(__dirname, '../db/db.json')); 
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.rewriter({
  '/api/*': '/$1'
}));
server.use(router);

module.exports = server;