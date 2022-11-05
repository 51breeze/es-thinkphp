package controller;

import server.application.Controller;

import controller.test.TestIndex

import model.Person;

import config from '../config.es';

@Import(style = '../style.css');
@Import(js='../main.js');

class Index extends Controller{

      @Embed('../less/index.less')
      file:string;

      @Get
      public getList(){

            new TestIndex();

           const person = new Person();
           return person.name123;
      }

}