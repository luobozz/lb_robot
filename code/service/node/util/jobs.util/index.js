const lodash = require("lodash");
const Job = require("./job");
const log=require("../log.util")("job")

const checkerId = "times-29"

let jobs = [];
const _this = {
    initjobConfig(config, initChecker) {
        config.forEach((p,index) => {
            if (p.startType === job.StartType.IMMEDIATELY) {
                p=_this.addjob(p)
                p.start()
            } else {
                p=_this.addjob(p)
            }
            log.info(`(${index}/${config.length}) init job(${p.name}/${p.id}) success.`)
        })
        if (initChecker&&lodash.isEmpty(_this.getjob("times-29"))) {
            _this.checker()
        }
    },
    checker() {
        _this.addjob({
            id: checkerId,
            name: "job检测启动主进程",
            handle: () => {
                log.info("\n")
                log.info("------checktimes----------")
                const list=_this.getjobs().filter(p=>p.id!=checkerId)
                list.forEach((p,index)=>{
                    log.info(`(${index}/${list.length}) check job(${p.name}/${p.id}) status(${p.status}) nextTime(${p.getFormatNextTime()}) ${p.startType===job.StartType.LATER&&p.status===job.Status.STOP?`startTime(${p.getFormatStartTime()})`:''}`)
                })
                log.info("------checktimes end------\n")
            },
            //1分钟检查一次，配合startTime只支持到分钟级别
            times: 60 * 1000,
            type: job.Type.INTERVAL,
        }).start()
    },
    addjob(t) {
        if (!lodash.isEmpty(_this.getjobByName(t.name))) {
            console.warn(`job '${t.name}' is exist!`)
            return
        }
        const job = new job(t)
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
    stopjobById(jobId) {
        const job = _this.getjob(jobId);
        if (job != {}) {
            job.stop()
        }
        return job;
    },
    stopjobByName(jobName) {
        const job = _this.getjobByName(jobName);
        if (job != {}) {
            job.stop()
        }
        return job;
    },
    reStartjobById(jobId) {
        const job = _this.getjob(jobId);
        if (job != {}) {
            job.restart()
        }
        return job;
    },
    reStartjobByName(jobName) {
        const job = _this.getjobByName(jobName);
        if (job != {}) {
            job.restart()
        }
        return job;
    },
}

module.exports = _this;