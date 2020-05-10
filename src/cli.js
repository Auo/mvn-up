const { program } = require('commander');

program
    .option('-g, --groupId <id>', 'group id of artifact')
    .option('-a, --artifactId <id>', 'artifact id')
    .option('-av, --artifactVersion <version>', 'version of artifact')
    .option('-pa', '--packaging <extension>', 'file extension of artifact')
    .option('-f, --file <path>', 'artifact to upload')
    .option('-d, --distribution <distribution>', 'distribution of artifact') //TODO: add support
    .option('-u, --user <user>', 'maven repository user')
    .option('-p, --password <password>', 'password for user')
    .option('-bu, --baseUrl <url>', 'base url to repository')
    .option('-sp, --snapshotPrefix <prefix>', 'prefix for snapshots', 'maven-snapshots')
    .option('-rp, --releasePrefix <prefix>', 'prefix for releases', 'maven-releases')
    .parse(process.argv);

console.log(program.artifactId);
