#!/bin/bash
name='lb_adm'
imagesName='node:14.16.0'

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
if [ "$exitImages" == "" ]; then
    echo -e "images [$imagesNameTag $exitImages] is not exists"
    sudo docker pull $imagesName
else
    echo -e "images [$imagesName] is exists"
fi
echo -e "====================================\\n"

echo -e "\\n========DOCKER RUN============="
sudo docker run -d \
                -v /home/luobo/project/robot/lb_adm/lib:/lb_adm/lib \
                -v /home/luobo/project/robot/lb_adm/dist:/lb_adm/dist \
                -e TZ=Asia/Shanghai \
                --name=$name \
                $imagesName \
                sh /lb_adm/lib/start.sh
echo -e "\\n"
sudo docker ps -a
echo -e "====================================\\n"


# sudo docker exec -it $name /bin/bash
