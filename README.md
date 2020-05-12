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

```
Usage: cli [options]

Options:
  -g, --groupId <id>                 group id of artifact
  -a, --artifactId <id>              artifact id
  -av, --artifactVersion <version>   version of artifact
  -pa, --packaging <extension>       file extension of artifact
  -f, --file <path>                  artifact to upload
  -d, --distribution <distribution>  distribution of artifact
  -u, --user <user>                  maven repository user
  -p, --password <password>          password for user
  -bu, --baseUrl <url>               base url to repository
  -sp, --snapshotPrefix <prefix>     prefix for snapshots (default: "maven-snapshots")
  -rp, --releasePrefix <prefix>      prefix for releases (default: "maven-releases")
  -V, --version                      output the version number
  -h, --help                         display help for command
```
