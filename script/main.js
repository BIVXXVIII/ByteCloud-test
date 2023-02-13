// declaration querySelectors
// inputs
const storage = {
    span: document.querySelector('#storageSpan'),
    input: document.querySelector('#storageInp'),
    currentValue: 500,
    inputNum: document.querySelector('#storageNum')
}
const transfer = {
    span: document.querySelector('#transferSpan'),
    input: document.querySelector('#transferInp'),
    currentValue: 500,
    inputNum: document.querySelector('#transferNum')
}

const inputsArr = [storage, transfer]
let windowHorizontal = true
// graph

const providerList = {
    backblaze: {
        id: "backblaze",
        color: "red",
        storage: 0.005,
        transfer: 0.01,
        minPay: 7,
        price: {
            storage: 0,
            transfer: 0,
            result: 0,
        },
        selectors: {
            name: document.querySelector('#backblaze'),
            graph: document.querySelector('#backblazeGraph'),
            price: document.querySelector('#backblazePrice')
        }
    },
    bunny: {
        id: 'bunny',
        color: "orange",
        storage: 0.01,
        // storage default HDD, SDD advance option
        storageAdv: 0.02,
        advOptions: true,
        advActive: false,
        transfer: 0.01,
        minPay: 0,
        maxPay: 10,
        price: {
            storage: 0,
            transfer: 0,
            result: 0
        },
        selectors: {
            name: document.querySelector('#bunny'),
            graph: document.querySelector('#bunnyGraph'),
            price: document.querySelector('#bunnyPrice'),
            HDD: document.querySelector('#bunny_HDD'),
            SDD: document.querySelector('#bunny_SDD')
        }
    },
    scaleway: {
        id: 'scaleway',
        color: "#8f55be",
        storage: 0.03,
        storageAdv: 0.06,
        advOptions: true,
        advActive: false,
        transfer: 0.02,
        minPay: 0,
        discount: true,
        discountValue: 75,
        price: {
            storage: 0,
            transfer: 0,
            result: 0,
        },
        selectors: {
            name: document.querySelector('#scaleway'),
            graph: document.querySelector('#scalewayGraph'),
            price: document.querySelector('#scalewayPrice'),
            multi: document.querySelector('#scaleway_multi'),
            single: document.querySelector('#scaleway_single')
        }

    },
    vultr: {
        id: "vultr",
        color: "#0099ff",
        storage: 0.01,
        transfer: 0.01,
        minPay: 5,
        price: {
            storage: 0,
            transfer: 0,
            result: 0
        },
        selectors: {
            name: document.querySelector('#vultr'),
            graph: document.querySelector('#vultrGraph'),
            price: document.querySelector('#vultrPrice')
        }
    }
}

// calc logic

const minimalPay = (id) => {
    const storage = providerList[id].price
    const minPay = providerList[id].minPay
    if (storage.result < minPay) {
        storage.result = minPay 
    }
}

const calcSingePrice = (id) => {
    const root = providerList[id]
    const priceSlice = root.price
    
    let storagePrice, transferPrice
    
    if (root.advActive) {
        if (root.discount) {
            storagePrice = (storage.currentValue - root.discountValue) * root.storageAdv
            transferPrice = (transfer.currentValue - root.discountValue) * root.transfer
        if (storagePrice < 0) {
            storagePrice = 0
        }
        if (transferPrice < 0) {
            transferPrice = 0
        }
        } else {
            
            storagePrice = storage.currentValue * root.storageAdv
            transferPrice = transfer.currentValue * root.transfer
    }

    } else {
        if (root.discount) {
        storagePrice = (storage.currentValue - root.discountValue) * root.storage
        transferPrice = (transfer.currentValue - root.discountValue) * root.transfer
        if (storagePrice < 0) {
            storagePrice = 0
        }
        if (transferPrice < 0) {
            transferPrice = 0
        }
    } else {
        storagePrice = storage.currentValue * root.storage
        transferPrice = transfer.currentValue * root.transfer
    }
    }
    
    priceSlice.storage = storagePrice.toFixed(2)
    priceSlice.transfer = transferPrice.toFixed(2)
    priceSlice.result = (priceSlice.storage * 100 + priceSlice.transfer * 100) / 100
    if (root.maxPay && priceSlice.result > 10) {
        priceSlice.result = root.maxPay
    }
    minimalPay(id)
}

const parsePrices = () => {
    Object.keys(providerList).map(index => calcSingePrice(index))
}

const minPriceParse = () => {
    const values = {}
    Object.keys(providerList).map(id => {
        values[id] = providerList[id].price.result
    })
    let max = 100
    let site 
    for (key in values) {
        if (values[key] < max) {
            max = values[key]
            site = key
        }
    }
    return site
}

const setPrice = () => {
    parsePrices()
    Object.keys(providerList).map(id => {
        providerList[id].selectors.price.innerHTML = `${providerList[id].price.result}$`
    })
}
setPrice()



// input logic

const inputBinding = (arr) => {
    arr.input.value = arr.currentValue
    arr.inputNum.value = arr.currentValue
}

const handleInput = (event, target) => {
    const value = event.target.value
    target.span.innerHTML = `${value} GB`
    target.currentValue = value
    inputBinding(target)
    setPrice()
    let min = minPriceParse()
    Object.keys(providerList).map((obj) => {
    setColor(obj, false)
    })
    setColor(min, true)
    
}

const showNum = (target) => {
    target.inputNum.style.display = 'block'
    target.span.style.display = 'none'
}

// set colors
const setColor = (id, bool) => {
    const path = providerList[id]
    const inactiveCol = 'rgba(0, 0, 0, 0.5)'
    if (bool == true) {
        path.selectors.name.style.color = path.color
        path.selectors.graph.style.background = path.color
        path.selectors.price.style.color = path.color
    } else {
        path.selectors.name.style.color = inactiveCol
        path.selectors.graph.style.background = inactiveCol
        path.selectors.price.style.color = inactiveCol
    }
}



// binding functions to elements

inputsArr.map(elem => {
    elem.input.addEventListener('change', (e) => {
        handleInput(e, elem)
    })
    elem.span.addEventListener('click', () => { showNum(elem) })
    inputBinding(elem)
    elem.inputNum.addEventListener('change', (e)=> {handleInput(e, elem)})
})

// advance options events
providerList.bunny.selectors.HDD.addEventListener('change', () => {
    if (providerList.bunny.advActive) {
        providerList.bunny.advActive = !providerList.bunny.advActive
        setPrice()
    }
})
providerList.bunny.selectors.SDD.addEventListener('change', () => {
    if (!providerList.bunny.advActive) {
        providerList.bunny.advActive = !providerList.bunny.advActive
        setPrice()
    }
})

providerList.scaleway.selectors.single.addEventListener('change', () => {
    if (providerList.scaleway.advActive) {
        providerList.scaleway.advActive = !providerList.scaleway.advActive
        setPrice()
    }
})

providerList.scaleway.selectors.multi.addEventListener('change', () => {
    if (!providerList.scaleway.advActive) {
        providerList.scaleway.advActive = !providerList.scaleway.advActive
        setPrice()
    }
})

window.addEventListener('resize', (e) => {
    if (e.target.innerWidth < 600) {
        windowHorizontal = false
    } else if (e.target.innerWidth >= 600) {
        windowHorizontal = true
    }
})