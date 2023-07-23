export class TodolistService {
  todolist = [];

  getTodolist(request, response) {
    const json = JSON.stringify({
      success: true,
      data: this.todolist,
    });

    response.end(json);
  }

  saveTodolist(request, response) {
    request.addListener('data', (data) => {
      const body = JSON.parse(data.toString());

      const id = +new Date();

      this.todolist.push({
        id,
        name: body.name,
        priority: body.priority,
        tags: body.tags,
      });

      response.end(JSON.stringify({
        success: true,
        message: 'Todolist berhasil ditambahkan',
        data: {
          todolistId: id,
        }
      }));
    })
  }

  updateTodo(request, response) {
    // get path parameter
    const pathIdIndex = request.url.lastIndexOf('/');
    const pathId = request.url.substr(pathIdIndex + 1);

    const updateTodoIndex = this.todolist.findIndex((todo) => todo.id === parseInt(pathId));
    if (updateTodoIndex === -1) {
      response.end(JSON.stringify({
        success: false,
        message: 'Todolist tidak ditemukan',
      }));
    }

    request.addListener('data', (data) => {
      const body = JSON.parse(data.toString());

      this.todolist[updateTodoIndex] = {
        ...this.todolist[updateTodoIndex],
        name: body.name,
        priority: body.priority,
        tags: body.tags,
      };

      response.end(JSON.stringify({
        success: true,
        message: 'Todolist berhasil diupdate',
        data: {
          todolistId: this.todolist[updateTodoIndex].id,
        }
      }));
    });
  }

  deleteTodo(request, response) {
    // get path parameter
    const pathIdIndex = request.url.lastIndexOf('/');
    const pathId = request.url.substr(pathIdIndex + 1);

    const deleteTodoIndex = this.todolist.findIndex((todo) => todo.id === parseInt(pathId));
    if (deleteTodoIndex === -1) {
      response.end(JSON.stringify({
        success: false,
        message: 'Todolist tidak ditemukan',
      }));

      return;
    }

    this.todolist.splice(deleteTodoIndex, 1);

    response.end(JSON.stringify({
      success: true,
      message: 'Todolist berhasil dihapus',
    }));
  }
}