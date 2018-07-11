# A Guide on *HOW* to use this repo

## !! Important !!
   This section outlines all the necessary information in order to get the wechat mini game runnign smoothly.

* __Tools Needed__:
    * Filezilla
    * PuTTY (Xshell 5)
    * npm
    * 微信web开发工具
    * Cocos Creator
    * Visual Studio Code

* __Remote Server__
    * IP Address: http://129.28.130.88 (poe.myphp.me)
    * Port Num: 22
    * Username: root
    * Password: IIGG1234
    * Proxy (if needed)
        * Type: HTTP 1.1
        * Host: dev-proxy.oa.com
        * Port Num: 8080
        * Username: root
        * Password: IIGG1234

* __Database__
    * IP Address: http://localhost (Count as localhost when starting from remote server)
    * Port Num: 27017
    
   The database used is MongoDB. 

   In order to start client, type in terminal:
   
   `service mongod start`
   
   `ps -ef|grep mongo`

* __Server JS__

   The server.js acts as the remote server for the mini game.
   
   Remember to init npm and download necessary packages:
   
   `cd server`    
   
   `npm init` Use 'tnpm' if in office
   
   `npm install` Either first edit 'package.json' before install or just install each package

   Remember to save server.js to the remote server everytime the file is edited. Command:
   
   `sftp root@ip:port`
   
   `cd server`
   
   `put C://fileLocation`

* __WeChat IDE__
    * AppID: wxb5938a6e8e1cdfcf
    * Remote Res: https://tgideas.xyz
    * Res destination(for ref): ./data/web/minigame/
    
   Remember to always udpate the "project.dev" after every build from Cocos.
   
   Remember to check "no HTTPS verification".
   
   Remember to delete "res" folder after building because remote server is used to store "res".

* __Cocos Creator__

   Build a "build-templates" file to make a copy so that the build wipe won't be impactful.

   Copy non cocos code to origin file. (Doesn't build those codes though).

   Remember to check debug mode, configure remote server, and don't check MD5 cache (when developing).

## File structures
* __cocos__

   This is for native files in Cocos Creator.

* __resources__

   This is for all files in "res".

* __server__

   This is the server file to be started in remote server.

* __wechat-build__

   This is for "game.js", "project-dev", "socket-io" files in wechat -> "build".
