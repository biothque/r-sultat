/**
 * SECTION 1 : INJECTION DU HTML DANS LA PAGE
 * On crée l'interface de recherche dynamiquement.
 */
const searchSection = document.getElementById('section-search');

searchSection.innerHTML = `
    <div class="form-container">
        <h2 style="color: var(--vert-agricole); margin-bottom: 20px;">
            Vérification des Résultats
        </h2>
        
        <input type="text" id="input-matricule" class="input-field" 
               placeholder="Entrez votre matricule (ex: 1025)">
        
        <button class="btn-search" id="btn-rechercher">
            <span style="margin-right:10px;">🔍</span> Rechercher mon résultat
        </button>
        
        <p id="message-chargement" style="display:none; margin-top:15px; color: #666;">
            Vérification en cours...
        </p>
    </div>
`;

/**
 * SECTION 2 : LOGIQUE DE FONCTIONNEMENT DU BOUTON
 * Ce code s'exécute quand l'élève clique sur le bouton.
 */
const btn = document.getElementById('btn-rechercher');
const inputField = document.getElementById('input-matricule');
const loader = document.getElementById('message-chargement');

btn.addEventListener('click', async () => {
    const matricule = inputField.value.trim(); // .trim() enlève les espaces inutiles

    // 1. Vérification si le champ est vide
    if (!matricule) {
        alert("Veuillez saisir votre matricule unique.");
        return;
    }

    // Affichage d'un petit message de chargement
    loader.style.display = "block";
    btn.disabled = true; // On désactive le bouton pour éviter les doubles clics

    try {
        /**
         * 2. APPEL À L'API DYNAMIQUE
         * Remplacez 'votre-domaine.com' par votre adresse cPanel réelle.
         */
        const response = await fetch(`http://votre-domaine.com:3000/api/resultats/${matricule}`);
        const data = await response.json();

        if (response.status === 200) {
            /**
             * CAS : FINANCES OK
             * L'API a envoyé l'objet complet car la colonne finances est 'ok'.
             */
            sessionStorage.setItem('donneesEleve', JSON.stringify(data));
            alert("✅ Résultat trouvé ! Transfert vers votre bulletin...");
            window.location.href = "resultats.html";
        } 
        else if (response.status === 403) {
            /**
             * CAS : BLOCAGE FINANCIER
             * L'API a trouvé l'élève mais la colonne finances n'est pas 'ok'.
             */
            alert("⚠️ " + data.message);
        } 
        else if (response.status === 404) {
            /**
             * CAS : MATRICULE INCONNU
             */
            alert("❌ Aucun élève trouvé avec le matricule : " + matricule);
        }

    } catch (error) {
        /**
         * CAS : PROBLÈME DE SERVEUR
         */
        console.error("Erreur de connexion :", error);
        alert("Impossible de joindre le serveur. Vérifiez votre connexion internet.");
    } finally {
        // On remet l'interface à l'état normal
        loader.style.display = "none";
        btn.disabled = false;
    }
});
