const timer=require("./util/jobs.util")
const jobConfig=require("./config/job.configb")

timer.initByConfig(jobConfig,true)