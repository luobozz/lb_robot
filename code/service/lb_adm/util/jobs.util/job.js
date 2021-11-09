const { uuid, workday } = require("../common.util")
const log = require("../log.util")("JOB")
const parser = require('cron-parser');
const moment = require("moment")

const Type = {
    //执行一次 handleStr使用具体执行时间戳
    ONETIMES: "onetimes",
    //每天执行搭配 handleStr使用crontab字符串
    EVERDAY: "everyday",
    WORKDAY: "workday",
    ERROR: "error",
    NONE: "none",
}

const initError = function (msg) {
    this.type = Type.ERROR
    this.errorMsg = msg
    log.error(msg)
}

const canHandle = function (time) {
    try {
        return moment().format("x") - moment(time).format("x") <= 60 * 1000
    } catch (e) {
        initError.call(this, `执行时间字符串(${time}) 不能确定下次执行时间，原因是 (${e.message})`)
    }
}

const TypeHandler = {
    onetimes() {
        if (canHandle.call(this, this.handleInterval)) {
            log.info(`(handle success)job(${this.id}) 开始执行了一次，执行时间${moment().format("YYYY-MM-DD HH:mm:ss")}`)
            this.handle()
        } else {
            log.warn(`(handle pause)job(${this.id}) 不能执行，执行时间应该是(${moment(this.handleInterval).format("YYYY-MM-DD HH:mm:ss")})`)
        }
    },
    everyday() {
        const prev = this.handleInterval.prev()._date.ts, next = this.handleInterval.next()._date.ts
        if (canHandle.call(this, prev)) {
            log.info(`(handle success)job(${this.id}) 允许执行，执行时间 ${moment().format("YYYY-MM-DD HH:mm:ss")} 上次执行(${moment(prev).format("YYYY-MM-DD HH:mm:ss")}), 下次执行(${moment(next).format("YYYY-MM-DD HH:mm:ss")})`)
            this.handle()
        } else {
            log.warn(`(handle pause)job(${this.id}) 不能执行，上次执行(${moment(prev).format("YYYY-MM-DD HH:mm:ss")}), 下次执行(${moment(next).format("YYYY-MM-DD HH:mm:ss")})`)
        }
    },
    async workday() {
        const isWorkday=await workday.checkToday()
        if(isWorkday){
            TypeHandler.everyday.call(this)
        }else{
            log.pass(`(handle vacation)job(${this.id}) 不能执行，今日${moment().format("YYYY-MM-DD")}是非工作日`)
        }
    },
    error() {
        log.error(`job(${this.id}) 执行出错，失败原因:${this.errorMsg}.`)
    },
    none() {
        log.warn(`job(${this.id}) 任务类型有误(${this.repetType}).`)
    },
}

class Job {
    constructor(config) {
        //times主进程占用号
        this.id = config.id == "times-29" ? config.id : uuid();
        this.name = config?.name || "未命名";
        this.type = config?.type || Type.NONE;
        this.handle = config?.handle || null;
        this.handleStr = config?.handleStr || "";
        this.handleInterval = null
        this.errorMsg = "";
        this.handleHistory = {
            execTimes: {
                success: 0,
                error: 0
            }
        }
        if (this.type === Type.EVERDAY||this.type===Type.WORKDAY) {
            try {
                this.handleInterval = parser.parseExpression(this.handleStr);
            } catch (e) {
                initError.call(this, `cronStr(${this.handleStr}) 转换出错，原因 ${e.message} `)
            }
        } else if (this.type === Type.ONETIMES) {
            this.handleInterval = moment(this.handleStr)
            if (this.handleInterval.format("YYYY-MM-DD HH:mm:ss") == "Invalid date") {
                initError.call(this, `cronStr(${this.handleStr}) 不是一个有效的时间  `)
            }
        }
    }

    async doHandle() {
        const handle = TypeHandler[this.type] || null
        if (handle == null) {
            this.error(`job(${this.name}/${this.id}) handle不能为空或者handle非法`)
        } else {
            await handle.call(this)
            this.handleHistory.execTimes.success = this.handleHistory.execTimes.success + 1
        }
    }

    error(msg) {
        log.error(msg ? msg : this.errorMsg)
        this.handleHistory.execTimes.error = this.handleHistory.execTimes.error + 1
    }

    static Type = Type
}

module.exports = Job