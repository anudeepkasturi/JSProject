# Bust-A-Move

Bust-A-Move is a clone of the video game with the same name. Here's a general overview on how to play the game:
* The game is initialized with a few bubbles on the board and a bubble cannon that shoots bubbles.
* The bubble cannon's position is fixed and can rotate
* Shoot same colored bubbles in groups of three or more to pop them
* The game is won when the board is cleared of all bubbles.

## Features

### Breadth-First Graph Search
![breadth-first]
[breadth-first]: ./assets/breadth-first-screenshot.png

In the picture above, the floating blue bubble has just been shot and is about to collide with the mesh of other bubbles in a few frames. When it does, a breadth-first search will be kicked off, searching for all adjacent blue bubbles in the first iteration. Afterwards, the two blue bubbles to the left and right of the original shot bubble will be placed into a queue to fire off the same function to find adjacent bubbles. This process continues until all adjacent bubbles of matching color will be found. The code for this is written below:

```js
void bubbleChain(lastBub) {
  //output (all adjacent bubbles of matching color)
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
```

### Grid System

Bust-A-Move's shooting logic is simple, continue moving until you hit the top wall or another bubble. The grid system ensures that a nice even pattern is created whenever two bubbles touch. To do this, the bubble that was shot will look around and find the closest available slot to reside in. The grid system is represented by black dots in the image below. The dots are eligible positions for the center of the bubble.

![grid-system]
[grid-system]: ./assets/grid-system-screenshot.png
