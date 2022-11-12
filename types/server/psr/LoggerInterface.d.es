package server.psr;

/**
* Describes a logger instance.
*
* The message MUST be a string or object implementing __toString().
*
* The message MAY contain placeholders in the form: {foo} where foo
* will be replaced by the context data in key "foo".
*
* The context array can contain arbitrary data. The only assumption that
* can be made by implementors is that if an Exception instance is given
* to produce a stack trace, it MUST be in a key named "exception".
*
* See https://github.com/php-fig/fig-standards/blob/master/accepted/PSR-3-logger-interface.md
* for the full interface specification.
*/
declare interface LoggerInterface{

      /**
      * System is unusable.
      *
      * @param string  $message
      * @param mixed[] $context
      *
      * @return void
      */
      emergency(message:string, context?:array );

      /**
      * Action must be taken immediately.
      *
      * Example: Entire website down, database unavailable, etc. This should
      * trigger the SMS alerts and wake you up.
      *
      * @param string  $message
      * @param mixed[] $context
      *
      * @return void
      */
      alert(message:string, context?:array);

      /**
      * Critical conditions.
      *
      * Example: Application component unavailable, unexpected exception.
      *
      * @param string  $message
      * @param mixed[] $context
      *
      * @return void
      */
      critical(message:string, context?:array);

      /**
      * Runtime errors that do not require immediate action but should typically
      * be logged and monitored.
      *
      * @param string  $message
      * @param mixed[] $context
      *
      * @return void
      */
      error(message:string, context?:array);

      /**
      * Exceptional occurrences that are not errors.
      *
      * Example: Use of deprecated APIs, poor use of an API, undesirable things
      * that are not necessarily wrong.
      *
      * @param string  $message
      * @param mixed[] $context
      *
      * @return void
      */
      warning(message:string, context?:array);

      /**
      * Normal but significant events.
      *
      * @param string  $message
      * @param mixed[] $context
      *
      * @return void
      */
      notice(message:string, context?:array);

      /**
      * Interesting events.
      *
      * Example: User logs in, SQL logs.
      *
      * @param string  $message
      * @param mixed[] $context
      *
      * @return void
      */
      info(message:string, context?:array);

      /**
      * Detailed debug information.
      *
      * @param string  $message
      * @param mixed[] $context
      *
      * @return void
      */
      debug(message:string, context?:array);

      /**
      * Logs with an arbitrary level.
      *
      * @param mixed   $level
      * @param string  $message
      * @param mixed[] $context
      *
      * @return void
      *
      * @throws \Psr\Log\InvalidArgumentException
      */
      log(message:string, context?:array);
}
