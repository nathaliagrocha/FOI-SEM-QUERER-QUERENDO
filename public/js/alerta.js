var alertas = [];

// Busca dados de medida em tempo real para um aquário específico
function obterdados(idAquario) {
    fetch(`/medidas/tempo-real/${idAquario}`)
        .then(resposta => {
            if (resposta.status == 200) {
                resposta.json().then(resposta => {

                    console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                    alertar(resposta, idAquario);
                });
            } else {
                console.error(`Nenhum dado encontrado para o id ${idAquario} ou erro na API`);
            }
        })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados do aquario p/ gráfico: ${error.message}`);
        });

}

// Analisa a temperatura e decide nível de alerta, atualiza estado global
function alertar(resposta, idAquario) {
    var temp = resposta[0].temperatura;

    var grauDeAviso = '';

    var limites = {
        muito_quente: 23,
        quente: 22,
        ideal: 20,
        frio: 10,
        muito_frio: 5
    };

    var classe_temperatura = 'cor-alerta';

    if (temp >= limites.muito_quente) {
        classe_temperatura = 'cor-alerta perigo-quente';
        grauDeAviso = 'perigo quente'
        grauDeAvisoCor = 'cor-alerta perigo-quente'
        exibirAlerta(temp, idAquario, grauDeAviso, grauDeAvisoCor)
    }
    else if (temp < limites.muito_quente && temp >= limites.quente) {
        classe_temperatura = 'cor-alerta alerta-quente';
        grauDeAviso = 'alerta quente'
        grauDeAvisoCor = 'cor-alerta alerta-quente'
        exibirAlerta(temp, idAquario, grauDeAviso, grauDeAvisoCor)
    }
    else if (temp < limites.quente && temp > limites.frio) {
        classe_temperatura = 'cor-alerta ideal';
        removerAlerta(idAquario);
    }
    else if (temp <= limites.frio && temp > limites.muito_frio) {
        classe_temperatura = 'cor-alerta alerta-frio';
        grauDeAviso = 'alerta frio'
        grauDeAvisoCor = 'cor-alerta alerta-frio'
        exibirAlerta(temp, idAquario, grauDeAviso, grauDeAvisoCor)
    }
    else if (temp <= limites.muito_frio) {
        classe_temperatura = 'cor-alerta perigo-frio';
        grauDeAviso = 'perigo frio'
        grauDeAvisoCor = 'cor-alerta perigo-frio'
        exibirAlerta(temp, idAquario, grauDeAviso, grauDeAvisoCor)
    }

    var card;

    if (document.getElementById(`temp_aquario_${idAquario}`) != null) {
        document.getElementById(`temp_aquario_${idAquario}`).innerHTML = temp + "°C";
    }

    if (document.getElementById(`card_${idAquario}`)) {
        card = document.getElementById(`card_${idAquario}`)
        card.className = classe_temperatura;
    }
}

// Adiciona/atualiza alerta na lista global e renderiza os cards
function exibirAlerta(temp, idAquario, grauDeAviso, grauDeAvisoCor) {
    var indice = alertas.findIndex(item => item.idAquario == idAquario);

    if (indice >= 0) {
        alertas[indice] = { idAquario, temp, grauDeAviso, grauDeAvisoCor }
    } else {
        alertas.push({ idAquario, temp, grauDeAviso, grauDeAvisoCor });
    }

    exibirCards();
}

// Remove alerta da lista global
function removerAlerta(idAquario) {
    alertas = alertas.filter(item => item.idAquario != idAquario);
    exibirCards();
}

// Renderiza os cards de alerta no elemento 'alerta' (assume existência no DOM)
function exibirCards() {
    alerta.innerHTML = '';

    for (var i = 0; i < alertas.length; i++) {
        var mensagem = alertas[i];
        alerta.innerHTML += transformarEmDiv(mensagem);
    }
}

// Converte objeto de alerta em bloco HTML (string)
function transformarEmDiv({ idAquario, temp, grauDeAviso, grauDeAvisoCor }) {

    var descricao = JSON.parse(sessionStorage.AQUARIOS).find(item => item.id == idAquario).descricao;
    return `
    <div class="mensagem-alarme">
        <div class="informacao">
            <div class="${grauDeAvisoCor}">&#12644;</div> 
            <h3>${descricao} está em estado de ${grauDeAviso}!</h3>
            <small>Temperatura capturada: ${temp}°C.</small>   
        </div>
        <div class="alarme-sino"></div>
    </div>
    `;
}

// Loop periódico que busca atualizações para todos os aquários armazenados na session
function atualizacaoPeriodica() {
    JSON.parse(sessionStorage.AQUARIOS).forEach(item => {
        obterdados(item.id)
    });
    setTimeout(atualizacaoPeriodica, 5000);
}
