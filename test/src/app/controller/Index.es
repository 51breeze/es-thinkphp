package app.controller;

import server.application.Controller;

import app.model.Person;

import config from '../../config.es';

import "../../assets/main.js";
import "../../assets/style.css";

class Index extends Controller{

      @Embed('../../assets/less/index.less')
      file:string;
      

      @Get('/')
      public getList(){
           const person = new Person();
           console.log( config );
           return `<h1>Hello, World!</h1><div>My name is ${person.myName}</div>`;
      }

}