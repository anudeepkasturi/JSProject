# Bust-A-Move

[Bust-A-Move][Bust-A-Move]
[Bust-A-Move]: ""

Bust-A-Move is a clone of the video game with the same name. Here's a general overview on how to play the game:
* The game is initialized with a few bubbles on the board and a bubble cannon that shoots bubbles.
* The bubble cannon's position is fixed and can rotate
* Shoot same colored bubbles in groups of three or more to pop them
* The game is won when the board is cleared of all bubbles.

## Minimum Viable Product

At the end of this week, this app should:

* Have a functional bubble cannon that rotates and shoots based on key input.
* Bubbles that have been shot must ricochet off the boundaries until it touches another bubble or the top boundary.
* Bubbles in groups of three or more that are the same color should pop (be removed from the playing field).
* The game is won when all bubbles are cleared from the board.

## Wireframe
![wireframe]
[wireframe]: ./wireframe.png

## Implementation TimeLine
### Phase 1: Set up canvas with basic bubble movement and bouncing (1 day)
**Objective:** Bubble will move on space key press and ricochet off the boundaries

### Phase 2: Make bubble object with properties (1 day)
**Objective:** Bubble will stop bouncing if it touches another bubble. Groups of 3 or more will pop

### Phase 3: Levels (1 day)
**Objective:** Create several levels that have set bubble patterns to initialize with

### Phase 4: Design and Music (1 day)
**Objective:** Add bonus styling and features, add soundtrack and create a mute button
