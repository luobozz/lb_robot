const timer = require("./util/jobs.util")
const jobConfig = require("./config/job.config")
const moment = require("moment")

// timer.initByConfig(jobConfig,true)



const t = require("./util/common.util")
const isWorkDay=t.workday.checkWorkDay(moment())

console.log(isWorkDay)