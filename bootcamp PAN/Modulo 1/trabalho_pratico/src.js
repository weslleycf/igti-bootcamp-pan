const btnSimular = document.querySelector(".button")

btnSimular.addEventListener('click', () => {

    const valor = document.querySelector("[data-js='valor']")
    const prazo = document.querySelector("[data-js='prazo']")
    const jurosAno = document.querySelector("[data-js='juros-ano']")
    const prazoMeses = document.querySelector("[data-js='prazo-meses']")
    const jurosMes = document.querySelector("[data-js='juros-mes']")
    const jurosAcumulado = document.querySelector("[data-js='juros-acumulado']")
    const tbody = document.querySelector('tbody')



    let numParcelas = parseInt(prazo.value) * 12
    let amortizacao = parseFloat(valor.value) / numParcelas
    let jurosMensais = Math.pow(1 + parseFloat(jurosAno.value), 1/12)- 1
    let totalJurosParcelas = 0;

    if(tbody.hasChildNodes){
        while(tbody.firstChild){
            tbody.removeChild(tbody.lastChild)
        }
    }


    function calcularParcelas(){
        for(let i = 0; i < numParcelas; i++){
            let saldoDevedor = parseFloat(valor.value) - (i * amortizacao) 
            let valorJuros  = jurosMensais * saldoDevedor 
            let valorParcela = valorJuros + amortizacao
            totalJurosParcelas += valorJuros
            if (i<5){
                const row = document.createElement('tr')
                const cellNumber = document.createElement('td')
                const cellAmortizacao = document.createElement('td')
                const cellJuros = document.createElement('td')
                const cellTotal = document.createElement('td')
                cellNumber.textContent = i + 1 
                row.appendChild(cellNumber)
                cellAmortizacao.textContent = amortizacao.toFixed(2)
                row.appendChild(cellAmortizacao)
                cellJuros.textContent = valorJuros.toFixed(2)
                row.appendChild(cellJuros)
                cellTotal.textContent = valorParcela.toFixed(2)
                row.appendChild(cellTotal)
                tbody.appendChild(row)          
            }
    
        }
      
    }


    calcularParcelas()
    prazoMeses.textContent = numParcelas
    jurosMes.textContent = jurosMensais  
    jurosAcumulado.textContent = totalJurosParcelas.toFixed(2)
    console.log(jurosAcumulado.value)

})
