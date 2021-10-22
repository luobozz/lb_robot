#! /bin/bash
# 本脚本用来做service的手动更新来源是github仓库
# 因为某原因依赖lgh命令代理 https://github.com/luobozz/my_shell/blob/main/mini_script/lgh

lgh wget https://raw.githubusercontent.com/luobozz/lb_robot/master/res/service.tar
tar -xvf service.tar