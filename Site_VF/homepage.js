// function drawFirstTriangle() {
//     let size = 400; 
//     let smallerSize = size * 0.9; 
//     let centerX = width / 2; 
//     let centerY = height / 2; 
  
//     fill(0, 0, 0); 
//     triangle(
//       centerX + size / 2, centerY,  
//       centerX - size / 2, centerY - size / 3, 
//       centerX - size / 2, centerY + size / 3  
//     );
  
//     fill(255);  
//     triangle(
//       centerX + smallerSize / 2, centerY,  
//       centerX - smallerSize / 1.87, centerY - smallerSize / 2.9, 
//       centerX - smallerSize / 1.87, centerY + smallerSize / 2.9  
//     );
//   }
  
//   function setup() {
//     createCanvas(windowWidth, windowHeight); 
//     background(255);  
//     noStroke(); 
//     drawFirstTriangle(); 
//   }
  
//   function windowResized() {
//     resizeCanvas(windowWidth, windowHeight); 
//     background(255);  
//     drawFirstTriangle();  
//   }

let triangleCenterX, triangleCenterY;
let size = 400;
let smallerSize = size * 0.9;
let isHovered = false;  // Variable pour suivre l'état du survol

function setup() {
  createCanvas(windowWidth, windowHeight); // Crée un canevas de la taille de la fenêtre
  background(255);  // Fond initial blanc du canevas
  noStroke();  // Désactive les bordures
  drawFirstTriangle();  // Dessine les deux triangles
  positionText();  // Positionne le texte

  // Ajout des événements pour survol du texte
  const textDiv = document.getElementById('centerText');
  textDiv.addEventListener('mouseover', () => toggleColors(true));  // Quand la souris survole le texte
  textDiv.addEventListener('mouseout', () => toggleColors(false));  // Quand la souris quitte le texte
}

function draw() {
  // Redessine le fond en fonction de l'état de survol
  if (isHovered) {
    background(0);  // Fond noir si la souris survole le texte
  } else {
    background(255);  // Fond blanc si la souris n'est pas sur le texte
  }

  // Dessine les triangles à chaque frame
  drawFirstTriangle();

  // Repositionne dynamiquement le texte pour qu'il soit toujours centré
  positionText();
}

function drawFirstTriangle() {
  triangleCenterX = width / 2;
  triangleCenterY = height / 2;

  // Premier triangle (noir ou blanc selon l'état de survol)
  if (isHovered) {
    fill(255);  // Triangle devient blanc lors du survol
  } else {
    fill(0);  // Triangle noir
  }
  triangle(
    triangleCenterX + size / 2, triangleCenterY, 
    triangleCenterX - size / 2, triangleCenterY - size / 3, 
    triangleCenterX - size / 2, triangleCenterY + size / 3
  );

  // Deuxième triangle (blanc ou noir selon l'état de survol)
  if (isHovered) {
    fill(0);  // Triangle devient noir lors du survol
  } else {
    fill(255);  // Triangle blanc
  }
  triangle(
    triangleCenterX + smallerSize / 2, triangleCenterY, 
    triangleCenterX - smallerSize / 1.87, triangleCenterY - smallerSize / 2.9, 
    triangleCenterX - smallerSize / 1.87, triangleCenterY + smallerSize / 2.9
  );
}

function positionText() {
  const textDiv = document.getElementById('centerText');
  const x = triangleCenterX / 1.07;
  const y = triangleCenterY;

  // Centre le texte par rapport au triangle
  textDiv.style.left = `${x - textDiv.offsetWidth / 2}px`;  
  textDiv.style.top = `${y - textDiv.offsetHeight / 2}px`;  
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // Redimensionne le canevas si la fenêtre change
  draw();  // Redessine les triangles et le fond lors du redimensionnement
}

// Fonction pour changer la couleur de tous les éléments lors du survol du texte
function toggleColors(isHoveredState) {
  isHovered = isHoveredState;  // Met à jour l'état de survol

  const textDiv = document.getElementById('centerText');
  const canvas = document.querySelector("canvas");
  const body = document.querySelector("body");

  if (isHovered) {
    // Change la couleur du fond de la page (body) avec transition
    body.style.transition = "background-color 1s ease";  // Transition fluide pour la couleur du body
    body.style.backgroundColor = "black";  // Fond de la page devient noir

    // Change la couleur du canevas avec transition
    canvas.style.transition = "background-color 1s ease";  // Transition fluide pour la couleur du canevas
    canvas.style.backgroundColor = "black";  // Canevas devient noir

    // Change la couleur du texte avec transition
    textDiv.style.transition = "color 1s ease";  // Transition fluide pour la couleur du texte
    textDiv.style.color = "white";  // Texte devient blanc
  } else {
    // Réinitialise la couleur du fond de la page (body) en blanc avec transition
    body.style.transition = "background-color 1s ease";  // Transition fluide pour la couleur du body
    body.style.backgroundColor = "white";  // Fond de la page redevient blanc

    // Réinitialise la couleur du canevas en blanc avec transition
    canvas.style.transition = "background-color 1s ease";  // Transition fluide pour la couleur du canevas
    canvas.style.backgroundColor = "white";  // Canevas redevient blanc

    // Redonne la couleur du texte en noir avec transition
    textDiv.style.transition = "color 1s ease";  // Transition fluide pour la couleur du texte
    textDiv.style.color = "black";  // Texte redevient noir
  }
}
