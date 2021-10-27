const { uuid } = require("../common.util")
const lodash = require("lodash")
const moment = require("moment")
const log = require("../log.util")("TIMER")

const noneTypeHandle = function () {
    log.warn(`job(${this.id}) is not a valid type(${this.repetType}).`)
}

const Type = {
    //执行一次 handleStr使用具体执行时间戳
    ONETIMES: "onetimes",
    //每天执行搭配 handleStr使用crontab字符串
    EVERDAY: "everyday",
    NONE: "none",
}

const TypeHandler = {
    timeout: {
        start() {
            const _ = this
            this.interval = setTimeout(function () {
                _.handle.call(_)
                _.status = Status.STOP;
                _.nextTime = -1;
            }, this.times)
        },
        stop() {
            clearTimeout(this.interval);
        },
    },
    interval: {
        start() {
            const _ = this
            //interval的会马上执行一次
            this.handle.call(this)
            this.interval = setInterval(function () {
                _.handle.call(_)
                _.nextTime = new Date().getTime() + _.times;
            }, this.times)
        },
        stop() {
            clearInterval(this.interval);
        },
    },
    crontab: {
        start() { },
        stop() { },
    },
    none: {
        start: noneTypeHandle,
        stop: noneTypeHandle
    }
}

class Job {
    constructor(config) {
        //times主进程占用号
        this.id = config.id == "times-29" ? config.id : uuid();
        this.name = config?.name || "未命名";
        this.type = config?.Type || Type.NONE;
        this.handle = config?.handle || null;
        this.handleStr = config?.handleStr || "";
        this.handleHistory = {
            execTimes: {
                success: 0,
                error: 0
            }
        }
    }

    handle() {
        const handle = TypeHandler[this.type]?.start || null
        if (handle == null) {
            log.error(`job(${this.name}/${this.id}) is execute with a error, beacuse job's handle is not allowed.`)
            this.handleHistory.execTimes.error = this.handleHistory.execTimes.error + 1
        } else {
            handle.call(this)
            log.info(`job(${this.name}/${this.id}) is execute success.`)
            this.handleHistory.execTimes.success = this.handleHistory.execTimes.success + 1
        }
    }

    static Type = Type
}

module.exports = job