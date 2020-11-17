// as we have added our script tag at bottom of the html we dont need to add a loading listener

// document.addEventListener("DOMContentLoaded", () => {

// });
const grid = document.querySelector(".grid");
const doodler = document.createElement("div");
let doodlerLeftSpace = 50;
let doodlerBottomSpace = 201;
let isGameOver = false;
const platforms = [];
const platformCount = 5;


function createDoodler() {
  grid.appendChild(doodler);
  doodler.classList.add("doodler");

  doodler.style.left = `${doodlerLeftSpace}px`;
  doodler.style.bottom = `${doodlerBottomSpace}px`;
}

class Platform {
    constructor(newPlatBottom) {
        this.bottom = newPlatBottom;
        this.left = 315 * Math.random(); // gridWidth - doodleWidth = 315
        this.visual = document.createElement("div");

        const visual = this.visual;
        visual.classList.add('platform');
        visual.style.left = `${this.left}px`;
        visual.style.bottom = `${this.bottom}px`;

        grid.appendChild(visual);
    }
}

function movePlatforms() {
   if(doodlerBottomSpace > 200) {
      platforms.forEach(platform => {
          platform.bottom -= 4;
          const visual = platform.visual;
          visual.style.bottom = platform.bottom;
      });
   }
}

function createPlatforms() {
    for(let i=0; i<platformCount;i++) {
       let platGap = 600 / platformCount;
       let newPlatBottom = 90 + i * platGap;

       let newPlat = new Platform(newPlatBottom);
       platforms.push(newPlat);      
    }
}

function start() {
  if (!isGameOver) {
    createDoodler();
    createPlatforms();
    movePlatforms();
  }
}

start();
console.log(platforms);