const fromCur = document.querySelector('.from select'); 
const toCur = document.querySelector('.to select');
const btn = document.querySelector('form button')
const exIcon = document.querySelector('form .reverse')
const amount = document.querySelector('form input')
const exRateTxt = document.querySelector('form .result')

//Event handlers for currency dropdowns
var arr = [fromCur, toCur];

if (Array.isArray(arr)){
    arr.forEach((select, i) => {
        for(let curCode in Country_List) {  
            const selected = (i === 0 && curCode === 'USD' || i === 1 && curCode === 'VND')
            select.insertAdjacentHTML('beforeend', `<option value= "${curCode}" ${selected}>${curCode}</option>`)
        }
        select.addEventListener('change', () => {
            const code = select.value;
            const imgTag = select.parentElement.querySelector('img')
            imgTag.src = `https://flagcdn.com/48x36/${Country_List[code].toLowerCase()}.png`
        })
    }
)}

//Get exchange rate from API
async function getExchangeRate() {
    const amountVal = amount.value || 1
    exRateTxt.innerText = "Getting exchange rate..."
    try{
        const response = await fetch(`https://v6.exchangerate-api.com/v6/f462cf47bef408945488c66b/latest/USD`)
        const result = await response.json()
        const exChangeRate = result.conversion_rates[toCur.value]
        const totalExRate = (amountVal * exChangeRate).toFixed(2)
        exRateTxt.innerText = `${amountVal} ${fromCur.value} = ${totalExRate} ${toCur.value}`
    }
    catch(error){
        exRateTxt.innerText = "Error getting exchange rate !" 
    }
}

//Event handlers for the buttons in the form below
window.addEventListener('load', getExchangeRate)
btn.addEventListener('click', (e) => {
    e.preventDefault();
    getExchangeRate();
});

exIcon.addEventListener('click', () => {
    [fromCur.value, toCur.value] = [toCur.value, fromCur.value]
    if(Array.isArray(arr)){
        arr.forEach((select) => {
            const code = select.value;
            const imgTag = select.parentElement.querySelector('img')
            imgTag.src = `https://flagcdn.com/48x36/${Country_List[code].toLowerCase()}.png`
        });
    }
    getExchangeRate();
});
