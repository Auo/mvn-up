# maven-upload
![run-tests](https://github.com/Auo/maven-upload/workflows/run-tests/badge.svg?branch=master)

Simple library to upload artifacts to a maven repository, when `mvn` is not available.

## Which options should be possible?
```json
{
    "groupId": "nexus-deployer",
    "artifactId": "nexus-deployer",
    "version": "1.0",
    "packaging": "zip",
    "classifier": "Distribution",
    "auth": {
      "username": "admin",
      "password": "admin123"
    },
    "prefix": {
      "snapshot": "maven-snapshot",
      "release": "maven-release"
    },
    "baseUrl": "http://localhost:8081/nexus/",
    "artifact": "build/nexus-deployer.zip"
}
```
