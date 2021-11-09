const axios = require("../../util/axios.util")
const storage = require('../../util/storage.util');
const moment=require("moment")

module.exports = {
    async jiari() {
        const thisYear=moment().format("YYYY")
        const yearJr=storage.get(thisYear)
        console.log(yearJr)
        // storage.put('hello', 'world');
    }
}