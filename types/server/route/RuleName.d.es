package server.route;

/**
 * 路由标识管理类
 */
declare class RuleName
{
    /**
     * 注册路由标识
     * @access public
     * @param  string   $name  路由标识
     * @param  RuleItem $ruleItem 路由规则
     * @param  bool     $first 是否优先
     * @return void
     */
    setName(name:string, ruleItem:RuleItem, first:boolean = false): void
   

    /**
     * 注册路由分组标识
     * @access public
     * @param  string    $name  路由分组标识
     * @param  RuleGroup $group 路由分组
     * @return void
     */
    setGroup(name:string, group:RuleGroup): void

    /**
     * 注册路由规则
     * @access public
     * @param  string   $rule  路由规则
     * @param  RuleItem $ruleItem 路由
     * @return void
     */
    setRule(rule:string, ruleItem:RuleItem): void

    /**
     * 根据路由规则获取路由对象（列表）
     * @access public
     * @param  string $rule   路由标识
     * @return RuleItem[]
     */
    getRule(rule:string): array

    /**
     * 根据路由分组标识获取分组
     * @access public
     * @param  string $name 路由分组标识
     * @return RuleGroup|null
     */
    getGroup(name:string):RuleGroup|null

    /**
     * 清空路由规则
     * @access public
     * @return void
     */
    clear(): void

    /**
     * 获取全部路由列表
     * @access public
     * @return array
     */
    getRuleList(): array

    /**
     * 导入路由标识
     * @access public
     * @param  array $item 路由标识
     * @return void
     */
    import(item:array): void

    /**
     * 根据路由标识获取路由信息（用于URL生成）
     * @access public
     * @param  string $name   路由标识
     * @param  string $domain 域名
     * @param  string $method 请求类型
     * @return array
     */
    getName(name:string = null, domain:string = null, method:string = '*'): array
}
