require('dotenv').config();

const path = require('path');
const glob = require('glob');
const fastify = require('fastify')({ logger: true });
const endpoints = glob
  .sync('./endpoints/**/index.js', { cwd: path.resolve(__dirname) })
  .map(file => require(path.resolve(__dirname, file)));

for (endpoint of endpoints) {
  Object.entries(endpoint)
    .forEach(([route, handler]) => fastify.get(route, handler));
}

const start = async () => {
  try {
    await fastify.listen(3000, '0.0.0.0');
  } catch (err) {
    fastify.log.error(err);
    process.exit();
  }
}

start();