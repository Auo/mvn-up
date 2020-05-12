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

// 1. Generate md5 and sha for file
// 2. Generate memory files and md5 sha for them
// 3. upload
module.exports = (groupId, artifactId, version, packaging, file, baseUrl, prefixes, auth) => {
    return new Promise(async (resolve, reject) => {
        const files = [];

        const artifactPath = `${toPath(groupId)}/${artifactId}/${version}/${artifactId}-${version}.${packaging}`;
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

        let prefix = prefixes.release;

        if (isSnapshot(version)) {
            prefix = prefixes.snapshot;
            const snapshotMeta = templates.snapshotMetadata(groupId, artifactId, version, now);
            files.push(snapshotMeta);
            await createCheckFiles(Readable.from(snapshotMeta.content), snapshotMeta.path, files);
        }

        for (let i = 0; i < files.length; i++) {
            try {
                await upload(baseUrl,
                    prefix,
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
