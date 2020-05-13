const fs = require('fs');

const pathExists = (path) => {
    if (!fs.existsSync(path)) {
        throw new Error('Specified file path: ' + path + ' does not exist');
    }

    if (fs.lstatSync(path).isDirectory()) {
        throw new Error('Specified file path: ' + path + ' is a directory')
    }
};

const validateUrl = (url) => {
    try {
        new URL(url);
    } catch(err) {
        throw new Error('Specified url: ' + url + ' is not valid');
    }
};

const required = (name, value) => {
    if (!value) {
        throw new Error('Missing required field ' + name);
    }
};

module.exports = (groupId, artifactId, version, packaging, file, url) => {
    required('groupId', groupId);
    required('artifactId', artifactId);
    required('version', version);
    required('packaging', packaging);
    required('file', file);
    pathExists(file);
    required('url', url);
    validateUrl(url);
};
