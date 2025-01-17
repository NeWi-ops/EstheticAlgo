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

// Couleurs fixes choisies
const chosenColors = ["#FF4500", "#FFD700", "#FF6347", "#800000"]; // Exemple de palette "Chaud"
const conceptName = "Température";
const subConceptName = "Chaud";

function setup() {
  createCanvas(800, 800);
  background(255);
  noStroke(); // Supprime les contours

  // Dessiner les triangles un par un
  drawFirstTriangle(chosenColors[0]);
  drawSecondTriangle(chosenColors[1]);
  drawThirdTriangle(chosenColors[2]);
  drawFourthTriangle(chosenColors[3]);

  // Afficher les concepts et les couleurs associées
  displayDetails(conceptName, subConceptName, chosenColors);
}

// Affiche les concepts choisis et les couleurs associées
function displayDetails(concept, subConcept, colors) {
  fill(0);
  textSize(16);
  textAlign(LEFT, CENTER); // Alignement à gauche et centré verticalement
  let textX = width / 2 + 210; // Position horizontale du texte
  let textY = height / 2 - 100; // Position verticale de départ pour le titre

  // Afficher le concept principal et le sous-concept
  text(`Concept : ${concept} - ${subConcept}`, textX, textY);

  // Afficher les couleurs associées
  textSize(12);
  for (let i = 0; i < colors.length; i++) {
    text(`${colors[i]} - Couleur ${i + 1}`, textX, textY + 40 + (i * 20));
  }
}

// Dessiner le premier triangle
function drawFirstTriangle(color) {
  let size = 400;
  let centerX = width / 3;
  let centerY = height / 2;
  fill(color);
  triangle(
    centerX + size / 2, centerY,  // Sommet du triangle
    centerX - size / 2, centerY - size / 3, // Coin gauche de la base
    centerX - size / 2, centerY + size / 3  // Coin droit de la base
  );
}

// Dessiner le deuxième triangle
function drawSecondTriangle(color) {
  let size = 320;
  let centerX = width / 3 - 30;
  let centerY = height / 2;
  fill(color);
  triangle(
    centerX + size / 2, centerY,  // Sommet du triangle
    centerX - size / 2, centerY - size / 3, // Coin gauche de la base
    centerX - size / 2, centerY + size / 3  // Coin droit de la base
  );
}

// Dessiner le troisième triangle
function drawThirdTriangle(color) {
  let size = 240;
  let centerX = width / 3 - 60;
  let centerY = height / 2;
  fill(color);
  triangle(
    centerX + size / 2, centerY,  // Sommet du triangle
    centerX - size / 2, centerY - size / 3, // Coin gauche de la base
    centerX - size / 2, centerY + size / 3  // Coin droit de la base
  );
}

// Dessiner le quatrième triangle
function drawFourthTriangle(color) {
  let size = 160;
  let centerX = width / 3 - 90;
  let centerY = height / 2;
  fill(color);
  triangle(
    centerX + size / 2, centerY,  // Sommet du triangle
    centerX - size / 2, centerY - size / 3, // Coin gauche de la base
    centerX - size / 2, centerY + size / 3  // Coin droit de la base
  );
}
