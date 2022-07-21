var ipt = document.getElementById("ipt");
var value = ipt.value;

var btn = document.getElementById("btn");

ipt.addEventListener("keydown",function(e){
  if(e.key == "Enter"){
    e.preventDefault();
    addTodo(ipt.value, false);
  }
})


function addTodo(value, completed){
  if(!isValidTodo(value))
    return;
    
  printTodo(value, completed) 
  saveTodoinLocalStorage(value, completed);
  clearInput(ipt);
}


function isValidTodo(value){
  if(value == "")
    return false;
  return true;
}


function printTodo(value, completed){
  var todo = createTodo(value, completed);
  createDeleteButton(value, todo);
  createReadButton(todo.firstChild , todo, completed);
  createEditButton(todo.firstChild,value, todo);
  var list = document.getElementById('list');
  list.appendChild(todo);
}


function clearInput(element){
  element.value  = "";
}


function saveTodoinLocalStorage(value, completed){
  var todos = localStorage.getItem('todos');
  if(!todos){
    todos = [{value, completed}];
    localStorage.setItem("todos", JSON.stringify(todos));
  }else{
    todos = JSON.parse(localStorage.getItem("todos"));
    todos.push({value, completed});
    localStorage.setItem("todos", JSON.stringify(todos));
  }
}


function deleteTodofromLocalStorage(value){
  var todos = JSON.parse(localStorage.getItem("todos"));
  if (todos.length == 1){
      localStorage.removeItem("todos");
      return;
    }
  for (let i = 0; i < todos.length; i++) {
    if(todos[i].value == value){
      todos.splice(i, 1);
    }
  }
  localStorage.setItem("todos", JSON.stringify(todos));
}


function createTodo(value){
  var p = document.createElement("p");
  p.innerHTML = value;
  p.style.justifyItems="centre";
  p.style.color = "rgb(50, 50, 50)";
  p.style.fontSize = "large"
  p.style.display = "inline-block"

  var todo = document.createElement('div');
  todo.appendChild(p);
  return todo;
}


function createDeleteButton(value, todo){
  var del = document.createElement("button");
  del.innerHTML = `<strong>&#128465</strong>`;
  del.style.marginRight = "10px";
  del.style.marginTop="12px"
  del.addEventListener('click', function(){
      list.removeChild(todo);
      deleteTodofromLocalStorage(value);
  })
  del.style.float = "right"
  todo.appendChild(del);
}

function createEditButton(p,value,todo){
  var edit=document.createElement("button");
  edit.innerHTML=`<strong> &#9998</strong>`;
   edit.style.marginRight = "10px";
  edit.style.marginTop="12px"
  edit.addEventListener("click", function() {
  p.contentEditable = true;
  p.style.background= "white";
} );
 p.addEventListener("keydown",function(e){
  if(e.key == "Enter"){
    p.contentEditable= false;
    p.style.background="rgb(228, 228, 228)";
    var val=p.innerHTML;
    replacetodoinLocalStorage(value,val);
  }
})
  edit.style.float="right";
  todo.appendChild(edit);
}

function replacetodoinLocalStorage(value,val){
  var todos = JSON.parse(localStorage.getItem("todos"));
  for(let i=0;i<todos.length;++i){
    if(todos[i].value==value){
       todos[i].value=val;
       break;
    }
  }
  localStorage.setItem("todos", JSON.stringify(todos));
}

function createReadButton(p, todo, completed){
  var check = `<img src="./icons/check image.png" style="max-width: 100%; height:0.5cm;">`;
  var cross = `<img src="./icons/cross.png" style="max-width: 100%; height:0.5cm;">`;
  var read = document.createElement('button');
  read.style.float = "right"


  if(completed){
    read.innerHTML = cross;
    p.style.textDecoration = "line-through";
  }
  else{
    read.innerHTML = check;
    p.style.textDecoration = "none";
  }

  read.style.marginRight = "10px";
  read.style.marginTop="12px"
  read.addEventListener('click',function(){
    var todos = JSON.parse(localStorage.getItem("todos"));
    if(read.innerHTML == check){
      p.style.textDecoration = "line-through";
      read.innerHTML = cross;
      for (let i = 0; i < todos.length; i++) {
        if(todos[i].value == p.innerHTML)
          todos[i].completed = true;
      }
      localStorage.setItem("todos", JSON.stringify(todos));
    }else{
      p.style.textDecoration = "none";
      read.innerHTML = check;
      for (let i = 0; i < todos.length; i++) {
        if(todos[i].value == p.innerHTML)
          todos[i].completed = false;
      }
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  })
  todo.appendChild(read);
}

function printTodoInStorage(){
  var todos = JSON.parse(localStorage.getItem("todos"));
  if(!todos)
    return;
  
  for (let i = 0; i < todos.length; i++) {
    printTodo(todos[i].value, todos[i].completed)
  }
}

printTodoInStorage()