const crypto = require('crypto');

module.exports = (stream) => {
    return new Promise((resolve, reject) => {
        const md5 = crypto.createHash('md5');
        const sha1 = crypto.createHash('sha1');

        stream.on('data', (chunk) => {
            const binaryChunk = chunk.toString('binary');
            md5.update(binaryChunk);
            sha1.update(binaryChunk);
        });

        stream.on('err', (err) => {
            return reject('failed to read stream: ', err);
        });

        stream.on('end', () => {
            return resolve({
                md5: md5.digest('hex'),
                sha1: sha1.digest('hex')
            });
        });
    });
};