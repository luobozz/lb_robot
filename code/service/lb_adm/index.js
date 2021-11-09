const timer = require("./util/jobs.util")
const jobConfig = require("./config/job.config")

timer.initByConfig(jobConfig,true)