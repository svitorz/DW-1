const botao = document.getElementById("btnCalcular");
botao.addEventListener("click", calcularMedia);

function calcularMedia() {
    const nota1 = document.getElementById("nota1").value;
    const nota2 = document.getElementById("nota2").value;
    const media = (nota1 + nota2) / 2;
    //mostrarResultdo(media);
    //typo (erro 1)
    mostrarResultado(media);
}

function mostrarResultado(valor) {
    document.getElementById("resultado").textContent = "Média: " + valor;
}

// Prévia da próxima aula: buscar dados de um arquivo JSON
document.getElementById("btnTurma").addEventListener("click", async () => {
    const resposta = await fetch("turma.json");
    const alunos = await resposta.json();
    const lista = document.getElementById("listaTurma");
    lista.innerHTML = "";
    for (const aluno of alunos) {
        lista.innerHTML += `<li>${aluno.nome}: ${aluno.media}</li>`;
    }
});
