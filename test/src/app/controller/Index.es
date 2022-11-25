package app.controller;

import server.kernel.Controller;

import app.model.Person;

import server.facade.Cookie;
import server.facade.Session;
import server.facade.Console;

import {Person as _Person} from '../../config.es';

import "../../assets/main.js";
import "../../assets/style.css";

class Index extends Controller{

      @Embed('../../assets/less/index.less')
      file:string;
      

      @Get('/')
      public getList(){
           const person = new Person();
           console.log( _Person  );
           return `<h1>Hello, World!</h1><div>My name is ${person.myName}</div>`;
      }

}