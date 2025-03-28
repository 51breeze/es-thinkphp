package app.controller;

import app.model.Person;

import server.facade.Cookie;
import server.facade.Session;
import server.facade.Console;

import {Person as _Person} from '../../config.es';

import "../../assets/main.js";
import "../../assets/style.css";

@Router('home')
class Index {

      @Embed('../../assets/less/index.less')
      file:string;

      @Get('/')
      public hello(){
           return `Hello, World!`;
      }

      /**
      * @group 列表
      * @label 列表
      * @auth false
      */
      
      @Post(label='列表', auth=false)
      public list(){
            const person = new Person();
            return json( person.list(), 200 );
      }

}