const got = require('got'); //TODO: potentially replace with just http?

/**
 * Upload a file to nexus
 * 
 * @param baseUrl baseUrl of nexus host
 * @param versionPrefix prefix for snapshot vs releases. Should default
 * to /snapshots and /releases
 * @param path path to file e.g. com/something/else/maven-metadata.xml
 * @param fileStream stream to upload
 * @param auth { username: username, password: password }
 */
module.exports = async (baseUrl, versionPrefix, path, fileStream, auth) => {
    const url = `${baseUrl}/${versionPrefix}/${path}`;
    console.log('URL: %s', url);
    try {
        await got
            .post(url, { username: auth.username, password: auth.password, body: fileStream });

    } catch (err) {
        console.error('failed to upload file', err);
    }
};