const usdPriceOutput = document.querySelector('#usd-price')
// const box2 = document.querySelector('')
// const box3 = document.querySelector('')
// const box4 = document.querySelector('')
// const box5 = document.querySelector('')
// const box6 = document.querySelector('')
// const box7 = document.querySelector('')
// const box8 = document.querySelector('')
const btcPriceOutput = document.querySelector('#btc-price')

const APIKey = 'free5YHpxI6FFIO3FOBzEIcgpHlqXDEp';
const APIUrl = `https://api.navasan.tech/latest/?api_key=${APIKey}&item=usd_sell`;


fetch(`https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD&api_key=28f055579645454046123d6e1f8500164ea473af9b34ddd3bd89869598c43768`)
.then(response => {
    return response.json();
})
.then(data => {
    // const priceBTC = data.USD.value;
    console.log((data.USD.value));
    btcPriceOutput.innerHTML = `\$${data.USD.value}`
})

// function start(){
    fetch(APIUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const priceUSD = data.usd_sell.value;
            console.log(priceUSD);
            usdPriceOutput.innerHTML = `\$${priceUSD}`
        })
        .catch(error => {
            console.error('Error:', error);
        });

    fetch(`https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD&api_key=28f055579645454046123d6e1f8500164ea473af9b34ddd3bd89869598c43768`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            // const priceBTC = data.USD.value;
            console.log((data.USD.value));
            btcPriceOutput.innerHTML = `\$${data.USD.value}`
        })
// }

// start()