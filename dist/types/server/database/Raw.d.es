package server.database;
   
declare class Raw{
      constructor(value:string, bind?:[]);
      /**
      * 获取表达式
      *
      * @return string
      */
      getValue(): string

      /**
      * 获取参数绑定
      *
      * @return string
      */
      getBind(): array;
}