package web.controller;

import web.Controller;

import web.controller.test.TestIndex

import web.model.Person;

import config from '../config.es';

@Import(style = '../style.css');
@Import(js='../main.js');

class Index extends Controller{

      @Embed('../less/index.less')
      file:string;

      @Get
      public getList(){

           const person = new Person();
           return person.name123;
      }

}