const got = require('got');

/**
 * Upload a stream to the specified repository
 * 
 * @param baseUrl baseUrl of repository
 * @param versionPrefix prefix for snapshot vs releases. Should default
 * to /snapshots and /releases
 * @param path path to file e.g. com/something/else/maven-metadata.xml
 * @param stream stream of to upload
 * @param auth { username: username, password: password }
 */
module.exports = async (baseUrl, versionPrefix, path, stream, auth) => {
    const url = `${baseUrl}/${versionPrefix}/${path}`;
    try {
        await got.put(url, { username: auth.user, password: auth.password, body: stream });
    } catch (error) {
        throw { code: error.response.statusCode, message: error.response.statusMessage, url };
    }
};
