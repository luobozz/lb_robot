name='lb_adm'
log_home=/var/log/$name
mkdir /var/log/$name
cd /lb_adm/dist
nohup node main.js >> $log_home/run.log &
tail -f $log_home/run.log
tail -f /dev/null