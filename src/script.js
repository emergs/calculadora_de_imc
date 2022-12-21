/*
- definir limite para o texto de resultado nao vazar
- limpar resultado quando clicar nas caixas de texto
- estilizar diretamente no css
- definir melhor a fonte e tamanho(resultado)
- definir uma largura menor para o container

*/

let pesoText = document.querySelectorAll(".input-number")[0];
let altText = document.querySelectorAll(".input-number")[1];
let calcular = document.querySelectorAll(".btn")[0];
let ref = document.querySelector("#spaceButton");
let divResult = document.querySelector("#divResult");

function checarPreenchimento() {
   if (pesoText.value > 0 && pesoText.value <= 600) {
      if (altText.value > 0 && altText.value <= 3) {
         valuesOk(altText, pesoText);
         calcularTotal();
      } else {
         alert("altura não ok");
         valueNaoOk(altText);
      }
   } else {
      alert("peso não ok");
      valueNaoOk(pesoText);
   }
   /*funcão para checar se os valores foram preenchidos e estão na faixa de valores especificados*/
}

function valuesOk() {
   pesoText.style.border = "1px solid black";
   altText.style.border = "1px solid black";
   //torna a borda preta novamente depois de corrigir o preenchimento dos dados
}

function valueNaoOk(prop) {
   prop.style.border = "1px solid red";
   //deixa a borda do input text com cor diferente alertando o valor incorreto
}

function valueOk(prop) {
   prop.style.border = "1px solid gray";
   //retorna a borda do input text a cor original quando o range for alterado
}

function calcularTotal() {
   let peso = parseInt(pesoText.value);
   let altura = parseFloat(altText.value);
   let imc = (peso / Math.pow(altura, 2)).toFixed(2);
   pesoText.value = "";
   altText.value = "";
   checarClasse(imc);
   //função para realizar o calculo do imc
}

function checarClasse(imc) {
   let classif;
   if (imc <= 18.5) {
      classif = "Magreza";
   } else if (imc <= 24.9) {
      classif = "Peso ideal";
   } else if (imc <= 29.9) {
      classif = "Levemente Acima do Peso";
   } else if (imc <= 34.9) {
      classif = "Obesidade Grau I";
   } else if (imc <= 39.9) {
      classif = "Obesidade Grau II (Severa)";
   } else if (imc > 40) {
      classif = "Obesidade Grau III (Mórbida)";
   }

   resultDescription(imc, classif);
}

function resetResult(result, classe) {
   let childs = divResult.children.length;
   if (childs >= 2) {
      while (childs != 0) {
         let seq = document.querySelector("#divResult").lastElementChild;
         seq.remove();
         childs--;
      }
   }
}

function resultDescription(imc, classif) {
   let result = document.createElement("p");
   let classe = document.createElement("p");

   result.classList.add("resultImc");
   result.textContent = `Seu imc é:  ${imc}`;

   classe.classList.add("classif");
   classe.textContent = `Classificação: ${classif}`;

   indexar(result, classe);
   //função para criar novos paragrafos
}

function indexar(result, classe) {
   resetResult();
   //só indexar caso nao exista resultados anteriores
   //add new paragraph in the document
   divResult.appendChild(result);
   divResult.appendChild(classe);
}

calcular.addEventListener("click", checarPreenchimento);
pesoText.addEventListener("click", valuesOk);
altText.addEventListener("click", valuesOk);
