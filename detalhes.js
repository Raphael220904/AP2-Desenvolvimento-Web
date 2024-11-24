document.addEventListener("DOMContentLoaded", function () {
    const logado = sessionStorage.getItem("logado");

    if (logado !== 'sim') {
        window.location.href = "index.html";
    }

    const params = new URLSearchParams(window.location.search);
    const atletaId = params.get("id");
    const detalhesContainer = document.getElementById("detalhes-atleta");

    fetch(`https://botafogo-atletas.mange.li/2024-1/${atletaId}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const fotoAtleta = data.foto && data.foto.startsWith("http") ? data.foto : `https://botafogo-atletas.mange.li/static/2024-1/${data.id}.png`

            detalhesContainer.innerHTML = `
                <h1>${data.nome}</h1>
                <img src="${fotoAtleta}" alt="Foto de ${data.nome}" class="foto-atleta">             
                <p><strong>Posição:</strong> ${data.posicao}</p>
                <p><strong>Descrição:</strong> ${data.detalhes || "Descrição não disponível"}</p>
                <p><strong>Jogos pelo Botafogo:</strong> ${data.n_jogos || "Dados não disponíveis"}</p>
                <p><strong>Nascimento:</strong> ${data.nascimento || "Dados não disponíveis"}</p>
                <p><strong>Altura:</strong> ${data.altura || "Dados não disponíveis"}</p>
                <p><strong>Naturalidade:</strong> ${data.naturalidade || "Dados não disponíveis"}</p>
            `;
        })
        .catch(() => {
            detalhesContainer.innerHTML = "<p>Erro ao carregar os detalhes do atleta.</p>";
        });
});
