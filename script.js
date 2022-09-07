let button = document.getElementById("addBtn");
let oldTxt;
let newTxt;
/* 
naprawic overflow
zapis i odczyt do pliku 
*/

//console.log(taskNodes.length);
document.addEventListener("DOMContentLoaded", GetData())

button.addEventListener("click", e=> CreateNewTask())

document.body.addEventListener("click", e=> EditTask(e.target))

document.body.addEventListener("click", e=> DeleteTask(e.target))







function CreateNewTask()
{

    let newTask = document.getElementById("addTask").value;

    if(newTask === "") /* add more logic*/
    {
        return;
    }
    else
    {    
        let newElement = document.createElement("div");
        newElement.classList.add("taskSpace");
        

        let newElementTXTBox = document.createElement("textarea");
        newElementTXTBox.setAttribute("readonly", "");
        newElementTXTBox.classList.add("taskAdded");
        newElementTXTBox.innerHTML = newTask;
        newElement.appendChild(newElementTXTBox);

        let newBtn = document.createElement("button");
        newBtn.classList.add("deleteBtn");
        newBtn.innerHTML = "DELETE";
        newElement.appendChild(newBtn);

        let newEditBtn = document.createElement("button");
        newEditBtn.classList.add("editBtn");
        newEditBtn.innerHTML = "EDIT";
        newElement.appendChild(newEditBtn);

        let currentDiv = document.getElementById("wrapper");
        currentDiv.insertAdjacentElement("beforeend", newElement);
       
    }
        document.getElementById("addTask").value = "";
        SaveData(newTask);

}  


function EditTask(t)
{

  if(t.classList == "editBtn")

  {
    let div = t.parentNode
    let textArea = div.firstChild;
    let btnTxt = t.firstChild;
   oldTxt = textArea.value;
    textArea.removeAttribute("readonly");
    t.classList.replace("editBtn", "applyBtn");
    btnTxt.data = "APPLY";
    
  }
  else if(t.classList == "applyBtn")
  {
      let div = t.parentNode
      let textArea = div.firstChild;
      let btnTxt = t.firstChild;
    newTxt = textArea.value;
      textArea.setAttribute("readonly", "");
      t.classList.replace("applyBtn", "editBtn");
      btnTxt.data = "EDIT"; 
      ChangeData(oldTxt, newTxt);
  }
    
}

function DeleteTask(t)
{
  
  if(t.classList == "deleteBtn")
  {
    
    let div = t.parentNode;
    div.remove();
    DeleteData(div);
  }
}

function SaveData(task)
{
    let tasksArray;
    if(localStorage.getItem("tasksArray") == null)
    {
      tasksArray = [];
    }
    else
    {
      tasksArray = JSON.parse(localStorage.getItem("tasksArray"));
    }
    tasksArray.push(task);
    localStorage.setItem("tasksArray", JSON.stringify(tasksArray));

}
function GetData()
{
  let tasksArray;
  if(localStorage.getItem("tasksArray") === null) 
  {
    tasksArray = [];
  }
  else
  {
    tasksArray = JSON.parse(localStorage.getItem("tasksArray"));
  }
  tasksArray.forEach(function(task) {
        let newElement = document.createElement("div");
        newElement.classList.add("taskSpace");
        

        let newElementTXTBox = document.createElement("textarea");
        newElementTXTBox.setAttribute("readonly", "");
        newElementTXTBox.classList.add("taskAdded");
        newElementTXTBox.innerHTML = task;
        newElement.appendChild(newElementTXTBox);

        let newBtn = document.createElement("button");
        newBtn.classList.add("deleteBtn");
        newBtn.innerHTML = "DELETE";
        newElement.appendChild(newBtn);

        let newEditBtn = document.createElement("button");
        newEditBtn.classList.add("editBtn");
        newEditBtn.innerHTML = "EDIT";
        newElement.appendChild(newEditBtn);

        let currentDiv = document.getElementById("wrapper");
        currentDiv.insertAdjacentElement("beforeend", newElement);
       
    
  
  })
}
function DeleteData(target)
{

  let tasksArray;
  if(localStorage.getItem("tasksArray") == null)
  {
    tasksArray = [];
  }
  else
  {
    tasksArray = JSON.parse(localStorage.getItem("tasksArray"));
  }
  let text = target.firstChild;
  let posToDelete = tasksArray.indexOf(text.value);
  tasksArray.splice(posToDelete, 1);
  localStorage.setItem("tasksArray", JSON.stringify(tasksArray));
}
function ChangeData(oldValue, newValue)
{
  let tasksArray;
  if(localStorage.getItem("tasksArray") == null)
  {
    tasksArray = [];
  }
  else
  {
    tasksArray = JSON.parse(localStorage.getItem("tasksArray"));
  }

  
  let posToEdit = tasksArray.indexOf(oldValue);
  tasksArray.splice(posToEdit, 1, newValue);
 
  localStorage.setItem("tasksArray", JSON.stringify(tasksArray));
}