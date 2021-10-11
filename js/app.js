(function() {

    'use strict';

    const abrirCriadorCard = document.querySelector('.abrirCriadorCard');
    const criadorCard = document.querySelector('.criadorCard');
    const fecharCriadorCard = document.querySelector('.fecharCriadorCard');
    const salvarCard = document.querySelector(".salvarCard");
    const pergunta = document.querySelector('#pergunta');
    const resposta = document.querySelector('#resposta');
    const flashcards = document.querySelector('.flashcards');
    const deletarFlashcards = document.querySelector('.deletarFlashcards');
    let valoresStorage = localStorage.getItem("flashcards") ? JSON.parse(localStorage.getItem("flashcards")) : [];
    valoresStorage.forEach(function(elemento) {
        criandoCards(elemento)
    })



    abrirCriadorCard.addEventListener('click', function() {
        criadorCard.classList.remove('hidden');
    });


    fecharCriadorCard.addEventListener('click', function() {
        criadorCard.classList.add('hidden');
    });


    deletarFlashcards.addEventListener('click', function() {
        flashcards.innerHTML = "";
        localStorage.clear();
    })

    salvarCard.addEventListener('click', salvarLocalstorage)


    function salvarLocalstorage() {
        if (pergunta.value.trim() === "" || resposta.value.trim() === "") {
            return
        }
        let objetos = {
            "pergunta": pergunta.value,
            "resposta": resposta.value
        }


        valoresStorage.push(objetos)
        localStorage.setItem("flashcards", JSON.stringify(valoresStorage));
        criandoCards(objetos)
        pergunta.value = "";
        resposta.value = "";
    }


    function criandoCards(texto) {

        //!criando card
        let card = document.createElement('div');
        card.className = 'card';

        //!criando icone de fechar
        let i = document.createElement('i');
        i.className = "far fa-times-circle";
        card.appendChild(i);

        //!criando card pergunta
        let cardPergunta = document.createElement('div');
        cardPergunta.className = "cardpergunta";
        cardPergunta.innerHTML = `<p>${texto.pergunta}</p>`
        card.appendChild(cardPergunta);

        //!criando card resposta
        let cardResposta = document.createElement('div');
        cardResposta.className = "cardresposta";
        let p = document.createElement('p')
        p.textContent = texto.resposta;
        p.className = "hidden";
        cardResposta.appendChild(p)
        card.appendChild(cardResposta);


        flashcards.appendChild(card)


        cardResposta.addEventListener('click', function() {
            this.children[0].classList.contains('hidden') ? this.children[0].classList.remove('hidden') : this.children[0].classList.add('hidden');
        })

        i.addEventListener('click', function() {
            let valorPergunta = this.nextElementSibling.children[0].textContent;

            valoresStorage = valoresStorage.filter(function(elemento) {
                if (elemento.pergunta !== valorPergunta) {
                    return elemento
                }
            })


            localStorage.setItem("flashcards", JSON.stringify(valoresStorage));

            this.parentElement.remove();

        })

    }





})()