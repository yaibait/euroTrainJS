import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-app',
  templateUrl: './todo-app.component.html',
  styleUrls: ['./todo-app.component.css'],
  providers: [TodoService]
})
export class TodoAppComponent implements OnInit {
  newTodo:Todo = new Todo();
  constructor(private todoService:TodoService) { 

  }

  ngOnInit() {
  }

  addTodo(){
    
    this.todoService.addTodo(this.newTodo);
    console.log(this.newTodo);
    this.newTodo = new Todo();
    console.log(this.newTodo);
  }

  toggleTodoComplete(todo){
    this.todoService.toggleTodoComplete(todo);
  }

  removeTodo(todo){
    console.log(todo);
    this.todoService.deleteTodoListById(todo.id);
  }

  get todos(){
    return this.todoService.getAllTodos();
  }
}
