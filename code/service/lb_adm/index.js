const timer = require("./util/jobs.util");
const jobConfig = require("./config/job.config");

(async function run() {
    await timer.initByConfig(jobConfig,true)
})()


