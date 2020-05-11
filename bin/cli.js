#!/usr/bin/env node

const { program } = require('commander');
const mavenUpload = require('../src/maven-upload.js');
const version = require('../package.json').version;

(async (argv) => {
    program
        .requiredOption('-g, --groupId <id>', 'group id of artifact')
        .requiredOption('-a, --artifactId <id>', 'artifact id')
        .requiredOption('-av, --artifactVersion <version>', 'version of artifact')
        .requiredOption('-pa, --packaging <extension>', 'file extension of artifact')
        .requiredOption('-f, --file <path>', 'artifact to upload')
        .option('-d, --distribution <distribution>', 'distribution of artifact') //TODO: add support
        .option('-u, --user <user>', 'maven repository user')
        .option('-p, --password <password>', 'password for user')
        .requiredOption('-bu, --baseUrl <url>', 'base url to repository')
        .option('-sp, --snapshotPrefix <prefix>', 'prefix for snapshots', 'maven-snapshots')
        .option('-rp, --releasePrefix <prefix>', 'prefix for releases', 'maven-releases')
        .version(version)
        .parse(argv);

    await mavenUpload(
        program.groupId,
        program.artifactId,
        program.artifactVersion,
        program.packaging,
        //add distribution
        program.file,
        program.baseUrl,
        { snapshots: program.snapshotPrefix, releases: program.releasesPrefix },
        { user: program.user, password: program.password });
})(process.argv);
