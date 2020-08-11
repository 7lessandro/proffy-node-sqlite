//Procurar o botão
document.querySelector("#add-time")
.addEventListener("click", cloneField)
//Quando clicar no botão

//Executar uma ação
function cloneField() {
    //Duplicar os campos. Que campos?
    const newFieldContainer = document.querySelector(".schedule-item").cloneNode(true) //boolean: true ou false

    //Pegar os campos.. Que campos?
    const fields = newFieldContainer.querySelectorAll('output')

    //Para cada campo.. Limpar!!
    fields.forEach(function(field) {
        //Pegar o field e limpar ele
        field.value =""

    })

    //Colocar na página..Onde?
    document.querySelector("#schedule-items").appendChild(newFieldContainer)

}
    


