function verifierAcceptabilite() {
    const kvAffichee1 = parseFloat(document.getElementById('kv_affichee1').value);
    const kvMesuree1 = parseFloat(document.getElementById('kv_mesuree1').value);

    const kvAffichee2 = parseFloat(document.getElementById('kv_affichee2').value);
    const kvMesuree2 = parseFloat(document.getElementById('kv_mesuree2').value);

    const kvAffichee3 = parseFloat(document.getElementById('kv_affichee3').value);
    const kvMesuree3 = parseFloat(document.getElementById('kv_mesuree3').value);

    

    const critere1 = critereAcceptabilite(kvAffichee1, kvMesuree1);
    const critere2 = critereAcceptabilite(kvAffichee2, kvMesuree2);
    const critere3 = critereAcceptabilite(kvAffichee3, kvMesuree3);

    // Ajoutez le résultat actuel à l'historique
    historiqueTests.push({
        critere1: critereAcceptabilite(kvAffichee1, kvMesuree1),
        critere2: critereAcceptabilite(kvAffichee2, kvMesuree2),
        critere3: critereAcceptabilite(kvAffichee3, kvMesuree3),
        resultatGlobal:(critere1 < 10 && critere2 < 10 && critere3 < 10) ? 'Conforme' : 'Non conforme',
    });

    afficherResultat(critere1, 'resultat1');
    afficherResultat(critere2, 'resultat2');
    afficherResultat(critere3, 'resultat3');

    // Calculer le résultat global de conformité
    const resultatGlobal = (critere1 < 10 && critere2 < 10 && critere3 < 10) ? 'Conforme' : 'Non conforme';
    afficherResultat(resultatGlobal, 'resultatGlobal');
}

function critereAcceptabilite(kvAffichee, kvMesuree) {
    const critereAcceptabilite = Math.abs((kvMesuree - kvAffichee) / kvAffichee) * 100;
    return critereAcceptabilite.toFixed(2);
}

function afficherResultat(resultat, resultatId) {
    const resultatDiv = document.getElementById(resultatId);

    if (resultatDiv) {
        resultatDiv.innerHTML = `<p>Valeur du critère : ${resultat}%</p>`;
    } else {
        console.error(`L'élément avec l'ID '${resultatId}' n'existe pas dans la page HTML.`);
    }
}


function tracerCourbe() {
    // Récupérer les valeurs de KV affichée et mesurée
    const kvAffichee1 = parseFloat(document.getElementById('kv_affichee1').value);
    const kvMesuree1 = parseFloat(document.getElementById('kv_mesuree1').value);
    const kvAffichee2 = parseFloat(document.getElementById('kv_affichee2').value);
    const kvMesuree2 = parseFloat(document.getElementById('kv_mesuree2').value);
    const kvAffichee3 = parseFloat(document.getElementById('kv_affichee3').value);
    const kvMesuree3 = parseFloat(document.getElementById('kv_mesuree3').value);

    // Récupérer le contexte du canvas
    const ctx = document.getElementById('myChart').getContext('2d');

    // Points pour la ligne diagonale y = x
    const diagonalLine = [
        { x: 0, y: 0 },
        { x: 100, y: 100 }  // Ajustez la plage si nécessaire
    ];

    // Tracer la courbe
    const myChart = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [
                {
                    label: 'Courbe KV Mesurée en fonction de KV Affichée',
                    data: [
                        { x: kvAffichee1, y: kvMesuree1 },
                        { x: kvAffichee2, y: kvMesuree2 },
                        { x: kvAffichee3, y: kvMesuree3 },
                        // ... (ajoutez les autres points de données de manière similaire)
                    ],
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 2
                },
                {
                    type: 'line',
                    label: 'y = x',
                    data: diagonalLine,
                    borderColor: 'rgba(255, 0, 0, 1)',
                    borderWidth: 2,
                    fill: false
                }
            ]
        },
        options: {
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom',
                    scaleLabel: {
                        display: true,
                        labelString: 'KV Affichée'
                    }
                },
                y: {
                    type: 'linear',
                    position: 'left',
                    scaleLabel: {
                        display: true,
                        labelString: 'KV Mesurée'
                    }
                }
            }
        }
    });
}
function afficherHistorique() {
    const historiqueDiv = document.getElementById('historiqueDiv');

    if (historiqueDiv) {
        let historiqueHTML = '<h2>Historique des tests</h2>';
        historiqueTests.forEach((test, index) => {
            historiqueHTML += `<p>Test ${index + 1} : Critère 1 - ${test.critere1}, Critère 2 - ${test.critere2}, Critère 3 - ${test.critere3}</p>`;
        });

        historiqueDiv.innerHTML = historiqueHTML;
    } else {
        console.error("L'élément avec l'ID 'historiqueDiv' n'existe pas dans la page HTML.");
    }
}

// Ajoutez cette variable globale en dehors de toute fonction
let historiqueTests = [];

