/**
 * Timestamp string should be based on UTC
 * yyyyddMMHHmmss
 * @param date javascript Date object
 */
const timestamp = (date) => {
    const prefix = (d) => d < 10 ? '0' + d : d.toString();
    return `${date.getUTCFullYear()}${prefix(date.getUTCMonth() + 1)}${prefix(date.getUTCDate())}`
        + `${prefix(date.getUTCHours())}${prefix(date.getUTCMinutes())}${date.getUTCSeconds()}`;
}

module.exports = timestamp;