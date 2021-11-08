#!/bin/bash
# 按照scp命令填写服务器部署位置
app_name="lb_robot"
scp_key="-i /home/luobo/.ssh/pem/baiduyun"
scp_od="luobo@106.12.149.234:/home/luobo/project/robot"
op_path=`pwd`

rm -rf $op_path/.lbop
rm -rf $op_path/.lb_releases

mkdir -p $op_path/.lbop/lb_adm/dist
mkdir -p $op_path/.lb_releases

# 打包 lb_adm
cd $op_path/code/service/lb_adm
# npm run build
cd $op_path
cp -r $op_path/code/service/lb_adm/dist/* $op_path/.lbop/lb_adm/dist/
cp -r $op_path/builder/lb_adm/* $op_path/.lbop/lb_adm

# 压缩
cd $op_path/.lbop/
tar -cf $app_name.tar *

cp $op_path/.lbop/$app_name.tar $op_path/.lb_releases/

# scp行
scp $scp_key $op_path/.lb_releases/$app_name.tar $scp_od