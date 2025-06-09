//Line 
const cursor = document.getElementById('cursor');
const lineButton = document.getElementById('clickButton');

let position = -1; 
const step = 0.15; 
const maxPosition = 24; 
const minPosition = -1;

lineButton.addEventListener('click', () => {
  if (position + step >= maxPosition) {
    position = maxPosition; 
    cursor.style.left = position + 'rem'; 
    setTimeout(() => alert('Félicitations, vous avez atteint la fin !'), 100);
    return;
  }
  position += step;
  cursor.style.left = position + 'rem'; 
});

setInterval(() => {
  if (position - step >= minPosition) {
    position -= step;
    cursor.style.left = position + 'rem';
  }
}, 500);

//Bulb
let energy = 0;
const bulbButton = document.getElementById('light-button');
const bulb = document.getElementById('bulb');
const energyCount = document.getElementById('energy-count');
const winMessage = document.getElementById('win');

function updateBulb() {
  const progress = Math.min(energy / 100, 1);
  const brightness = 0.3 + progress * 0.7;
  const glow = progress * 40;
  const colorIntensity = 100 + progress * 155;
  const bulbColor = `radial-gradient(circle at center, rgb(${colorIntensity}, ${colorIntensity}, 100), #ffd700)`;

  bulb.style.filter = `brightness(${brightness})`;
  bulb.style.boxShadow = `0 0 ${glow}px ${glow / 5}px #ffd700`;
  bulb.style.background = bulbColor;
  energyCount.textContent = Math.floor(energy);
  
  if (energy === 100) {
    winMessage.textContent = "Énergie maximale !";
    } else if (energy < 100) {
      winMessage.textContent = "Je suis dans la pénombre, donne moi de l'énergie !";
    }
}

bulbButton.addEventListener('click', () => {
  energy = Math.min(energy + 1, 100);
  updateBulb();
});

setInterval(() => {
  energy = Math.max(energy - 2, 0); 
  updateBulb();
}, 500);

updateBulb();

//Dots
const grid = document.getElementById('dotGrid');
const status = document.querySelector('.status');
const victoryMessage = document.getElementById('victory');
const total = 25;
const dots = [];  

function activateDot(index) {
  const { el } = dots[index];
  el.classList.add('active');
  dots[index].active = true;
  checkWin();

  dots[index].timer = setTimeout(() => {
    el.classList.remove('active');
    dots[index].active = false;
    checkWin();
  }, 9500);
}

function checkWin() {
  const activeCount = dots.filter(n => n.active).length;
  status.textContent = `Points activés : ${activeCount}/${total}`;
  
  if (activeCount === total) {
    victoryMessage.textContent = "Victoire !";
  } else {
    victoryMessage.textContent = "Clic sur les points !";
  }
}

for (let i = 0; i < total; i++) {
  const div = document.createElement('div');
  div.classList.add('dot');
  grid.appendChild(div);
  
  dots.push({ el: div, active: false, timer: null });
  
  div.addEventListener('click', () => {
    if (!dots[i].active) {
      activateDot(i);
    }
  });
}
