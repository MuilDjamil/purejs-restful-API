import http from 'http';
import { TodolistService } from './service.mjs';

const service = new TodolistService();

const server = http.createServer((request, response) => {
  response.setHeader('Content-Type', 'application/json');

  if (request.url === '/list') {
    if (request.method === 'GET') {
      service.getTodolist(request, response);
    } else if (request.method === 'POST') {
      service.saveTodolist(request, response);
    }
  } else if (request.url.match(/\/list\/./)) {
    if (request.method === 'PUT') {
      service.updateTodo(request, response);
    } else if (request.method === 'DELETE') {
      service.deleteTodo(request, response);
    }
  }
});

server.listen(3000, () => {
  console.info(`Server running at port:${server.address().port}`);
});