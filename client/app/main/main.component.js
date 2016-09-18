import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';

export class MainController {
  $http;
  socket;
  todos = [];
  newTodo = '';

  /*@ngInject*/
  constructor($http, $scope, socket) {
    this.$http = $http;
    this.socket = socket;

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('todo');
    });
  }

  $onInit() {
    this.$http.get('/api/todos')
      .then(response => {
        console.log(response.data);
        this.todos = response.data;
        this.socket.syncUpdates('todo', this.todos);
      });
  }

  addThing() {
    if(this.newTodo) {
      this.$http.post('/api/todos', {
        name: this.newTodo
      });
      this.newTodo = '';
    }
  }

  updateTodo (todo) {
    this.$http.put('/api/todos', todo)
  }

  deleteThing(todo) {
    this.$http.delete('/api/todos/' + todo._id);
  }
}

export default angular.module('ngTodoApp.main', [uiRouter])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController
  })
  .name;
