// script.js
const chosenColors = ["#FF4500", "#FFD700", "#FF6347", "#800000"]; // Couleurs exemple
let isClicked = false; // Indique si le triangle a été cliqué
let translations = [0, 0, 0, 0]; // Array pour stocker les traductions des triangles

function setup() {
  // Associer le canvas à la div
  const canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('canvas-container'); // Place le canvas dans le conteneur

  background(255);
  noStroke(); // Supprimer les contours
}

function draw() {
  background(255); // Effacer le canvas
  noStroke();

  // Coordonnées de base
  const centerX = width / 5;
  const centerY = height / 4; // Changer ici pour aligner le triangle avec le texte

  // Calculer l'espacement dynamique entre les triangles
  const spacing = (height - 200) / 5; // 5 est un facteur pour obtenir un espacement raisonnable
  const targetTranslations = [
    isClicked ? spacing : 0,
    isClicked ? spacing * 2 : 0,
    isClicked ? spacing * 3 : 0,
  ];

  // Appliquer la transition fluide à chaque triangle
  for (let i = 0; i < 3; i++) {
    translations[i] = lerp(translations[i], targetTranslations[i], 0.1); // Lerp pour transition fluide
  }

  // Dessiner les triangles avec ou sans translation fluide
  drawTriangle(chosenColors[0], 400, centerX, centerY); // Triangle 1
  drawTriangle(chosenColors[1], 320, centerX - 30, centerY + translations[0]); // Triangle 2
  drawTriangle(chosenColors[2], 240, centerX - 60, centerY + translations[1]); // Triangle 3
  drawTriangle(chosenColors[3], 160, centerX - 90, centerY + translations[2]); // Triangle 4
}

function drawTriangle(color, size, centerX, centerY) {
  fill(color);
  triangle(
    centerX + size / 2, centerY,
    centerX - size / 2, centerY - size / 3,
    centerX - size / 2, centerY + size / 3
  );
}

function mousePressed() {
  // Détecter si la souris est sur le premier triangle lors d'un clic
  const centerX = width / 5;
  const centerY = height / 4; // Aligner avec la position du triangle
  const size = 400;

  const isOnTriangle =
    mouseX > centerX - size / 2 &&
    mouseX < centerX + size / 2 &&
    mouseY > centerY - size / 3 &&
    mouseY < centerY + size / 3;

  if (isOnTriangle) {
    isClicked = !isClicked; // Alterner entre l'état cliqué et non cliqué

    // Cacher ou afficher les sections "Concepts" et "Couleurs" en fonction de l'état
    const conceptsSection = document.querySelector('.concepts');
    const colorsSection = document.querySelector('.colors');
    
    if (isClicked) {
      conceptsSection.classList.add('hidden'); // Cacher la section des concepts
      colorsSection.classList.remove('hidden'); // Afficher la section des couleurs
    } else {
      conceptsSection.classList.remove('hidden'); // Afficher la section des concepts
      colorsSection.classList.add('hidden'); // Cacher la section des couleurs
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // Adapter le canvas à la fenêtre
}
