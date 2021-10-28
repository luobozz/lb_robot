const lodash = require("lodash");
const Job = require("./job");
const log = require("../log.util")("JOB_CHECKER")
const moment = require("moment")

const checkerId = "times-29"

let jobs = [];
const _this = {
    initByConfig(config, initChecker) {
        config.forEach((p, index) => {
            p = _this.addjob(p)
            log.info(`(${index}/${config.length}) init job(${p.name}/${p.id}) success.`)
        })
        _this.checker()
    },
    checker() {
        log.n()
        const checkerHandle = () => {
            log.info(`----------- [CHECK_JOBS] ${moment().format("YYYY-MM-DD hh:mm:ss")} -----------`)
            const list = _this.getjobs().filter(p => p.id != checkerId)
            log.info(`检查队列:${list.length}`)
            list.forEach(async (p, index) => {
                if (p.type != Job.Type.ERROR) {
                    log.info(`(${index}/${list.length}) (success) check job(${p.name}|${p.id}) type(${p.type}) success|error(${p.handleHistory.execTimes.success}|${p.handleHistory.execTimes.error}) str${p.handleStr}`)
                } else {
                    p.error()
                    log.error(`(${index}/${list.length}) (error) check job(${p.name}|${p.id}) type(${p.type}) success|error(${p.handleHistory.execTimes.success}|${p.handleHistory.execTimes.error}) errorMsg(${p.errorMsg})`)
                }
            })
            log.info("----------- [CHECK_JOBS] end ---------------------------")
            log.n()
        }
        checkerHandle()
        //1分钟检查一次，配合startTime只支持到分钟级别
        setInterval(checkerHandle, 1000)
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