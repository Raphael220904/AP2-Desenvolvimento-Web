const login = () => {
    const hash = 'fd829c2f2feb4f3dbb821e8afb475f9cdf1bc80353e515457c1156f7655da038'; 
    const senha = document.getElementById('input-senha').value;

    if (hash === hex_sha256(senha)) {
        sessionStorage.setItem('logado', 'sim');
        window.location = 'pagina-principal.html';
    } else {
        alert("Senha incorreta, tente novamente");
    }
};

document.getElementById('botao-login').addEventListener('click', login);
