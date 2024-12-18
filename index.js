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

function createQuantityItem (quantity) {
    const quantityItem = document.createElement('input')
    quantityItem.type = 'number'
    quantityItem.classList.add('quantity-item')
    quantityItem.value = quantity
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

function createAmountIten (amount) {
    const amountIten = document.createElement('span')
    amountIten.classList.add('amount-item')
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
        
        console.log(listItens)
        console.log(createAmountIten())
        document.querySelector('#total-value').value = listItens.reduce((sum, iten) => sum + iten.amount, 0)
        document.querySelector('#quantity-value').value = listItens.reduce((sum, iten) => sum + iten.quantity, 0)

        ev.target.reset()
    }
    
    
}

function renderItens (iten) {
    const container = createConteinerItens(iten.id)
    const name = createNameItem(iten.name)
    const quantity = createQuantityItem(iten.quantity)
    const value = createValueItem(iten.value)
    const amount = createAmountIten(iten.amount)

    container.append(name, quantity, value, amount)
    document.querySelector('#list-content').append(container)
}

// const btnSave = document.querySelector('#btn-save')
// btnSave.addEventListener('click', (ev) => {
//     ev.preventDefault()
//     listItens.push(saveNewIten())

//     setup()
//     console.log(listItens)
    
//     document.querySelector('#name').value = ''
//     document.querySelector('#quantity').value = ''
//     document.querySelector('#value').value = ''
// })

async function setup () {
    const results = await fetchItens()
    listItens.push(...results)
    listItens.forEach(renderItens)
}

document.addEventListener('DOMContentLoaded', setup)
document.querySelector('#form-entrys').addEventListener('submit', saveNewIten)

// {
// method: 'POST',
//         body: JSON.stringify({ name, quantity, value }),
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     }