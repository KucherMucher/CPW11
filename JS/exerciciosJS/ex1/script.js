// 1. VARIÁVEIS PESSOAIS
let nomeCompleto = "Enriqué";  // Substituir pelo seu nome
let idade = 17;                   // Substituir pela sua idade
let anoNascimento = 2008;         // Substituir pelo seu ano
let escola = "Colégio de S. Miguel";
const PI = 3.14159;               // Constante matemática

// Variável calculada
let anoAtual = 2024;
let idadeCalculada = anoAtual - anoNascimento;

// Mostrar na consola (F12 para ver)
console.log("Nome:", nomeCompleto);
console.log("Idade:", idade);
console.log("Escola:", escola);



// 2. FUNÇÃO DE APRESENTAÇÃO
function apresentacao() {
    let saudacao = "Olá! Eu sou " + nomeCompleto;
    let informacao = "Tenho " + idade + " anos e estudo no " + escola;
    let mensagemCompleta = saudacao + ". " + informacao + ".";

    // Mostrar no HTML
    document.getElementById("resultado").innerHTML = 
        "<h3>🎯 Apresentação</h3>" +
        "<p>" + mensagemCompleta + "</p>" +
        "<p><strong>Ano de nascimento:</strong> " + anoNascimento + "</p>";

    // Mostrar também em alert
    alert(mensagemCompleta);
}




// 3. CALCULADORA DE IDADE
function calculadoraIdade() {
    // Pedir ano de nascimento ao utilizador
    let anoNasc = prompt("Em que ano nasceu?");

    // Converter para número
    anoNasc = Number(anoNasc);

    // Verificar se é válido
    if (anoNasc > 1900 && anoNasc <= 2025) {
        let idadeCalculada = 2025 - anoNasc;
        let proximoAniversario = idadeCalculada + 1;

        document.getElementById("resultado").innerHTML = 
            "<h3>🎂 Calculadora de Idade</h3>" +
            "<p><strong>Ano de nascimento:</strong> " + anoNasc + "</p>" +
            "<p><strong>Idade atual:</strong> " + idadeCalculada + " anos</p>" +
            "<p><strong>Próximo ano fará:</strong> " + proximoAniversario + " anos</p>";
    } else {
        alert("Por favor, insira um ano válido entre 1900 e 2024!");
    }
}




// 4. CALCULADORA BÁSICA
function calculadoraBasica() {
    let numero1 = prompt("Digite o primeiro número:");
    let numero2 = prompt("Digite o segundo número:");

    // Converter para números
    numero1 = Number(numero1);
    numero2 = Number(numero2);

    // Verificar se são números válidos
    if (!isNaN(numero1) && !isNaN(numero2)) {
        // Operações matemáticas
        let soma = numero1 + numero2;
        let subtracao = numero1 - numero2;
        let multiplicacao = numero1 * numero2;
        let divisao = numero1 / numero2;
        let potencia = numero1 ** numero2;

        document.getElementById("resultado").innerHTML = 
            "<h3>🧮 Calculadora Básica</h3>" +
            "<p><strong>Números:</strong> " + numero1 + " e " + numero2 + "</p>" +
            "<p><strong>Soma:</strong> " + numero1 + " + " + numero2 + " = " + soma + "</p>" +
            "<p><strong>Subtração:</strong> " + numero1 + " - " + numero2 + " = " + subtracao + "</p>" +
            "<p><strong>Multiplicação:</strong> " + numero1 + " × " + numero2 + " = " + multiplicacao + "</p>" +
            "<p><strong>Divisão:</strong> " + numero1 + " ÷ " + numero2 + " = " + divisao.toFixed(2) + "</p>" +
            "<p><strong>Potência:</strong> " + numero1 + "^" + numero2 + " = " + potencia + "</p>";
    } else {
        alert("Por favor, digite apenas números válidos!");
    }
}




// 5. INFORMAÇÕES PESSOAIS COMPLETAS
function informacoesPessoais() {
    // Operações com variáveis
    let anosRestantes = 18 - idade;
    let diasVividos = idade * 365;
    let horasVividas = diasVividos * 24;

    // Verificações lógicas
    let maiorIdade = idade >= 18;
    let podeConduzir = idade >= 18;
    let estudante = true;

    document.getElementById("resultado").innerHTML = 
        "<h3>📋 Informações Pessoais</h3>" +
        "<p><strong>Nome:</strong> " + nomeCompleto + "</p>" +
        "<p><strong>Idade:</strong> " + idade + " anos</p>" +
        "<p><strong>Escola:</strong> " + escola + "</p>" +
        "<p><strong>Maior de idade:</strong> " + (maiorIdade ? "Sim" : "Não") + "</p>" +
        "<p><strong>Pode conduzir:</strong> " + (podeConduzir ? "Sim" : "Não") + "</p>" +
        "<p><strong>Anos para os 18:</strong> " + (anosRestantes > 0 ? anosRestantes : "Já tem 18+") + "</p>" +
        "<p><strong>Dias vividos (aprox.):</strong> " + diasVividos + "</p>" +
        "<p><strong>Horas vividas (aprox.):</strong> " + horasVividas.toLocaleString() + "</p>" +
        "<p><strong>É estudante:</strong> " + (estudante ? "Sim" : "Não") + "</p>";

    console.log("Informações calculadas e mostradas!");
}
