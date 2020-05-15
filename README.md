# mvn-up
![run-tests](https://github.com/Auo/maven-upload/workflows/run-tests/badge.svg?branch=master)

Simple library to upload artifacts to a maven repository, when `mvn` is not available. Inspired by [nexus-deployer](https://github.com/cthorne66/nexus-deployer).

## Package

```js
const mavenUpload = require('mvn-up');

mavenUpload('com.some.group', // groupId
    'some_artifact_id', // artifactId
    '1.0.2-SNAPSHOT', // version
    'zip', // packaging
    'Distribution', // classifier
    '/path/to/file.zip', // artifact
    'http://localhost:8081/repository/maven-snapshots', // base url to repo
    { username: 'user', password: 'password' } // authentication
    ).then(() => console.log('📦 upload done'))
    .catch(err => console.error('❌upload failed', err));
```

## CLI

### Run with npx
```bash
npx mvn-up -g com.some.group -a test_package -v 1.0.3-SNAPSHOT -P zip -f ./test/test.zip -u username -p password -U http://localhost:8081/repository/maven-snapshots
```

### Options

```bash
Usage: cli [options]

Options:
  -g, --groupId <id>                 group id of artifact
  -a, --artifactId <id>              artifact id
  -v, --artifactVersion <version>   version of artifact
  -P, --packaging <extension>       file extension of artifact
  -f, --file <path>                  artifact to upload
  -c, --classifier <classifier>      classifier of artifact
  -u, --user <user>                  maven repository user
  -p, --password <password>          password for user
  -U, --url <url>                    base url to repository
  -V, --version                      output the version number
  -h, --help                         display help for command
```
