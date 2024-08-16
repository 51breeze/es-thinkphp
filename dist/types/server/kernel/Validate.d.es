package server.kernel;

declare type ValidateOperatorType = '>' | 'gt' | '>=' | 'egt' | '<' | 'lt' | '<=' | 'elt' | '=' | 'eq' | 'same' | 'eq';

import server.kernel.Request;
import server.kernel.Db;

/**
 * 数据验证类
 * @package think
 */
declare class Validate
{
  /**
     * 当前验证规则
     * @var array
     */
    @Alias(rule)
    protected rules:Record = {};

    /**
     * 验证提示信息
     * @var array
     */
    @Alias(message) 
    protected messages:Record = {};

    /**
     * 验证字段描述
     * @var array
     */
    @Alias(field)  
    protected fields:Record = {};

    /**
     * 验证场景定义
     * @var array
     */
    @Alias(scene)  
    protected scenes:Record = {};

    /**
     * 验证失败错误信息
     * @var string|array
     */
    @Alias(error)   
    protected errors:Record = {};

    /**
     * 是否批量验证
     * @var bool
     */
    @Alias(batch)    
    protected batchFlag = false;

    /**
     * 验证失败是否抛出异常
     * @var bool
     */
    @Alias(failException) 
    protected failThrowException = false;

    /**
     * 场景需要验证的规则
     * @var array
     */
    @Alias(only)  
    protected onlyScenes:Record<Record<any>> = {};

    /**
     * 场景需要移除的验证规则
     * @var array
     */
     @Alias(remove) 
    protected removeScenes:Record<Record<any>> = {};

    /**
     * 当前验证场景
     * @var string
     */
    protected currentScene:string;

    /**
     * 设置服务注入
     * @access public
     * @param Closure $maker
     * @return void
     */
    static maker(maker:(...args)=>void):void

    /**
     * 设置Lang对象
     * @access public
     * @param Lang $lang Lang对象
     * @return void
     */
    setLang(lang:Lang):void

    /**
     * 设置Db对象
     * @access public
     * @param Db $db Db对象
     * @return void
     */
    setDb(db:Db):void

    /**
     * 设置Request对象
     * @access public
     * @param Request $request Request对象
     * @return void
     */
    setRequest(request:Request):void

    /**
     * 添加字段验证规则
     * @access protected
     * @param string|array $name 字段名称或者规则数组
     * @param mixed        $rule 验证规则或者字段描述信息
     * @return $this
     */
    rule(name:string | ArrayMapping<any>, rule?:string):this

    /**
     * 注册验证（类型）规则
     * @access public
     * @param string   $type     验证规则类型
     * @param callable $callback callback方法(或闭包)
     * @param string   $message  验证失败提示信息
     * @return $this
     */
    extend(type:string, callback:(...args)=>boolean, message?:string):this;

    /**
     * 设置验证规则的默认提示信息
     * @access public
     * @param string|array $type 验证规则类型名称或者数组
     * @param string       $msg  验证提示信息
     * @return void
     */
    setTypeMsg(type:string|ArrayMapping<any>, msg?:string): void

    /**
     * 设置提示信息
     * @access public
     * @param array $message 错误信息
     * @return Validate
     */
    message(message:ArrayMapping<string>):this;

    /**
     * 设置验证场景
     * @access public
     * @param string $name 场景名
     * @return $this
     */
    scene(name:string):this;

    /**
     * 判断是否存在某个验证场景
     * @access public
     * @param string $name 场景名
     * @return bool
     */
    hasScene(name:string): boolean

    /**
     * 设置批量验证
     * @access public
     * @param bool $batch 是否批量验证
     * @return $this
     */
    batch(batch:boolean):this;

    /**
     * 设置验证失败后是否抛出异常
     * @access protected
     * @param bool $fail 是否抛出异常
     * @return $this
     */
    failException(fail:boolean):this;

    /**
     * 指定需要验证的字段列表
     * @access public
     * @param array $fields 字段名
     * @return $this
     */
    only(fields:ArrayMapping<string>):this;

    /**
     * 移除某个字段的验证规则
     * @access public
     * @param string|array $field 字段名
     * @param mixed        $rule  验证规则 true 移除所有规则
     * @return $this
     */
    remove(field, rule = null)
  

    /**
     * 追加某个字段的验证规则
     * @access public
     * @param string|array $field 字段名
     * @param mixed        $rule  验证规则
     * @return $this
     */
    append(field, rule = null)
   

    /**
     * 数据自动验证
     * @access public
     * @param array $data  数据
     * @param array $rules 验证规则
     * @return bool
     */
    check(data:ArrayMapping<ScalarValue>, rules?:string[]): boolean
    

    /**
     * 根据验证规则验证数据
     * @access public
     * @param mixed $value 字段值
     * @param mixed $rules 验证规则
     * @return bool
     */
    checkRule(value:ScalarValue, rules:string[]): boolean
    

    /**
     * 验证单个字段规则
     * @access protected
     * @param string $field 字段名
     * @param mixed  $value 字段值
     * @param mixed  $rules 验证规则
     * @param array  $data  数据
     * @param string $title 字段描述
     * @param array  $msg   提示信息
     * @return mixed
     */
    protected checkItem(field:string, value:ScalarValue, rules:string|string[], data:ArrayMapping<ScalarValue>, title?:string, msg:ArrayMapping<string>):any
   

    /**
     * 获取当前验证类型及规则
     * @access public
     * @param mixed $key
     * @param mixed $rule
     * @return array
     */
    protected getValidateType(key, rule): ArrayMapping<any>
    
    /**
     * 验证是否和某个字段的值一致
     * @access public
     * @param mixed  $value 字段值
     * @param mixed  $rule  验证规则
     * @param array  $data  数据
     * @param string $field 字段名
     * @return bool
     */
   confirm(value:ScalarValue, rule:any, data?:ArrayMapping<ScalarValue>, field?:string): boolean
   

    /**
     * 验证是否和某个字段的值是否不同
     * @access public
     * @param mixed $value 字段值
     * @param mixed $rule  验证规则
     * @param array $data  数据
     * @return bool
     */
    different(value:ScalarValue, rule:any, data?:ArrayMapping<ScalarValue>): boolean
   

    /**
     * 验证是否大于等于某个值
     * @access public
     * @param mixed $value 字段值
     * @param mixed $rule  验证规则
     * @param array $data  数据
     * @return bool
     */
    egt(value:ScalarValue, rule:any, data?:ArrayMapping<ScalarValue>): boolean
   

    /**
     * 验证是否大于某个值
     * @access public
     * @param mixed $value 字段值
     * @param mixed $rule  验证规则
     * @param array $data  数据
     * @return bool
     */
    gt(value:ScalarValue, rule:any, data?:ArrayMapping<ScalarValue>): boolean
   

    /**
     * 验证是否小于等于某个值
     * @access public
     * @param mixed $value 字段值
     * @param mixed $rule  验证规则
     * @param array $data  数据
     * @return bool
     */
   elt(value:ScalarValue, rule:any, data?:ArrayMapping<ScalarValue>): boolean
  

    /**
     * 验证是否小于某个值
     * @access public
     * @param mixed $value 字段值
     * @param mixed $rule  验证规则
     * @param array $data  数据
     * @return bool
     */
    lt(value:ScalarValue, rule:any, data?:ArrayMapping<ScalarValue>): boolean
  

    /**
     * 验证是否等于某个值
     * @access public
     * @param mixed $value 字段值
     * @param mixed $rule  验证规则
     * @return bool
     */
   eq(value:ScalarValue, rule:any): boolean
   
    /**
     * 必须验证
     * @access public
     * @param mixed $value 字段值
     * @param mixed $rule  验证规则
     * @return bool
     */
   must(value:ScalarValue, rule?:any): boolean
  

    /**
     * 验证字段值是否为有效格式
     * @access public
     * @param mixed  $value 字段值
     * @param string $rule  验证规则
     * @param array  $data  数据
     * @return bool
     */
   is(value:ScalarValue, rule:string, data?:ArrayMapping<ScalarValue>): boolean
   

    // 判断图像类型
    protected getImageType(image)
    
    /**
     * 验证表单令牌
     * @access public
     * @param mixed $value 字段值
     * @param mixed $rule  验证规则
     * @param array $data  数据
     * @return bool
     */
   token(value:ScalarValue, rule:string, data?:ArrayMapping<ScalarValue>): boolean
  

    /**
     * 验证是否为合格的域名或者IP 支持A，MX，NS，SOA，PTR，CNAME，AAAA，A6， SRV，NAPTR，TXT 或者 ANY类型
     * @access public
     * @param mixed $value 字段值
     * @param mixed $rule  验证规则
     * @return bool
     */
   activeUrl(value:ScalarValue, rule?:string ): boolean
  

    /**
     * 验证是否有效IP
     * @access public
     * @param mixed $value 字段值
     * @param mixed $rule  验证规则 ipv4 ipv6
     * @return bool
     */
   ip(value:ScalarValue, rule?:string): boolean
  
    /**
     * 检测上传文件后缀
     * @access public
     * @param File         $file
     * @param array|string $ext 允许后缀
     * @return bool
     */
    protected checkExt(file:File, ext?:string | string[]): boolean
  

    /**
     * 检测上传文件大小
     * @access public
     * @param File    $file
     * @param integer $size 最大大小
     * @return bool
     */
    protected checkSize(file:File, size:number): boolean
  

    /**
     * 检测上传文件类型
     * @access public
     * @param File         $file
     * @param array|string $mime 允许类型
     * @return bool
     */
    protected checkMime(file:File, mime:string|string[]): boolean
  

    /**
     * 验证上传文件后缀
     * @access public
     * @param mixed $file 上传文件
     * @param mixed $rule 验证规则
     * @return bool
     */
   fileExt(file:string|File, rule): boolean
   

    /**
     * 验证上传文件类型
     * @access public
     * @param mixed $file 上传文件
     * @param mixed $rule 验证规则
     * @return bool
     */
    fileMime(file:string|File, rule): boolean
  

    /**
     * 验证上传文件大小
     * @access public
     * @param mixed $file 上传文件
     * @param mixed $rule 验证规则
     * @return bool
     */
  fileSize(file:string|File, rule): boolean
   

    /**
     * 验证图片的宽高及类型
     * @access public
     * @param mixed $file 上传文件
     * @param mixed $rule 验证规则
     * @return bool
     */
   image(file:string|File, rule): boolean
   
    /**
     * 验证时间和日期是否符合指定格式
     * @access public
     * @param mixed $value 字段值
     * @param mixed $rule  验证规则
     * @return bool
     */
   dateFormat(value:ScalarValue, rule:any): boolean
  

    /**
     * 验证是否唯一
     * @access public
     * @param mixed  $value 字段值
     * @param mixed  $rule  验证规则 格式：数据表,字段名,排除ID,主键名
     * @param array  $data  数据
     * @param string $field 验证字段名
     * @return bool
     */
    unique(value:ScalarValue, rule:any, data?:ArrayMapping<ScalarValue>, field?:string): boolean
   

    /**
     * 使用filter_var方式验证
     * @access public
     * @param mixed $value 字段值
     * @param mixed $rule  验证规则
     * @return bool
     */
   filter(value:ScalarValue, rule:any): boolean
   
    /**
     * 验证某个字段等于某个值的时候必须
     * @access public
     * @param mixed $value 字段值
     * @param mixed $rule  验证规则
     * @param array $data  数据
     * @return bool
     */
    requireIf(value:ScalarValue, rule:any, data?:ArrayMapping<ScalarValue>): boolean
   

    /**
     * 通过回调方法验证某个字段是否必须
     * @access public
     * @param mixed $value 字段值
     * @param mixed $rule  验证规则
     * @param array $data  数据
     * @return bool
     */
   requireCallback(value:ScalarValue, rule:any, data?:ArrayMapping<ScalarValue>): boolean
    

    /**
     * 验证某个字段有值的情况下必须
     * @access public
     * @param mixed $value 字段值
     * @param mixed $rule  验证规则
     * @param array $data  数据
     * @return bool
     */
   requireWith(value:ScalarValue, rule:any, data?:ArrayMapping<ScalarValue>): boolean
   

    /**
     * 验证某个字段没有值的情况下必须
     * @access public
     * @param mixed $value 字段值
     * @param mixed $rule  验证规则
     * @param array $data  数据
     * @return bool
     */
    requireWithout(value:ScalarValue, rule:any, data?:ArrayMapping<ScalarValue>): boolean
   

    /**
     * 验证是否在范围内
     * @access public
     * @param mixed $value 字段值
     * @param mixed $rule  验证规则
     * @return bool
     */
    in(value:ScalarValue, rule:any): boolean

    /**
     * 验证是否不在某个范围
     * @access public
     * @param mixed $value 字段值
     * @param mixed $rule  验证规则
     * @return bool
     */
    notIn(value:ScalarValue, rule:any): boolean

    /**
     * between验证数据
     * @access public
     * @param mixed $value 字段值
     * @param mixed $rule  验证规则
     * @return bool
     */
    between(value:ScalarValue, rule:any): boolean

    /**
     * 使用notbetween验证数据
     * @access public
     * @param mixed $value 字段值
     * @param mixed $rule  验证规则
     * @return bool
     */
    notBetween(value:ScalarValue, rule:any): boolean

    /**
     * 验证数据长度
     * @access public
     * @param mixed $value 字段值
     * @param mixed $rule  验证规则
     * @return bool
     */
    length(value:ScalarValue, rule:any): boolean

    /**
     * 验证数据最大长度
     * @access public
     * @param mixed $value 字段值
     * @param mixed $rule  验证规则
     * @return bool
     */
    max(value:ScalarValue, rule:any): boolean

    /**
     * 验证数据最小长度
     * @access public
     * @param mixed $value 字段值
     * @param mixed $rule  验证规则
     * @return bool
     */
    min(value:ScalarValue, rule:any): boolean

    /**
     * 验证日期
     * @access public
     * @param mixed $value 字段值
     * @param mixed $rule  验证规则
     * @param array $data  数据
     * @return bool
     */
    after(value:ScalarValue, rule:any, data?:ArrayMapping<ScalarValue>): boolean

    /**
     * 验证日期
     * @access public
     * @param mixed $value 字段值
     * @param mixed $rule  验证规则
     * @param array $data  数据
     * @return bool
     */
    before(value:ScalarValue, rule:any, data?:ArrayMapping<ScalarValue>): boolean

    /**
     * 验证日期
     * @access public
     * @param mixed $value 字段值
     * @param mixed $rule  验证规则
     * @param array $data  数据
     * @return bool
     */
    afterWith(value:ScalarValue, rule:any, data?:ArrayMapping<ScalarValue>): boolean

    /**
     * 验证日期
     * @access public
     * @param mixed $value 字段值
     * @param mixed $rule  验证规则
     * @param array $data  数据
     * @return bool
     */
    beforeWith(value:ScalarValue, rule:any, data?:ArrayMapping<ScalarValue>): boolean

    /**
     * 验证有效期
     * @access public
     * @param mixed $value 字段值
     * @param mixed $rule  验证规则
     * @return bool
     */
    expire(value:ScalarValue, rule:any): boolean
   
    /**
     * 验证IP许可
     * @access public
     * @param mixed $value 字段值
     * @param mixed $rule  验证规则
     * @return bool
     */
    allowIp(value:ScalarValue, rule:any): boolean

    /**
     * 验证IP禁用
     * @access public
     * @param mixed $value 字段值
     * @param mixed $rule  验证规则
     * @return bool
     */
    denyIp(value:ScalarValue, rule:any): boolean

    /**
     * 使用正则验证数据
     * @access public
     * @param mixed $value 字段值
     * @param mixed $rule  验证规则 正则规则或者预定义正则名
     * @return bool
     */
    regex(value:ScalarValue, rule:any): boolean

    /**
     * 获取错误信息
     * @return array|string
     */
    getError():string|string[]

    /**
     * 获取数据值
     * @access protected
     * @param array  $data 数据
     * @param string $key  数据标识 支持二维
     * @return mixed
     */
    protected getDataValue(data:ArrayMapping<ScalarValue>, key:string):any;
   

    /**
     * 获取验证规则的错误提示信息
     * @access protected
     * @param string $attribute 字段英文名
     * @param string $title     字段描述名
     * @param string $type      验证规则名称
     * @param mixed  $rule      验证规则数据
     * @return string|array
     */
    protected getRuleMsg(attribute:string, title:string, type:string, rule):string|string[];
   

    /**
     * 获取验证规则的错误提示信息
     * @access protected
     * @param string $msg   错误信息
     * @param mixed  $rule  验证规则数据
     * @param string $title 字段描述名
     * @return string|array
     */
    protected parseErrorMsg(msg:string, rule:ArrayMapping<ScalarValue>, title:string):string|string[];
    

    /**
     * 错误信息数组处理
     * @access protected
     * @param array $msg   错误信息
     * @param mixed  $rule  验证规则数据
     * @param string $title 字段描述名
     * @return array
     */
    protected errorMsgIsArray(msg:ArrayMapping<ScalarValue>, rule:ArrayMapping<ScalarValue>, title:string):string[]

    /**
     * 获取数据验证的场景
     * @access protected
     * @param string $scene 验证场景
     * @return void
     */
    protected getScene(scene:string): void
  

    /**
     * 动态方法 直接调用is方法进行验证
     * @access public
     * @param string $method 方法名
     * @param array  $args   调用参数
     * @return bool
     */
    [key:string]<T>(...args):T;
}
