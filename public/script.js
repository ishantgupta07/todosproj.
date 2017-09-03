console.log("is script type loading");
const RESPONSE_OK=4;
const STATUS_OK=200;
const TODOS_LIST_ID="todos_list_div";
const NEW_TODO_INPUT="new_todo_input";
var table_active=document.createElement("table_active");
var table_complete=document.createElement("table_complete");
var table_delete=document.createElement("table_delete");

window.onload=getTodosAJAX();
function  addToDoElements(id,todo_json_ob)
{
    var todos_json=JSON.parse(todo_json_ob);
    var parent=document.getElementById(id);
    table_active.innerHTML="";
    table_complete.innerHTML="";
    table_delete.innerHTML="";
    if(parent)
    {
        Object.keys(todos_json).forEach(
            function(key){
                createTodoElement(key, todos_json[key]);
               
            }
        )
    }
}

function createTodoElement(key, todo_object){

    var todo_element = document.createElement("div");
    todo_element.innerText = todo_object.title;



    if (todo_object.status === "ACTIVE"){

        var active=document.getElementById("active");
        var row =document.createElement("tr");

        var checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.setAttribute("onclick", "completeTodoAJAX("+key+")");
        checkbox.setAttribute("class", "breathHorizontal");
        checkbox.setAttribute("value","sup");
        row.append(checkbox);



        var column=document.createElement("td");
        column.innerHTML=todo_object.title;
        column.setAttribute(
            "data-id", key
        );
        column.setAttribute(
            "class", "todoStatus"+ todo_object.status
        );
        column.setAttribute("id","todo_data");
        row.appendChild(column);

        var delete_button1 = document.createElement("button");
        delete_button1.innerHTML = "DELETE";
        delete_button1.setAttribute("onclick", "deleteTodosAJAX("+key+")");
        delete_button1.setAttribute("class", "breathHorizontal");
        delete_button1.setAttribute("id","delete1");
        row.appendChild(delete_button1);

        table_active.appendChild(row);
        active.appendChild(table_active);
    }

    if(todo_object.status ==="COMPLETE")
    {
        var complete=document.getElementById("completed");
        var row=document.createElement("tr");

        var checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.checked="checked";
        checkbox.setAttribute("onclick", "incompleteTodoAJAX("+key+")");
        //complete_button.setAttribute("class", "breathHorizontal");
        checkbox.setAttribute("value","sup");
        row.append(checkbox);

        var column=document.createElement("td");
        column.innerHTML=todo_object.title;
        column.setAttribute(
            "data-id", key
        );
        column.setAttribute(
            "class", "todoStatus"+ todo_object.status + " " + "breathVertical"
        );
        column.setAttribute("id","todo_data");
        row.appendChild(column);

        var delete_button2 = document.createElement("button");
        delete_button2.innerText = "Delete";
        delete_button2.setAttribute("onclick", "deleteTodosAJAX("+key+")");
        delete_button2.setAttribute("class", "breathHorizontal");
        row.appendChild(delete_button2);
        table_complete.appendChild(row);
        complete.appendChild(table_complete);
    }
    if (todo_object.status === "DELETED"){

        var deleted=document.getElementById("deleted");
        var row=document.createElement("tr");
        var column=document.createElement("td");
        column.innerHTML=todo_object.title;
        column.setAttribute(
            "data-id", key
        );

        column.setAttribute(
            "class", "todoStatus"+ todo_object.status + " " + "breathVertical"
        );
        column.setAttribute("id","todo_data");
        row.appendChild(column);
        table_delete.appendChild(row);
        deleted.appendChild(table_delete);

    }

}

function getTodosAJAX()
{
    var xhr=new XMLHttpRequest();
    xhr.open('GET','/api/todos',true);

    xhr.onreadystatechange=function() {
        if ((xhr.readyState === RESPONSE_OK)&&(xhr.status===STATUS_OK))
        {
            console.log(xhr.responseText);
            addToDoElements(TODOS_LIST_ID,xhr.responseText);
        }
    }
    xhr.send(data=null);
}

function addTodosAJAX(){
    var todo_value=document.getElementById(NEW_TODO_INPUT).value;
    var xhr=new XMLHttpRequest();
    xhr.open('POST','/api/todos',true);
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    var data="todo_title="+encodeURI(todo_value);
    xhr.onreadystatechange=function() {
        if ((xhr.readyState === RESPONSE_OK)&&(xhr.status===STATUS_OK))
        {
            console.log(xhr.responseText);
            addToDoElements(TODOS_LIST_ID,xhr.responseText);
        }
        else
            console.log(xhr.responseText);
    }

    xhr.send(data);
}
function completeTodoAJAX(id) {

    // Make a AJAX Request to update todo with the above id
    // If Response is 200 : refreshTodoElements


    var xhr = new XMLHttpRequest();
    xhr.open("PUT", "/api/todos/" + id, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    data = "todo_status=COMPLETE";

    xhr.onreadystatechange = function () {

        if (xhr.readyState == RESPONSE_OK) {
            if (xhr.status == STATUS_OK) {
                addToDoElements(TODOS_LIST_ID, xhr.responseText);
            }
            else {
                console.log(xhr.responseText);
            }
        }
    }


    xhr.send(data);
}
function incompleteTodoAJAX(id) {

    // Make a AJAX Request to update todo with the above id
    // If Response is 200 : refreshTodoElements


    var xhr = new XMLHttpRequest();
    xhr.open("PUT", "/api/todos/" + id, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    data = "todo_status=ACTIVE";

    xhr.onreadystatechange = function () {

        if (xhr.readyState === RESPONSE_OK) {
            if (xhr.status === STATUS_OK) {
                addToDoElements(TODOS_LIST_ID, xhr.responseText);
            }
            else {
                console.log(xhr.responseText);
            }
        }
    }


    xhr.send(data);
}

function deleteTodosAJAX(id){

    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", "/api/todos/" + id, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    data = "todo_status=DELETED";

    xhr.onreadystatechange = function () {

        if (xhr.readyState === RESPONSE_OK) {
            if (xhr.status === STATUS_OK) {
                addToDoElements(TODOS_LIST_ID, xhr.responseText);
            }
            else {
                console.log(xhr.responseText);
            }
        }
    }


    xhr.send(data);
}
function hide_complete(){
    var show=document.getElementById("hide1");
    var x=document.getElementById("completed");
    if (x.style.display === 'none') {
        show.innerHTML="Hide completed items";
        console.log("in hiding");
        x.style.display = 'block';
    } else {

        show.innerHTML="Show";
        x.style.display = 'none';
    }
}
function hide_delete(){
    var show=document.getElementById("hide2");
    var x=document.getElementById("deleted");
    if (x.style.display === 'none') {
        show.innerHTML="Hide deleted items";
        console.log("in hiding");
        x.style.display = 'block';
    } else {

        show.innerHTML="Show";
        x.style.display = 'none';
    }
}