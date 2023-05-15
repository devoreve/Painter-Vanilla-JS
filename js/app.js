// Sélectionner les éléments interactifs
const colorPicker = document.getElementById('color-picker');
const thicknessSlider = document.getElementById('thickness-slider');
const eraseButton = document.getElementById('erase-button');

// Sélectionner l'élément canvas
const canvas = document.getElementById('drawing-canvas');
const context = canvas.getContext('2d');

// Variables pour stocker la position précédente de la souris
let isDrawing = false;
let lastX = 0;
let lastY = 0;

// Fonction pour obtenir les coordonnées de la souris par rapport au canvas
function getMousePos(e) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY
    };
}

// Fonction pour commencer le dessin
function startDrawing(e) {
    isDrawing = true;
    const { x, y } = getMousePos(e);
    lastX = x;
    lastY = y;
}

// Fonction pour dessiner lors du mouvement de la souris
function draw(e) {
    if (!isDrawing) return; // Arrêter la fonction si le bouton de la souris n'est pas enfoncé

    const { x, y } = getMousePos(e);

    // Tracer une ligne depuis la position précédente à la position actuelle
    context.beginPath();
    context.moveTo(lastX, lastY);
    context.lineTo(x, y);
    context.strokeStyle = colorPicker.value;
    context.lineWidth = thicknessSlider.value;
    context.stroke();

    // Mettre à jour les coordonnées de la dernière position
    lastX = x;
    lastY = y;
}

// Fonction pour arrêter le dessin
function stopDrawing() {
    isDrawing = false;
}

// Fonction pour effacer le canvas
function eraseCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

// Ajouter des événements pour détecter les mouvements de la souris
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

// Ajouter un événement pour le bouton d'effacement
eraseButton.addEventListener('click', eraseCanvas);