// declaration variables

const storage = {
    span: document.querySelector('#storageSpan'),
    input: document.querySelector('#storageInp'),
    currentValue: 500,
}

const transfer = {
    span: document.querySelector('#transferSpan'),
    input: document.querySelector('#transferInp'),
    currentValue: 500,
}



// input logic

const handleInput = (event, target) => {
    const value = event.target.value
    target.span.innerHTML = `${value} GB`
    target.currentValue = value
    console.log(target);

}

storage.input.addEventListener('change', (e) => { handleInput(e, storage) })
transfer.input.addEventListener('change', (e)=>{handleInput(e, transfer)})