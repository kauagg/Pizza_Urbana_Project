// Usuário e senha predefinidos para o dono
const predefinedUser = {
    username: 'DONO',
    password: 's123'
};

function toggleForms() {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    loginForm.classList.toggle('hidden');
    signupForm.classList.toggle('hidden');
}

function signup() {
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;

    if (username && password) {
        // Tente obter os usuários do localStorage
        let users;
        try {
            users = JSON.parse(localStorage.getItem('users')) || [];
        } catch (error) {
            console.error('Erro ao ler usuários do localStorage:', error);
            users = []; // Se ocorrer erro, inicia com um array vazio
        }

        // Certifique-se de que users seja um array
        if (!Array.isArray(users)) {
            console.error('users não é um array. Inicializando com um array vazio.');
            users = [];
        }

        const userExists = users.some(user => user.username === username);

        if (userExists) {
            alert('Usuário já cadastrado!');
        } else {
            users.push({ username, password });
            localStorage.setItem('users', JSON.stringify(users));
            alert('Cadastro realizado com sucesso! Faça login.');
            toggleForms();
        }
    } else {
        alert('Preencha todos os campos.');
    }
}


function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    if (username && password) {
        // Verifica se é o dono
        if (username === predefinedUser.username && password === predefinedUser.password) {
            alert(`Bem-vindo, ${username}!`);
            window.location.href = 'index-dono.html'; // Redireciona para a página do dono
        } else {
            // Verifica se é um cliente cadastrado
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(user => user.username === username && user.password === password);

            if (user) {
                alert(`Bem-vindo, ${username}!`);
                window.location.href = 'index-cliente.html'; // Redireciona para a página do cliente
            } else {
                alert('Usuário ou senha incorretos!');
            }
        }
    } else {
        alert('Preencha todos os campos.');
    }
}