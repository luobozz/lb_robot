const { v4: uuidv4 } = require('uuid');
const api = require("../api")
const log = require("./log.util")("COMMON UTIL")
const lodash = require("lodash")
const escapeRegExp = function (string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

const _ = {
    uuid() {
        return _.replaceAll(uuidv4(), "-", "")
    },
    workday: {
        async checkWorkDay(moment) {
            const yearJr = await api.otherThird.bitefu.jiari()
            const isJr = moment.days() == 6 || moment.days() == 0 || !lodash.isEmpty(yearJr[moment.format("MMDD")])
            return !isJr
        }
    },
    replaceAll: (str, match, replacement) => {
        return str.replace(new RegExp(escapeRegExp(match), 'g'), () => replacement);
    }
}

module.exports = _