# Slap Jack
## Project Goals
* Build a website/app that allows a user to play slapjack against themselves, or another user.
* Implement local storage to save player win data across page refreshes.
* Buildout functionality for all given rules on the project spec.
## Technologies Used
* JavaScript
* CSS
* HTML
## Architecture
* Began by building out the functionality for the data model in an effort to make the game fully playable through the console before attempting to connect to the dom.
* The player.js file contains the data for the player class.
* The game.js file contains the data for the game class and methods used on the slapJack game instance.
* The main.js file contains all of the connection from the data model to the dom, as well as local storage help.
* The styles.css file contains all of the styling for the website and the decks.
* The index.html file contains all of the layout/formatting for the page structure.
## Challenges/Wins
* Taking what I have been practicing in class and with groups and being able to implement everything on my own was a big win.
* Was a little overwhelmed by how much extra added features or functionality for the UX was expected on a pretty unguided project.
## Show rules section
![](https://media.giphy.com/media/RHmML88LcCxF3wFiMl/giphy.gif)
## Player in Game
![](https://media.giphy.com/media/ydVWk9sIYNwE9f0coq/giphy.gif)
## Player Wins Game
![](https://media.giphy.com/media/GXK900qfPQPdQbPjIn/giphy.gif)
## LocalStorage to hold data
* Persist player win data using local storage(number of wins should persist across page refreshes)
* Ended up using session storage instead, to only persist through refresh, and not page close and reopen.
![](https://media.giphy.com/media/1LK0VMTVufzD43CLdS/giphy.gif)
## Other
"Automatically reset the game to allow for a new game to be played after the previous game is won"
I ended up creating a new game button that the user can press to reset the game after one is over, I started off with it resetting automatically, but wasn't much of a fan of a new game starting up with seemingly no notice.
