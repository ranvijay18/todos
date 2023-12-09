var form = document.getElementById('form');
var itemList = document.getElementById('notDone');
var itemList1 = document.getElementById('done');
form.addEventListener('submit', store);

window.addEventListener('DOMContentLoaded' , () => {
  axios.get('https://crudcrud.com/api/6ac19c8d8ad8424bae0d78b5564f1c60/todos')
  .then((res) => {

    let data = Object.values(res.data);

    data.forEach(ele => {
      showOnScreen(ele)
    });
    
  });
})

var doneBtn;
var deleteBtn;

showOnScreen = (res) => {


    if(res['isDone'] === false){
  var li = document.createElement('li');
  var detail = res['task'] + ", " + res['des'];
  li.appendChild(document.createTextNode(detail));
  document.getElementById("notDone").appendChild(li);



  doneBtn = document.createElement('button');
  doneBtn.className = 'btn btn-success btn-sm done';
  doneBtn.appendChild(document.createTextNode('Done'));
  li.appendChild(doneBtn);
  
  deleteBtn = document.createElement('button');
  deleteBtn.className = 'btn btn-danger btn-sm delete';
  deleteBtn.appendChild(document.createTextNode('Delete'));
  li.appendChild(deleteBtn);


  doneBtn.addEventListener('click' , done);
  deleteBtn.addEventListener('click' , deleteTask);


  function done(){
    
    axios.put('https://crudcrud.com/api/6ac19c8d8ad8424bae0d78b5564f1c60/todos/' + res['_id'], {
      task: res['task'],
      des: res['des'],
      isDone: true
    })
    .then(() => {
        var list = document.createElement('li');
        var details = res['task'] + ", " + res['des'];
        list.appendChild(document.createTextNode(details));
        document.getElementById("done").appendChild(list);})
    itemList.removeChild(li);
  }
  
  
  function deleteTask(){
  
    axios.delete('https://crudcrud.com/api/6ac19c8d8ad8424bae0d78b5564f1c60/todos/' + res['_id'])
    itemList.removeChild(li);
  }

    }else{
  var list = document.createElement('li');
  var details = res['task'] + ", " + res['des'];
  list.appendChild(document.createTextNode(details));
  document.getElementById("done").appendChild(list);
    }

 }







function store(e){
    e.preventDefault();
    let task = document.getElementById('task').value;
    let des = document.getElementById('des').value;
    let isDone = false;
    let myobj = {
        task,
        des,
        isDone 
    }

    axios.post('https://crudcrud.com/api/6ac19c8d8ad8424bae0d78b5564f1c60/todos',myobj)
    .then(res => showOnScreen(res.data))
}