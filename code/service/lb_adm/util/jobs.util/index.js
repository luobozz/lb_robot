const lodash = require("lodash");
const Job = require("./job");
const log = require("../log.util")("JOB_CHECKER")
const moment = require("moment");
const { reject } = require("lodash");

const checkerId = "times-29"

let jobs = [];
const _this = {
    async initByConfig(config, initChecker) {
        config.forEach((p, index) => {
            log.info(`(${index + 1}/${config.length}) init job(${p.name}).`)
            p = _this.addjob(p)
        })
        await _this.checker()
    },
    async checker() {
        log.n()
        const checkerHandle = async () => {
            log.info(`----------- [CHECK_JOBS] ${moment().format("YYYY-MM-DD HH:mm:ss")} -----------`)
            const list = _this.getjobs().filter(p => p.id != checkerId)
            log.info(`检查队列:${list.length}`)
            for(let index=0;index<list.length;index++){
                let p=list[index]
                log.n()
                if (p.type != Job.Type.ERROR) {
                    log.info(`(${index + 1}/${list.length}) 【success】${p.name}/${p.id}|类型:${p.type}|执行次数:${p.handleHistory.execTimes.success} 成功/${p.handleHistory.execTimes.error} 失败|执行字符串:${p.handleStr}`)
                    await p.doHandle()
                } else {
                    log.error(`(${index + 1}/${list.length})   【error】${p.name}/${p.id}|类型:${p.type}|执行次数:${p.handleHistory.execTimes.success} 成功/${p.handleHistory.execTimes.error} 失败|错误消息:${p.errorMsg}`)
                    p.error()
                }
            }

            log.n()
            log.info("----------- [CHECK_JOBS] end ---------------------------")
            log.n()
        }

        await checkerHandle()
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