const axios = require("../../util/axios.util")
const storage = require('../../util/storage.util');
const moment = require("moment")
const lodash = require("lodash")
const log = require("../../util/log.util")("API bitefu")

module.exports = {
    async jiari() {
        const thisYear=moment().format("YYYY")
        const storageTitle=`JIARI_STORE_${thisYear}`
        let yearJr = storage.get(storageTitle)||null

        if (!lodash.isEmpty(yearJr)) {
            return yearJr;
        }

        await axios.get(`https://tool.bitefu.net/jiari/?d=${thisYear}`).then(r => {
            if (!lodash.isEmpty(r.data[thisYear]) && r.data[thisYear] != false) {
                storage.put(storageTitle, r.data[thisYear])
                yearJr=r.data[thisYear]
            } else {
                throw new Error(`获取到数据，但是数据不合格，数据${JSON.stringify(r.data)}`)
            }
        }).catch(e => {
            log.error(`查询假日信息失败，时间${thisYear}，原因 ${e}`)
        })
        return yearJr
        // storage.put('hello', 'world');
    }
}