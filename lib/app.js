
Bubble[] bubbles = [];
let bubbleRadius = 40;
let cannonDirection = 0;
let cannonLeft = false;
let cannonRight = false;
let xStart;
let yStart;
Level level;

document.addEventListener("DOMContentLoaded", () => {
  document.getElementByTagName('canvas')
});


void bubbleChain(lastBub) {
  let bubbleChain = [lastBub];

  for (var i = 0; i < bubbles.length - 1; i++) {

    let bubba = bubbleChain[bubbleChain.length - 1];

    if (bubbles[i].color == bubba.color &&
      dist(bubbles[i].x, bubbles[i].y, bubba.x, bubba.y) <= 2*bubbleRadius
    ) {
      append(bubbleChain, bubbles[i]);
    }
  }

}



void setup() {
  size(screen.width - 10, screen.height - 150);
  xStart = width / 2;
  yStart = height - bubbleRadius;
  background(0);
  level = new Level(1);
}

void draw() {
  background(0);
  let lastBub = bubbles[bubbles.length - 1];

  for (var i = 0; i < bubbles.length; i++) {
    bubbles[i].render();
  }

  if (!lastBub.active) {

    bubbleChain(lastBub);

    let c = int(random(level.bubbleColors.length ));
    Bubble bubble = new Bubble(xStart, yStart, level.bubbleColors[c]);
  }

  if (cannonLeft) {
    cannonDirection -= 1;
  }
  if (cannonRight) {
    cannonDirection += 1;
  }

  strokeWeight(10);
  x = (xStart) + cannonDirection*30;
  r = yStart - 150;
  y = 0;
  line(xStart, yStart, x, yStart - 150);
}

void keyReleased() {

  // Space Bar
  if (key == 32) {
    bubbles[bubbles.length - 1].launch(cannonDirection);
  }

  if (keyCode == 37) {
    cannonLeft = false;
  }

  if (keyCode == 39) {
    cannonRight = false;
  }
}

void keyPressed() {

  // Left Arrow
  if (keyCode == 37) {
    cannonLeft = true;
  }

  // Right Arrow
  if (keyCode == 39) {
    cannonRight = true;
  }
}





class Bubble {
  Bubble(startX, startY, color) {
    this.x = startX;
    this.y = startY;
    this.dX = 0;
    this.dY = 0;
    this.color = color;
    this.active = true;
    append(bubbles, this);
    this.id = bubbles.length;

    this.render();
  }

  void launch(dX) {
    this.dX = dX;
    this.dY = -5;
  }

  void move() {

    for (var i = 0; i < bubbles.length; i++) {
      if (bubbles[i].id != this.id) {
        if (dist(bubbles[i].x, bubbles[i].y, this.x, this.y) <= 2*bubbleRadius) {
          this.dY = 0;
          this.dX = 0;
          this.active = false;
        }
      }
    }

    if (this.x <= bubbleRadius || this.x >= width - bubbleRadius) {
      this.dX *= -1;
    }
    this.x += this.dX;

    if (this.y <= bubbleRadius) {
      this.dY = 0;
      this.dX = 0;
      this.active = false;
    }
    this.y += this.dY;
  }

  void render() {
    this.move();
    fill(this.color);

    ellipseMode(CENTER_RADIUS);
    strokeWeight(4);
    ellipse(this.x, this.y, bubbleRadius, bubbleRadius);
  }
}

class Level {
  Level(lvl) {
    switch (lvl) {
      case 1:
        this.bubbleColors = [
          color(128, 255, 0),
          color(0, 128, 255),
          color(255, 0, 128)
        ];
        let c = int(random(this.bubbleColors.length));
        Bubble bubble = new Bubble(xStart, yStart, this.bubbleColors[c]);
      break;
    }
  }
}
