class Ball {
  constructor(game) {
    this._ctx = game._ctx;
    this._radius = 30;
    this._x = 300;
    this._y = game._height - this._radius;
    this._speed = 5;
    this._jump = false;
    
    document.addEventListener('keydown', this.jump.bind(this));
  }

  draw() {
    let ball = new Image();
    ball.src = './img/ball.png';    

    this._ctx.beginPath();
    this._ctx.globalCompositeOperation='destination-over';
    this._ctx.arc(this._x, this._y, this._radius, 0, Math.PI * 2);
    this._ctx.drawImage(ball, this._x - this._radius - 10, this._y - this._radius - 10, 80, 80);
    this._ctx.fill();

    if (this._jump && this._y > 150) {
      this._y -= 15;

      if ( this._y < 150) {
        this._jump = false;
      }
    }

    if (!this._jump && this._y < 470) {
      this._y += 15;
    }
  }

  getPosition() {
    return {
      xMin: this._x,
      xMax: this._x + this._radius,
      yMin: this._y,
      yMax: this._y + this._radius,
      radius: this._radius
    }
  }

  jump(e) {
    if (e.keyCode === 32 && this._y == 470) {
      this._jump = true;
      this.jumpMusic();
    }
  }

  jumpMusic() {
    let jumpMusic = new Audio("./audio/jump.mp3");
    jumpMusic.play();
  }
}

export default Ball;