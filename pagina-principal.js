document.addEventListener("DOMContentLoaded", function () {
    const containerAtletas = document.getElementById("container-atletas");
    const filtroElenco = document.getElementById("filtro-elenco");
    const filtroNome = document.getElementById("filtro-nome");
    const botaoSair = document.getElementById("botao-sair");

    let atletasCache = [];

    function carregarAtletas(endpoint) {
        fetch(endpoint)
            .then(response => response.json())
            .then(data => {
                atletasCache = data;
                renderizarAtletas(atletasCache);
            })
            .catch(error => {
                console.error("Erro ao carregar atletas:", error);
                containerAtletas.innerHTML = `<p class="erro">Erro ao carregar atletas: ${error.message}</p>`;
            });
    }

    function renderizarAtletas(atletas) {
        containerAtletas.innerHTML = "";

        if (!atletas.length) {
            containerAtletas.innerHTML = "<p class='erro'>Nenhum atleta encontrado.</p>";
            return;
        }

        atletas.forEach(atleta => {
            const fotoAtleta = atleta.foto && atleta.foto.startsWith("http") ? atleta.foto : `https://botafogo-atletas.mange.li/static/2024-1/${atleta.id}.png`;

            const card = document.createElement("div");
            card.className = "card-atleta";
            card.innerHTML = `
                <img src="${fotoAtleta}" alt="${atleta.nome}" class="foto-atleta">
                <div class="detalhes-atleta">
                    <h2 class="nome-atleta">${atleta.nome}</h2>
                    <p class="posicao-atleta">Posição: ${atleta.posicao}</p>
                    <a href="detalhes.html?id=${atleta.id}" class="link-detalhes">Ver Detalhes</a>
                </div>
            `;
            containerAtletas.appendChild(card);
        });
    }

    filtroElenco.addEventListener("change", function () {
        let endpoint;
        switch (filtroElenco.value) {
            case "masculino":
                endpoint = "https://botafogo-atletas.mange.li/2024-1/masculino";
                break;
            case "feminino":
                endpoint = "https://botafogo-atletas.mange.li/2024-1/feminino";
                break;
            default:
                endpoint = "https://botafogo-atletas.mange.li/2024-1/all";
        }
        carregarAtletas(endpoint);
    });

    filtroNome.addEventListener("input", function () {
        const termo = filtroNome.value.toLowerCase();
        const atletasFiltrados = atletasCache.filter(atleta =>
            atleta.nome.toLowerCase().includes(termo)
        );
        renderizarAtletas(atletasFiltrados);
    });

    carregarAtletas("https://botafogo-atletas.mange.li/2024-1/all");
});
    const botaoSair = document.getElementById("botao-sair");
    botaoSair.addEventListener("click", function() {
    sessionStorage.removeItem("logado");
    window.location.href = "index.html";
});