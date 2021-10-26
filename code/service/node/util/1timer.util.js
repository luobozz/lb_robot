/**
 * @author chenlingyu
 */
const lodash=require("lodash")

const start = (timer) => {
    timer.executionTime = new Date().getTime() + timer.timeout;
    return {
        timeout: () => {
            return setTimeout(() => {
                timer.handle();
                timer.isStart = false;
                timer.executionTime = -1;
            }, timer.timeout);
        },
        interval: () => {
            return setInterval(() => {
                timer.handle();
                timer.executionTime = new Date().getTime() + timer.timeout;
            }, timer.timeout);
        }
    }
}

const stop = (timer) => {
    return {
        timeout: () => {
            window.clearTimeout(timer.interval);
        },
        interval: () => {
            window.clearInterval(timer.interval);
        }
    }
}

let timers = [];
const _this = {
    initTimerConfig(config) {
        config.forEach(p => {
            if (p.ImmediatelyStart) {
                _this.addTimer(p).start()
            } else {
                _this.addTimer(p)
            }
        })
    },
    getTimer(name) {
        return timers.find(p => p.name == name) || {}
    },
    getTimers() {
        return timers;
    },
    addTimer(t) {
        if (!lodash.isEmpty(_this.getTimer(t.name))) {
            console.warn(`timer '${t.name}' is exist!!!`)
            return
        }
        const timer = {
            name: t.name,
            handle: t.handle,
            timeout: t.timeout,
            type: t.type,
            isStart: false,
            executionTime: -1,
            ImmediatelyStart: t.ImmediatelyStart || false
        }
        timers.push(timer)
        return {
            start: () => {
                _this.restartTimer(timer)
            }
        }
    },
    restartTimer(timer, timeout) {

        if (typeof timeout == "number") {
            timer.timeout = timeout
        }

        if (timer.isStart) {
            _this.stopTimer(timer);
        }
        if (timer.type === "timeout") {
            timer.interval = start(timer).timeout();
            timer.isStart = true
        } else if (timer.type === "interval") {
            if (timer.ImmediatelyStart) {
                timer.handle();
            }
            timer.interval = start(timer).interval();
            timer.isStart = true
        }
    },
    stopTimer(timer) {
        if (timer.interval) {
            if (timer.type === "timeout") {
                stop(timer).timeout();
                timer.interval = false
                timer.isStart = false
            } else if (timer.type === "interval") {
                stop(timer).interval();
                timer.interval = false
                timer.isStart = false
            }
        }
    },
    removeTimer(timer) {
        if (timer.interval) {
            if (timer.type == "timeout") {
                stop(timer).timeout();
            } else {
                stop(timer).interval();
            }
        }
        lodash.remove(timers, p => {
            return p.name === timer.name
        })
    },
    stopTimerByName(timerName, timeout) {
        const timer = _this.getTimer(timerName);
        if (timer != {}) {
            _this.stopTimer(timer);
        }
        return timer;
    },
    removeTimerByName(timerName, timeout) {
        const timer = _this.getTimer(timerName);
        if (timer != {}) {
            _this.removeTimer(timer);
        }
        return timer;
    },
    restartTimerByName(timerName, timeout) {
        const timer = _this.getTimer(timerName);
        if (timer != {}) {
            _this.restartTimer(timer);
        }
        return timer;
    },
}

module.exports = _this;