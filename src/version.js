const IS_SNAPSHOT = /[\d\.]+-SNAPSHOT/;
/**
 * Test if a string is a SNAPSHOT version
 */
module.exports = (version) => {
    return IS_SNAPSHOT.test(version);
};