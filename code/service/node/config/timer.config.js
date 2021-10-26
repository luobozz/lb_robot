/**
 * type:"interval"||"timeout"
 * @author chenlingyu
 */

const api = require("../api")

const send = (context) => {
    api.dingtalk.robot.send(context).then(r => {
        console.log(r.data)
    })
}


module.exports = [{
    name: "提醒休息",
    handle: () => {
        send({
            "msgtype": "actionCard",
            "actionCard": {
                "title": "辛苦了，王老师，休息一下眼睛",
                // ![screenshot](https://hbimg.huabanimg.com/71f426241bd3c20c33e9d6e45d916bf77922291df0a2-l7QhZH_fw658/format/webp) \n\n
                "text": "### 💕💕💕王老师，你应该休息了哟~ \n\n 工作辛苦了👏45分钟又过去了 \n\n请休息2-5分钟再投入工作~🤞",
                "btnOrientation": "0",
                "btns": [
                    {
                        "title": "好的:)",
                        "actionURL":"https://huaban.com/search/?q=%E7%BB%BF%E6%A4%8D"
                    }
                ]
            }
        })
    },
    ImmediatelyStart: true,
    timeout: 45*60*1000,
    type: "interval",
}]