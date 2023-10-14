package server.console.output;

declare class Question{
    /**
     * 构造方法
     * @param string $question 问题
     * @param mixed  $default  默认答案
     */
    constructor(question:string, default = null)

    /**
     * 获取问题
     * @return string
     */
    getQuestion():string

    /**
     * 获取默认答案
     * @return mixed
     */
    getDefault():any;

    /**
     * 是否隐藏答案
     * @return bool
     */
    isHidden():boolean;

    /**
     * 隐藏答案
     * @param bool $hidden
     * @return Question
     */
    setHidden(hidden:boolean):this;

    /**
     * 不能被隐藏是否撤销
     * @return bool
     */
    isHiddenFallback():boolean;

    /**
     * 设置不能被隐藏的时候的操作
     * @param bool $fallback
     * @return Question
     */
    setHiddenFallback(fallback:boolean):this;

    /**
     * 获取自动完成
     * @return null|array|\Traversable
     */
    getAutocompleterValues():null|array|Traversable

    /**
     * 设置自动完成的值
     * @param null|array|\Traversable $values
     * @return Question
     * @throws \InvalidArgumentException
     * @throws \LogicException
     */
    setAutocompleterValues(values:array|null):this;

    /**
     * 设置答案的验证器
     * @param null|callable $validator
     * @return Question The current instance
     */
    setValidator(validator?:(...args)=>any):this;
    
    /**
     * 获取验证器
     * @return null|callable
     */
    getValidator():null|((...args)=>any);
    
    /**
     * 设置最大重试次数
     * @param null|int $attempts
     * @return Question
     * @throws \InvalidArgumentException
     */
    setMaxAttempts(attempts?:number):this;
   
    /**
     * 获取最大重试次数
     * @return null|int
     */
    getMaxAttempts():null|int
   
    /**
     * 设置响应的回调
     * @param string|\Closure $normalizer
     * @return Question
     */
    setNormalizer(normalizer:string|(...args)=>void):this;

    /**
     * 获取响应回调
     * The normalizer can ba a callable (a string), a closure or a class implementing __invoke.
     * @return string|\Closure
     */
    getNormalizer():string|(...args)=>void

}
