cd builder/
rd /q service.tar
7z a -ttar service.tar service/*
move service.tar ../res/