document.addEventListener('DOMContentLoaded', function() {
    // Banco de dados de medicamentos veterinários
    const medicamentosVeterinarios = {
        antiinflamatorios: [
            "Carprofeno 4mg/kg VO a cada 24h - Antiinflamatório não esteroidal",
            "Meloxicam 0,2mg/kg SC/VO a cada 24h - Antiinflamatório não esteroidal",
            "Prednisolona 0,5-1mg/kg VO a cada 12-24h - Corticosteroide"
        ],
        antibioticos: [
            "Amoxicilina + Ác. Clavulânico 12,5mg/kg VO a cada 12h - Antibiótico",
            "Enrofloxacina 5mg/kg VO/SC a cada 24h - Quinolona",
            "Cefalexina 22mg/kg VO a cada 12h - Cefalosporina"
        ],
        antiparasitarios: [
            "Ivermectina 0,2-0,4mg/kg SC (cuidado em collies) - Anti-helmíntico",
            "Praziquantel 5mg/kg VO/SC - Vermífugo"
        ],
        antiemeticos: [
            "Metoclopramida 0,2-0,5mg/kg SC/IV/VO a cada 8h - Antiemético",
            "Maropitant 1mg/kg SC/VO a cada 24h - Antiemético"
        ],
        analgesicos: [
            "Tramadol 2-5mg/kg VO a cada 8-12h - Analgésico opióide",
            "Dipirona 25mg/kg VO/IV a cada 8h - Analgésico não opióide"
        ],
        antifungicos: [
            "Cetoconazol 10mg/kg VO a cada 24h - Antifúngico",
            "Itraconazol 5mg/kg VO a cada 24h - Antifúngico"
        ],
        outros: [
            "Ranitidina 1-2mg/kg VO/IV a cada 12h - Protetor gástrico",
            "Omeprazol 0,5-1mg/kg VO a cada 24h - Inibidor de bomba de prótons"
        ]
    };

    // Criar menu de prescrições pré-definidas
    function criarMenuPrescricoes() {
        const prescricaoTextarea = document.getElementById('prescricao');
        const formGroup = prescricaoTextarea.closest('.form-group');
        
        // Criar container do dropdown
        const dropdownContainer = document.createElement('div');
        dropdownContainer.className = 'prescricao-dropdown';
        
        // Criar botão principal
        const dropdownBtn = document.createElement('button');
        dropdownBtn.className = 'dropdown-btn';
        dropdownBtn.innerHTML = '<i class="fas fa-prescription-bottle-alt"></i> Adicionar Medicamento';
        
        // Criar conteúdo dropdown
        const dropdownContent = document.createElement('div');
        dropdownContent.className = 'dropdown-content';
        
        // Adicionar categorias
        for (const [categoria, medicamentos] of Object.entries(medicamentosVeterinarios)) {
            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'dropdown-category';
            
            const categoryBtn = document.createElement('button');
            categoryBtn.className = 'category-btn';
            categoryBtn.textContent = formatarCategoria(categoria);
            
            const categoryContent = document.createElement('div');
            categoryContent.className = 'category-content';
            
            // Adicionar medicamentos
            medicamentos.forEach(med => {
                const medBtn = document.createElement('button');
                medBtn.className = 'med-btn';
                medBtn.textContent = med;
                
                medBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    adicionarMedicamento(med);
                });
                
                categoryContent.appendChild(medBtn);
            });
            
            categoryBtn.addEventListener('click', (e) => {
                e.preventDefault();
                categoryContent.classList.toggle('show');
                categoryBtn.querySelector('i')?.classList.toggle('fa-chevron-down');
                categoryBtn.querySelector('i')?.classList.toggle('fa-chevron-up');
            });
            
            categoryDiv.appendChild(categoryBtn);
            categoryDiv.appendChild(categoryContent);
            dropdownContent.appendChild(categoryDiv);
        }
        
        dropdownContainer.appendChild(dropdownBtn);
        dropdownContainer.appendChild(dropdownContent);
        formGroup.insertBefore(dropdownContainer, prescricaoTextarea);
        
        // Event listeners
        dropdownBtn.addEventListener('click', (e) => {
            e.preventDefault();
            dropdownContent.classList.toggle('show');
        });
        
        document.addEventListener('click', (e) => {
            if (!dropdownContainer.contains(e.target)) {
                dropdownContent.classList.remove('show');
            }
        });
    }
    
    function formatarCategoria(categoria) {
        const formatacoes = {
            'antiinflamatorios': 'Anti-inflamatórios',
            'antibioticos': 'Antibióticos',
            'antiparasitarios': 'Antiparasitários',
            'antiemeticos': 'Antieméticos',
            'analgesicos': 'Analgésicos',
            'antifungicos': 'Antifúngicos',
            'outros': 'Outros Medicamentos'
        };
        return formatacoes[categoria] || categoria;
    }
    
    function adicionarMedicamento(medicamento) {
        const textarea = document.getElementById('prescricao');
        const textoAtual = textarea.value.trim();
        
        if (textoAtual.includes(medicamento)) {
            alert('Este medicamento já foi adicionado à prescrição');
            return;
        }
        
        textarea.value += (textarea.value ? '\n\n' : '') + medicamento;
        textarea.scrollTop = textarea.scrollHeight;
    }

    // Inicializar o menu de prescrições
    criarMenuPrescricoes();

    // Restante do seu código existente...
});