---
title: 利用Hexo在github搭建静态博客
date: 2016-11-04 15:04:09
tags:
---
# Hexo简介
---
hexo是一个基于Node.js的静态博客程序，可以方便的生成静态网页托管在github和Heroku上。作者是来自台湾的@tommy351。

Hexo更加简单优雅, 而且风格多变, 适合程序员搭建个人博客,而且支持多平台的搭建


需要的软件：

	Node.js  
	npm        

<!--more-->
# 创建相应的github仓库

在自己的GitHub账号下创建一个新的仓库，命名为username.github.io（username是你的账号名)。
在这里，要知道，GitHub Pages有两种类型：User/Organization Pages 和 Project Pages，而我所使用的是User Pages。

简单来说，User Pages 与 Project Pages的区别是：

1. User Pages 是用来展示用户的，而 Project Pages 是用来展示项目的。

2. 用于存放 User Pages 的仓库必须使用username.github.io的命名规则，而 Project Pages 则没有特殊的要求。

3. User Pages 将使用仓库的 master 分支，而 Project Pages 将使用 gh-pages 分支。

4. User Pages 通过 http(s)://username.github.io 进行访问，而 Projects Pages通过 http(s)://username.github.io/projectname 进行访问。





# 安装命令
---

### Hexo安装与设置

	npm install hexo -g  #-g

安装完成后进到创建的本地博客目录，执行

	hexo init  #执行init命令初始化hexo到你指定的目录


完成后还要执行

	npm install

到这就已经安装完毕了，然后就是本地看一下效果了

	hexo generate       #自动根据当前目录下文件,生成静态网页
	hexo server         #运行本地服务,


浏览器输入<http://localhost:4000>就可以看到效果。

### 添加博文

	hexo new "postName"  #新建博文,其中postName是博文题目


博文会自动生成在博客目录下source/_posts\postName.md


### 主题更改

[Hexo](http://hexo.io/)提供了官网的主题, 初始化hexo时也会自动生成一个主题, Hexo还支持个性定制主题, 可以根据自己的喜好对主题进行修改, [更多主题](https://github.com/hexojs/hexo/wiki/Themes)可以在官网中找到


在博客的根目录下对喜爱的主题进行主题进行克隆
git clone https://github.com/SuperKieran/TKL.git themes/TKL

	在./_config.yml，修改主题为TKL
	theme: TKL

查看本地效果

	hexo g       #hexo generate简写
	hexo s       #hexo server简写

### 部署到Github
以上内容都是在本地进行查看, 现在将博客部署到github上

打开./_config.yml

博客名称和描述等相关信息是site里面

	# Site
	title: Life is need record.
	subtitle:
	description:
	author: qiuziz
	language: zh-CN
	timezone:

博客如果的主题设置是在Extensions里面，在clone了一个主题后，将theme名字改成要应用的主题名称

	# Extensions
	## Plugins: https://hexo.io/plugins/
	## Themes: https://hexo.io/themes/
	theme: landscape  #主题设置

设置生成博文的默认格式

	# Writing
	new_post_name: :title.md # File name of new posts
	default_layout: post
	titlecase: false # Transform title into titlecase
	external_link: true # Open external links in new tab
	filename_case: 0
	render_drafts: false
	post_asset_folder: false
	relative_link: false
	future: true
	highlight:
	  enable: true
	  line_number: true
	  auto_detect: false
	  tab_replace:


分页, 设置每页显示多少篇博文

	# Pagination
	## Set per_page to 0 to disable pagination
	per_page: 10
	pagination_dir: page

部署到github的设置

	# Deployment
	## Docs: https://hexo.io/docs/deployment.html
	deploy:
	  type: git #部署类型
	  repo: https://github.com/qiuziz/qiuziz.github.io.git #部署的仓库
	  branch: master #部署分支

如果要设置自己的域名，可以在这里修改

	# URL
	## If your site is put in a subdirectory, set url as 'http://yoursite.com/	child' and root as '/child/'
	url: http://yoursite.com
	root: /
	permalink: :year/:month/:day/:title/
	permalink_defaults:

在配置文件中设置号部署设置后,

hexo deploy  #进行部署

部署成功，可以使用Github用户名.github.io进行访问, 或者设置了个性域名直接访问自己的域名。


# 发表博客
---

博客部署到github上后，后期怎么推送博客呢

	hexo n 'postBlog' #hexo new 的缩写


执行命令后，会在项目\source_posts中生成postBlog.md文件，用编辑器打开编写即可.

然后

	hexo g #生成
	hexo d #部署 # 可与hexo g合并为 hexo d -g


