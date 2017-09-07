#项目说明
本项目海约互联GotoSea项目，包括以下多个系统:
- Gotosea App
- Gotosea 微信公众号
- Gotosea 后台管理
- Gotosea 门户网站 

##项目目录结构
- Gotosea
  - common 公共类库
  - filters 公共配置目录
  - gotosea-app App后台服务
  - gotosea-community 社区
  - gotosea-console 管理后台
  - gotosea-core 公共核心业务
  - gotosea-session 公共会话
  - gotosea-task 后台任务
  - gotosea-web 门户网站
  - gotosea-weixin 微信公众号后台服务
  - gotosea-weixin-front 微信公众号前端
  - pom.xml Maven项目构建文件

#项目技术架构
##后端
- **主框架**
  [Spring Boot](https://docs.spring.io/spring-boot/docs/current-SNAPSHOT/reference/htmlsingle/)
  
- **展现层**
 [thymeleaf](http://www.thymeleaf.org/)  
  
- **持久层**
  [Mybatis](http://www.mybatis.org)
  [Mybatis-Spring-boot](http://www.mybatis.org/spring-boot-starter/mybatis-spring-boot-autoconfigure/)
  
- **消息队列**
  [rabbitMQ](http://www.rabbitmq.com/)
  [rabbitMQ-文档 ](http://www.rabbitmq.com/dlx.html)
  [rabbitMQ-Spring-Boot](https://docs.spring.io/spring-boot/docs/current-SNAPSHOT/reference/htmlsingle/#boot-features-amqp)
  [Spring-Rabbit](http://docs.spring.io/spring-amqp/reference/html/)
  [部署说明]http://www.cnblogs.com/dwf07223/p/3991591.html
  [基础概念]http://blog.csdn.net/u011466674/article/details/51971180
  
- **缓存**
  [redis-Spring-Boot](https://docs.spring.io/spring-boot/docs/current-SNAPSHOT/reference/htmlsingle/#boot-features-caching-provider-redis)  
  
- **分布式事务**
  [atomikos]https://docs.spring.io/spring-boot/docs/current-SNAPSHOT/reference/htmlsingle/#boot-features-jta-atomikos
  
- **数据库**
  MySql 5+
  
- **构建器**
  Maven
  [MVN Repo](https://mvnrepository.com)
  

#项目构建
##后端
- **外部jar**
  ```mvn install```
  *引用Common包的依赖，先使用maven命令install到本地仓库，再进行依赖使用*
  待定

- **安装**
  ```mvn eclipse:eclipse```
  
  **开发环境配置**
  
  **生产环境配置**
    filters中的application-*.properties中存放了一些公共的环境配置，各module中如需要使用这些配置，可以使用```spring.datasource=@spring.datasource@```进行引用，
            其中spring.datasource必须先在filters的配置文件中定义。
   *注意：此功能暂时只支持对 main/resources/application.properties进行匹配，对 test/resources/application.properties文件还需要手工添加配置*
    
- **发布**
  ```mvn package```
  *如果想去掉单元测试，在后面加上-Dmaven.test.skip=true*
  
##前端
- **安装**
1. 使用shell脚本，进入nodejs项目目录
2. 输入命令
```npm install cnpm -g --registry=https://registry.npm.taobao.org```， 
```cnpm install```

- **本地测试**
```npm run dev```

- **发布**
```npm run build```

#相关管理系统
- [RabbitMQ-测试环境]http://192.168.0.189:15672/#/
- [RabbitMQ-生产环境]http://112.74.189.43:15672/#/ admin/haiyue@rabbitmq


#注意事项
- 不要上传.project .classpath target等IDE和编译生成的文件
- 如果要测试某一个类,dao,service，请在test目录内建相关的单元测试类，不要在主类代码中加入测试代码
