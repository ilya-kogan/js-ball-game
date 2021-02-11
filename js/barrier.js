class Barrier {
  constructor(game) {
    this.game = game;
    this._width = game._width;
    this._height = game._height;
    this._ctx = game._ctx;

    this._maxLevelsCount = game._maxLevelsCount;
    this._startSpeed = game._startSpeed;
    this._speedStep = game._speedStep;
    this._barriersPerLevel = game._barriersPerLevel;
    this._barrierMinHeight = game._barrierMinHeight;
    this._barrierMaxHeight = game._barrierMaxHeight;
    this._barriersCount = this._maxLevelsCount * this._barriersPerLevel;
    
    this.barriers = [];
    let barrierLevel = 1;
    let speed = this._startSpeed;
    for (let i = 1; i <= this._barriersCount; i++) {
      let positionX = this._width;
      let heightRand = Math.random() * (this._barrierMaxHeight - this._barrierMinHeight) + this._barrierMinHeight;
      let positionY = this._height - heightRand;

      if (i !== 1) {
        let minWidth = 100 * speed;
        let maxWidth = 50 * speed;
        positionX = this.barriers[i - 2].position.x + ( Math.random() * (maxWidth - minWidth) + minWidth);
      }

      if ((i - 1) % this._barriersPerLevel === 0) {             
        speed += this._speedStep;
        barrierLevel++;       

        if (i !== 1) {
          positionX += this._width;
        }
      }

      this.barriers.push({position:{x: positionX, y: positionY}, speed: speed, size:{x: 40, y: heightRand}, number: i, level: barrierLevel});
    }
  }

  draw() {
    this.barriers.forEach((barrier) => {
      let pipe = new Image();
      pipe.src = './img/pipe.png';

      this._ctx.beginPath();
      this._ctx.drawImage(pipe, barrier.position.x, barrier.position.y, barrier.size.x, barrier.size.y);
      this._ctx.fill();
    });

    this.barriers.forEach((barrier) => this.move(barrier));
  }

  move(barrier) {
    barrier.position.x -= barrier.speed;
  }

  detectCollision(ball, barrier) {
    var distX = Math.abs(ball.xMin - barrier.position.x - barrier.size.x / 2);
    var distY = Math.abs(ball.yMin - barrier.position.y - barrier.size.y / 2);

    if (distX > (barrier.size.x / 2 + ball.radius)) {
      return false;
    }
    if (distY > (barrier.size.y / 2 + ball.radius)) {
      return false;
    }

    if (distX <= (barrier.size.x / 2)) {
      return true;
    }
    if (distY <= (barrier.size.y / 2)) {
      return true;
    }

    var dx = distX - barrier.size.x / 2;
    var dy = distY - barrier.size.y / 2;
    return (dx * dx + dy * dy <= (ball.radius * ball.radius));
  }

  checkCollision(ballPosition) {
    this.barriers.forEach((barrier) => {
      if ( this.detectCollision(ballPosition, barrier) ) {
        this.game.gameState = this.game._state.gameover;
        this.collisionMusic();
      }

      let speed = this._startSpeed;
      if ((this.game._points - 1) % this._barriersPerLevel === 0) {             
        speed += this._speedStep;
      }

      if (ballPosition.xMax > barrier.position.x + barrier.size.x) {
        this.game._points = barrier.number;
        
        if (this.game._points % this._barriersPerLevel == 0 && this._barriersCount > barrier.number) {
          this.game._level = barrier.level;
        }

        if (this.game._points === this._barriersCount) {    
          this.game.gameState = this.game._state.finish;
          this.finalMusic();
        }
      }
    });
  }

  collisionMusic() {
    let collisionMusic = new Audio("./audio/collision.mp3");
    collisionMusic.play();
  }

  finalMusic() {
    let finalMusic = new Audio("./audio/final.mp3");
    finalMusic.play();
  }
}

export default Barrier;