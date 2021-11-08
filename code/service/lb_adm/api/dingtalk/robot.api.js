const crypto = require('crypto-js');
const axios = require("../../util/axios.util")
const config = require("../../config/dingtalk.config")

module.exports = {
    getSign() {
        const time = new Date().getTime(), secret = config.robot.secret
        const string_to_sign = `${time}\n${secret}`
        const hmac = crypto.HmacSHA256(crypto.enc.Utf8.parse(string_to_sign), crypto.enc.Utf8.parse(secret))
        const base64 = crypto.enc.Base64.stringify(hmac)
        // console.log(time,base64)
        return {
            timestamp: time,
            sign: base64
        }
    },
    // 消息类型查阅
    // https://developers.dingtalk.com/document/robots/custom-robot-access
    send(context) {
        const sign = this.getSign()
        return axios.post(`https://oapi.dingtalk.com/robot/send?access_token=${config.robot.access_token}&timestamp=${sign.timestamp}&sign=${sign.sign}`, {
            data: context,
            headers: {
                "Content-Type": "application/json"
            }
        })
    }
}