
const Status={
    STOP:"stop",
    START:"start"
}

const StartType={
    NORMAL:"normal",
    IMMEDIATELY:"immediately"
}

class Timer {
    constructor(config) {
        this.name = config.name;
        this.type = config.type;
        this.handle = config.handle;
        this.times = config.times;
        this.status = Status.STOP;
        this.nextTime = -1;
        this.ImmediatelyStart = config.ImmediatelyStart || false
    }
}

module.exports = Timer