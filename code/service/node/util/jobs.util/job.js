const { uuid } = require("../common.util")
const log = require("../log.util")("JOB")
const parser = require('cron-parser');
const moment = require("moment")

const Type = {
    //执行一次 handleStr使用具体执行时间戳
    ONETIMES: "onetimes",
    //每天执行搭配 handleStr使用crontab字符串
    EVERDAY: "everyday",
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
        initError.call(this, `can't make sure time(${time}) handle status because of (${e.message}), please check handleStr.`)
    }
}

const TypeHandler = {
    onetimes() {
        if (canHandle.call(this, this.handleInterval)) {
            log.info(`(handle success)job(${this.id}) is allow to handle in onetimes`)
            this.handle()
        } else {
            log.warn(`(handle pause)job(${this.id}) is not allow to handle, one times(${moment(this.handleInterval).format("YYYY-MM-DD HH:mm:ss")})`)
        }
    },
    everyday() {
        const prev=this.handleInterval.prev()._date.ts,next=this.handleInterval.next()._date.ts
        if (canHandle.call(this, prev)) {
            log.info(`(handle success)job(${this.id}) is allow to handle,${moment().format("YYYY-MM-DD HH:mm:ss")} prev time(${moment(prev).format("YYYY-MM-DD HH:mm:ss")}), next time(${moment(next).format("YYYY-MM-DD HH:mm:ss")})`)
            this.handle()
        } else {
            log.warn(`(handle pause)job(${this.id}) is not allow to handle, prev time(${moment(prev).format("YYYY-MM-DD HH:mm:ss")}), next time(${moment(next).format("YYYY-MM-DD HH:mm:ss")})`)
        }

    },
    error() {
        log.error(`job(${this.id}) is error, because of ${this.errorMsg}.`)
    },
    none() {
        log.warn(`job(${this.id}) is not a valid type(${this.repetType}).`)
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
        if (this.type === Type.EVERDAY) {
            try {
                this.handleInterval = parser.parseExpression(this.handleStr);
            } catch (e) {
                initError.call(this, `cronStr(${this.handleStr}) parse exception ${e.message} `)
            }
        } else if (this.type === Type.ONETIMES) {
            this.handleInterval = moment(this.handleStr)
            if (this.handleInterval.format("YYYY-MM-DD HH:mm:ss") == "Invalid date") {
                initError.call(this, `cronStr(${this.handleStr}) parse exception not  `)
            }
        }
    }

    doHandle() {
        const handle = TypeHandler[this.type] || null
        if (handle == null) {
            this.error(`job(${this.name}/${this.id}) is execute with a error, beacuse job's handle is not allowed.`)
        } else {
            handle.call(this)
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