package app.controller;

import app.model.Person;

import server.facade.Cookie;
import server.facade.Session;
import server.facade.Console;

import {Person as _Person} from '../../config.es';

import "../../assets/main.js";
import "../../assets/style.css";

class Index {

      @Embed('../../assets/less/index.less')
      file:string;

      @Get('/')
      public hello(){
           return `Hello, World!`;
      }
      
      @Post('/List')
      public list(){
            const person = new Person();
            return json( person.list(), 200 );
      }

}