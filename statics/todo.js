function checkTask(id){
    const task = document.getElementById(id);
    task.checked = true;
    task.parentElement.style.color = 'grey';
    var xhr = new XMLHttpRequest();
    xhr.open("POST", '/taskDone', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
    id: id
    }));
}