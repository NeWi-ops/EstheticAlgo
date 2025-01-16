// Liste des concepts et des couleurs associées
const concepts = {
  "Climat": {
    "Passif": ["#D3D3D3", "#ADD8E6", "#F5F5DC", "#E6E6FA", "#98FF98"],
    "Actif": ["#FF4500", "#FFA500", "#FFFF00", "#1E90FF", "#FF00FF"],
    "Terne": ["#708090", "#94582D", "#B4C98B", "#BDB76B", "#859172"],
    "Brillant": ["#FFF700", "#00FFFF", "#5B00FF", "#39FF14", "#FF6347"]
  },
  "Température": {
    "Froid": ["#AFEEEE", "#000080", "#E0FFFF", "#483D8B", "#009688"],
    "Chaud": ["#9B111E", "#FF4500", "#FFD700", "#800000", "#FF7F50"],
    "Humide": ["#B0E0E6", "#C0C0C0", "#8FBC8F", "#40E0D0", "#F8F8FF"],
    "Sec": ["#C2B280", "#DEB887", "#F5DEB3", "#F4A460", "#D2691E"]
  },
  "Arôme": {
    "Sucré": ["#FFD1DC", "#FFEB3B", "#D8BFD8", "#FFFDD0", "#FF1493"],
    "Amer": ["#5C4033", "#556B2F", "#A9A9A9", "#4B0082", "#3C2F2F"],
    "Doux": ["#FFE4E1", "#87CEEB", "#FFFFF0", "#FAFAD2", "#98FF98"],
    "Acide": ["#DFFF00", "#FFFF00", "#FFC64E", "#FF6347", "#00FFFF"]
  },
  "Son": {
    "Silencieux": ["#D3D3D3", "#B0C4DE", "#F5F5F5", "#778899", "#D2B48C"],
    "Bruyant": ["#FF0000", "#FFA500", "#FFFF33", "#FF69B4", "#0047AB"],
    "Rude": ["#8B0000", "#2F4F4F", "#795548", "#4B5320", "#B22222"],
    "Harmonieux": ["#4682B4", "#00A86B", "#E6E6FA", "#FFC0CB", "#D7B7D8"]
  }
};

// Variables globales
let chosenColors = [];
let colorDetails = [];
let yOffset = 20;  // Décalage vertical pour chaque ensemble de triangles

function setup() {
  createCanvas(800, 1600);  // Ajuster la taille pour afficher 20 ensembles
  background(255);
  noStroke();
  noLoop(); // Assurer qu'il ne soit exécuté qu'une seule fois pour optimiser les performances

  // Générer 20 ensembles de triangles
  for (let i = 0; i < 20; i++) {
    // Étape 1 : Choisir aléatoirement 2 ou 3 concepts
    let numConcepts = random() < 0.66 ? 2 : 3;
    let subConcepts = [];
    for (let category in concepts) {
      subConcepts.push(...Object.keys(concepts[category]));
    }
    let chosenSubConcepts = randomSubset(subConcepts, numConcepts);

    // Étape 2 : Sélectionner 4 couleurs au total sans doublons
    chosenColors = [];
    colorDetails = [];
    while (chosenColors.length < 4) {
      for (let subConcept of chosenSubConcepts) {
        if (chosenColors.length < 4) {
          let category = findCategory(subConcept);
          let color;
          do {
            color = random(concepts[category][subConcept]);
          } while (chosenColors.includes(color)); // Vérifie les doublons
          chosenColors.push(color);
          colorDetails.push(`${color} - ${subConcept}`);
        }
      }
    }

    // Étape 3 : Dessiner les triangles imbriqués avec alternance de direction
    let isLeft = i % 2 ===  0 ;// Alternance gauche/droite
    drawNestedTriangles(100, yOffset, chosenColors,isLeft);

    // Étape 4 : Afficher les concepts et les numéros des couleurs à droite ou à gauche
    displayDetails(chosenSubConcepts, colorDetails, yOffset, isLeft);

    yOffset += 250; // Décaler vers le bas pour chaque ensemble de triangles
  }
}

// Affiche les concepts choisis et les numéros des couleurs à droite de chaque triangle
function displayDetails(subConcepts, details, yOffset, xPos) {
  fill(0);
  textSize(12);
  textAlign(LEFT, TOP);
  let xPos = isLeft ? 50 : 450; // Positionner à gauche ou à droite
  text(`Concepts : ${subConcepts.join(", ")}`, xPos, yOffset + 10);
  textSize(10);
  text(colors.join("\n"), xPos, yOffset + 30);
}

  function drawNestedTriangles(x, y, colors, isLeft) {
    let size = 200;
    for (let i = 0; i < colors.length; i++) {
      fill(colors[i]);
      if (isLeft) {
        // Triangles de gauche
        triangle(
          x - size / 3, y + size / 2,
          x + size / 3, y - size / 2,
          x - size / 3, y - size / 2
        );
      } else {
        // Triangles de droite (rotation de 90°)
        triangle(
          x + size / 2, y - size / 3,
          x - size / 2, y - size / 3,
          x, y + size / 3
        );
      }
      size -= 40; // Réduire la taille de chaque triangle imbriqué
      x += isLeft ? -5 : 5; // Décalage horizontal (différent pour gauche/droite)
    }
  }

  

// Trouve la catégorie d'un concept
function findCategory(subConcept) {
  for (let category in concepts) {
    if (subConcept in concepts[category]) {
      return category;
    }
  }
}

// Retourne un sous-ensemble aléatoire
function randomSubset(array, count) {
  let shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count); }