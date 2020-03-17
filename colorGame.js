// let colors = [
//     "rgb(255, 0, 0)",
//     "rgb(255, 255, 0)",
//     "rgb(255, 255, 255)",
//     "rgb(255, 0, 255)",
//     "rgb(0, 255, 255)",
//     "rgb(0, 0, 255)",
// ];

//make a variable to store and track the value; to be used in the hard and easy mode
let numSquares = 6;
let colors = generateRandomColorsArr(numSquares);
console.log(colors)
let squares = document.querySelectorAll(".square");
//This colorToGuess variable saves the result of the function guessThisColor()
//the guessThisColor function returns colors[randomNum]; randomNum is a random number and use as index to access the colors array
let colorToGuess = guessThisColor();
let colorDisplay = document.querySelector("#colorDisplay");
let messageDisplay = document.querySelector("#message");
let resetBtn = document.querySelector("#reset");
let h1 = document.querySelector("h1");
let easyBtn = document.querySelector("#easyBtn");
let hardBtn = document.querySelector("#hardBtn");

//HIDE THE THREE BOXES AND COLOR THE OTHER 3 BOXES
easyBtn.addEventListener("click", function(){
    hardBtn.classList.remove("selected");
    easyBtn.classList.add("selected")
    numSquares = 3;
    colors = generateRandomColorsArr(numSquares);
    colorToGuess = guessThisColor();
    colorDisplay.textContent = colorToGuess;
    console.log(colors)

    for( let i = 0; i < squares.length; i++){
        if(colors[i]) {
            squares[i].style.backgroundColor = colors[i];
        } else {
            squares[i].style.display = "none"
        }
    } 
})

hardBtn.addEventListener("click", function(){
    easyBtn.classList.remove("selected");
    hardBtn.classList.add("selected")
    numSquares = 6;
    colors = generateRandomColorsArr(numSquares);
    colorToGuess = guessThisColor();
    colorDisplay.textContent = colorToGuess;
    console.log(colors)
    
    for( let i = 0; i < squares.length; i++){
            squares[i].style.backgroundColor = colors[i];
            squares[i].style.display = "inline-block"
    } 
})

resetBtn.addEventListener("click", function(){
    colors = generateRandomColorsArr(numSquares);
    console.log(colors)
    colorToGuess = guessThisColor();
    colorDisplay.textContent = colorToGuess;
    for(let i = 0; i < squares.length; i++) {
        //add initial colors to squares
        squares[i].style.backgroundColor = colors[i];
    }
    messageDisplay.textContent="Guess what color is the RGB below...";
    h1.style.backgroundColor = "#232323";

})

colorDisplay.textContent = colorToGuess;
//fill in the squares with colors
for(let i = 0; i < squares.length; i++) {
    //add initial colors to squares
    squares[i].style.backgroundColor = colors[i];
    //add event listener
    squares[i].addEventListener("click", function(){
        let clickedColor = this.style.backgroundColor;
        if(clickedColor === colorToGuess) {
            //say correct
            messageDisplay.textContent = "Correct!"  
            //call the function to change the colors of the squares if correct 
            changeColors(clickedColor);
            h1.style.backgroundColor = clickedColor;
            resetBtn.textContent = "Play Again?";
        } else {
            //fade out the wrong ones
            this.style.backgroundColor = "white";
            this.style.boxShadow = "none"
            //say try again
            messageDisplay.textContent = "Try Again!";
        }
    })
};

//FUNCTION TO CHANGE THE COLORS OF THE SQUARES IF CORRECT
function changeColors(color){
    for( let i = 0; i < colors.length; i++) {
        squares[i].style.backgroundColor = color;
        squares[i].style.boxShadow = "2px 0px 5px 2px rgb(15, 15, 15)";    
    }
}

//FUNCTION TO GET A RANDOM NUMBER AND USE IT AS AN INDEX TO ACCESS THE COLORS ARRAY
//USE THE COLORS.LENGTH AS THE MAXIMUM NUMBER
function guessThisColor() {
   let randomNum = Math.floor( Math.random()* colors.length);
   return colors[randomNum];
}

//generate random colors array
function generateRandomColorsArr(numOfColorsDisplay) {
    let arr = [];
    for (let i = 0; i < numOfColorsDisplay; i++){
        arr.push(randomColor());
    }
    return arr;
}

function randomColor() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    let rgbText =  "rgb(" + r + ", " + g + ", " + b + ")"
    return rgbText;
}