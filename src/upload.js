const http = require('http');
const https = require('https');

/**
 * Upload a stream to the specified repository
 * 
 * @param url url of maven-repository
 * @param path path to file e.g. com/something/else/maven-metadata.xml
 * @param stream stream to upload
 * @param auth { username: username, password: password }
 */
module.exports = (url, path, stream, auth) => {
    return new Promise((resolve, reject) => {
        const fullUrl = new URL(`${url}/${path}`);
        const module = fullUrl.protocol === 'https:' ? https : http;
    
        let options = {
            hostname: fullUrl.hostname,
            port: fullUrl.port,
            path: fullUrl.pathname + fullUrl.search,
            method: 'PUT',
            headers: {}
        }

        if (!!auth.username && !!auth.password) {
            options.headers['Authorization'] = 'Basic ' + Buffer.from(`${auth.username}:${auth.password}`).toString('base64');
        }

        const request = module.request(options, (response) => {
          const chunks = [];

          response.on('data', (chunk) => {
            chunks.push(chunk);
          });

          response.on('end', () => {
            const body = Buffer.concat(chunks);
            if (response.statusCode / 100 !== 2) {
                return reject({
                    code: response.statusCode,
                    message: response.statusMessage,
                    body: body.toString('utf-8'),
                    url: fullUrl.href
                })
            }
            return resolve();
          });
        });

        stream.pipe(request);
        
        request.on('error', err => {
            return reject({code: null, message: err, body: null, url: fullUrl.href });
        });
        
        stream.on('end', () => {
            request.end();
        });
    });
};
