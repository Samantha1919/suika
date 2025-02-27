import {
  Engine,
  Render,
  Runner,
  Bodies,
  World,
  Body,
  Sleeping,
} from "matter-js";
import { FRUITS } from "/fruits.js"


const engine = Engine.create();
const render = Render.create({
  engine,
  element: document.body,
  options: {
    wireframes: false,
    background: "#F7F4C8",
    width: 620,
    height: 850,
  },
});

const world = engine.world;

const ground = Bodies.rectangle(310, 820, 620, 60, {
  isStatic: true,
  render: {
    fillStyle: "#E6B143",
  },
});

const murGauche =  Bodies.rectangle(15, 395, 30, 790, {
  isStatic: true,
  render: {
    fillStyle: "#E6B143",
  },
});

const murDroite =  Bodies.rectangle(605, 395, 30, 790, {
  isStatic: true,
  render: {
    fillStyle: "#E6B143",
  },
});


const box = Bodies.circle(50, 50, 50,);



World.add(world, [ground,murDroite,murGauche]);




Render.run(render);
Runner.run(engine);

let fruitDebut = null;
let fruitDebut2 = null
let interval = null;
let disableAction = false;


function addFruitDebut() {  // fruit en haut à faire tomber
  console.log("salut");

  const randomFruit = getRandomFruit();

  console.log(randomFruit.radius);

  const body = Bodies.circle(300, 50, randomFruit.radius, { // pk c render au lieu de options
      label: randomFruit.label,  // le label sert d'identification, ce label nous servira plus tard pour les collisions ->permerettra de determiner si 2 fruits de mm type sont entrés en colision
      isSleeping:true,  // met le fruit en attente, au "dodo"
      render: {
      fillStyle: randomFruit.color,
      
    },
    

  });

  console.log(body);


  fruitDebut = body;
  fruitDebut2 = randomFruit;



  World.add(world, body);

}

function getRandomFruit(){
  const randomIndex = Math.floor(Math.random() * 5);
  const fruit = FRUITS[randomIndex];

  if (fruitDebut.label === fruit.label) // c pr etre sur quon a pas 2 fois le  mm fruit mais tu peux le supp stv

  return fruit;

}


window.onkeydown = (event) => {
  switch (event.code) {   // switch choisit la condition possibles Right ou Left
    case "ArrowLeft":
      if (interval) return; // on peut mettre exit ou break ? 
      interval = setInterval(() => {
        if (fruitDebut.position.x + 20 > 70 ) // postion x > que la largeur du mur
        Body.setPosition(fruitDebut,{
          x: fruitDebut.position.x - 1 ,  // x postion actuelle -1 eneleve un pixel
          y : fruitDebut.position.y})     // y jsp g pas compris ce quil a dit
     
      },5);
      break;
      case "ArrowRight":
      if (interval) return;
      interval = setInterval(() => {
        if (fruitDebut.position.x + 20 < 590)   // postion x < que la largeur du mur
          Body.setPosition(fruitDebut, {
            x: fruitDebut.position.x + 1,       // x postion actuelle +1 ajoute un pixel
            y: fruitDebut.position.y,
          });
      }, 5);
      break;
      case "Space":
        if (disableAction) return;
        disableAction = true;
        Sleeping.set(fruitDebut, false);    // met isSleeping à false
        setTimeout(() => {   // on ajoute un timeout pr que ca fasse un temps dattente avant quil y ait un nv fruit 
          addFruitDebut();
          disableAction = false; // on la remet à false à la fin du timeout
        },1_000) 
  }
}

window.onkeyup = (event) => { 
  console.log(event.code); // quand on relache la touche dcp up, ca stop l'intervalle dcp ca stop l'objet ca le freeze ca le laisse sur sa position
  switch (event.code) {
    case "ArrowLeft":
    case "ArrowRight": // pk on peut le mettre ici et on doit pas faire un 2eme window.onkeyup  
      clearInterval(interval);
      interval = null;  // on le remet sinon ca marchera plus commme  mon cas avant ca marchait quune seule fois qd jle bougeais
  }
}


addFruitDebut();




