const got = require('got');

/**
 * Upload a stream to the specified repository
 * 
 * @param url url of maven-repository
 * @param path path to file e.g. com/something/else/maven-metadata.xml
 * @param stream stream to upload
 * @param auth { username: username, password: password }
 */
module.exports = async (url, path, stream, auth) => {
    const fullUrl = `${url}/${path}`;
    try {
        await got.put(fullUrl, { username: auth.username, password: auth.password, body: stream });
    } catch (error) {
        throw { code: error.response.statusCode, message: error.response.statusMessage, url: fullUrl };
    }
};
