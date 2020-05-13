#!/usr/bin/env node

const { program } = require('commander');
const mavenUpload = require('../src/maven-upload.js');
const version = require('../package.json').version;

program
    .requiredOption('-g, --groupId <id>', 'group id of artifact')
    .requiredOption('-a, --artifactId <id>', 'artifact id')
    .requiredOption('-v, --artifactVersion <version>', 'version of artifact')
    .requiredOption('-P, --packaging <extension>', 'file extension of artifact')
    .requiredOption('-f, --file <path>', 'artifact to upload')
    .option('-c, --classifier <classifier>', 'classifier of artifact')
    .option('-u, --user <user>', 'maven repository user')
    .option('-p, --password <password>', 'password for user')
    .requiredOption('-U, --url <url>', 'url to repository, make sure to select based on version')
    .version(version)
    .parse(process.argv);

mavenUpload(
    program.groupId,
    program.artifactId,
    program.artifactVersion,
    program.packaging,
    program.classifier,
    program.file,
    program.url,
    { 
        username: program.user,
        password: program.password
    }).then(() => console.log('📦  file uploaded to repository'))
    .catch(err => {
        console.error('⚠️  failed to upload: ', err);
        process.exit(1);
    });
