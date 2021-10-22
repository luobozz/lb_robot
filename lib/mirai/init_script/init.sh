-e 
#!/bin/bash
sh /init_script/init_do.sh $* > /init_script/init.log
# 不输出mcl日志到init.log
# cd /usr/local/mirai/mcl && sh ./mcl
tail -f /dev/null

