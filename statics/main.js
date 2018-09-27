function showLogin() {
    const login = document.getElementById('login');
    const create = document.getElementById('create');
    login.style.display = 'inline-block';
    create.style.display = 'none';
}
function showCreate() {
    const login = document.getElementById('login');
    const create = document.getElementById('create');
    login.style.display = 'none';
    create.style.display = 'inline-block';
}