function uuid() {
    var letters = "abcdefghigklmnopqrstuvwxyz";
    var subLetters = letters.slice(10, letters.length);
    var sequence = [letters, letters.toUpperCase(),
        subLetters, subLetters.toUpperCase()]
    var numbers = "0123456789";
    var DateTime = new Date();
    var msec = DateTime.getMilliseconds();
    var sec = DateTime.getSeconds();
    var ms = DateTime.getMinutes();
    var hr = DateTime.getHours();
    var day = DateTime.getDay();
    var mth = DateTime.getMonth();
    var year = DateTime.getFullYear();
    var resArr = [msec, sec, ms, hr, day, mth, year];
    var [result, str] = ["", ""]
    resArr.forEach(item => {
        result += `${item}${Math.floor(Math.random() * item)}`
    })
    for (var x of result) {
        var seq = Math.floor(Math.random() * sequence.length);
        str += sequence[seq][x]

    }
    return str;
}

module.exports = {uuid}