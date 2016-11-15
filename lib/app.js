
Bubble[] bubbles = [];
let bubbleRadius = 40;

void setup() {
  size(screen.width - 10, screen.height - 150);
  background(0);
  fill(233);
  ellipseMode(CENTER_RADIUS);
  Bubble bubble = new Bubble(width / 2, height - bubbleRadius)
  append(bubbles, bubble);
}

void draw() {
  background(0);
  fill(233);
  bubbles[0].render();
}

void keyReleased() {
  if (key == 32) {
    bubbles[0].launch();
    console.log(bubbles[0].dY);
  }
}

class Bubble {
  Bubble(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.dX = 0;
    this.dY = 0;
    this.render();
  }

  void launch() {
    this.dY = -5;
    this.dX = -10;
  }

  void move() {
    if (this.x <= bubbleRadius) {
      this.dX *= -1;
    }
    this.x += this.dX;
    
    if (this.y <= bubbleRadius) {
      this.dY = 0;
      this.dX = 0;
    }
    this.y += this.dY;
  }

  void render() {
    this.move();
    ellipse(this.x, this.y, bubbleRadius, bubbleRadius);
  }
}
