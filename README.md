# nexus

## Goal
Simple CLI/lib that, with few dependencies, can upload an artifact to nexus.

## What needs to be uploaded?
Collection of files:

* file.EXT
* file.EXT.md5
* file.EXT.sha1

* pom.xml
* pom.xml.md5
* pom.xml.sha1


## Which options should be possible?
```
    groupId: 'nexus-deployer',
    artifactId: 'nexus-deployer',
    version: '1.0',
    packaging: 'zip', //file type
    auth: {
      username:'admin',
      password:'admin123'
    },
    pomDir: 'build/pom', Why? is it because a pom can exist? seems to be dir where to put generated files.
    url: 'http://localhost:8081/nexus/content/repositories/releases', //this needs to flip depending if it's a relase or snapshot.

    artifact: 'build/nexus-deployer.zip', // artifact to upload
```

    ```bash
    curl -v \
    -F "r=releases" \
    -F "g=com.acme.widgets" \
    -F "a=widget" \
    -F "v=0.1-1" \
    -F "p=tar.gz" \
    -F "file=@./widget-0.1-1.tar.gz" \
    -u myuser:mypassword \
    http://localhost:8081/nexus/service/local/artifact/maven/content
    ```

    `-F` = form

    https://stackoverflow.com/questions/11029086/publish-artifact-to-nexus-via-rest-api-post/19699401
    https://github.com/sindresorhus/got#form-data

    
