
Bubble[] bubbles = [];
let bubbleRadius = 25;
let cannonDirection = 0;
let cannonLeft = false;
let cannonRight = false;
let xStart;
let yStart;
Level level;

document.addEventListener("DOMContentLoaded", () => {
  document.getElementByTagName('canvas').focus()
});


void bubbleChain(lastBub) {
  let bubbleChain = [lastBub];

  for (var i =  bubbles.length - 2; i >= 0; i--) {

    let bubba = bubbleChain[bubbleChain.length - 1];

    if (bubbles[i].color == bubba.color &&
      dist(bubbles[i].x, bubbles[i].y, bubba.x, bubba.y) <= 2*bubbleRadius
    ) {
      append(bubbleChain, bubbles[i]);
    }
  }
  if (bubbleChain.length >= 3) {
    bubbles = bubbles.filter(bub => bubbleChain.indexOf(bub) < 0);
  }
}


void setup() {
  size(685, 500);
  xStart = width / 2;
  yStart = height - bubbleRadius;
  background(200);
  level = new Level(1);
}

void draw() {

  background(200);
  stroke(0);
  strokeWeight(1);
  line(185, 0, 185, 500);
  line(500, 0, 500, 500);


  let lastBub = bubbles[bubbles.length - 1];

  for (var i = 0; i < bubbles.length; i++) {
    bubbles[i].render();
  }

  if (!lastBub.active) {

    snapToGrid(lastBub);

    bubbleChain(lastBub);

    let c = int(random(level.bubbleColors.length ));
    Bubble bubble = new Bubble(xStart, yStart, level.bubbleColors[c]);
  }

  if (cannonLeft && cannonDirection >= -15) {
    cannonDirection -= .5;
  }
  if (cannonRight && cannonDirection <= 15) {
    cannonDirection += .5;
  }

  strokeWeight(10);
  x = (xStart) + cannonDirection*3;
  r = yStart - 50;
  y = 0;
  line(xStart, yStart, x, yStart - 50);
}

void keyReleased() {

  // Space Bar
  if (key == 32 && bubbles[bubbles.length - 1].dY == 0) {
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


void snapToGrid(bubble) {

  let row = 1;

  while (!(bubble.y / (bubbleRadius*row) < 2 && bubble.y / (bubbleRadius*row) > 1)){
    row += 1;
  }

  if (row == 1) {
    bubble.y = bubbleRadius*row;
  } else {
    bubble.y = ((row * 2) - 1) * bubbleRadius
  }




  // let column = 1;
  // let xBubble = bubble.x - 185;
  // if (xBubble / (bubbleRadius*column) > 1) {
  //   while(!(xBubble / (bubbleRadius*column) < 2 && xBubble / (bubbleRadius*column) > 1)) {
  //     column += 1;
  //   }
  // }
  //
  // if (row % 2 == 0) {
  //   if(column == 1) {
  //     bubble.x = (2 * bubbleRadius) * column + 185;
  //   } else {
  //     bubble.x = (2 * bubbleRadius) * column + 185 + bubbleRadius;
  //   }
  // } else {
  //   bubble.x = (2 * bubbleRadius) * column + 185;
  // }
  //
  // console.log(column);
  console.log(bubble.x, bubble.y);
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
    this.dY = -sqrt(400-sq(dX)) || -10;
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

    if (this.x <= bubbleRadius +185 || this.x >= 500 - bubbleRadius) {
      this.dX *= -1;
    }
    this.x += this.dX;

    if (this.y <= 2*bubbleRadius) {
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
