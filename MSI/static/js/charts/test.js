// Définition de Utils.CHART_COLORS (à adapter selon vos vraies définitions)
const Utils = {
    CHART_COLORS: {
        red: 'rgb(255, 99, 132)',
        blue: 'rgb(54, 162, 235)'
    }
};

// Logique de génération de données
const data = [];
const data2 = [];
let prev = 100;
let prev2 = 80;
for (let i = 0; i < 1000; i++) {
    prev += 5 - Math.random() * 10;
    data.push({x: i, y: prev});
    prev2 += 5 - Math.random() * 10;
    data2.push({x: i, y: prev2});
}

const totalDuration = 1000;
const delayBetweenPoints = totalDuration / data.length;

// Fonction pour déterminer la position Y précédente (clé pour l'animation)
const previousY = (ctx) => {
    if (ctx.index === 0) {
        // Pour le premier point, utilise une valeur par défaut ou la première valeur réelle
        // On prend la première valeur réelle de la série pour éviter une interpolation incohérente
        const initialValue = ctx.datasetIndex === 0 ? data[0].y : data2[0].y;
        return ctx.chart.scales.y.getPixelForValue(initialValue);
    }
    // Récupère la position Y du point précédent dans le même dataset
    return ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;
};

// Configuration de l'objet d'animation
const animation = {
    x: {
        type: 'number',
        easing: 'linear',
        duration: delayBetweenPoints,
        from: NaN, // Le point est initialement ignoré
        delay(ctx) {
            // Assure que le délai n'est calculé que pour les points de données
            if (ctx.type !== 'data' || ctx.xStarted) {
                return 0;
            }
            ctx.xStarted = true;
            return ctx.index * delayBetweenPoints;
        }
    },
    y: {
        type: 'number',
        easing: 'linear',
        duration: delayBetweenPoints,
        from: previousY, // Démarre à la position Y du point précédent
        delay(ctx) {
            if (ctx.type !== 'data' || ctx.yStarted) {
                return 0;
            }
            ctx.yStarted = true;
            return ctx.index * delayBetweenPoints;
        }
    }
};

// Configuration principale du graphique
const config = {
    type: 'line',
    data: {
        datasets: [{
            label: 'Dataset 1',
            borderColor: Utils.CHART_COLORS.red,
            borderWidth: 1,
            radius: 0,
            data: data,
        },
        {
            label: 'Dataset 2',
            borderColor: Utils.CHART_COLORS.blue,
            borderWidth: 1,
            radius: 0,
            data: data2,
        }]
    },
    options: {
        animations: animation, // Assurez-vous d'utiliser 'animations' (au pluriel) pour la configuration avancée
        interaction: {
            intersect: false
        },
        plugins: {
            legend: {
                display: true // Afficher la légende pour distinguer les datasets
            },
        },
        scales: {
            x: {
                type: 'linear',
                // Définir min/max peut aider à la stabilité de l'animation
                min: 0,
                max: data.length - 1
            },
            y: {
                min: 0, // Définir min/max pour la stabilité de l'échelle
                max: 200 // Adapter cette valeur au besoin
            }
        }
    }
};


document.addEventListener('DOMContentLoaded', () => {
    // 1. Obtenir l'élément canvas
    const ctx = document.getElementById('myAnimatedChart');

    // Vérifier si l'élément existe
    if (ctx) {
        // 2. Créer l'instance Chart avec la configuration
        new Chart(ctx, config);
    }
});