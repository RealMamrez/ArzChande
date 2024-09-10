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

const btcTodayOutput = document.querySelector('#btc-today')
const btcUpper = document.querySelector('.btc .up')

const ethTodayOutput = document.querySelector('#eth-today')
const ethUpper = document.querySelector('.eth .up')

const bnbTodayOutput = document.querySelector('#bnb-today')
const bnbUpper = document.querySelector('.bnb .up')

const trxTodayOutput = document.querySelector('#trx-today')
const trxUpper = document.querySelector('.trx .up')

const dogeTodayOutput = document.querySelector('#doge-today')
const dogeUpper = document.querySelector('.doge .up')

const solTodayOutput = document.querySelector('#sol-today')
const solUpper = document.querySelector('.sol .up')


const APIKey = 'free5YHpxI6FFIO3FOBzEIcgpHlqXDEp';
const APIUrl = `https://api.navasan.tech/latest/?api_key=${APIKey}&item=usd_sell`;

let today = new Date().toLocaleDateString('fa-IR');
console.log(today);


// function toggleClass() {
//   upBox.classList.toggle("open");
// }

// box.addEventListener("mouseover", toggleClass);
// box.addEventListener("mouseleave", toggleClass);


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
            usdPriceOutput.innerHTML = `\$${priceUSD} <sup>تومان</sup>`
        })
        .catch(error => {
            console.error('Error:', error);
        });


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

    // fetch(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH&tsyms=USD,EUR&api_key=28f055579645454046123d6e1f8500164ea473af9b34ddd3bd89869598c43768`)
    //     .then(response => {
    //         return response.json();
    //     })
    //     .then(btcDay => {
    //         // const priceBTC = data.USD.value;
    //         console.log((btcDay.BTC.USD));
    //         // btcPriceOutput.innerHTML = `\$${parseInt(btcDay.data.rates.USD)} <sup>دلار</sup>`
    //     })

    fetch(`https://api.pro.coinbase.com/products/BTC-USD/stats`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            let x = (data.last - data.open)/data.open*100
            y = Math.floor(x * 100) / 100;

            if( y < 0){ 
                btcUpper.classList.remove('fa-caret-up');
                btcUpper.classList.add('fa-caret-down');
                btcUpper.classList.add('down');
                btcTodayOutput.classList.add('down');
            }

            btcTodayOutput.innerHTML = `\+${(y.toFixed(2))}%`
        })


    //ETH

    fetch(`https://api.coinbase.com/v2/exchange-rates?currency=eth`)
    .then(response => {
        return response.json();
    })
    .then(eth => {
        ethPriceOutput.innerHTML = `\$${parseInt(eth.data.rates.USD)} <sup>دلار</sup>`
    })


    fetch(`https://api.pro.coinbase.com/products/ETH-USD/stats`)
    .then(response => {
        return response.json();
    })
    .then(data => {
        let x = (data.last - data.open)/data.open*100
        y = Math.floor(x * 100) / 100;

        if( y < 0){ 
            ethUpper.classList.remove('fa-caret-up');
            ethUpper.classList.add('fa-caret-down');
            ethUpper.classList.add('down');
            ethTodayOutput.classList.add('down');
        }

        ethTodayOutput.innerHTML = `\+${(y.toFixed(2))}%`
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


    fetch(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=bnb&tsyms=USD&api_key=28f055579645454046123d6e1f8500164ea473af9b34ddd3bd89869598c43768`)
    .then(response => {
        return response.json();
    })
    .then(data2 => {
        let x = data2.RAW.BNB.USD.CHANGEPCTDAY
        y = Math.floor(x * 100) / 100;

        if( y < 0){ 
            bnbUpper.classList.remove('fa-caret-up');
            bnbUpper.classList.add('fa-caret-down');
            bnbUpper.classList.add('down');
            bnbTodayOutput.classList.add('down');
        }

        bnbTodayOutput.innerHTML = `${(y.toFixed(2))}%`
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


    fetch(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=trx&tsyms=USD&api_key=28f055579645454046123d6e1f8500164ea473af9b34ddd3bd89869598c43768`)
    .then(response => {
        return response.json();
    })
    .then(data => {
        let x = data.RAW.TRX.USD.CHANGEPCTDAY
        y = Math.floor(x * 100) / 100;

        if( y < 0){ 
            trxUpper.classList.remove('fa-caret-up');
            trxUpper.classList.add('fa-caret-down');
            trxUpper.classList.add('down');
            trxTodayOutput.classList.add('down');
        }

        bnbTodayOutput.innerHTML = `\+${(y.toFixed(2))}%`
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


    fetch(`https://api.pro.coinbase.com/products/doge-USD/stats`)
    .then(response => {
        return response.json();
    })
    .then(data => {
        let x = (data.last - data.open)/data.open*100
        y = Math.floor(x * 100) / 100;

        if( y < 0){ 
            dogeUpper.classList.remove('fa-caret-up');
            dogeUpper.classList.add('fa-caret-down');
            dogeUpper.classList.add('down');
            dogeTodayOutput.classList.add('down');
        }

        dogeTodayOutput.innerHTML = `\+${(y.toFixed(2))}%`
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


    fetch(`https://api.pro.coinbase.com/products/SOL-USD/stats`)
    .then(response => {
        return response.json();
    })
    .then(data => {
        let x = (data.last - data.open)/data.open*100
        y = Math.floor(x * 100) / 100;

        if( y < 0){ 
            solUpper.classList.remove('fa-caret-up');
            solUpper.classList.add('fa-caret-down');
            solUpper.classList.add('down');
            solTodayOutput.classList.add('down');
        }

        solTodayOutput.innerHTML = `\+${(y.toFixed(2))}%`
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