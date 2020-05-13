# maven-upload
![run-tests](https://github.com/Auo/maven-upload/workflows/run-tests/badge.svg?branch=master)

Simple library to upload artifacts to a maven repository, when `mvn` is not available.

## Usage

```js
const mavenUpload = require('mvn-up');

mavenUpload('com.some.group', // groupId
    'some_artifact_id', // artifactId
    '1.0.2-SNAPSHOT', // version
    'zip', // packaging
    'Distribution', // classifier
    '/path/to/file.zip', // artifact
    'http://localhost:8081/nexus/', // base url to repo
    { snapshot: 'maven-snapshots', release: 'maven-releases' }, // repository 
    { username: 'user', password: 'password' } // authentication
    ).then(() => console.log('📦 upload done'))
    .catch(err => console.error('❌upload failed', err));
```


```bash
Usage: cli [options]

Options:
  -g, --groupId <id>                 group id of artifact
  -a, --artifactId <id>              artifact id
  -av, --artifactVersion <version>   version of artifact
  -pa, --packaging <extension>       file extension of artifact
  -f, --file <path>                  artifact to upload
  -c, --classifier <classifier>      classifier of artifact
  -u, --user <user>                  maven repository user
  -p, --password <password>          password for user
  -bu, --baseUrl <url>               base url to repository
  -sp, --snapshotPrefix <prefix>     prefix for snapshots (default: "maven-snapshots")
  -rp, --releasePrefix <prefix>      prefix for releases (default: "maven-releases")
  -V, --version                      output the version number
  -h, --help                         display help for command
```
