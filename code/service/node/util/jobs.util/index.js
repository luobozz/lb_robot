const lodash = require("lodash");
const Job = require("./job");
const log = require("../log.util")("job")

const checkerId = "times-29"

let jobs = [];
const _this = {
    initByConfig(config, initChecker) {
        config.forEach((p, index) => {
            p = _this.addjob(p)
            log.info(`(${index}/${config.length}) init job(${p.name}/${p.id}) success.`)
        })
        _this.checker()
        // if (initChecker && lodash.isEmpty(_this.getjob("times-29"))) {
        //     _this.checker()
        // }
    },
    checker() {
        const checkerHandle=()=>{
            log.info("\n")
            log.info("------checktimes----------")
            const list = _this.getjobs().filter(p => p.id != checkerId)
            list.forEach((p, index) => {
                log.info(`(${index}|${list.length}) check job(${p.name}/${p.id}) type(${p.type}) success|error(${p.handleHistory.execTimes.success}|${p.handleHistory.execTimes.error})`)
            })
            log.info("------checktimes end------\n")
        }
        checkerHandle()
        //1分钟检查一次，配合startTime只支持到分钟级别
        setInterval(checkerHandle, 60 * 1000)
    },
    addjob(t) {
        if (!lodash.isEmpty(_this.getjobByName(t.name))) {
            console.warn(`job '${t.name}' is exist!`)
            return
        }
        const job = new Job(t)
        jobs.push(job)
        return job
    },
    getjobs() {
        return jobs;
    },
    getjob(id) {
        return jobs.find(p => p.id == id) || {}
    },
    getjobByName(name) {
        return jobs.find(p => p.name == name) || {}
    },
    removejob(job) {
        job.stop()
        lodash.remove(jobs, p => {
            return p.id === job.id
        })
    },
    removejobById(jobId) {
        const job = _this.getjob(jobId);
        if (job != {}) {
            _this.removejob(job);
        }
        return job;
    },
    removejobByName(jobName) {
        const job = _this.getjobByName(jobName);
        if (job != {}) {
            _this.removejob(job);
        }
        return job;
    },
}

module.exports = _this;