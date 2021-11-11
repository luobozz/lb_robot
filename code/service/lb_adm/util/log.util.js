module.exports = (name) => {
    name = name ? name : "system"
    const exports = {}

    for (let e in console) {
        exports[e] = (...args) => {

            if (e == "error") {
                console.error('\x1B[31m%s\x1B[0m', `[${name}]`, ...args)
            } else if (e == "warn") {
                console.error('\x1B[33m%s\x1B[0m', `[${name}]`, ...args)
            } else {
                console[e](`[${name}]`, ...args)
            }
        }
    }

    exports.n = (n) => {
        n=n?n:1
        for(let i=0;i<n;i++){
            console.log("")
        }
    }

    exports.pass = (...args) => {
        console.info('\x1B[32m%s\x1B[0m', `[${name}]`, ...args)
    }
    return exports
}