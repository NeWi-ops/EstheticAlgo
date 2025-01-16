// Configuration globale reste la même
const chosenColors = ["#FF4500", "#FFD700", "#FF6347", "#800000"];
const NUM_SETS = 20;
const VERTICAL_SPACING = 300;
let isClicked = new Array(NUM_SETS).fill(false);
let translations = Array(NUM_SETS).fill().map(() => [0, 0, 0, 0]);

function setup() {
  const totalHeight = VERTICAL_SPACING * NUM_SETS;
  const canvas = createCanvas(windowWidth, totalHeight);
  canvas.parent('canvas-container');
  background(250);
  noStroke();
  
  createTextContainers();
}

function createTextContainers() {
  const container = document.querySelector('.container');
  for (let i = 0; i < NUM_SETS; i++) {
    const textContainer = document.createElement('div');
    textContainer.className = `text-container set-${i}`;
    textContainer.innerHTML = `
      <div class="concepts">
        <h2>Concepts - Set ${i + 1}</h2>
        <p>Concept 1</p>
        <p>Concept 2</p>
        <p>Concept 3</p>
        <p>Concept 4</p>
      </div>
      <div class="colors hidden">
        <h2>Couleurs</h2>
        <p class="couleur-1">Couleur 1</p>
        <p>Couleur 2</p>
        <p>Couleur 3</p>
        <p>Couleur 4</p>
      </div>
    `;
    
    const isLeft = i % 2 === 0;
    textContainer.style.left = '50%' 
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
    
    const baseX = isLeft ? width/5 : width-(width/5);
    const centerY = verticalPosition;
    
    const spacing = width/10;
    const direction = isLeft ? 1 : -1;
    const targetTranslations = [
      isClicked[setIndex] ? spacing * direction : 0,
      isClicked[setIndex] ? spacing * 2 * direction : 0,
      isClicked[setIndex] ? spacing * 3 * direction : 0,
    ];
    
    for (let i = 0; i < 3; i++) {
      translations[setIndex][i] = lerp(translations[setIndex][i], targetTranslations[i], 0.1);
    }
    
    // Dessiner les triangles avec orientation différente selon la position
    drawTriangle(chosenColors[0], 300, baseX, centerY, setIndex, 0, isLeft);
    drawTriangle(chosenColors[1], 240, baseX + (isLeft ? -20 : 20) + translations[setIndex][0], centerY, setIndex, 1, isLeft);
    drawTriangle(chosenColors[2], 180, baseX + (isLeft ? -40 : 40) + translations[setIndex][1], centerY, setIndex, 2, isLeft);
    drawTriangle(chosenColors[3], 120, baseX + (isLeft ? -60 : 60) + translations[setIndex][2], centerY, setIndex, 3, isLeft);
  }
}

function drawTriangle(color, size, centerX, centerY, setIndex, triangleIndex, isLeft) {
  fill(color);
  if (isLeft) {
    // Triangle pointant vers la droite (original)
    triangle(
      centerX + size/2, centerY,
      centerX - size/2, centerY - size/3,
      centerX - size/2, centerY + size/3
    );
  } else {
    // Triangle pointant vers la gauche (rotation de 180°)
    triangle(
      centerX - size/2, centerY,
      centerX + size/2, centerY - size/3,
      centerX + size/2, centerY + size/3
    );
  }
}

// Les autres fonctions restent inchangées
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

function windowResized() {
  resizeCanvas(windowWidth, VERTICAL_SPACING * NUM_SETS);
} 


function generateRandomColors() {
    for (let setIndex = 0; setIndex < NUM_SETS; setIndex++) {
      const numConcepts = random() < 0.66 ? 2 : 3; // 2 concepts (66% chance) ou 3 concepts
      const subConcepts = Object.values(concepts)
        .flatMap(category => Object.keys(category));
      
      // Sélectionner 2 ou 3 concepts uniques
      const chosenSubConcepts = randomSubset(subConcepts, numConcepts);
      let setColors = [];
      let conceptsForTriangles = []; // Pour stocker le concept associé à chaque triangle
      
      // Pour chaque triangle (4 au total)
      for (let i = 0; i < 4; i++) {
        // Choisir aléatoirement un concept parmi les concepts disponibles
        const randomConcept = random(chosenSubConcepts);
        const category = findCategory(randomConcept);
        
        // Choisir une couleur pour ce concept
        let color;
        do {
          color = random(concepts[category][randomConcept]);
        } while (setColors.includes(color));
        
        setColors.push(color);
        conceptsForTriangles.push(randomConcept);
      }
      
      chosenColors[setIndex] = setColors;
      chosenConcepts[setIndex] = conceptsForTriangles; // Stocker les concepts dans l'ordre des triangles
    }
  }