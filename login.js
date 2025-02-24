document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita o recarregamento da página

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("error-message");

    // Usuário e senha fixos (substitua por um sistema real de autenticação)
    const validUsername = "admin";
    const validPassword = "1234";

    if (username === validUsername && password === validPassword) {
        window.location.href = "index.html"; // Redireciona para a página principal
    } else {
        errorMessage.textContent = "Usuário ou senha incorretos!";
    }
});
