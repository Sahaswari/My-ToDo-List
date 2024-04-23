const todoValue = document.getElementById("todoText"),
  listItems = document.getElementById("list-items"),
  addUpdateClick = document.getElementById("AddUpdateClick");

  let updateText; //siore reference
  let todoData = JSON.parse(localStorage.getItem("todoData"));
  if(!todoData){
    todoData = [];
  }

  todoValue.addEventListener("keypress", function (e) {
    if(e.key === "Enter"){
      addUpdateClick.click();
    }

  });

  ReadToDoItems();
  function ReadToDoItems(){
    todoData.forEach((element) => {
      let li = document.createElement("li");
      let style = "";
      if(element.status){
        style = "style='text-decoration:line-through'";
      } 
      const todoItems = `<div ${style} ondblclick="CompleteTodoItem(this)">${
        element.item
      }${
        style === ""
        ? '<img class="edit todo-controls" onclick="UpdateToDoItems(this)" />'
      : ""
    }<img class="delete todo-controls" onclick="DeleteToDoItems(this)" src="/images/delete1.png"/></div>`;
      li.innerHTML = todoItems;
      listItems.appendChild(li);
      
    });
  }

  function CreateToDate( ){
    if(todoValue.value ===""){
      alert("Please Enter Your ToDo Text!");
      todoValue.focus();
    }

    let li = document.createElement("li");
    const todoItems = `<div ondblclick="CompleteTodoItem(this)">${todoValue.value}</div>
    <div >
    <img class="edit todo-controls" onclick="UpdateToDoItems(this)" src="/images/edit.png"/>
    <img class="delete todo-controls" onclick="DeleteToDoItems(this)" src="/images/delete1.png"/>
      </div>`;

    li.innerHTML = todoItems;
    listItems.appendChild(li);

    let dataItem = { item: todoValue.value, status: false };
    todoData.push(dataItem);
    localStorage.setItem("todoData", JSON.stringify(todoData));

    todoValue.value = "";
  }

  if(!todoData){
    todoData = [];
  }
  let dataItem = {item: todoData.value, status:false};
  console.log(dataItem);
  todoData.push(dataItem);
  localStorage.setItem("todoData", JSON.stringify(todoData));

  todoValue.value="";


  function CompleteTodoItem(e){
    if(e.parentElement.querySelector("div").style.textDecoration === ""){
      e.parentElement.querySelector("div").style.textDecoration = "line-through";

      todoData.forEach((element)=>{
        if(e.parentElement.querySelector("div").innerHTML.trim() == element.item){
          element.status = true;
        }
      });
      localStorage.setItem("todoData", JSON.stringify(todoData));
    }
  }

  function UpdateOnSelectionItems(){
    updateText.innerText = todoValue.value;
    addUpdateClick.setAttribute("onclick", "CompleteTodoItem()");
    addUpdateClick.setAttribute("src","/images/add.png");
    todoValue.value = "";
    
  }

  function UpdateToDoItems(e){
    if(e.parentElement.parentElement.querySelector("div").style.textDecoration === ""){
      todoValue.value = 
        e.parentElement.parentElement.querySelector("div").innerText;
        addUpdateClick.setAttribute("onclick", "UpdateOnSelectionItems()");
        addUpdateClick.setAttribute("src","/images/refresh.png");
        updateText = e.parentElement.parentElement.querySelector("div"); 
        todoValue.focus();
      
    }
  }

  function DeleteToDoItems(e){
    let deleteValue = e.parentElement.parentElement.querySelector("div").innerText;
    if(confirm(`Are you sure you want to delete this ${deleteValue}!`)){
      e.parentElement.parentElement.parentElement.querySelector("li").remove();
      todoValue.focus();

      todoData.forEach((element)=>{
        if(element.item == deleteValue.trim()){
          todoData.splice(element, 1);
        }
      });
      setLocalStorage();
    }
  }

  function setLocalStorage(){
    localStorage.setItem("todoData", JSON.stringify(todoData));
  }

  