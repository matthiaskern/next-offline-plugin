const { createServer } = require('http');
const { join } = require('path');
const { parse } = require('url');
const fs = require('fs');
const next = require('next');
const mime = require('mime-types');

const dev = process.env.NODE_ENV !== 'production';

const buildStats = dev ?
  null :
  JSON.parse(fs.readFileSync('./.next/build-stats.json', 'utf8').toString());

const buildId = dev ?
  null :
  fs.readFileSync('./.next/BUILD_ID', 'utf8').toString();

function addHashToURL(url) {
  const file = url.replace(`/_next/-/`, '');
  const hash = buildStats[file] ? buildStats[file].hash : buildId;
  return url.replace('/_next/-', '/_next/' + hash);
}

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    const { pathname } = parsedUrl;

    if (!dev) {
      if (pathname.indexOf('/manifest.') === 0) {
        let content = fs
          .readFileSync('./.next/appcache' + pathname, 'utf8')
          .toString();

        if (pathname === '/manifest.appcache') {
          content = content
            .split('\n')
            .map(p => {
              if (p.indexOf('/_next/-/') === 0) {
                p = addHashToURL(p);
              }
              return p;
            })
            .join('\n');
        }

        res.setHeader('Content-Type', mime.lookup(req.url));
        res.writeHead(res.statusCode);
        res.write(content);
        res.end();
        return;
      } else if (pathname.indexOf('/_next/-/') === 0) {
        parsedUrl.pathname = addHashToURL(pathname);
      } else if (pathname === '/sw.js') {
        const filePath = join(__dirname, '.next', pathname);
        return app.serveStatic(req, res, filePath);
      }
    }

    return handle(req, res, parsedUrl);
  }).listen(3000, err => {
    if (err) {
      throw err;
    }

    console.log('> Ready on http://localhost:3000');
  });
});
