const box = document.querySelector('.box')
const upBox = document.querySelector('.box-up')
const usdPriceOutput = document.querySelector('#usd-price')
// const box2 = document.querySelector('')
// const box3 = document.querySelector('')
// const box4 = document.querySelector('')
// const box5 = document.querySelector('')
// const box6 = document.querySelector('')
// const box7 = document.querySelector('')
// const box8 = document.querySelector('')
const btcPriceOutput = document.querySelector('#btc-price')
const ethPriceOutput = document.querySelector('#eth-price')
const bnbPriceOutput = document.querySelector('#bnb-price')
const usdtPriceOutput = document.querySelector('#usdt-price')
const trxPriceOutput = document.querySelector('#trx-price')
const dogePriceOutput = document.querySelector('#doge-price')
const solPriceOutput = document.querySelector('#sol-price')
const tonPriceOutput = document.querySelector('#ton-price')

const APIKey = 'free5YHpxI6FFIO3FOBzEIcgpHlqXDEp';
const APIUrl = `https://api.navasan.tech/latest/?api_key=${APIKey}&item=usd_sell`;


// function toggleClass() {
//   upBox.classList.toggle("open");
// }

// box.addEventListener("mouseover", toggleClass);
// box.addEventListener("mouseleave", toggleClass);


// function start(){
    // fetch(APIUrl)
    //     .then(response => {
    //         if (!response.ok) {
    //             throw new Error('Network response was not ok');
    //         }
    //         return response.json();
    //     })
    //     .then(data => {
    //         const priceUSD = data.usd_sell.value;
    //         console.log(priceUSD);
    //         usdPriceOutput.innerHTML = `\$${priceUSD} <sup>تومان</sup>`
    //     })
    //     .catch(error => {
    //         console.error('Error:', error);
    //     });


    //USD

    // fetch(``)
    //     .then(response => {
    //         return response.json();
    //     })
    //     .then(usd => {
    //         console.log(usd.result.usdt-rls.latest);
    //         usdPriceOutput.innerHTML = `\$${usd.usdt-rls.latest} <sup>تومان</sup>`
    //     })

    //BTC

    fetch(`https://api.coinbase.com/v2/exchange-rates?currency=BTC`)
        .then(response => {
            return response.json();
        })
        .then(btc => {
            // const priceBTC = data.USD.value;
            // console.log((btc.bpi.USD.code));
            btcPriceOutput.innerHTML = `\$${parseInt(btc.data.rates.USD)} <sup>دلار</sup>`
        })


    //ETH

    fetch(`https://api.coinbase.com/v2/exchange-rates?currency=eth`)
    .then(response => {
        return response.json();
    })
    .then(eth => {
        ethPriceOutput.innerHTML = `\$${parseInt(eth.data.rates.USD)} <sup>دلار</sup>`
    })

    //BNB

    fetch(`https://api.coinbase.com/v2/exchange-rates?currency=bnb`)
    .then(response => {
        return response.json();
    })
    .then(bnb => {
        let price = bnb.data.rates.USD
        price = Math.floor(price * 100) / 100;
        bnbPriceOutput.innerHTML = `\$${(price.toFixed(2))} <sup>دلار</sup>`
    })

    //USDT

    fetch(`https://api.coinbase.com/v2/exchange-rates?currency=usdt`)
    .then(response => {
        return response.json();
    })
    .then(usdt => {
        usdtPriceOutput.innerHTML = `\$${parseInt(usdt.data.rates.IRR)} <sup>تومان</sup>`
    })

    //TRX

    fetch(`https://api.coinbase.com/v2/exchange-rates?currency=trx`)
    .then(response => {
        return response.json();
    })
    .then(trx => {
        let price = trx.data.rates.USD
        price = Math.floor(price * 100) / 100;
        trxPriceOutput.innerHTML = `\$${(price.toFixed(2))} <sup>دلار</sup>`
    })

    //DOGE

    fetch(`https://api.coinbase.com/v2/exchange-rates?currency=doge`)
    .then(response => {
        return response.json();
    })
    .then(doge => {
        let price = doge.data.rates.USD
        price = Math.floor(price * 1000) / 1000;
        dogePriceOutput.innerHTML = `\$${(price.toFixed(3))} <sup>دلار</sup>`
    })

    //SOL

    fetch(`https://api.coinbase.com/v2/exchange-rates?currency=sol`)
    .then(response => {
        return response.json();
    })
    .then(sol => {
        let price = sol.data.rates.USD
        price = Math.floor(price * 100) / 100;
        solPriceOutput.innerHTML = `\$${(price.toFixed(2))} <sup>دلار</sup>`
    })

    //ton

    fetch(`https://api.coinbase.com/v2/exchange-rates?currency=ton`)
    .then(response => {
        return response.json();
    })
    .then(ton => {
        let price = ton.data.rates.USD
        price = Math.floor(price * 100) / 100;
        tonPriceOutput.innerHTML = `\$${(price.toFixed(2))} <sup>دلار</sup>`
    })

// }

// start()