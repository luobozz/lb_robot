-e 
#!/bin/bash
miraPath='/usr/local/mira'
mclPath=$miraPath/mcl

# 补充执行CMD
cd /
echo -e $*
`$*`

