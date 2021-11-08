module.exports = (name) => {
    name = name ? name : "system"
    const exports = {}

    for (let e in console) {
        exports[e] = (...args) => {
     
            if (e == "error") {
                console.error('\x1B[31m%s\x1B[0m',`[${name}]`, ...args)
            } else if (e=="warn") {
                console.error('\x1B[33m%s\x1B[0m',`[${name}]`, ...args)
            } else {
                console[e](`[${name}]`, ...args)
            }
        }
    }

    exports.n = () => {
        console.log("")
    }
    return exports
}