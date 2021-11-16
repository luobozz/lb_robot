/**
 * type:"interval"||"timeout"
 * @author chenlingyu
 */

const api = require("../api")
const Timer = require("../util/jobs.util/job");
const moment = require("moment")

const send = (context) => {
    api.dingtalk.robot.send(context).then(r => {
        // console.log(r.data)
    })
}
module.exports = [
    {
        name: "抢苗提醒",
        handle: () => {
            send({
                "msgtype": "actionCard",
                "actionCard": {
                    "title": "【抢苗】【知苗易约】成华区猛追湾建设路社区卫生服务中心",
                    "text": "### 【抢苗】【知苗易约】成华区猛追湾建设路社区卫生服务中心",
                    "btnOrientation": "0",
                    "btns": [
                        {
                            "title": "好的:)",
                            "actionURL": "https://huaban.com/search/?q=%E7%BB%BF%E6%A4%8D"
                        }
                    ]
                }
            })
        },
        type: Timer.Type.ONETIMES,
        handleStr: "2021-11-17 08:55:00",
    },
    {
        name: "抢苗提醒",
        handle: () => {
            send({
                "msgtype": "actionCard",
                "actionCard": {
                    "title": "【抢苗】【知苗易约】遂宁蓬溪疾病预防控制中心",
                    "text": "### 【抢苗】【知苗易约】遂宁蓬溪疾病预防控制中心",
                    "btnOrientation": "0",
                    "btns": [
                        {
                            "title": "好的:)",
                            "actionURL": "https://huaban.com/search/?q=%E7%BB%BF%E6%A4%8D"
                        }
                    ]
                }
            })
        },
        type: Timer.Type.ONETIMES,
        handleStr: "2021-11-20 08:55:00",
    },
    {
        name: "抢苗提醒",
        handle: () => {
            send({
                "msgtype": "actionCard",
                "actionCard": {
                    "title": "【抢苗】【妙苗】莲新社区卫生服务中心",
                    "text": "### 【抢苗】【妙苗】莲新社区卫生服务中心",
                    "btnOrientation": "0",
                    "btns": [
                        {
                            "title": "好的:)",
                            "actionURL": "https://huaban.com/search/?q=%E7%BB%BF%E6%A4%8D"
                        }
                    ]
                }
            })
        },
        type: Timer.Type.ONETIMES,
        handleStr: "2021-11-19 15:25:00",
    },
    // {
    //     name: "测试",
    //     handle: () => {
    //         console.log(123)
    //     },
    //     type: Timer.Type.EVERDAY,
    //     handleStr: "0 0/1 * * * *",
    // },
    {
        name: "每日打卡",
        handle: () => {
            send({
                "msgtype": "actionCard",
                "actionCard": {
                    "title": "💕💕💕每日打卡",
                    "text": "### 💕💕💕每日打卡 \n 1. 点赞 \n\n2. 情侣空间签到 \n\n 3. 今日疫苗",
                    "btnOrientation": "0",
                    "btns": [
                        {
                            "title": "好的:)",
                            "actionURL": "https://huaban.com/search/?q=%E7%BB%BF%E6%A4%8D"
                        }
                    ]
                }
            })
        },
        type: Timer.Type.EVERDAY,
        handleStr: "0 30 8 * * *",
    },
    {
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
                            "actionURL": "https://huaban.com/search/?q=%E7%BB%BF%E6%A4%8D"
                        }
                    ]
                }
            })
        },
        type: Timer.Type.WORKDAY,
        handleStr: "0 0 10,11,15,16,17,18 * * *",
    }
]