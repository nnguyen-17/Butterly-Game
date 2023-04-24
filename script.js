// RESOURCES
// https://www.w3schools.com/jquery/jquery_animate.asp
// https://api.jquery.com/addclass/
// https://www.udemy.com/course/the-complete-web-development-bootcamp/

//VARIABLES
const buttonColors = ['blue', 'purple', 'orange', 'yellow']
let gamePattern = []
let userClickedPattern = []
let started = false
let level = 0
let levelTitle = document.getElementById('level-title')
let button = document.querySelectorAll('.btn')
let body = document.querySelector('.body')

//jquery used to detect keyboard press
$(document).keypress(function () {
  if (!started) {
    //DOM Manipulation
    levelTitle.innerHTML = `Level ${level}`
    nextSequence()
    started = true
  }
})

button.forEach((buttons) => {
  //forEach() method executes a provided function once for each array element.
  buttons.addEventListener('click', function (event) {
    //Store ID of the button that got clicked inside the handler
    const userColor = $(this).attr('id')
    //Push needed to build up an array of the different clicked buttons
    userClickedPattern.push(userColor)
    playSound(userColor)
    animatePress(userColor)
    checkAnswer(userClickedPattern.length - 1)
  })
})

function checkAnswer(currentLevel) {
  // to check if the most recent user answer is the same as the game pattern
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    //if they got the most recent answer right, then check if they have finished their sequence
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence()
      }, 1000)
    }
  } else {
    playSound('wrong')
    body.classList.add('game-over')
    levelTitle.innerHTML = `Game Over, Press Any Key to Restart`
    setTimeout(function () {
      body.classList.remove('game-over')
    }, 200)
    startOver()
  }
}

function nextSequence() {
  userClickedPattern = []
  level++
  //change level title each time
  levelTitle.innerHTML = `Level ${level}`
  let randomNumber = Math.floor(Math.random() * 4)
  let randomChosenColor = buttonColors[randomNumber]
  gamePattern.push(randomChosenColor)
  //Using jQuery to animate the flash
  $('#' + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100)
  playSound(randomChosenColor)
}

function animatePress(currentColor) {
  $('#' + currentColor).addClass('pressed')
  setTimeout(function () {
    $('#' + currentColor).removeClass('pressed')
  }, 100)
}

function playSound(name) {
  const audio = new Audio('sounds/' + name + '.mp3')
  audio.play()
}

function startOver() {
  level = 0
  gamePattern = []
  started = false
}
