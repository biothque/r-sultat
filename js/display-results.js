// 1. Récupérer les données envoyées par l'accueil
const donnees = JSON.parse(sessionStorage.getItem('donneesEleve'));
const zoneAffichage = document.getElementById('table-display');

if (donnees) {
    // Création du bouton de téléchargement
    let html = `<button id="downloadPdf" class="btn-pdf">📥 Télécharger mon Bulletin PDF</button>`;
    
    // Création du tableau dynamique
    html += `<table class="result-table">`;
    for (const [colonne, valeur] of Object.entries(donnees)) {
        if (colonne !== 'finances') { // On cache la colonne finances du tableau
            html += `
                <tr>
                    <td class="label-col">${colonne.toUpperCase()}</td>
                    <td class="value-col">${valeur}</td>
                </tr>`;
        }
    }
    html += `</table>`;
    zoneAffichage.innerHTML = html;

    // Logique du bouton PDF
    document.getElementById('downloadPdf').addEventListener('click', () => {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        // Entête du bulletin
        doc.setFontSize(18);
        doc.setTextColor(34, 139, 34); // Vert agricole
        doc.text("BULLETIN DE RÉSULTATS", 105, 20, { align: "center" });

        // Données du tableau pour le PDF
        const lignesPdf = [];
        for (const [col, val] of Object.entries(donnees)) {
            if (col !== 'finances') lignesPdf.push([col.toUpperCase(), val]);
        }

        doc.autoTable({
            startY: 30,
            head: [['MATIÈRE / INFO', 'RÉSULTAT']],
            body: lignesPdf,
            headStyles: { fillColor: [34, 139, 34] }
        });

        doc.save(`Bulletin_${donnees.matricule}.pdf`);
    });
}
