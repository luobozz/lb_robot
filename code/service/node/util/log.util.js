module.exports = (name)=>{
    name = name ? name : "system"
    const exports={}

    for(let e in console){
        exports[e]=(...args)=>{
            console[e](`[${name}]`, ...args)
        }
    }

    exports.n=()=>{
        console.log("")
    }
    return exports
}