document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const tipoReceita = document.getElementById('tipoReceita');
    const camposEspeciais = document.getElementById('camposEspeciais');
    const btnSimples = document.getElementById('btnSimples');
    const btnEspecial = document.getElementById('btnEspecial');
    const receituarioForm = document.getElementById('receituarioForm');
    const btnShare = document.getElementById('btnShare');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    // Mostrar/ocultar campos especiais
    function toggleCamposEspeciais() {
        if (tipoReceita.value === 'especial') {
            camposEspeciais.classList.remove('hidden');
        } else {
            camposEspeciais.classList.add('hidden');
        }
    }

    // Habilitar/desabilitar botão de compartilhamento
    function toggleShareButton() {
        const formValid = receituarioForm.checkValidity();
        btnShare.disabled = !formValid;
    }

    // Gerar conteúdo para impressão
    function gerarConteudoParaImpressao() {
        const today = new Date();
        const dataFormatada = today.toLocaleDateString('pt-BR');
        
        let conteudo = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Receituário OlimpioVet</title>
                <meta charset="UTF-8">
                <style>
                    body { 
                        font-family: Arial, sans-serif; 
                        font-size: 12pt; 
                        line-height: 1.5; 
                        padding: 1cm; 
                        color: #333;
                    }
                    .print-header { 
                        display: flex; 
                        align-items: center; 
                        margin-bottom: 15pt; 
                    }
                    .print-logo { 
                        height: 50pt; 
                        margin-right: 15pt; 
                    }
                    .print-title { 
                        font-size: 16pt; 
                        color: #2a5c8d; 
                        margin: 0; 
                    }
                    .print-subtitle { 
                        font-size: 12pt; 
                        color: #4a8cbf; 
                        margin: 3pt 0 0 0; 
                        font-weight: bold; 
                    }
                    .print-divider { 
                        border-top: 1pt solid #2a5c8d; 
                        margin: 10pt 0; 
                    }
                    .print-vet-info { 
                        font-size: 11pt; 
                        margin-bottom: 15pt; 
                    }
                    .print-section { 
                        margin-bottom: 15pt; 
                    }
                    .print-section h2 { 
                        font-size: 14pt; 
                        color: #2a5c8d; 
                        margin-bottom: 8pt; 
                        border-bottom: 1pt solid #eee; 
                        padding-bottom: 3pt; 
                    }
                    .print-row { 
                        display: flex; 
                        margin-bottom: 5pt; 
                        font-size: 11pt; 
                    }
                    .print-label { 
                        font-weight: bold; 
                        min-width: 80pt; 
                        display: inline-block; 
                    }
                    .print-content { 
                        font-size: 11pt; 
                        white-space: pre-line; 
                        line-height: 1.5; 
                    }
                    .print-footer { 
                        margin-top: 30pt; 
                        padding-top: 15pt; 
                        border-top: 1pt solid #eee; 
                        display: flex; 
                        flex-direction: column; 
                        align-items: center;
                    }
                    .print-date { 
                        font-size: 11pt; 
                        margin-bottom: 15pt; 
                    }
                    .signature-container { 
                        text-align: center; 
                        margin-top: 40pt;
                    }
                    .signature-line { 
                        border-top: 1pt solid #000; 
                        width: 200pt; 
                        margin: 0 auto 5pt auto; 
                    }
                    .vet-name {
                        font-weight: bold;
                        margin-top: 10pt;
                    }
                    .crmv {
                        font-size: 10pt;
                    }
                </style>
            </head>
            <body>
                <div class="print-header">
                    <img src="LOGO_OLIMPIO_VET_azul.png" class="print-logo" alt="OlimpioVet">
                    <div>
                        <h1 class="print-title">OlimpioVet</h1>
                        <p class="print-subtitle">CLÍNICA E CIRURGIA ESPECIALIZADA</p>
                    </div>
                </div>
                
                <div class="print-divider"></div>
                
                <div class="print-vet-info">
                    <p>Gevaelsom de Oliveira Olimpio</p>
                    <p>CRMV-MA 2275</p>
                </div>
                
                <div class="print-section">
                    <h2>DADOS DO PACIENTE</h2>
                    <div class="print-row">
                        <span class="print-label">Tutor:</span>
                        <span>${document.getElementById('nomeTutor').value}</span>
                    </div>
                    <div class="print-row">
                        <span class="print-label">Animal:</span>
                        <span>${document.getElementById('nomeAnimal').value}</span>
                    </div>
        `;

        // Adicionar campos especiais se necessário
        if (tipoReceita.value === 'especial') {
            conteudo += `
                    <div class="print-row">
                        <span class="print-label">Espécie:</span>
                        <span>${document.getElementById('especie').value}</span>
                    </div>
                    <div class="print-row">
                        <span class="print-label">Raça:</span>
                        <span>${document.getElementById('raca').value}</span>
                    </div>
                    <div class="print-row">
                        <span class="print-label">Endereço:</span>
                        <span>${document.getElementById('endereco').value}</span>
                    </div>
                    <div class="print-row">
                        <span class="print-label">Peso:</span>
                        <span>${document.getElementById('peso').value}</span>
                        <span style="margin-left: 30pt;" class="print-label">Idade:</span>
                        <span>${document.getElementById('idade').value}</span>
                    </div>
            `;
        }

        conteudo += `
                </div>
                
                <div class="print-section">
                    <h2>PRESCRIÇÃO</h2>
                    <div class="print-content">${document.getElementById('prescricao').value.replace(/\n/g, '<br>')}</div>
                </div>
                
                <div class="print-section">
                    <h2>RECOMENDAÇÕES</h2>
                    <div class="print-content">${document.getElementById('recomendacoes').value.replace(/\n/g, '<br>')}</div>
                </div>
                
                <div class="print-footer">
                    <div class="print-date">
                        <span class="print-label">Data:</span>
                        <span>${dataFormatada}</span>
                    </div>
                    <div class="signature-container">
                        <div class="signature-line"></div>
                        <p class="vet-name">Gevaelsom de Oliveira Olimpio</p>
                        <p class="crmv">CRMV-MA 2275</p>
                    </div>
                </div>
            </body>
            </html>
        `;

        return conteudo;
    }

    // Compartilhar receituário
    async function compartilharReceituario() {
        try {
            const prescricao = document.getElementById('prescricao').value;
            const recomendacoes = document.getElementById('recomendacoes').value;
            const nomeAnimal = document.getElementById('nomeAnimal').value;
            
            let texto = `*Receituário Veterinário - ${nomeAnimal}*\n\n`;
            texto += `*Tutor:* ${document.getElementById('nomeTutor').value}\n`;
            
            if (tipoReceita.value === 'especial') {
                texto += `*Espécie:* ${document.getElementById('especie').value}\n`;
                texto += `*Raça:* ${document.getElementById('raca').value}\n`;
                texto += `*Peso:* ${document.getElementById('peso').value}\n`;
                texto += `*Idade:* ${document.getElementById('idade').value}\n\n`;
            }
            
            texto += `*Prescrição:*\n${prescricao}\n\n`;
            texto += `*Recomendações:*\n${recomendacoes || 'Nenhuma recomendação adicional'}\n\n`;
            texto += `_Gevaelsom de Oliveira Olimpio_\n_CRMV-MA 2275_`;
            
            if (navigator.share) {
                await navigator.share({
                    title: `Receituário - ${nomeAnimal}`,
                    text: texto
                });
            } else {
                // Fallback para navegadores que não suportam a API de compartilhamento
                const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(texto)}`;
                window.open(whatsappUrl, '_blank');
            }
        } catch (error) {
            console.error('Erro ao compartilhar:', error);
        }
    }

    // Event listeners
    tipoReceita.addEventListener('change', toggleCamposEspeciais);
    
    btnSimples.addEventListener('click', function(e) {
        e.preventDefault();
        tipoReceita.value = 'simples';
        toggleCamposEspeciais();
        btnSimples.classList.add('active');
        btnEspecial.classList.remove('active');
    });
    
    btnEspecial.addEventListener('click', function(e) {
        e.preventDefault();
        tipoReceita.value = 'especial';
        toggleCamposEspeciais();
        btnEspecial.classList.add('active');
        btnSimples.classList.remove('active');
    });

    // Validar formulário para habilitar compartilhamento
    receituarioForm.addEventListener('input', toggleShareButton);
    
    // Compartilhar receituário
    btnShare.addEventListener('click', compartilharReceituario);
    
    // Menu mobile
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });

    // Gerar receituário para impressão
    receituarioForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Gerar conteúdo HTML para impressão
        const conteudoImpressao = gerarConteudoParaImpressao();
        
        // Abrir nova janela para impressão
        const janelaImpressao = window.open('', '_blank');
        janelaImpressao.document.open();
        janelaImpressao.document.write(conteudoImpressao);
        janelaImpressao.document.close();
        
        // Esperar o conteúdo carregar e acionar impressão
        janelaImpressao.onload = function() {
            setTimeout(() => {
                janelaImpressao.print();
            }, 500);
        };
        
        // Habilitar botão de compartilhamento
        btnShare.disabled = false;
    });

    // Inicializar
    toggleCamposEspeciais();
    toggleShareButton();
});