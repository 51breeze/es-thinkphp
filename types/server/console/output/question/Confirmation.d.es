package server.console.output.question;
import server.console.output.Question;
declare class Confirmation extends Question
{
    /**
     * 构造方法
     * @param string $question        问题
     * @param bool   $default         默认答案
     * @param string $trueAnswerRegex 验证正则
     */
    constructor(question:string, default?:boolean, trueAnswerRegex?:string)
}
