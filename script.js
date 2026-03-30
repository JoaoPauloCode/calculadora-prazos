function calcularPrazo() {
  const dataInicial = document.getElementById("dataInicial").value;
  const dias = parseInt(document.getElementById("dias").value);

  if (!dataInicial || !dias) {
    alert("Preencha todos os campos");
    return;
  }

  const [ano, mes, dia] = dataInicial.split("-");
  let data = new Date(ano, mes - 1, dia);

  let diasContados = 0;

  data.setDate(data.getDate() + 1); // CPC

  while (diasContados < dias) {
    const diaSemana = data.getDay();

    const dataFormatada = data.toISOString().split("T")[0];

    const ehFimDeSemana = (diaSemana === 0 || diaSemana === 6);
    const ehFeriado = feriados.includes(dataFormatada);

    if (!ehFimDeSemana && !ehFeriado) {
      diasContados++;
    }

    if (diasContados < dias) {
      data.setDate(data.getDate() + 1);
    }
  }

  document.getElementById("resultado").innerText =
    "Prazo final: " + data.toLocaleDateString();

const resultadoTexto = "Prazo final: " + data.toLocaleDateString();

document.getElementById("resultado").innerText = resultadoTexto;

salvarHistorico(resultadoTexto);
}

function salvarHistorico(texto) {
  let historico = JSON.parse(localStorage.getItem("historico")) || [];

  historico.push(texto);

  localStorage.setItem("historico", JSON.stringify(historico));

  renderizarHistorico();
}

function renderizarHistorico() {
  const lista = document.getElementById("historico");
  lista.innerHTML = "";

  let historico = JSON.parse(localStorage.getItem("historico")) || [];

  historico.forEach(item => {
    const li = document.createElement("li");
    li.innerText = item;
    lista.appendChild(li);
  });
}

function limparHistorico() {
  localStorage.removeItem("historico");
  renderizarHistorico();
}

window.onload = renderizarHistorico;