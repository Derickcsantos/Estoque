const form = document.getElementById("itemForm");
const nomeInput = document.getElementById("itemNome");
const qtdInput = document.getElementById("itemQtd");
const idInput = document.getElementById("itemId");
const tableBody = document.querySelector("#estoqueTable tbody");

let estoque = JSON.parse(localStorage.getItem("estoque")) || [];

function salvarEstoque() {
    localStorage.setItem("estoque", JSON.stringify(estoque));
    renderTabela();
}

function renderTabela() {
    tableBody.innerHTML = "";
    estoque.forEach((item, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.nome}</td>
            <td>${item.qtd}</td>
            <td>
                <button onclick="editarItem(${index})">Editar</button>
                <button onclick="excluirItem(${index})">Excluir</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function editarItem(index) {
    const item = estoque[index];
    nomeInput.value = item.nome;
    qtdInput.value = item.qtd;
    idInput.value = index;
}

function excluirItem(index) {
    estoque.splice(index, 1);
    salvarEstoque();
}

form.onsubmit = (e) => {
    e.preventDefault();
    const nome = nomeInput.value.trim();
    const qtd = parseInt(qtdInput.value);
    if (!nome || isNaN(qtd)) return;

    const id = idInput.value;
    if (id === "") {
        estoque.push({ nome, qtd });
    } else {
        estoque[id] = { nome, qtd };
        idInput.value = "";
    }
    nomeInput.value = "";
    qtdInput.value = "";
    salvarEstoque();
};

renderTabela();
