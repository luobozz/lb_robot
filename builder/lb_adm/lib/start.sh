name='lb_adm'
app_home=/$name/dist
log_home=$app_home/log
mkdir -p $log_home
cd $app_home
nohup node main.js >> $log_home/run.log &
tail -f $log_home/run.log
# tail -f /dev/null