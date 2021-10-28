const { uuid } = require("../common.util")
const log = require("../log.util")("JOB")
const parser = require('cron-parser');

const Type = {
    //执行一次 handleStr使用具体执行时间戳
    ONETIMES: "onetimes",
    //每天执行搭配 handleStr使用crontab字符串
    EVERDAY: "everyday",
    ERROR: "error",
    NONE: "none",
}

const TypeHandler = {
    onetimes() { },
    everyday() { },
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
                this.type=Type.ERROR
                this.errorMsg=`cronStr(${this.handleStr}) parse exception ${e.message} `
            }
        }
    }

    handle() {
        const handle = TypeHandler[this.type]?.start || null
        if (handle == null) {
            this.error(`job(${this.name}/${this.id}) is execute with a error, beacuse job's handle is not allowed.`)
        } else {
            handle.call(this)
            log.info(`job(${this.name}/${this.id}) is execute success.`)
            this.handleHistory.execTimes.success = this.handleHistory.execTimes.success + 1
        }
    }

    error(msg) {
        log.error(msg?msg:this.errorMsg)
        this.handleHistory.execTimes.error = this.handleHistory.execTimes.error + 1
    }

    static Type = Type
}

module.exports = Job