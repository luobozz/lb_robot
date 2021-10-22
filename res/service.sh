#! /bin/bash
# 本脚本用来做service的手动更新来源是github仓库
# 因为某原因依赖lgh命令代理 https://github.com/luobozz/my_shell/blob/main/mini_script/lgh

current=`date "+%Y-%m-%d %H:%M:%S"`  
timeStamp=`date -d "$current" +%s`   
currentTimeStamp=$((timeStamp*1000+`date "+%N"`/1000000)) 

lgh wget https://raw.githubusercontent.com/luobozz/lb_robot/master/res/service.tar?v=$currentTimeStamp
tar -xvf service.tar