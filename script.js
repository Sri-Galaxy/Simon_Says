let h2 = document.querySelector("h2");
let boxbefore = document.querySelector(".box");
let hs = document.getElementById("hs");

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
  let randColor = btns[randidx];
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
