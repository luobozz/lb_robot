module.exports = (name)=>{
    name = name ? name : "system"
    const exports={}

    for(let e in console){
        exports[e]=(...args)=>{
            console[e](`[${name}]`, ...args)
        }
    }
    return exports
}