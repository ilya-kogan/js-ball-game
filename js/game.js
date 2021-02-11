import Ball from './ball.js';
import Barrier from './barrier.js';

class Game {
  constructor(canvas, gameConfig) {
    canvas.width = gameConfig.width;
    canvas.height = gameConfig.height;

    this._width = gameConfig.width;
    this._height = gameConfig.height;
    this._ctx = canvas.getContext('2d');

    this._level = 1;
    this._points = 0;
    this._state = {
      initial: 1,
			playing: 2,
      gameover: 3,
      finish: 4
    };
    this.gameState = this._state.initial;

    this._maxLevelsCount = gameConfig.maxLevelsCount;
    this._startSpeed = gameConfig.startSpeed;
    this._speedStep = gameConfig.speedStep;
    this._barriersPerLevel = gameConfig.barriersPerLevel;
    this._barrierMinHeight = gameConfig.barrierMinHeight;
    this._barrierMaxHeight = gameConfig.barrierMaxHeight;

    //this.initElements();
    document.addEventListener('keydown', this.startGameHandle.bind(this));
  }

  play() {
    this.clear();

    if (this.gameState == this._state.initial) {
      this.drawMessage('Welcome! Please press "Enter" to Start Game', 'white');
    } else if (this.gameState == this._state.playing) {
      this.ball.draw();
      this.barrier.draw();
      this.barrier.checkCollision(this.ball.getPosition());
    } else if (this.gameState == this._state.gameover) {
      this.drawMessage('Game Over! Please click "Enter" to Start a New Game.', 'red');
    } else if (this.gameState == this._state.finish) {
      this.drawMessage('You Win! Please click "Enter" to Start a New Game.', 'green');
    }

    this.showGameStatus();
		requestAnimationFrame(this.play.bind(this));
  }

  showGameStatus() {
    if ( this.gameState !== this._state.initial ) {
      this._ctx.font = "small-caps bold 30px Arial";
      this._ctx.fillStyle = "white";
      this._ctx.textAlign = "center";
      this._ctx.fillText( 'Level: ' + this._level + ' / ' + 'Points: ' + this._points, this._width / 2, 50);
    }
  }

  startGameHandle(e) {
    if (e.keyCode === 13 ) {
      if (this.gameState == this._state.initial || this.gameState == this._state.gameover || this.gameState == this._state.finish) {
        this.gameState = this._state.playing;
        this.initElements();
      }
    }
  }

  initElements() {
    this._level = 1;
    this._points = 0;
    this.ball = new Ball(this);
    this.barrier = new Barrier(this);
  }

  drawMessage(text, color) {
    this._ctx.font = "small-caps bold 30px Arial";
    this._ctx.fillStyle = color;
    this._ctx.textAlign = "center";
    this._ctx.fillText(text, this._width / 2, this._height / 2);
  }

  clear() {
    this._ctx.clearRect(0, 0, this._width, this._height);
  }
}

export default Game;