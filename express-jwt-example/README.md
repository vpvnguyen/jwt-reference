# express-jwt-example

src: https://auth0.com/blog/node-js-and-typescript-tutorial-build-a-crud-api/#Get-Starts-with-TypeScript-in-Node-js

## Technologies

#### Express

Fast, unopinionated, minimalist web framework for Node.js.

#### dotenv

Zero-dependency module that loads environment variables from a `.env` file into `process.env`.

#### cors

Express middleware to enable CORS with various options.

#### helmet

Express middleware to secure your apps by setting various HTTP headers, which mitigate common attack vectors.

A collection of 14 small middleware functions that set HTTP response headers. Mounting helmet() doesn't include all of these middleware functions but provides you with sensible defaults such as DNS Prefetch Control, Frameguard, Hide Powered-By, HSTS, IE No Open, Don't Sniff Mimetype, and XSS Filter.

#### ts-node-dev

Tweaked version of node-dev that uses ts-node under the hood.

It restarts target node process when any of required files changes (as standard `node-dev`) but shares Typescript compilation process between restarts. This significantly increases speed of restarting comparing to `node-dev -r ts-node/register ...`, `nodemon -x ts-node ...` variations because there is no need to instantiate `ts-node` compilation each time.

```
  "scripts": {
    "dev": "ts-node-dev --respawn --pretty --transpile-only src/index.ts"
  }
```
