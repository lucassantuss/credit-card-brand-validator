document.getElementById("btnIdentificar")
    .addEventListener("click", identificarBandeira);

function identificarBandeira() {
    const input = document.getElementById("cardNumber");
    const resultado = document.getElementById("resultado");

    const numeroCartao = input.value.replace(/\s+/g, '');

    if (!numeroCartao || !/^\d+$/.test(numeroCartao)) {
        resultado.textContent = "Digite um número de cartão válido";
        return;
    }

    if (!validarLuhn(numeroCartao)) {
        resultado.textContent = "Número de cartão inválido (Luhn)";
        return;
    }

    let bandeira = "Bandeira não identificada";

    const bandeiras = [
        { nome: "Visa", regex: /^4\d{15}$/ },
        { nome: "MasterCard", regex: /^(5[1-5]\d{14}|2(2[2-9]\d{12}|[3-6]\d{13}|7[01]\d{12}|720\d{12}))$/ },
        { nome: "American Express", regex: /^3[47]\d{13}$/ },
        { nome: "Diners Club", regex: /^3(0[0-5]|[68]\d)\d{11}$/ },
        { nome: "Discover", regex: /^6(011|5\d{2})\d{12}$/ },
        { nome: "EnRoute", regex: /^(2014|2149)\d{11}$/ },
        { nome: "JCB", regex: /^35\d{14}$/ },
        { nome: "Voyager", regex: /^8699\d{11}$/ },
        { nome: "HiperCard", regex: /^(606282\d{10}|3841\d{15})$/ },
        { nome: "Aura", regex: /^50\d{14}$/ }
    ];

    for (const item of bandeiras) {
        if (item.regex.test(numeroCartao)) {
            bandeira = item.nome;
            break;
        }
    }

    resultado.textContent = `Bandeira: ${bandeira}`;
}

function validarLuhn(numero) {
    let soma = 0;
    let dobrar = false;

    for (let i = numero.length - 1; i >= 0; i--) {
        let digito = parseInt(numero[i], 10);

        if (dobrar) {
            digito *= 2;
            if (digito > 9) digito -= 9;
        }

        soma += digito;
        dobrar = !dobrar;
    }

    return soma % 10 === 0;
}