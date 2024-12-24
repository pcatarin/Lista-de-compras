class Iten {
    constructor (name, quantity, value) {
        //this.id = id
        this.name = name
        this.quantity = quantity
        this.value = value
        this.amount = 0
    }

    valueCalc () {
        if (typeof this.quantity !== 'number' || typeof this.value !== 'number') {
           return window.alert('Os argumentos devem ser números...')
        } else {
            return this.amount = this.quantity * this.value
        }

    }

}

async function fetchItens () {
    return await fetch('data.json').then(res => res.json()).then(data => data.itens)  
}

console.log(fetchItens())

function substituir (el) {
    el.value = el.value.replace(",",".")
}

let listItens = []

/***********************************************************************************************/
/***********************************************************************************************/
/***********************************************************************************************/

/************Criação dos elementos HTML para renderização************Inicio*****************************************/

function createConteinerItens (id) {
    const conteiner = document.createElement('div')
    conteiner.classList.add('box-item')
    conteiner.id = `item-${id}`
    return conteiner
}

function createNameItem (name) {
    const nameItemBox = document.createElement('span')
    nameItemBox.classList.add('name-item')
    nameItemBox.id = `${name}-item`
    nameItemBox.textContent = name
    return nameItemBox
}

function createQuantityItem (quantity,id) {
    const quantityItem = document.createElement('span')
    quantityItem.classList.add('quantity-item')
    quantityItem.id = `quantity-item${id}`
    quantityItem.textContent = quantity
    return quantityItem
}

function createValueItem (value) {
    const valueItem = document.createElement('span')
    valueItem.classList.add('value-item')
    const formater = Intl.NumberFormat('pt-BR', {
        compactDisplay: 'long',
        currency: 'BRL',
        style: 'currency'
    })
    
    valueItem.textContent = formater.format(value)
    return valueItem
}

function createAmountIten (amount, id) {
    const amountIten = document.createElement('span')
    amountIten.classList.add('amount-item')
    amountIten.id = `amount-item${id}`
    const quantity = document.querySelector('#quantity').value
    const value = document.querySelector('#value').value
    const formater = Intl.NumberFormat('pt-BR', {
        compactDisplay: 'long',
        currency: 'BRL',
        style: 'currency'
    })
    amount = quantity * value
    //let amount = listItens.reduce((sum, item) => sum + item.amount, 0)
    //const formatAmount = formater.format(amount)
    amountIten.textContent = formater.format(amount)
    
    return amountIten
}

function createEditButton () {
    const editButton = document.createElement('i')
    editButton.classList.add('btn', 'fa-solid', 'fa-pen-to-square')
    editButton.id = 'edit-btn'
    editButton.addEventListener('click', () => {

    })
    return editButton
}

function createRemoveButton () {
    const removeButton = document.createElement('i')
    removeButton.classList.add('btn','fa-solid', 'fa-trash-can')
    removeButton.id = 'remove-btn'
    return removeButton
}

function createAddButton () {
    const addBtn = document.createElement('i')
    addBtn.classList.add('edit-btn','fa-solid', 'fa-plus')
    addBtn.id = 'add-btn'
    addBtn.addEventListener('click', () => {
        const parentId = addBtn.parentElement.id
        let arrIten = parentId.split('-')
        let idIten = parseInt(arrIten.slice(length-1))
        let found = listItens.find((element) => element.id === idIten)
        let add = document.querySelector(`#quantity-item${idIten}`).textContent++
        
        found.quantity++
        found.amount = found.quantity * found.value
        const formater = Intl.NumberFormat('pt-BR', {
            compactDisplay: 'long',
            currency: 'BRL',
            style: 'currency'
        })
        
        const amountValue = formater.format(listItens.reduce((sum, iten) => sum + iten.amount, 0))
        const amountFormat = formater.format(found.amount)

        document.querySelector(`#amount-item${idIten}`).textContent = amountFormat
        document.querySelector('#total-value').textContent = amountValue
        document.querySelector('#quantity-value').textContent = listItens.reduce((sum, iten) => sum + iten.quantity, 0)
        //document.querySelector('.amount-item').textContent = found.quantity * found.value
        console.log(listItens)
    })
   
    return addBtn
}

function createRemButton () {
    const remBtn = document.createElement('i')
    remBtn.classList.add('edit-btn','fa-solid', 'fa-minus')
    remBtn.id = 'rem-btn'
    remBtn.addEventListener('click', () => {
        const parentId = remBtn.parentElement.id
        let arrIten = parentId.split('-')
        let idIten = parseInt(arrIten.slice(length-1))
        let found = listItens.find((element) => element.id === idIten)
        found.quantity--
        found.amount = found.quantity * found.value
        let remIten = document.querySelector(`#quantity-item${idIten}`).textContent--
        const amountValue = listItens.reduce((sum, iten) => sum + iten.amount, 0)
        const quantiyValue = listItens.reduce((sum, iten) => sum + iten.quantity, 0)
        const itenValue = listItens.reduce((sum, iten) => sum + iten.value, 0)

        
        const formater = Intl.NumberFormat('pt-BR', {
            compactDisplay: 'long',
            currency: 'BRL',
            style: 'currency'
        })
        
        const amountValueRem = formater.format(listItens.reduce((rem, iten) => iten.amount - rem , amountValue-1))
        const amountValueForm = formater.format(amountValue)
        const amountFormat = formater.format(found.amount)

        document.querySelector(`#amount-item${idIten}`).textContent = amountFormat
        document.querySelector('#total-value').textContent = amountValueForm
        document.querySelector('#quantity-value').textContent = quantiyValue
        //document.querySelector('.amount-item').textContent = found.quantity * found.value
        console.log(listItens)
        console.log(found)
        console.log(amountValue)
        console.log(quantiyValue)
        console.log(remIten)
        console.log(idIten)

    })
    return remBtn
}
/*-----------------------------------------------------------------------------------------------------------------*/
/************Criação dos elementos HTML para renderização********************Fim************************************/
/*-----------------------------------------------------------------------------------------------------------------*/

/*-----------------------------------------------------------------------------------------------------------------*/
/************Função que Salva novos itens salva no array e renderiza na chamada de um evento************************/
/*----------------------------------Inicio-------------------------------------------------------------------------*/
function saveNewIten (ev) {
    ev.preventDefault()

    const name = document.querySelector('#name').value
    const quantity = parseFloat(document.querySelector('#quantity').value)
    const value = parseFloat(document.querySelector('#value').value)
    const amount = quantity * value
    const id = listItens.length + 1
    
    if ( !quantity || !value ) {
        window.alert('Quantidade e Valor devem ser números ')
    } else {
        const newIten = {id, name, quantity, value, amount }

        
        
        listItens.push(newIten) 
        renderItens(newIten)
        
        
        const formater = Intl.NumberFormat('pt-BR', {
            compactDisplay: 'long',
            currency: 'BRL',
            style: 'currency'
        })
        const amountValue = formater.format(listItens.reduce((sum, iten) => sum + iten.amount, 0))
        
        document.querySelector('#total-value').textContent = amountValue
        document.querySelector('#quantity-value').textContent = listItens.reduce((sum, iten) => sum + iten.quantity, 0)

        ev.target.reset()
    }
    
    
}
/*-------------------------------Fim-------------------------------------------------------------------------------*/
/************Função que Salva novos itens salva no array e renderiza na chamada de um evento************************/
/*-----------------------------------------------------------------------------------------------------------------*/

/*-----------------------------------------------------------------------------------------------------------------*/
/************Função para renderização dos elementos chamada na função acima*****************************************/
/*----------------------------------Inicio-------------------------------------------------------------------------*/

function renderItens (iten) {
    const container = createConteinerItens(iten.id)
    const name = createNameItem(iten.name)
    const quantity = createQuantityItem(iten.quantity,iten.id)
    const value = createValueItem(iten.value)
    const amount = createAmountIten(iten.amount,iten.id)
    const edit = createEditButton()
    const remove = createRemoveButton()
    const add = createAddButton()
    const rem = createRemButton()

    container.append(name, rem, quantity, add, value, amount, edit, remove)
    document.querySelector('#list-content').append(container)
}
/*-----------------------------------fim---------------------------------------------------------------------------*/
/************Função para renderização dos elementos chamada na função acima*****************************************/
/*-----------------------------------------------------------------------------------------------------------------*/

/*-----------------------------------------------------------------------------------------------------------------*/
/************Função para trazer a lista chamada no carregamento da página*******************************************/
/*----------------------------------Inicio-------------------------------------------------------------------------*/
async function setup () {
    const results = await fetchItens()
    listItens.push(...results)
    listItens.forEach(renderItens)
}
/*------------------------------------Fim---------------------------------------------------------------------------*/
/************Função para trazer a lista chamada no carregamento da página*******************************************/
/*-----------------------------------------------------------------------------------------------------------------*/

document.addEventListener('DOMContentLoaded', setup)
document.querySelector('#form-entrys').addEventListener('submit', saveNewIten)

