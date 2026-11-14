const buttons = document.querySelectorAll("button")
const paragraph = document.getElementById("paragraph")
const text = document.getElementById("text")
const imgs = document.getElementById("imgs")
var counter = 0;

buttons.forEach(function (button) {
  button.addEventListener("click", function () {
    let buttonId = button.id;
    switch (buttonId) {
      case "moveLeft":
        moveLeft();
        break;
      case "moveRight":
        moveRight();
        break;
      case "addText":
        addText();
        break;
      case "removeFirstPar":
        removeFirstPar();
        break;
      case "removeLastPar":
        removeLastPar();
        break;
      case "removeAll":
        removeAll();
        break;
      case "addImg":
        addImg();
        break;
      case "removeOneImg":
        removeOneImg();
        break;
      case "removeAllImg":
        removeAllImg();
        break;
      default:
        break;
    }
  });
});

function moveLeft() {
  paragraph.classList.add("float-start")
  paragraph.classList.remove("float-end")
  buttons[1].classList.remove("btn-solid");
  buttons[1].classList.add("btn-outline");
  buttons[0].classList.add("btn-solid");
  buttons[0].classList.remove("btn-outline");
}

function moveRight() {
  paragraph.classList.remove("float-start");
  paragraph.classList.add("float-end");
  buttons[0].classList.remove("btn-solid");
  buttons[0].classList.add("btn-outline");
  buttons[1].classList.add("btn-solid");
  buttons[1].classList.remove("btn-outline");
}


function addText() {
  let item = document.createElement("li")
  item.textContent = `#${counter} Lorem ipsum dolor sit amet, consectur adipisicing elit.`;
  text.append(item)
  counter++;
}

function removeFirstPar() {
  removeItem(0)
}

function removeLastPar() {
  size = text.children.length
  removeItem(size - 1)
}

function removeAll() {
  text.replaceChildren();
}

function addImg() {
  let item = document.createElement("img")
  item.setAttribute("src", "img/gatinho.jpg")
  item.classList.add("img-thumbnail")
  item.classList.add("w-12")
  imgs.append(item)
  counter++;
}

function removeOneImg() {
  imgs.firstChild.remove()
}

function removeAllImg() {
  imgs.replaceChildren()
}

function removeItem(index) {
  text.children[index].remove()
}
