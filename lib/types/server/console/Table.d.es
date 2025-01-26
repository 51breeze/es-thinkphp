package server.console;

declare class Table
{
    static const ALIGN_LEFT   = 1;
    static const ALIGN_RIGHT  = 0;
    static const ALIGN_CENTER = 2;

    /**
     * 设置表格头信息 以及对齐方式
     * @access public
     * @param array $header     要输出的Header信息
     * @param int   $align      对齐方式 默认1 ALGIN_LEFT 0 ALIGN_RIGHT 2 ALIGN_CENTER
     * @return void
     */
    setHeader(header:ArrayMapping<Scalar>, align?:number): void

    /**
     * 设置输出表格数据 及对齐方式
     * @access public
     * @param array $rows       要输出的表格数据（二维数组）
     * @param int   $align      对齐方式 默认1 ALGIN_LEFT 0 ALIGN_RIGHT 2 ALIGN_CENTER
     * @return void
     */
    setRows(rows:any, align?:number): void

    /**
     * 设置全局单元格对齐方式
     * @param int $align 对齐方式 默认1 ALGIN_LEFT 0 ALIGN_RIGHT 2 ALIGN_CENTER
     * @return $this
     */
    setCellAlign(align?:number):this;

    /**
     * 增加一行表格数据
     * @access public
     * @param  mixed $row       行数据
     * @param  bool  $first     是否在开头插入
     * @return void
     */
    addRow(row:any, first?:boolean): void

    /**
     * 设置输出表格的样式
     * @access public
     * @param  string $style       样式名
     * @return void
     */
    setStyle(style:string): void

    /**
     * 输出表格
     * @access public
     * @param  array $dataList       表格数据
     * @return string
     */
    render(dataList?): string
}