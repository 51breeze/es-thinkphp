package server.response;
import server.kernel.Response;


/**
* File Response
*/
declare class File<T=string> extends Response<T>{

      constructor(data?:string, code?:number);

      /**
      * 设置是否为内容 必须配合mimeType方法使用
      * @access public
      * @param  bool $content
      * @return $this
      */
      isContent(content?:boolean):this;

      /**
      * 设置有效期
      * @access public
      * @param  integer $expire 有效期
      * @return $this
      */
      expire(expire:number):this;

      /**
      * 设置文件类型
      * @access public
      * @param  string $filename 文件名
      * @return $this
      */
      mimeType(mimeType:string):this;

      /**
      * 设置文件强制下载
      * @access public
      * @param  bool $force 强制浏览器下载
      * @return $this
      */
      force(force:boolean):this;

      /**
      * 获取文件类型信息
      * @access public
      * @param  string $filename 文件名
      * @return string
      */
      protected getMimeType(filename:string): string

      /**
      * 设置下载文件的显示名称
      * @access public
      * @param  string $filename 文件名
      * @param  bool   $extension 后缀自动识别
      * @return $this
      */
      name(filename:string, extension?:boolean):this;
}