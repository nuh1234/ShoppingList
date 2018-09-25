function checkTask(id){
    const task = document.getElementById(id);
    if(task.checked === 'true') {
        task.checked = true;
        task.parentElement.style.color = 'red';
    } else {
        task.parentElement.style.color = 'red';
        task.checked = false;
    }
  }