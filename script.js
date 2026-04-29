let boxes=document.querySelectorAll('.box');
let resetBtn=document.querySelector('#reset'); 
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let player1=prompt("Enter name of player 1 (O):");
let player2=prompt("Enter name of player 2 (X):");


let turnO= true;
let count = 0;

//Winning patterns stored in 2d array
const winPatterns=[
    [0,1,2],
    [3,4,5],
    [6,7,8],  
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6] 
];

//function to reset the game, it will enable all the boxes and hide the message container
const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
}

resetBtn.addEventListener('click', resetGame);
newGameBtn.addEventListener('click', resetGame);


/*for each box add event listener so when clicked it will check if turn is O or X 
and then change the inner text of the box to O or X accordingly and also toggle the turn for next player*/
boxes.forEach((box)=>{
    box.addEventListener('click',()=>{
        console.log('Box clicked');
        if (turnO) {
            box.innerText = 'O';
            box.style.color = '#22c55e'; // green
            turnO = false;
        } else {
            box.innerText = 'X';
            box.style.color = '#f43f5e'; // red
            turnO = true;
        }
        box.disabled=true; //disable the box after it's clicked

        count++;

        let isWinner = checkWinner();

        if (count === 9 && !isWinner) {
        gameDraw();
        } //check if there's a winner after each move
    })
});

const gameDraw = () => {
  msg.innerText = "It's a draw!";
  msgContainer.classList.remove("hide");
  disableBoxes();
}

//function to enable the boxes and clear the text in the boxes
const enableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerText = ''; // Clear the text in the box
  });}

//function to disable the boxes
const disableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = true;
  });}

  //function to show the winner message and disable the boxes
const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};


//function to check for winner
let checkWinner=()=>{
    for(let pattern of winPatterns){
        let pos1=boxes[pattern[0]].innerText;
        let pos2=boxes[pattern[1]].innerText;
        let pos3=boxes[pattern[2]].innerText;
        
        if(pos1!=''&&pos2!=''&&pos3!=''){
            if(pos1===pos2 && pos2===pos3){
                console.log("Winner is:" + pos1);
                if(pos1==='O'){
                    pos1=player1;
                }else{
                    pos1=player2;
                }
                showWinner(pos1);
                return true;
            }
        }
    }
    return false;
}