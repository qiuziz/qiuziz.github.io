> 由于这几年服务器一直在换，导致每次到了服务器到期的时候就很痛苦，要重新搭建服务器环境部署自己的博客，作为前端er一直没想到docker，知道上次问了大佬才知道docker完全可以做到搭建了一次后，多处部署，这里记录下搭建过程吧。
> 虽然网上有很多教程，但是自己搭建的时候还是遇到很多坑，还是有必要记录下。


#### Docker文件目录

![docker-tree](https://github.com/qiuziz/qiuziz.github.io/raw/develop/posts/images/docker-tree.png)



#### 安装Docker
网上教程很多的，这里贴下我安装时看的文章
[Centos7 安装docker以及docker-compose](https://www.jianshu.com/p/94760f35c98c)
[centos7安装docker](https://www.jianshu.com/p/3b7d47a8b891)

这里安装`docker-compose`直接用yum就可以了
```bash
    yum -y install docker-compose
```
安装完后需要更换下国内镜像,我用的是[daocloud](https://www.daocloud.io/mirror)这里不要用这里的Linux脚本
![docker-image](https://github.com/qiuziz/qiuziz.github.io/raw/develop/posts/images/docker-image.png)，它的脚本会多加一个逗号，直接获取到地址，自己去添加就好了
```bash
vi  /etc/docker/daemon.json
```

```bash
{
        "registry-mirrors": ["http://f1361db2.m.daocloud.io"]
}
```

#### Docker-compose启动文件

`docker-compose.yml`

```yml
version: '2'

services:
  nginx:
    tty: true
    image: nginx:stable-alpine
    restart: always
    volumes:
      - ./${NGINX_DIR}/conf/nginx.conf:/etc/nginx/nginx.conf:ro
      - ./${NGINX_DIR}/conf/conf.d:/etc/nginx/conf.d
      - ./${NGINX_DIR}/www:/usr/share/nginx/html
      - ./${NGINX_DIR}/log:/var/log/nginx
      - ./${NGINX_DIR}/.acme.sh:/etc/nginx/.acme.sh
    ports:
      - "80:80"
      - "443:443"
    depends_on:
      - ghost
    links:
      - ghost
  mysql-db:
    container_name: mysql-docker        # 指定容器的名称
    image: mysql:5.6                   # 指定镜像和版本
    ports:
      - "3306:3306"
    environment:
      MYSQL_ROOT_PASSWORD: ${MYSQL_ROOT_PASSWORD}
      MYSQL_ROOT_HOST: ${MYSQL_ROOT_HOST}
      MYSQL_USER: 'ghost'
      MYSQL_PASS: 'ghost_password'
    volumes:
      - "${MYSQL_DIR}/data:/var/lib/mysql"           # 挂载数据目录
      - "${MYSQL_DIR}/conf:/etc/mysql/conf.d"      # 挂载配置文件目录
  ghost:
    image: ghost
    restart: always
    depends_on:
      - mysql-db
    links:
      - mysql-db
    ports:
      - 2368:2368
    volumes:
      - ./${GHOST_DIR}/content:/var/lib/ghost/content
      - ./${GHOST_DIR}/config.production.json:/var/lib/ghost/config.production.json
    environment:
      - NODE_ENV=production

```

这里变量通过`.env`定义的，在`docker-compose.yml`同级目录下执行
```sh
vim .env
```

```.env
MYSQL_ROOT_PASSWORD=root
MYSQL_ROOT_HOST=%
MYSQL_DIR=./mysql
NGINX_DIR=./nginx
GHOST_DIR=./ghost
```

**注意：**
**这里mysql端口为默认的，如果正式部署的话最好换成别的端口，不要用默认的，且root密码最好不要太简单以及关闭root远程连接权限，我这次还没部署完成，数据库就被黑了，幸好数据都有备份的**

![mysql-be-attacked](https://github.com/qiuziz/qiuziz.github.io/raw/develop/posts/images/mysql-be-attacked.png)



#### Ghost配置
这里将`ghost`的`content`和`config.production.json`使用数据卷的方式，这样后面迁移的时候只要将文件拷贝过去，主题和配置都是在的
配置文件如下：
```js
{
    "url": "http://service_name",
    "server": {
        "port": 2368,
        "host": "0.0.0.0"
    },
    "database": {
        "client": "mysql",
        "connection": {
            "host": "mysql-db",
            "user": "ghost",
            "password": "ghost_password",
            "database": "ghost",
            "port": 3306,
            "charset": "utf8"
        }
    },
    "mail": {
        "transport": "Direct"
    },
    "logging": {
        "transports": [
            "file",
            "stdout"
        ]
    },
    "process": "systemd",
    "paths": {
        "contentPath": "/var/lib/ghost/content"
    }
}
```

#### nginx配置
监听80端口，转发到2368端口
```conf
location / {
    proxy_pass http://ghost:2368;
}
```

这里因为nginx是一个容器，代理到ghost容器，这里是ghost，而不是localhost

#### 部署
```sh
docker-compose up -d
```

#### END
其实自己搭建的过程中遇到了很多问题，但是在记录时已经忘记了，望天~

