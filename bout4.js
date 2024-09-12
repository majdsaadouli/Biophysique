let historiqueTests = [];

function testerConformite() {
    // Récupérer les valeurs des couples (mAs, Kerma Mesuré)
    const couples = Array.from({ length: 5 }, (_, i) => ({
        mas: parseFloat(document.getElementById(`mas${i + 1}`).value),
        kermaMesure: parseFloat(document.getElementById(`kermaMesure${i + 1}`).value)
    }));

    // Calculer le rapport (kermaMesure / mAs) pour chaque couple
    const rapports = couples.map(couple => couple.kermaMesure / couple.mas);

    // Calculer la moyenne des rapports et la moyenne des kermaMesuré
    const moyenneRapports = rapports.reduce((sum, rapport) => sum + rapport, 0) / rapports.length;
    const moyenneKermaMesure = couples.reduce((sum, couple) => sum + couple.kermaMesure, 0) / couples.length;

    // Calculer le critère de conformité pour chaque couple
    const criteresConformite = rapports.map(rapport =>
        Math.abs((rapport - moyenneRapports) / moyenneRapports) * 100
    );

    // Vérifier si tous les critères de conformité sont inférieurs à 15%
    const estConforme = criteresConformite.every(critere => critere < 15);

    // Afficher les résultats
    afficherResultats(moyenneRapports, moyenneKermaMesure, criteresConformite, estConforme);

    // Ajouter le résultat au tableau d'historique
    historiqueTests.push({
        moyenneRapports: moyenneRapports.toFixed(2),
        moyenneKermaMesure: moyenneKermaMesure.toFixed(2),
        criteresConformite: criteresConformite.map(critere => critere.toFixed(2)),
        estConforme
    });
}

function tracerCourbe() {
    // Récupérer les valeurs de Kerma Mesuré à partir des champs du formulaire
    const kermaMesures = Array.from({ length: 5 }, (_, i) =>
        parseFloat(document.getElementById(`kermaMesure${i + 1}`).value)
    );
    const mas = Array.from({ length: 5 }, (_, i) => parseFloat(document.getElementById(`mas${i + 1}`).value));

    // Récupérer le contexte du canvas
    const ctx = document.getElementById('myChartRep').getContext('2d');

    // Vérifier si le graphique existe déjà, le détruire pour éviter des problèmes de duplication
    if (window.myChart) {
        window.myChart.destroy();
    }

    // Tracer la courbe
    window.myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: mas,
            datasets: [{
                label: 'Courbe de Kerma Mesuré en fonction de mAs',
                data: kermaMesures,
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
                        labelString: 'mAs'
                    }
                },
                y: {
                    type: 'linear',
                    position: 'left',
                    scaleLabel: {
                        display: true,
                        labelString: 'Kerma Mesuré'
                    }
                }
            }
        }
    });
}


function afficherResultats(moyenneRapports, moyenneKermaMesure, criteresConformite, estConforme) {
    const resultatsContainer = document.getElementById('resultatsContainer');
    resultatsContainer.innerHTML = '';

    const h3MoyenneRapports = document.createElement('h3');
    h3MoyenneRapports.textContent = 'Moyenne des Rapports (Kerma Mesuré / mAs) : ' + moyenneRapports.toFixed(2);
    resultatsContainer.appendChild(h3MoyenneRapports);

    const h3MoyenneKermaMesure = document.createElement('h3');
    h3MoyenneKermaMesure.textContent = 'Moyenne des Kerma Mesurés : ' + moyenneKermaMesure.toFixed(2);
    resultatsContainer.appendChild(h3MoyenneKermaMesure);

    const h3CriteresConformite = document.createElement('h3');
    h3CriteresConformite.textContent = 'Critères de Conformité :';
    resultatsContainer.appendChild(h3CriteresConformite);

    const ulCriteresConformite = document.createElement('ul');
    criteresConformite.forEach((critere, index) => {
        const li = document.createElement('li');
        li.textContent = `Critère ${index + 1} : ${critere.toFixed(2)}%`;
        ulCriteresConformite.appendChild(li);
    });
    resultatsContainer.appendChild(ulCriteresConformite);

    const h3Conformite = document.createElement('h3');
    h3Conformite.textContent = 'Résultat de Conformité :';
    resultatsContainer.appendChild(h3Conformite);

    const pConformite = document.createElement('p');
    pConformite.textContent = estConforme ? 'Conforme' : 'Non conforme';
    pConformite.className = estConforme ? 'conforme' : 'non-conforme';
    resultatsContainer.appendChild(pConformite);

    // Afficher la section des résultats
    document.getElementById('resultsSection').style.display = 'block';
}

function afficherHistorique() {
    const historiqueContainer = document.getElementById('historiqueContainer');
    historiqueContainer.innerHTML = '';

    if (historiqueTests.length === 0) {
        const pAucunHistorique = document.createElement('p');
        pAucunHistorique.textContent = 'Aucun historique disponible.';
        historiqueContainer.appendChild(pAucunHistorique);
    } else {
        const h3Historique = document.createElement('h3');
        h3Historique.textContent = 'Historique des Tests :';
        historiqueContainer.appendChild(h3Historique);

        const ulHistorique = document.createElement('ul');
        historiqueTests.forEach((test, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                Test ${index + 1} :
                <ul>
                    <li>Moyenne des Rapports (Kerma Mesuré / mAs) : ${test.moyenneRapports}</li>
                    <li>Moyenne des Kerma Mesurés : ${test.moyenneKermaMesure}</li>
                    <li>Critères de Conformité : ${test.criteresConformite.join(', ')}</li>
                    <li>Résultat de Conformité : ${test.estConforme ? 'Conforme' : 'Non conforme'}</li>
                </ul>
            `;
            ulHistorique.appendChild(li);
        });
        historiqueContainer.appendChild(ulHistorique);
    }

    // Afficher la section de l'historique
    document.getElementById('historiqueContainer').style.display = 'block';
}
