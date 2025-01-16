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

const NUM_SETS = 20;
const VERTICAL_SPACING = 300;
let chosenColors = Array(NUM_SETS).fill().map(() => []); // Tableau pour chaque set
let chosenConcepts = Array(NUM_SETS).fill().map(() => []); 
let isClicked = new Array(NUM_SETS).fill(false);
let translations = Array(NUM_SETS).fill().map(() => [0, 0, 0, 0]);

function setup() {
  const totalHeight = VERTICAL_SPACING * NUM_SETS;
  const canvas = createCanvas(windowWidth, totalHeight);
  canvas.parent('canvas-container');
  background(250);
  noStroke();
  
  generateRandomColors();
  createTextContainers();
}


function generateRandomColors() {
  for (let setIndex = 0; setIndex < NUM_SETS; setIndex++) {
    const numConcepts = random() < 0.66 ? 2 : 3;
    const subConcepts = Object.values(concepts)
      .flatMap(category => Object.keys(category));
    
    const chosenSubConcepts = randomSubset(subConcepts, numConcepts);
    let setColors = [];
    let setConcepts = []; // Liste pour les concepts associés aux couleurs
    
    // Remplir les couleurs et concepts associés
    while (setColors.length < 4) {
      for (let subConcept of chosenSubConcepts) {
        const category = findCategory(subConcept);
        if (!category) continue; // Vérifier que la catégorie existe
        
        let color;
        do {
          color = random(concepts[category][subConcept]);
        } while (setColors.includes(color) && setColors.length < 4);

        if (setColors.length < 4) {
          setColors.push(color);
          setConcepts.push(subConcept); // Ajouter la sous-catégorie associée
        }
      }
    }

    // S'assurer qu'il y a exactement 4 concepts (compléter si nécessaire)
    while (setConcepts.length < 4) {
      setConcepts.push(chosenSubConcepts[0]); // Réutiliser le premier sous-concept choisi
    }

    chosenColors[setIndex] = setColors.slice(0, 4);
    chosenConcepts[setIndex] = setConcepts.slice(0, 4); // Associer exactement 4 concepts
  }
}


function createTextContainers() {
  const container = document.querySelector('.container');
  for (let i = 0; i < NUM_SETS; i++) {
    const textContainer = document.createElement('div');
    textContainer.className = `text-container set-${i}`;
    
    // Filtrer les concepts pour éviter les doublons
    const uniqueConcepts = Array.from(new Set(chosenConcepts[i]));
    
    // Joindre les concepts avec des virgules
    const conceptsText = uniqueConcepts.join(', ');
    
    textContainer.innerHTML = `
      <div class="concepts">
        <h2>${conceptsText}</h2>
      </div>
      <div class="colors hidden">
        <h2>Couleurs</h2>
        <p class="couleur-1">${chosenColors[i][0]}</p>
        <p>${chosenColors[i][1]}</p>
        <p>${chosenColors[i][2]}</p>
        <p>${chosenColors[i][3]}</p>
      </div>
    `;
    textContainer.style.left = '50%';
    textContainer.style.top = `${VERTICAL_SPACING * i + 100}px`;
    container.appendChild(textContainer);
  }
}

function draw() {
  background(255);
  noStroke();
  
  for (let setIndex = 0; setIndex < NUM_SETS; setIndex++) {
    const isLeft = setIndex % 2 === 0;
    const verticalPosition = VERTICAL_SPACING * setIndex + 150;
    
    const baseX = isLeft ? width / 5 : width - (width / 5);
    const centerY = verticalPosition;
    
    const spacing = width / 10;
    const direction = isLeft ? 1 : -1;
    const targetTranslations = [
      isClicked[setIndex] ? spacing * direction : 0,
      isClicked[setIndex] ? spacing * 1 * direction : 0,
      isClicked[setIndex] ? spacing * 2 * direction : 0,
      isClicked[setIndex] ? spacing * 3 * direction : 0
  ];

    for (let i = 0; i < 4; i++) {
      translations[setIndex][i] = lerp(translations[setIndex][i], targetTranslations[i], 0.5);
    }
    
    for (let i = 0; i < 4; i++) {
      drawTriangle(
        chosenColors[setIndex][i], 
        300 - i * 60, 
        baseX + (isLeft ? i*(-20) : i* 20)  + translations[setIndex][i] * (i > 0 ? 1 : 0), 
        centerY, 
        setIndex, 
        i, 
        isLeft
      );
    }
  }
}

function drawTriangle(color, size, centerX, centerY, setIndex, triangleIndex, isLeft) {
  // Fonction pour assombrir la couleur
  const darkenColor = (color) => {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    const darkerR = Math.floor(r * 0.7);
    const darkerG = Math.floor(g * 0.7);
    const darkerB = Math.floor(b * 0.7);
    return `rgb(${darkerR}, ${darkerG}, ${darkerB})`;
  };

  // Dessiner le triangle
  fill(color);
  let textX, textY;
  
  if (isLeft) {
    triangle(
      centerX + size / 2, centerY,
      centerX - size / 2, centerY - size / 3,
      centerX - size / 2, centerY + size / 3
    );
    textX = centerX - size / 3; // Position du texte pour triangle gauche
    textY = centerY ;   
  } else {
    triangle(
      centerX - size / 2, centerY,
      centerX + size / 2, centerY - size / 3,
      centerX + size / 2, centerY + size / 3
    );
    textX = centerX + size / 3; // Position du texte pour triangle droit
    textY = centerY ; 
  }

  // Ajouter le texte si le triangle est cliqué
  if (isClicked[setIndex]) {
    push();
    fill(darkenColor(color));
    textAlign(CENTER, CENTER);
    textSize(18 - triangleIndex * 2); // Texte plus petit pour les triangles plus petits
    const concept = chosenConcepts[setIndex][triangleIndex];
    text(concept || '', textX, textY);
    pop();
  }
}

function mousePressed() {
  for (let setIndex = 0; setIndex < NUM_SETS; setIndex++) {
    const isLeft = setIndex % 2 === 0;
    const verticalPosition = VERTICAL_SPACING * setIndex + 150;
    const baseX = isLeft ? width/5 : width-(width/5);
    const size = 300;
    
    const isOnTriangle =
      mouseX > baseX - size/2 &&
      mouseX < baseX + size/2 &&
      mouseY > verticalPosition - size/3 &&
      mouseY < verticalPosition + size/3;
    
    if (isOnTriangle) {
      isClicked[setIndex] = !isClicked[setIndex];
      moveTextContainer(setIndex, isClicked[setIndex], isLeft);
      break;
    }
  }
}

function moveTextContainer(setIndex, isClicked, isLeft) {
  const textContainer = document.querySelector(`.text-container.set-${setIndex}`);
  if (textContainer) {
    if (isClicked) {
      textContainer.style.marginLeft = isLeft ? '25%' : '-25%';
    } else {
      textContainer.style.marginLeft = '0';
    }
  }
}

function findCategory(subConcept) {
  for (let category in concepts) {
    if (concepts[category][subConcept]) return category;
  }
  return null;
}

function randomSubset(array, size) {
  let shuffled = array.slice();
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, size);
}
