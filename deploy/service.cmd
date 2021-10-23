@REM 暂时请到项目根目录下执行命令
@REM 例如 .\deploy\service.cmd
move code/service/node/dist builder/service/node
cd builder/
rd /q service.tar
7z a -ttar service.tar service/*
move service.tar ../res/