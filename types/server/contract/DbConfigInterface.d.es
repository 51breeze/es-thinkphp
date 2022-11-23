package server.contract;

declare interface DbConfigInterface{
      // 数据库类型
      type:'mysql' | 'mongo' | 'oracle' | 'pgsql' | 'sqlite' | 'sqlsrv'
      // 服务器地址
      hostname:string
      // 数据库名
      database:string
      // 用户名
      username:string
      // 密码
      password:string
      // 端口
      hostport?:uint
      // 数据库连接参数
      params?:string[]
      // 数据库编码默认采用utf8
      charset?:string
      // 数据库表前缀
      prefix?:string
      // 数据库部署方式:0 集中式(单一服务器),1 分布式(主从服务器)
      deploy?:int
      // 数据库读写是否分离 主从式有效
      rw_separate?:boolean
      // 读写分离后 主服务器数量
      master_num?:int
      // 指定从服务器序号
      slave_no?:string
      // 是否严格检查字段是否存在
      fields_strict?:boolean
      // 是否需要断线重连
      break_reconnect?:boolean
      // 监听SQL
      trigger_sql?:boolean
      // 开启字段缓存
      fields_cache?:boolean
}