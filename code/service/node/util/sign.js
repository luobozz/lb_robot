const crypto=require('crypto');
module.exports={
    getSign(){
        const time=new Date().getTime(),secret = 'SEC50ef1f810c031655126d228cd1b332af6914472513ad509041efc8b31529d44b'
        const secret_enc = secret.encode('utf-8')
        const string_to_sign=`${time}\n${secret_enc}`.encode('utf-8')
        userpass=crypto.createHash('SHA256').update(userpass).digest('hex');
    }
}