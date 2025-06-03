// Script para calcular os dias restantes
function calcularDiasRestantes() {
    const dataCasamento = new Date("2025-11-08T00:00:00"); // ATENÇÃO: Mês é 0-11, então Novembro é 10
    const hoje = new Date();

    // Zerar horas, minutos, segundos e milissegundos para comparar apenas as datas
    dataCasamento.setHours(0, 0, 0, 0);
    hoje.setHours(0, 0, 0, 0);

    const diferencaEmMilissegundos = dataCasamento.getTime() - hoje.getTime();
    const dias = Math.ceil(diferencaEmMilissegundos / (1000 * 60 * 60 * 24));

    const elementoDias = document.getElementById("dias_restantes");
    if (elementoDias) {
        if (dias > 0) {
            elementoDias.textContent = dias;
        } else if (dias === 0) {
            elementoDias.textContent = "HOJE";
            // Ocultar "dias para o grande dia!" e mostrar "É o grande dia!"
            const pCountdown = document.querySelector('header p.countdown');
            if(pCountdown) {
                pCountdown.innerHTML = 'É o <span id="dias_restantes">GRANDE</span> dia!';
            }
        } else {
            elementoDias.textContent = ""; // Ou alguma mensagem de "Casamento realizado"
            const pCountdown = document.querySelector('header p.countdown');
            if(pCountdown) {
                pCountdown.textContent = "Casamento realizado! Obrigado por fazer parte!";
            }
        }
    }
}

// Script para o ano atual no rodapé
function definirAnoAtual() {
    const elementoAno = document.getElementById("ano_atual");
    if (elementoAno) {
        elementoAno.textContent = new Date().getFullYear();
    }
}

// Chamar as funções quando a página carregar
window.onload = function() {
    lucide.createIcons(); // Garante que os ícones Lucide sejam renderizados
    calcularDiasRestantes();
    definirAnoAtual();

    const botaoCopiar = document.getElementById("btnCopiarPix");
    const chavePixElement = document.getElementById("chavePixParaCopiar");

    if (botaoCopiar && chavePixElement) {
        botaoCopiar.addEventListener("click", function() {
            const textoChave = chavePixElement.textContent || chavePixElement.innerText;

            // Tenta usar a API de Clipboard moderna
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(textoChave).then(function() {
                    // Sucesso: ícone de checkmark
                    const originalIcon = botaoCopiar.innerHTML; // Salva o ícone original
                    botaoCopiar.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg>`;
                    botaoCopiar.disabled = true; // Desabilita o botão
                    setTimeout(function() {
                        botaoCopiar.innerHTML = originalIcon; // Restaura o ícone original
                        lucide.createIcons(); // Recria o ícone Lucide
                        botaoCopiar.disabled = false; // Reabilita o botão
                    }, 2000);
                }).catch(function(err) {
                    console.error('Erro ao copiar com API Clipboard: ', err);
                    alert('Não foi possível copiar a chave. Tente manualmente.');
                });
            } else {
                // Fallback para navegadores mais antigos (cria um textarea temporário)
                const tempTextArea = document.createElement('textarea');
                tempTextArea.value = textoChave;
                tempTextArea.style.position = 'absolute';
                tempTextArea.style.left = '-9999px'; // Esconde fora da tela
                document.body.appendChild(tempTextArea);
                tempTextArea.select();
                tempTextArea.setSelectionRange(0, 99999); // Para dispositivos móveis

                try {
                    document.execCommand('copy');
                    const originalIcon = botaoCopiar.innerHTML; // Salva o ícone original
                    botaoCopiar.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg>`;
                    botaoCopiar.disabled = true;
                    setTimeout(function() {
                        botaoCopiar.innerHTML = originalIcon;
                        lucide.createIcons(); // Recria o ícone Lucide
                        botaoCopiar.disabled = false;
                    }, 2000);
                } catch (err) {
                    console.error('Erro ao copiar com document.execCommand: ', err);
                    alert('Não foi possível copiar a chave (fallback). Tente manualmente.');
                }
                document.body.removeChild(tempTextArea);
            }
        });
    }
};
