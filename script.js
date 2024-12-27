/*--------------------------------------------------_Declarations_-----------------------------------------*/
//The selctors...
let h2 = document.querySelector("h2");
let boxbefore = document.querySelector(".box");
let hs = document.getElementById("hs");

//selectors of Audios...
let audio1 = document.getElementById("myAudio1");
let audio2 = document.getElementById("myAudio2");
let audio3 = document.getElementById("myAudio3");
let audio4 = document.getElementById("myAudio4");

//For keeping the high score...
let LifetimehighScore = 0;

//Arrays to store Answer and User Answer...
let ans = [];
let usr = [];

//Array of buttons...
let btns = ["btn1", "btn2", "btn3", "btn4"];

/*-----------------------------------------------_Main Logic_---------------------------------------------*/
//For starting the game...
let start = false;
//For calculating the levels...
let lvl = 0;

//For starting the game...
document.addEventListener("keypress", function () {
  if (!start) {
    console.log("Game is ON!");
    start = true;
    lvlUp();
    boxbefore.style.setProperty("--pseudo-width", "50%");
  }
});

//Computer will flash the buttons...
function btnFlsh(button) {
  button.classList.add("flash");

  if (button.id == "btn1") {
    audio1.play();
    audio1.playbackRate = 2;
  } else if (button.id == "btn2") {
    audio2.play();
  } else if (button.id == "btn3") {
    audio3.play();
    audio3.playbackRate = 2;
  } else {
    audio4.play();
    audio4.playbackRate = 1.5;
  }

  setTimeout(function () {
    button.classList.remove("flash");
  }, 300);
}

//User will flash the buttons...
function usrFlsh(button) {
  button.classList.add("usrflash");

  setTimeout(function () {
    button.classList.remove("usrflash");
  }, 300);
}

//Function for level up! and flashing buttons...
function lvlUp() {
  usr = [];
  lvl++;
  h2.innerText = `Level ${lvl}`;

  let randidx = Math.floor(Math.random() * 4);
  let randColor = btns[randidx];

  ans.push(randColor);

  ans.forEach((el, i) => {
    setTimeout(() => {
      let newBtn = document.querySelector(`.${el}`);
      btnFlsh(newBtn);
    }, 650 * i);
  });
}

//Function for checking the Answer...
function isValid(idx) {
  if (usr[idx] === ans[idx]) {
    //Correct...
    if (usr.length === ans.length) {
      setTimeout(lvlUp, 1750);
    }
  }
  //Wrong...
  else {
    let audio = document.getElementById("myAudio");
    audio.play();
    h2.innerHTML = `Game Over! <u><i>Your Score : <b> ${lvl}</b></i></u>. Press any key to start`;
    if (lvl > LifetimehighScore) {
      LifetimehighScore = lvl;
      hs.innerHTML = `High Score : <b>${LifetimehighScore}</b>`;
    }
    setTimeout(reset, 1000);
  }
}

//Function to know which key is pressed...
function pressed() {
  let btn = this;
  usrFlsh(btn);

  let userColor = btn.getAttribute("id");

  //Playing sounds for  user selection...
  if (userColor == "btn1") {
    audio1.play();
    audio1.playbackRate = 2.25;
  } else if (userColor == "btn2") {
    audio2.play();
  } else if (userColor == "btn3") {
    audio3.play();
    audio3.playbackRate = 2;
  } else {
    audio4.play();
    audio4.playbackRate = 1.5;
  }

  usr.push(userColor);

  isValid(usr.length - 1);
}

//Added click event listner to all the buttons...
let allbtns = document.querySelectorAll(".box");
for (let btn of allbtns) {
  btn.addEventListener("click", pressed);
}

//Reset function...
function reset() {
  lvl = 0;
  start = false;
  usr = [];
  ans = [];
}
