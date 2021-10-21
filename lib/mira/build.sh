#!/bin/bash
name='mirai'
# mclVersion 使用手动下载的版本规定
imagesVersion="1.2.2"
imagesName="$name"_images
imagesNameTag="$imagesName":"$imagesVersion"

initPath="./init_script"

echo "\n========LIB CREATE============="
rm -rf $initPath
mkdir $initPath

echo "
#!/bin/bash
miraPath='/usr/local/mira'
mclPath=\$miraPath/mcl

# 补充执行CMD
cd /
echo \$*
\`\$*\`
" > $initPath/init_do.sh
echo "√ /init_script/init_do.sh"

echo "
#!/bin/bash
sh /init_script/init_do.sh \$* > /init_script/init.log
# 不输出mcl日志到init.log
cd /usr/local/mirai/mcl && ./mcl
tail -f /dev/null
" > $initPath/init.sh
echo "√ /init_script/init.sh"


echo "====================================\n"

echo "\n========DOCKER RES EXISTS CHECKING============="
exitContainer=`sudo docker ps -aqf name=$name`
exitImages=`sudo docker images -q $imagesName`
if [ "$exitContainer" != "" ]; then
    echo "container [$name $exitContainer] is exists"
    sudo docker rm -f $name
    echo "remove container [$name $exitContainer] success\n"
else
    echo "container [$name] is clear"
fi
if [ "$exitImages" != "" ]; then
    echo "images [$imagesNameTag $exitImages] is exists"
    sudo docker rmi -f $imagesNameTag
    echo "remove images [$imagesNameTag $exitImages] success"
else
    echo "images [$imagesNameTag] is clear"
fi
echo "====================================\n"

echo "\n========DOCKER BUILD============="
sudo docker build -t $imagesNameTag ./
echo "\n"
sudo docker images
echo "====================================\n"

echo "\n========DOCKER RUN============="
sudo docker run -d\
                --name=$name \
                $imagesNameTag
echo "\n"
sudo docker ps -a
echo "====================================\n"

sudo docker exec -it $name /bin/bash
