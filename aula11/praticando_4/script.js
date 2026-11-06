const buttons = document.querySelectorAll("button")
const paragraph = document.getElementById("paragraph")
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
    paragraph.append(item)
    counter++;
}

function removeFirstPar(){
    paragraph.shift();
}