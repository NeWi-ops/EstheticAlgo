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

function displayConcepts() {
  const container = document.getElementById('concepts-container');
  for (let concept in concepts) {
    const conceptDiv = document.createElement('div');
    conceptDiv.classList.add('concept');
    
    const conceptTitle = document.createElement('h3');
    conceptTitle.textContent = concept;
    conceptDiv.appendChild(conceptTitle);

    const conceptList = document.createElement('ul');
    for (let subConcept in concepts[concept]) {
      const listItem = document.createElement('li');
      listItem.textContent = `${subConcept}:`;

      // Affichage des couleurs
      const colorBox = document.createElement('div');
      colorBox.classList.add('color-box');
      concepts[concept][subConcept].forEach(color => {
        const colorDiv = document.createElement('div');
        colorDiv.style.backgroundColor = color;
        colorBox.appendChild(colorDiv);
      });

      listItem.appendChild(colorBox);
      conceptList.appendChild(listItem);
    }

    conceptDiv.appendChild(conceptList);
    container.appendChild(conceptDiv);
  }
}

// Appeler la fonction pour afficher les concepts au chargement de la page
window.onload = displayConcepts;

// Retourne un sous-ensemble aléatoire
function randomSubset(array, count) {
  let shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Trouve la catégorie d'un concept
function findCategory(subConcept) {
  for (let category in concepts) {
    if (subConcept in concepts[category]) {
      return category;
    }
  }
}

// Fonction pour dessiner un triangle imbriqué
function drawNestedTriangles(colors, containerId) {
  const canvas = document.createElement('canvas');
  canvas.width = 300;  // Taille du canvas plus grande
  canvas.height = 300;
  const ctx = canvas.getContext('2d');
  document.getElementById(containerId).appendChild(canvas);
  
  let centerX = canvas.width / 2;
  let centerY = canvas.height / 2;
  let size = 150;  // Taille initiale plus grande

  colors.forEach(color => {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(centerX + size/2, centerY);
    ctx.lineTo(centerX - size/2, centerY - size/3);
    ctx.lineTo(centerX - size/2, centerY + size/3);
    ctx.closePath();
    ctx.fill();
    size -= 30; // Réduction de taille à chaque triangle
    centerX -= 10; // Décalage vertical pour effet imbriqué
  });
}

// Fonction pour afficher les informations sous chaque triangle
function displayTriangleInfo(colors, subConcepts, containerId) {
  const container = document.getElementById(containerId);
  const infoDiv = document.createElement('div');
  infoDiv.classList.add('triangle-info');
  
  const conceptsText = `Concepts: ${subConcepts.join(", ")}`;
  const colorsText = `Couleurs: ${colors.join(", ")}`;

  infoDiv.innerHTML = `<p>${conceptsText}</p><p>${colorsText}</p>`;
  
  container.appendChild(infoDiv);
}

// Fonction principale pour créer et afficher les triangles
function generateTriangles() {
  for (let i = 0; i < 201; i++) {
    // Choisir aléatoirement 2 ou 3 concepts
    let numConcepts = Math.random() < 0.66 ? 2 : 3;
    let subConcepts = [];
    for (let category in concepts) {
      subConcepts.push(...Object.keys(concepts[category]));
    }
    let chosenSubConcepts = randomSubset(subConcepts, numConcepts);

    // Sélectionner 4 couleurs au total sans doublons
    let chosenColors = [];
    while (chosenColors.length < 4) {
      for (let subConcept of chosenSubConcepts) {
        if (chosenColors.length < 4) {
          let category = findCategory(subConcept);
          let color;
          do {
            color = concepts[category][subConcept][Math.floor(Math.random() * concepts[category][subConcept].length)];
          } while (chosenColors.includes(color));
          chosenColors.push(color);
        }
      }
    }

    // Créer un conteneur pour le triangle et les informations
    const triangleContainer = document.createElement('div');
    triangleContainer.classList.add('triangle-container');
    triangleContainer.id = `triangle-${i}`;
    document.getElementById('canvas-container').appendChild(triangleContainer);

    // Dessiner le triangle
    drawNestedTriangles(chosenColors, triangleContainer.id);

    // Afficher les informations sous le triangle
    displayTriangleInfo(chosenColors, chosenSubConcepts, triangleContainer.id);
  }
}

generateTriangles();
