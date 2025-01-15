// Création des triangles dans la div container
function createTriangle() {
  const triangleCanvas = document.getElementById("triangle-canvas");

  // Crée les éléments de triangle imbriqués
  const redTriangle = document.createElement('div');
  redTriangle.classList.add('red');

  const yellowTriangle = document.createElement('div');
  yellowTriangle.classList.add('yellow');

  const greenTriangle = document.createElement('div');
  greenTriangle.classList.add('green');

  const blueTriangle = document.createElement('div');
  blueTriangle.classList.add('blue');

  // Ajoute les triangles au conteneur
  triangleCanvas.appendChild(redTriangle);
  triangleCanvas.appendChild(yellowTriangle);
  triangleCanvas.appendChild(greenTriangle);
  triangleCanvas.appendChild(blueTriangle);
}

// Affichage des concepts
function displayConcepts() {
  const conceptsInfo = document.getElementById('concepts-info');
  
  const concepts = {
    "Rouge": "#FF6347",
    "Jaune": "#FFD700",
    "Vert": "#39FF14",
    "Bleu": "#1E90FF"
  };

  for (let concept in concepts) {
    const p = document.createElement('p');
    p.innerText = `${concept}: ${concepts[concept]}`;
    conceptsInfo.appendChild(p);
  }
}

// Initialisation
function init() {
  createTriangle();
  displayConcepts();
}

init();
