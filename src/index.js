const mavenUpload = require('./maven-upload.js');

(async (groupId, artifactId, version, packaging, file, baseUrl, prefixes, auth) => {
    await mavenUpload(groupId, artifactId, version, packaging, file, baseUrl, prefixes, auth);
})('com.auo.github',
    'test_package',
    '1.0.2-SNAPSHOT',
    'zip',
    './test/test.zip',
    'http://localhost:8081/repository',
    {
        snapshot: 'maven-snapshots',
        release: 'maven-releases'
    },
    {
        username: 'username',
        password: 'password'
    });
