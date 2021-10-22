#!/bin/bash
name='mirai'
# mclVersion 使用手动下载的版本规定
imagesVersion="1.2.2"
imagesName="$name"_images
imagesNameTag="$imagesName":"$imagesVersion"

initPath="./init_script"

echo -e "\n========LIB CREATE============="
rm -rf $initPath
mkdir $initPath

echo -e "
#!/bin/bash
miraPath='/usr/local/mira'
mclPath=\$miraPath/mcl

# 补充执行CMD
cd /
echo -e \$*
\`\$*\`
" > $initPath/init_do.sh
echo -e "√ /init_script/init_do.sh"

echo -e "
#!/bin/bash
sh /init_script/init_do.sh \$* > /init_script/init.log
# 不输出mcl日志到init.log
# cd /usr/local/mirai/mcl && sh ./mcl
tail -f /dev/null
" > $initPath/init.sh
echo -e "√ /init_script/init.sh"


echo -e "====================================\\n"

echo -e "\\n========DOCKER RES EXISTS CHECKING============="
exitContainer=`sudo docker ps -aqf name=$name`
exitImages=`sudo docker images -q $imagesName`
if [ "$exitContainer" != "" ]; then
    echo -e "container [$name $exitContainer] is exists"
    sudo docker rm -f $name
    echo -e "remove container [$name $exitContainer] success\\n"
else
    echo -e "container [$name] is clear"
fi
if [ "$exitImages" != "" ]; then
    echo -e "images [$imagesNameTag $exitImages] is exists"
    sudo docker rmi -f $imagesNameTag
    echo -e "remove images [$imagesNameTag $exitImages] success"
else
    echo -e "images [$imagesNameTag] is clear"
fi
echo -e "====================================\\n"

echo -e "\\n========DOCKER BUILD============="
sudo docker build -t $imagesNameTag ./
echo -e "\\n"
sudo docker images
echo -e "====================================\\n"

echo -e "\\n========DOCKER RUN============="
sudo docker run -d\
                -p 8080:8080 \
                --name=$name \
                $imagesNameTag
echo -e "\\n"
sudo docker ps -a
echo -e "====================================\\n"

sudo docker exec -it $name /bin/bash
