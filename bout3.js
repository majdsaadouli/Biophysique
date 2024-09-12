function testerConformite() {
    const kermaMesures = Array.from({ length: 5 }, (_, i) => parseFloat(document.getElementById(`kerma${i + 1}`).value));

    const moyenneKerma = kermaMesures.reduce((sum, kerma) => sum + kerma, 0) / kermaMesures.length;

    const criteresAcceptabilite = kermaMesures.map(kerma => Math.abs((kerma - moyenneKerma) / moyenneKerma) * 100);

    const estConforme = criteresAcceptabilite.every(critere => critere < 10);

    afficherResultats(moyenneKerma, criteresAcceptabilite, estConforme);
}

function tracerCourbe() {
    const kermaMesures = Array.from({ length: 5 }, (_, i) => parseFloat(document.getElementById(`kerma${i + 1}`).value));

    const ctx = document.getElementById('myChart').getContext('2d');

    const data = kermaMesures.map((kerma, index) => ({ x: index + 1, y: kerma }));

    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [{
                label: 'Courbe de Kerma Mesuré',
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
                        labelString: 'Kerma Mesuré'
                    }
                }
            }
        }
    });
}

function afficherResultats(moyenne, criteres, estConforme) {
    const resultatsContainer = document.getElementById('resultatsContainer');
    resultatsContainer.innerHTML = '';

    const h3Moyenne = document.createElement('h3');
    h3Moyenne.textContent = 'Moyenne des Kerma Mesurés : ' + moyenne.toFixed(2);
    resultatsContainer.appendChild(h3Moyenne);

    const h3Criteres = document.createElement('h3');
    h3Criteres.textContent = 'Critères d\'acceptabilité :';
    resultatsContainer.appendChild(h3Criteres);

    const ulCriteres = document.createElement('ul');
    criteres.forEach((critere, index) => {
        const li = document.createElement('li');
        li.textContent = `Critère ${index + 1} : ${critere.toFixed(2)}%`;
        ulCriteres.appendChild(li);
    });
    resultatsContainer.appendChild(ulCriteres);

    const h3Conformite = document.createElement('h3');
    h3Conformite.textContent = 'Résultat de Conformité :';
    resultatsContainer.appendChild(h3Conformite);

    const pConformite = document.createElement('p');
    pConformite.textContent = estConforme ? 'Conforme' : 'Non conforme';
    pConformite.className = estConforme ? 'conforme' : 'non-conforme';
    resultatsContainer.appendChild(pConformite);

    resultatsContainer.style.display = 'block';
}
