var num1 = 0;
var num2 = 0;
function getValues() {
  num1 = document.getElementById("numero_1").value;
  num2 = document.getElementById("numero_2").value;
}

var resultado = document.getElementById("resultado");

const buttons = document.querySelectorAll("button");

buttons.forEach(function (button) {
  button.addEventListener("click", function () {
    getValues();
    switch (button.id) {
      case "soma":
        add();
        break;
      case "sub":
        sub();
        break;
      case "mult":
        mult();
        break;
      case "divs":
        divs();
        break;
      default: break;
    }
  })
});

function add() {
  resultado.value = parseInt(num1) + parseInt(num2);
}

function sub() {
  resultado.value = num1 - num2;
}

function mult() {
  resultado.value = num1 * num2;
}

function divs() {
  if (num1 != 0 && num2 != 0 && num1 > num2) {
    resultado.value = num1 / num2;
  } else {
    resultado.value = 0;
  }
}

