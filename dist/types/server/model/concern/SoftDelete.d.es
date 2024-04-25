package server.model.concern;

import server.model.Model;
import server.database.Query;

/**
 * 数据软删除
 * @mixin Model
 * @method $this withTrashed()
 * @method $this onlyTrashed()
 */
declare interface SoftDelete<T>
{

    db(scope?:string[]): Query<T>

    /**
     * 判断当前实例是否被软删除
     * @access public
     * @return bool
     */
    trashed(): boolean

    scopeWithTrashed(query:Query<T>):void;

    scopeOnlyTrashed(query:Query<T>):void;

    /**
     * 获取软删除数据的查询条件
     * @access protected
     * @return array
     */
    protected getWithTrashedExp():['notnull'|'<>',any]

    /**
     * 删除当前的记录
     * @access public
     * @return bool
     */
    delete(): boolean

    /**
     * 恢复被软删除的记录
     * @access public
     * @param array $where 更新条件
     * @return bool
     */
    restore(where:ArrayMapping<ScalarValue>): boolean

    /**
     * 获取软删除字段
     * @access protected
     * @param bool $read 是否查询操作 写操作的时候会自动去掉表别名
     * @return string|false
     */
    protected getDeleteTimeField(read:boolean):string|false
    
    /**
     * 查询的时候默认排除软删除数据
     * @access protected
     * @param Query $query
     * @return void
     */
    protected withNoTrashed(query:Query<T>): void
}
