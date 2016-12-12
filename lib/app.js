
Bubble[] bubbles = [];
Array[] bubblePositions = [];
let bubbleRadius = 25;
let cannonDirection = 0;
let cannonLeft = false;
let cannonRight = false;
let xStart;
let yStart;
Level level;

PImage blue_bubble;
PImage red_bubble;
PImage yellow_bubble;


Array findNearbyMatchingBubbles(bub) {
  let bubbleChain = [];

  let adjacentBubPos = [
    [bub.x - bubbleRadius, bub.y - 47],
    [bub.x + bubbleRadius, bub.y - 47],
    [bub.x - bubbleRadius, bub.y + 47],
    [bub.x + bubbleRadius, bub.y + 47],
    [bub.x + 50, bub.y],
    [bub.x - 50, bub.y]
  ];

    bubbles.filter(function(bubba){

      for (var i = 0; i < 6; i++) {
        if (adjacentBubPos[i][0] == bubba.x &&
        adjacentBubPos[i][1] == bubba.y &&
        bub.color == bubba.color) {
          append(bubbleChain, bubba);
        }
      }
    });

  return bubbleChain;
}

void bubbleChain(lastBub) {
  let bubbleChain = [lastBub];
  let queue = [lastBub];

  while(queue.length > 0) {
    currentBub = queue.shift();
    let results = findNearbyMatchingBubbles(currentBub);

    for (var i = 0; i < results.length; i++) {
      if (!bubbleChain.includes(results[i])) {
        queue.push(results[i]);
        bubbleChain.push(results[i]);
      }
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

  let game = document.getElementById("game");
  game.focus();

  blue_bubble = loadImage('./assets/blue_bubble.png');
  red_bubble = loadImage('./assets/red_bubble.png');
  yellow_bubble = loadImage('./assets/yellow_bubble.png');
}

//testing
void drawGrid() {
  point(210, 22);
  point(260, 22);
  point(310, 22);
  point(360, 22);
  point(410, 22);
  point(460, 22);
  point(210 + 25, 69);
  point(260 + 25, 69);
  point(310 + 25, 69);
  point(360 + 25, 69);
  point(410 + 25, 69);
  point(460 + 25, 69);

  point(210, 116);
  point(260, 116);
  point(310, 116);
  point(360, 116);
  point(410, 116);
  point(460, 116);
  point(210 + 25, 163);
  point(260 + 25, 163);
  point(310 + 25, 163);
  point(360 + 25, 163);
  point(410 + 25, 163);
  point(460 + 25, 163);

  point(210, 210);
  point(260, 210);
  point(310, 210);
  point(360, 210);
  point(410, 210);
  point(460, 210);
  point(210 + 25, 257);
  point(260 + 25, 257);
  point(310 + 25, 257);
  point(360 + 25, 257);
  point(410 + 25, 257);
  point(460 + 25, 257);
}

void drawBoard() {
  background(200);
  stroke(0);
  strokeWeight(1);
  line(170, 0, 170, 500);
  line(500, 0, 500, 500);
  strokeWeight(10);
  x = (xStart) + cannonDirection*3;
  r = yStart - 50;
  y = 0;
  line(xStart, yStart, x, yStart - 50);

  //for testing
  // drawGrid();
  // image(yellow_bubble, 0, 0, 50, 50);
}

void draw() {

  drawBoard();

  bubblePositions = [];

  let lastBub = bubbles[bubbles.length - 1];

  for (var i = 0; i < bubbles.length; i++) {
    bubbles[i].render();
    if (bubbles[i].color === 'blue') {
      image(blue_bubble, bubbles[i].x - 25, bubbles[i].y - 25, 50, 50);
    } else if (bubbles[i].color === 'red') {
      image(red_bubble, bubbles[i].x - 25, bubbles[i].y - 25, 50, 50);
    } else {
      image(yellow_bubble, bubbles[i].x - 25, bubbles[i].y - 25, 50, 50);
    }


    append(bubblePositions, [bubbles[i].x, bubbles[i].y, bubbles[i].color]);
  }

  if (!lastBub.active) {

    snapToGrid(lastBub);
    bubbleChain(lastBub);

    won();
    let c = int(random(level.bubbleColors.length));
    Bubble bubble = new Bubble(xStart, yStart, level.bubbleColors[c]);
  }

  moveCannon();
}

void moveCannon() {
  if (cannonLeft && cannonDirection >= -15) {
    cannonDirection -= .5;
  }
  if (cannonRight && cannonDirection <= 15) {
    cannonDirection += .5;
  }
}

void keyReleased() {

  // Space Bar
  if (key == 32 && bubbles[bubbles.length - 1].dY == 0) {
    bubbles[bubbles.length - 1].launch(cannonDirection);
  }

  // Left Arrow
  if (keyCode == 37) {
    cannonLeft = false;
  }

  // Right Arrow
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

void won() {
  if (bubbles.length == 0) {
    noLoop();
    redraw();
  }
}


void snapToGrid(bubble) {

  let row = floor(bubble.y / (bubbleRadius*2)) + 1;

  if (row == 1) {
    bubble.y = bubbleRadius - (3*row);
  } else {
    bubble.y = ((row * 2) - 1) * bubbleRadius - (3*row);
  }

  let xBubble = bubble.x - 185;


  leftBubbleX = (int(xBubble / (2*bubbleRadius)) * (2*bubbleRadius)) + 185 - bubbleRadius;
  rightBubbleX = (int(xBubble / (2*bubbleRadius)) * (2*bubbleRadius)) + 185 + bubbleRadius;

  if (row % 2 == 0) {
    leftBubbleX += bubbleRadius;
    rightBubbleX += bubbleRadius;
  }

  let closerToLeft;
  if(bubble.x - leftBubbleX > rightBubbleX - bubble.x) {
    closerToLeft = false;
  } else {
    closerToLeft = true;
  }

  if(bubblePositions.length > 1) {
    for (var i = 0; i < bubblePositions.length - 1; i++) {
      if (bubblePositions[i][1] == bubble.y &&
        (bubblePositions[i][0] == leftBubbleX || bubblePositions[i][0] == leftBubbleX + bubbleRadius)) {
          bubble.x = rightBubbleX;
          break;
      } else if (bubblePositions[i][1] == bubble.y &&
        (bubblePositions[i][0] == rightBubbleX || bubblePositions[i][0] == rightBubbleX + bubbleRadius)) {
          bubble.x = leftBubbleX;
          break;
      } else if (closerToLeft) {
        bubble.x = leftBubbleX;
      } else {
        bubble.x = rightBubbleX;
      }
    }

  } else {
    if (closerToLeft) {
      bubble.x = leftBubbleX;
    } else {
      bubble.x = rightBubbleX;
    }
  }
  bubblePositions[bubblePositions.length - 1] = [bubble.x, bubble.y];
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

    if(color === 'red') {
      this.imageProps = [
        red_bubble,
        this.x,
        this.y,
        bubbleRadius*2,
        bubbleRadius*2];
    } else if (color === 'yellow') {
      this.imageProps = [
        yellow_bubble,
        this.x,
        this.y,
        bubbleRadius*2,
        bubbleRadius*2];
    } else {
      this.imageProps = [blue_bubble, 5, 5, 50, 50];
    }

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

    if (this.x <= bubbleRadius + 185 || this.x >= 500 - bubbleRadius) {
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

    ellipseMode(CENTER_RADIUS);
    strokeWeight(4);
    ellipse(this.x, this.y, bubbleRadius, bubbleRadius);
    // image(...this.imageProps);
  }
}

class Level {
  Level(lvl) {
    switch (lvl) {
      case 1:
        this.bubPos = [
          [210, 22],
          [260, 22],
          [310, 22],
          [360, 22],
          [410, 22],
          [460, 22],
          [210, 116],
          [260, 116],
          [310, 116],
          [360, 116],
          [410, 116],
          [460, 116]
        ]

        this.bubbleColors = ['red', 'yellow', 'blue'];

        for (var i = 0; i < this.bubPos.length; i++) {
          let c = i % 3;
          Bubble bubble = new Bubble(this.bubPos[i][0], this.bubPos[i][1], this.bubbleColors[c]);
        }
      break;
    }
  }
}
