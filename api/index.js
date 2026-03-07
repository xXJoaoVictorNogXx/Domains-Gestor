/* eslint-disable @typescript-eslint/no-require-imports */
const jsonServer = require('json-server');
const path = require('path');
const server = jsonServer.create();

// Rota de teste para forçar log
server.get('/api/test', (req, res) => {
  console.log("LOG DE TESTE: A função foi chamada!");
  res.json({ message: "API funcionando na Vercel!" });
});

const dbPath = path.join(process.cwd(), 'db', 'db.json');
const router = jsonServer.router(dbPath);
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.rewriter({ '/api/*': '/$1' }));
server.use(router);

module.exports = server;