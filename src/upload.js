const got = require('got'); //TODO: potentially replace with just http?

/**
 * Upload a file to nexus
 * 
 * @param baseUrl baseUrl of nexus host
 * @param versionPrefix prefix for snapshot vs releases. Should default
 * to /snapshots and /releases
 * @param path path to file e.g. com/something/else/maven-metadata.xml
 * @param stream stream to upload
 * @param auth { username: username, password: password }
 */
module.exports = async (baseUrl, versionPrefix, path, stream, auth) => {
    const url = `${baseUrl}/${versionPrefix}/${path}`;
    
    try {
        await got
            .put(url, { username: auth.username, password: auth.password, body: stream });

    } catch (err) {
        console.error('Failed to upload file for URL: ' + url, err);
    }
};
