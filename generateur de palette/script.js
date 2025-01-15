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
  let triangleIndex = 0;
  
  function setup() {
    createCanvas(800, 800);
    noLoop(); // Pas besoin de redessiner en boucle
  }
  
  function draw() {
    generateAndSaveTriangles(200);
  }
  
  // Générer et sauvegarder 200 triangles
  function generateAndSaveTriangles(totalTriangles) {
    let delay = 500; // Délai en millisecondes pour éviter les conflits lors des sauvegardes
  
    for (let i = 0; i < totalTriangles; i++) {
      setTimeout(() => {
        let triangleData = generateTriangleData();
  
        // Dessiner le triangle
        drawTriangle(triangleData.colors);
  
        // Construire un nom de fichier détaillé
        let fileName = `triangle_${i + 1}_${generateFileName(triangleData)}.png`;
  
        // Sauvegarder l'image
        saveCanvas(fileName, 'png');
  
        // Réinitialiser le canevas pour le prochain triangle
        background(255);
      }, i * delay);
    }
  }
  
  // Génère les données pour un triangle
  function generateTriangleData() {
    let numConcepts = random() < 0.66 ? 2 : 3; // 2 ou 3 concepts
    let subConcepts = [];
    for (let category in concepts) {
      subConcepts.push(...Object.keys(concepts[category]));
    }
    let chosenSubConcepts = randomSubset(subConcepts, numConcepts);
  
    let chosenColors = [];
    let colorDetails = [];
    while (chosenColors.length < 4) {
      for (let subConcept of chosenSubConcepts) {
        if (chosenColors.length < 4) {
          let category = findCategory(subConcept);
          let color;
          do {
            color = random(concepts[category][subConcept]);
          } while (chosenColors.includes(color)); // Éviter les doublons
          chosenColors.push(color);
          colorDetails.push({ color: color, concept: subConcept });
        }
      }
    }
  
    return { concepts: chosenSubConcepts, colors: chosenColors, details: colorDetails };
  }
  
  // Génère un nom de fichier détaillé
  function generateFileName(data) {
    let conceptNames = data.concepts.join("_");
    let colorDetails = data.details
      .map(detail => `${detail.color.replace("#", "")}-${detail.concept}`)
      .join("_");
    return `${conceptNames}_${colorDetails}`;
  }
  
  // Dessine un triangle imbriqué
  function drawTriangle(colors) {
    noStroke(); // Supprime le contour
    let centerX = width / 2;
    let centerY = height / 2;
    let size = 400;
  
    for (let i = 0; i < colors.length; i++) {
      fill(colors[i]);
      beginShape();
      vertex(centerX, centerY - size / 2);
      vertex(centerX - size / 3, centerY + size / 2);
      vertex(centerX + size / 3, centerY + size / 2);
      endShape(CLOSE);
      size -= 80;
      centerY += 30;
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
    return shuffled.slice(0, count);
  }
  