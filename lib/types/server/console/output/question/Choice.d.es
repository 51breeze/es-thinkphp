package server.console.output.question;

import server.console.output.Question;

declare class Choice extends Question
{

    /**
     * 构造方法
     * @param string $question 问题
     * @param array  $choices  选项
     * @param mixed  $default  默认答案
     */
    constructor(question:string, choices:string[], default?)
   

    /**
     * 可选项
     * @return array
     */
    getChoices(): array

    /**
     * 设置可否多选
     * @param bool $multiselect
     * @return self
     */
    setMultiselect(multiselect:boolean)
    isMultiselect(): boolean;
   

    /**
     * 获取提示
     * @return string
     */
    getPrompt(): string
   

    /**
     * 设置提示
     * @param string $prompt
     * @return self
     */
    setPrompt(prompt:string):this;

    /**
     * 设置错误提示信息
     * @param string $errorMessage
     * @return self
     */
    setErrorMessage(errorMessage:string):this;
}
