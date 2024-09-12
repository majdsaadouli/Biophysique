function verifierRepetabilite() {
    const kvMesurees = Array.from({ length: 5 }, (_, i) => parseFloat(document.getElementById(`kv_mesuree${i + 1}`).value));
    const seuilRep = 5;

    const [repCriteres, moyKVMesuree] = calculerRepCriteres(kvMesurees);
    const resultatRep = repCriteres < seuilRep ? 'conforme' : 'non conforme';

    afficherResultats(repCriteres, moyKVMesuree, resultatRep);
}

function calculerRepCriteres(kvMesurees) {
    try {
        const maxKVMesuree = Math.max(...kvMesurees);
        const minKVMesuree = Math.min(...kvMesurees);
        const moyKVMesuree = kvMesurees.reduce((sum, kv) => sum + kv, 0) / kvMesurees.length;
        const repCriteres = ((maxKVMesuree - minKVMesuree) / moyKVMesuree) * 100;

        return [repCriteres, moyKVMesuree];
    } catch (error) {
        console.error(error);
        return [null, null];
    }
}

function afficherResultats(repCriteres, moyKVMesuree, resultatRep) {
    const resultatsContainer = document.getElementById('resultatsContainer');

    if (resultatsContainer) {
        resultatsContainer.innerHTML = `
            <h3>Résultats du critère de répétabilité :</h3>
            <p>Critère de répétabilité : ${repCriteres !== null ? repCriteres.toFixed(2) + '%' : 'N/A'}</p>
            <p>Moyenne des KV Mesurées : ${moyKVMesuree !== null ? moyKVMesuree.toFixed(2) : 'N/A'}</p>

            <h3>Résultat global :</h3>
            <p class="${resultatRep === 'conforme' ? 'conforme' : 'non-conforme'}">${resultatRep.charAt(0).toUpperCase() + resultatRep.slice(1)}</p>
        `;
    } else {
        console.error("L'élément avec l'ID 'resultatsContainer' n'existe pas dans la page HTML.");
    }
}

function tracerCourbeRep() {
    // Récupérer les valeurs de KV mesurées depuis les champs de saisie
    const kvMesuree1 = parseFloat(document.getElementById('kv_mesuree1').value);
    const kvMesuree2 = parseFloat(document.getElementById('kv_mesuree2').value);
    const kvMesuree3 = parseFloat(document.getElementById('kv_mesuree3').value);
    const kvMesuree4 = parseFloat(document.getElementById('kv_mesuree4').value);
    const kvMesuree5 = parseFloat(document.getElementById('kv_mesuree5').value);

    // Récupérer le contexte du canvas
    const ctx = document.getElementById('myChartRep').getContext('2d');

    // Données pour la courbe
    const data = [
        { x: 1, y: kvMesuree1 },
        { x: 2, y: kvMesuree2 },
        { x: 3, y: kvMesuree3 },
        { x: 4, y: kvMesuree4 },
        { x: 5, y: kvMesuree5 }
    ];

    // Tracer la courbe
    const myChartRep = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [{
                label: 'Courbe de Répétabilité',
                data: data,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                pointRadius: 5,
                pointBackgroundColor: 'rgba(75, 192, 192, 1)',
                fill: false
            }]
        },
        options: {
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom',
                    scaleLabel: {
                        display: true,
                        labelString: 'Numéro de mesure'
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


