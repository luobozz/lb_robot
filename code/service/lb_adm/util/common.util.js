const { v4: uuidv4 } = require('uuid');
const api = require("../api")
const escapeRegExp = function (string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

const _ = {
    uuid() {
        return _.replaceAll(uuidv4(), "-", "")
    },
    workday: {
        checkWorkDay(moment){
            api.otherThird.bitefu.jiari()
        }
    },
    replaceAll: (str, match, replacement) => {
        return str.replace(new RegExp(escapeRegExp(match), 'g'), () => replacement);
    }
}

module.exports = _