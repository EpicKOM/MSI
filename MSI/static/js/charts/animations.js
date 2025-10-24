const TOTAL_ANIMATION_DURATION = 1500;

// Fonction pour déterminer la position Y précédente (clé pour l'animation)
const previousY = (context) => {
    if (context.index === 0) {
        // Pour le premier point, utilise une valeur par défaut ou la première valeur réelle
        return context.chart.getDatasetMeta(context.datasetIndex).data[context.index].getProps(['y'], true).y;
    }
    // Récupère la position Y du point précédent dans le même dataset
    return context.chart.getDatasetMeta(context.datasetIndex).data[context.index - 1].getProps(['y'], true).y;
};

export const progressiveLineAnimation = (dataLength) => {
    let delayBetweenPoints = TOTAL_ANIMATION_DURATION / dataLength;

    return {
        x: {
            type: 'number',
            easing: 'linear',
            duration: delayBetweenPoints,
            from: NaN, // Le point est initialement ignoré
            delay(context) { // Remplacement de ctx par context
                // Assure que le délai n'est calculé que pour les points de données
                if (context.type !== 'data' || context.xStarted) {
                    return 0;
                }
                context.xStarted = true;
                return context.index * delayBetweenPoints;
            }
        },
        y: {
            type: 'number',
            easing: 'linear',
            duration: delayBetweenPoints,
            from: previousY, // Démarre à la position Y du point précédent
            delay(context) { // Remplacement de ctx par context
                if (context.type !== 'data' || context.yStarted) {
                    return 0;
                }
                context.yStarted = true;
                return context.index * delayBetweenPoints;
            }
        }
    };
};

// Configuration de l'objet d'animation pour les barres (staggered)
export const staggeredAnimation = (dataLength) => {
    let delayBetweenPoints = TOTAL_ANIMATION_DURATION / dataLength;

    // Retourne l'objet de configuration
    return {
        duration: 1500, // Durée totale de l'animation
        delay: (context) => {
            if (context.type === 'data' && context.mode === 'default') {
              return context.dataIndex * delayBetweenPoints;
            }
            return 0;
        },
    };
};

export const smoothUpdateAnimation = {
    y: { duration: 700, easing: 'easeInOutQuad' },
};