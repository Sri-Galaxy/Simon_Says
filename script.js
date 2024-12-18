let h2 = document.querySelector("h2");
let boxbefore = document.querySelector(".box");
let hs = document.getElementById("hs");
let randColor;

//Array of Audios...
let audio1 = document.getElementById("myAudio1");
let audio2 = document.getElementById("myAudio2");
let audio3 = document.getElementById("myAudio3");
let audio4 = document.getElementById("myAudio4");

let LifetimehighScore = 0;

let ans = [];
let usr = [];

let btns = ["btn1", "btn2", "btn3", "btn4"];

let start = false;
let lvl = 0;

document.addEventListener("keypress", function () {
  if (!start) {
    console.log("Game is ON!");
    start = true;
    lvlUp();
    boxbefore.style.setProperty("--pseudo-width", "50%");
  }
});

function btnFlsh(button) {
  button.classList.add("flash");
  if (randColor == "btn1") {
    audio1.play();
    audio1.playbackRate = 2;
  } else if (randColor == "btn2") {
    audio2.play();
    audio2.playbackRate = 1.25;
  } else if (randColor == "btn3") {
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

function usrFlsh(button) {
  button.classList.add("usrflash");
  setTimeout(function () {
    button.classList.remove("usrflash");
  }, 250);
}

function lvlUp() {
  usr = [];
  lvl++;
  h2.innerText = `Level ${lvl}`;

  let randidx = Math.floor(Math.random() * 4);
  randColor = btns[randidx];
  let randbtn = document.querySelector(`.${randColor}`);

  ans.push(randColor);
  btnFlsh(randbtn);
}

function isValid(idx) {
  if (usr[idx] === ans[idx]) {
    if (usr.length === ans.length) {
      setTimeout(lvlUp, 1000);
    }
  } else {
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

function pressed() {
  let btn = this;
  usrFlsh(btn);

  let userColor = btn.getAttribute("id");
  usr.push(userColor);

  isValid(usr.length - 1);
}

let allbtns = document.querySelectorAll(".box");
for (let btn of allbtns) {
  btn.addEventListener("click", pressed);
}

function reset() {
  lvl = 0;
  start = false;
  usr = [];
  ans = [];
}
