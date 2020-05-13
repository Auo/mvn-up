const generate = require('./check-generator.js');
const { templates, toPath } = require('./templates.js');
const timestamp = require('./timestamp.js');
const isSnapshot = require('./version.js');
const { Readable } = require('stream');
const upload = require('./upload.js');
const fs = require('fs');

const createCheckFiles = async (stream, path, arr) => {
    const validation = await generate(stream);
    arr.push({ path: path + `.md5`, content: validation.md5 });
    arr.push({ path: path + `.sha1`, content: validation.sha1 });
};

/**
 * Upload a file to a maven repository, will also generate supporting files, such as pom.
 * 
 * 1. Generate md5 and sha for file
 * 2. Generate memory files and md5 sha for them
 * 3. upload
 * 
 * @param groupId id of group, e.g. com/auo/github
 * @param artifactId id of artifact, e.g. some_artifact
 * @param version version. e.g. 1.0.2 or 1.0.3-SNAPSHOT
 * @param packaging extension of artifact, e.g. jar, zip
 * @param classifier classifier of artifact, e.g. Distribution
 * @param file path to file to upload
 * @param url url of maven-repository, e.g. http://localhost:8081/repository/maven-releases or http://localhost:8081/repository/maven-snapshots
 * @param auth authentication for repository, { username: "user", password: "password" }
 * 
 * @returns {Promise}
 */
module.exports = (groupId, artifactId, version, packaging, classifier, file, url, auth) => {
    return new Promise(async (resolve, reject) => {
        const files = [];

        const artifactPath = `${toPath(groupId)}/${artifactId}/${version}/${artifactId}-${version}${!!classifier ? '-' + classifier : ''}.${packaging}`;
        await createCheckFiles(fs.createReadStream(file), artifactPath, files);

        files.push({ path: artifactPath, content: null, location: file });

        const now = timestamp(new Date());

        // Group per upload url
        const pom = templates.pom(groupId, artifactId, version, packaging);
        files.push(pom);
        await createCheckFiles(Readable.from(pom.content), pom.path, files);

        const artifactMeta = templates.artifactMetadata(groupId, artifactId, version, now);
        files.push(artifactMeta);
        await createCheckFiles(Readable.from(artifactMeta.content), artifactMeta.path, files);

        if (isSnapshot(version)) {
            const snapshotMeta = templates.snapshotMetadata(groupId, artifactId, version, now);
            files.push(snapshotMeta);
            await createCheckFiles(Readable.from(snapshotMeta.content), snapshotMeta.path, files);
        }

        for (let i = 0; i < files.length; i++) {
            try {
                await upload(url,
                    files[i].path,
                    files[i].content != null
                        ? Readable.from(files[i].content)
                        : fs.createReadStream(files[i].location),
                    auth);
            } catch (err) {
                return reject(err);
            }
        }

        return resolve();
    });
};
