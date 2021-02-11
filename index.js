import Game from 'js/game.js';

let preloader = document.querySelector('.preloader');
preloader.style.display = 'none';

let canvas = document.getElementById('game');
canvas.style.display = 'block';

const GAME_CONFIG = {
  width: 1500,
  height: 500,
  maxLevelsCount: 5,
  startSpeed: 7,
  speedStep: 1,
  barriersPerLevel: 5,
  barrierMinHeight: 30,
  barrierMaxHeight: 150
}

let game = new Game(canvas, GAME_CONFIG);
game.play();