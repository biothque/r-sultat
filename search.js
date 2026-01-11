const searchSection = document.getElementById('section-search');
searchSection.innerHTML = `
    <div class="form-container">
        <h2>Rechercher vos résultats</h2>
        <input type="text" class="input-field" placeholder="Saisissez votre nom au complet">
        <input type="number" class="input-field" placeholder="Saisissez l'année">
        
        <button class="btn-search">
            <span style="margin-right:10px;">🔍</span> Rechercher
        </button>
    </div>
`;
