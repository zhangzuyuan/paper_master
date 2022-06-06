# 论文管理器

## 目录

项目介绍

环境依赖

使用说明

目录结构描述

项目结构设计

功能实现方法

数据库结构

版本更新

## 项目介绍

本文实现了一个论文管理器，在现有的论文管理app中，大多数app并不是做学术的人写的，很多功能并没有考虑全面。因此想做一个能适合于做学术人的论文管理器。（做学术希望能实现自动survey，和相关领域的科研工作者的推荐等功能）

并且该项目也是我们数据库课程的大作业，应付完大作业之后就几乎不会更新了，因此以后不太会更新太多。

## 环境依赖

本项目分为前后端

前端：react+antd+echarts

后端：python flask, sqlalchemy, 

数据库：mysql

## 目录结构描述

### 总体

```
├── README.md 

├── back_end //后端文件

└── front_end //前端文件
```

### 后端

```
├── __pycache__
│   └── app.cpython-39.pyc
├── app.py  																																		// 程序入口
├── file																																				//本地文件存储
│   ├── paper																																		//论文pdf
│   │   └── 2011-Competitive_and_Fair_Medium_Access_despite_Reactive_Jamming.pdf
│   └── picture																																	//头像
│       ├── user7.jpeg
│       └── zzy.jpg
├── main																																				//所有python
│   ├── __init__.py
│   ├── __pycache__
│   │   └── __init__.cpython-39.pyc
│   ├── config																																	//配置文件
│   │   ├── ConfigEncryption.py
│   │   ├── ConfigMysql.py
│   │   ├── ConfigRedis.py
│   │   ├── ConfigServer.py																											//服务器配置
│   │   └──  __init__.py
│   ├── db																																			//连接数据库
│   │   └── session.py
│   ├── encryption                                                              //加密模块
│   │   └── Md5Utils.py
│   ├── paper                                                                   //主体
│   │   ├── __init__.py
│   │   ├── api                                                                 //接口层
│   │   │   ├── ArticleAnalyseApi																								//分析文章接口
│   │   │   │   ├── Views.py
│   │   │   │   ├── __init__.py
│   │   │   │   └── __pycache__
│   │   │   ├── ArticleBaseApi 																									//文件基本信息
│   │   │   │   ├── Views.py
│   │   │   │   ├── __init__.py
│   │   │   │   └── __pycache__
│   │   │   ├── ManagerApi																											//管理员
│   │   │   │   ├── Views.py
│   │   │   │   └── __init__.py
│   │   │   ├── UserApi																													//用户接口
│   │   │   │   ├── Views.py
│   │   │   │   ├── __init__.py
│   │   │   │   └── __pycache__
│   │   │   ├── __init__.py
│   │   │   └── __pycache__
│   │   ├── dao
│   │   │   ├── Column.py
│   │   │   ├── Table.py
│   │   │   └── __pycache__
│   │   │       └── Table.cpython-39.pyc
│   │   ├── model																																//模块层
│   │   │   ├── ArticleAnalyse.py
│   │   │   ├── ArticleBase.py
│   │   │   ├── Conference.py
│   │   │   ├── Journal.py
│   │   │   ├── User.py
│   │   │   ├── UserToArticleBase.py
│   │   │   └── __pycache__
│   │   └── service																															//服务层
│   │       ├── ArticleAnalyseService.py
│   │       ├── ArticleBaseService.py
│   │       ├── ManagerService.py
│   │       ├── Service.py
│   │       ├── TypeService.py
│   │       ├── UserService.py
│   │       ├── __pycache__
│   │       └── statistical
│   │           ├── StatisticalSurveyPaper.py
│   │           └── __pycache__
│   ├── redis
│   │   ├── __init__.py
│   │   └── redisDb.py
│   └── sql
│       ├── MysqlDb.py
│       ├── SqlUtil.py
│       └── __pycache__
│           └── MysqlDb.cpython-39.pyc
├── static
└── templates
    └── index.html

```

### 前端

```
├── package-lock.json
├── package.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
├── src																																			// 主程序
│   ├── App.css
│   ├── App.js																															// 程序入口
│   ├── App.test.js
│   ├── Utils																																//配置文件
│   │   ├── ApiUtil.js		
│   │   └── HttpUtil.js
│   ├── actions
│   │   └── authActions.js
│   ├── index.css
│   ├── index.js
│   ├── logo.svg
│   ├── main                                                                //页面
│   │   ├── HomePage																												//主页面
│   │   │   ├── HomePage.js																									
│   │   │   ├── PaperAnalyse																								//论文分析页面
│   │   │   │   └── PaperSurvey																							//论文分析
│   │   │   │       ├── PaperSurvey.js
│   │   │   │       ├── PaperSurveyAnalyse
│   │   │   │       │   ├── Graph																						//可视化
│   │   │   │       │   │   └── Graph.js
│   │   │   │       │   └── PaperSurveyAnalyse.js
│   │   │   │       └── UploadPaperInformation
│   │   │   │           └── UploadPaperInformation.js
│   │   │   ├── PaperBaseInformation																				//论文基本信息页面
│   │   │   │   ├── TableAll
│   │   │   │   │   └── TableAll.js																					//表格
│   │   │   │   ├── TableType
│   │   │   │   │   └── TableType.js
│   │   │   │   └── UploadPaper																							//上传
│   │   │   │       └── UploadPaper.js
│   │   │   ├── TypeInformation
│   │   │   │   ├── ConferenceTable
│   │   │   │   │   ├── ConferenceTable.js
│   │   │   │   │   └── UploadConference
│   │   │   │   │       └── UploadConference.js
│   │   │   │   └── JournalTable
│   │   │   │       └── JournalTable.js
│   │   │   └── UserInformation																							//用户信息
│   │   │       └── UserBaseInformation
│   │   │           ├── UpdateUserBaseInformation.js
│   │   │           └── UserBaseInformation.js
│   │   ├── SignIn																													//登陆界面
│   │   │   ├── SignIn.css
│   │   │   └── SignIn.js
│   │   └── SignUp																													//注册界面
│   │       ├── SignUp.css
│   │       └── SignUp.js
│   ├── reducers
│   ├── reportWebVitals.js
│   └── setupTests.js
└── yarn.lock

```



## 项目结构设计

本项目分为前后端设计

前端主要由react实现，后端从逻辑上分为四层如下图

![image](https://github.com/zhangzuyuan/paper_master/blob/master/picture/1.pdf)

后端不同层的功能如下

### API

作用：统一规定了与前端通信的接口，规定了数据传输的类型，只负责数据的传输。

### Service

作用：提供了数据的逻辑处理，包括规定了数据传输回去的内容与格式。并且一些复杂的算法和对数据的分析在该层。总体来说这一层是提供了数据复杂分析的工作。

### model 和 session

#### model

作用：该层将数据库中的表抽象为具体的对象。每一张表对应着一个对象

为什么要如此设计？有sql语句不就行了吗？

原因：如果只用sql语句的话，每增添一个功能需要书写专门的sql语句，这对于代码的复用和修改来说不太友好。并且想要用数据库的话还需要多学习一门语言，这对于工程师来说不是那么友好

#### session

作用：通过python对类的操作，生成sql语句。并且连接数据库对数据库进行操作。

#### 实现model 和 session

想法：sql也是有语法的，我们可以根据上学期学习的编译原理利用词法和语法分析来生成相应的sql语句。

实现：

1. 每个model代表一张表。
2. session则表示表与表之间的关系，规定一系列的接口来表示他们之间的关系。
3. 生成sql语句时候，我们只需要将表作为参数传递进去，然后再添加相应关系的方法就可以了。

### Data Base

这是数据库了，也就是我们存放数据的地方

## 功能实现方法

### 保存登陆状态跳转

想使用cookie来着，但是工作量太大了，做不完了。

### 保存头像和论文等文件

利用数据库存储文件路径，使用服务器本地的文件系统进行管理。

这样对于文件的处理更加方便。

### 论文数据的分析

将数据格式分析成为想要的数据，进行传输。

## 数据库结构

随便画画，随便看看，一共有六张表

![image](https://github.com/zhangzuyuan/paper_master/blob/master/picture/2.pdf)

## 版本更新

### 1.完善功能

1. 安全性
2. 信息完整性

### 2.爬虫

将可以爬虫的论文爬虫下来

### 3.推荐和你相同领域的人

想法（没调研过推荐系统，自己瞎想的）：

通过给定节点之间权值的大小判定方法。然后进行连边

1.将每一个用户打分给出一张表分别有

其中存的是，例如某个领域读了几篇文章。其中每个领域映射到一个数字上，映射符合领域越接近则数字越接近的原则。而读的文章数目可以作为权值。

2.你和你周围的人进行运算得到关系的强弱

![image](https://github.com/zhangzuyuan/paper_master/blob/master/picture/function.svg)

3.然后通过数据库选出前k小的边权和节点连边，然后接着从连接的k个节点里面再选k个连边。往外扩充d层

![image](https://github.com/zhangzuyuan/paper_master/blob/master/picture/3.pdf)

4.将该拓扑图数据传到前端进行可视化

使用力导向图布局方式进行可视化



