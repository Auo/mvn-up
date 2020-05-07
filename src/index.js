const generate = require('./check-generator.js');
const { templates, toPath } = require('./templates.js');
const timestamp = require('./timestamp.js');
const isSnapshot = require('./version.js');
const { Readable } = require('stream');
const upload = require('./upload.js');
const fs = require('fs');
// const path = require('path');
// const mkdirp = require('mkdirp');

const createCheckFiles = async (stream, path, arr) => {
    const validation = await generate(stream);
    arr.push({ path: path + `.md5`, content: validation.md5 });
    arr.push({ path: path + `.sha1`, content: validation.sha1 });
};

// const dumpToDisk = async (file, targetDir) => {
//     const p = path.join(targetDir, file.path);
//     const d = path.dirname(p);

//     await mkdirp(d);

//     if (file.content) {
//         fs.writeFileSync(p, file.content, { encoding: 'utf-8' });
//     } else {
//         const call = (from, to) => {
//             return new Promise((resolve, reject) => {
//                 const target = fs.createWriteStream(to);
//                 const read = fs.createReadStream(from);

//                 read.pipe(target);

//                 target.on('close', () => {
//                     return resolve();
//                 });

//                 target.on('error', (err) => {
//                     return reject(err);
//                 });

//             });
//         };

//         await call(file.location, p);
//     }
// };

(async (groupId, artifactId, version, packaging, file, baseUrl) => {
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

    let prefix = 'releases';

    if (isSnapshot(version)) {
        prefix = 'snapshots';
        const snapshotMeta = templates.snapshotMetadata(groupId, artifactId, version, now);
        files.push(snapshotMeta);
        await createCheckFiles(Readable.from(snapshotMeta.content), snapshotMeta.path, files);
    }

    for (let i = 0; i < files.length; i++) {
        await upload(baseUrl, prefix, files[i].path, files[i].content != null ? Readable.from(files[i].content) : fs.createReadStream(files[i].location), { username: 'username', password: 'password' });
    }


    // const out = './dist';
    // if (!fs.existsSync(out)) {
    //     fs.mkdirSync(out);
    //     // Do something
    // }

    // for (let i = 0; i < files.length; i++) {
    //     await dumpToDisk(files[i], path.join(out, pathPrefix))
    // }

    //FOR SNAPSHOTS!
    // https://host/repository/snapshots/com/apptus/ecom/artifact-id/maven-metadata.xml
    // https://host/repository/snapshots/com/apptus/ecom/artifact-id/1.2.6-SNAPSHOT/artifact-id-1.2.6-SNAPSHOT.pom
    // https://host/repository/snapshots/com/apptus/ecom/artifact-id/1.2.6-SNAPSHOT/artifact-id-1.2.6-SNAPSHOT.zip
    // https://host/repository/snapshots/com/apptus/ecom/artifact-id/1.2.6-SNAPSHOT/maven-metadata.xml


    //FOR RELEASES!
    // https://host/repository/releases/com/apptus/ecom/artifact-id/1.2.1/artifact-id-1.2.1.pom
    // https://host/repository/releases/com/apptus/ecom/artifact-id/1.2.1/artifact-id-1.2.1.zip
    // https://host/repository/releases/com/apptus/ecom/artifact-id/maven-metadata.xml


    // all files are created -> start uploading



    // --> specify artifact. 
    // 1. Generate md5 and sha for file.
    // 2. Generate memory files and md5 sha for them
    // 3. upload.


})('com.auo.github', 'test_package', '1.0.1-SNAPSHOT', 'zip', './test.zip', 'http://localhost:1234');
