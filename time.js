/**
 * Parse a duration string in the format HH:MM:SS and returns the total number of seconds.
 * Correctly handles inputs of HH, HH:MM, and HH:MM:SS.
 * 
 * @example
 * // returns 3600
 * durationToSeconds("1:00:00");
 * 
 * @param {string} hms The time string in the format HH:MM:SS
 * @returns The total number of seconds in the time string
 */
export function durationToSeconds(hms) {
    const portions = hms.split(':');

    if (portions.length == 1) {
        // only have hours
        return (+portions[0]) * 60 * 60
    }

    if (portions.length == 2) {
        // only have hours and minutes
        return (+portions[0]) * 60 * 60 + (+portions[1]) * 60
    }

    // minutes are worth 60 seconds
    // hours are worth 60 minutes
    return (+portions[0]) * 60 * 60 + (+portions[1]) * 60 + (+portions[2]);
}

// from https://stackoverflow.com/a/11486026/10987661

/**
 * Turns a number of seconds into a human-readable duration string.
 * From: https://stackoverflow.com/a/11486026/10987661
 * 
 * @example
 * // returns "1:00:00"
 * secondsToDuration(3600);
 * 
 * @param {number} seconds The duration in seconds
 * @param {number} decimals How many seconds decimal places to include (defaults to 0)
 * @returns A human-readable duration string
 */
export function secondsToDuration(seconds, decimals = 0) {
    // Hours, minutes and seconds
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = (seconds % 60).toFixed(decimals);

    // Output like "1:01" or "4:03:59" or "123:03:59"
    let ret = "";

    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;

    return ret;
}