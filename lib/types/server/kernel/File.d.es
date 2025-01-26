package server.kernel;

/**
 * 文件上传类
 * @package think
 */
declare class File{

   constructor(path:string, checkPath?:boolean);

    /**
     * 获取文件的哈希散列值
     * @access public
     * @param string $type
     * @return string
     */
    hash(type?:string):string

    /**
     * 获取文件的MD5值
     * @access public
     * @return string
     */
    md5(): string

    /**
     * 获取文件的SHA1值
     * @access public
     * @return string
     */
    sha1(): string

    /**
     * 获取文件类型信息
     * @access public
     * @return string
     */
    getMime(): string

    /**
     * 移动文件
     * @access public
     * @param string      $directory 保存路径
     * @param string|null $name      保存的文件名
     * @return File
     */
    move(directory:string, name?:string): File

    /**
     * 实例化一个新文件
     * @param string      $directory
     * @param null|string $name
     * @return File
     */
    protected getTargetFile(directory:string, name?:string): File

    /**
     * 获取文件名
     * @param string $name
     * @return string
     */
    protected getName(name:string): string

    /**
     * 文件扩展名
     * @return string
     */
    extension(): string

    /**
     * 自动生成文件名
     * @access public
     * @param string|\Closure $rule
     * @return string
     */
    hashName(rule?:string): string
}
