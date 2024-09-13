const A = document.querySelector('#A')
const B = document.querySelector('#B')
const C = document.querySelector('#C')
const WidthText = document.querySelector('.date')
const box = document.querySelector('.box')
const item = document.querySelector('.grid-item')
const upBox = document.querySelector('.box-up')
const upIcon = document.querySelector('.icon2')
const usdPriceOutput = document.querySelector('#usd-price')
const showMore1 = document.querySelector('#show-more1')
const showMore2 = document.querySelector('#show-more2')
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

const xrpPriceOutput = document.querySelector('#xrp-price')
const adaPriceOutput = document.querySelector('#ada-price')
const avaxPriceOutput = document.querySelector('#avax-price')
const shibPriceOutput = document.querySelector('#shib-price')
const linkPriceOutput = document.querySelector('#link-price')
const bchPriceOutput = document.querySelector('#bch-price')
const ltcPriceOutput = document.querySelector('#ltc-price')
const dotPriceOutput = document.querySelector('#dot-price')

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

const xrpTodayOutput = document.querySelector('#xrp-today')
const xrpUpper = document.querySelector('.xrp .up')

const adaTodayOutput = document.querySelector('#ada-today')
const adaUpper = document.querySelector('.ada .up')

const avaxTodayOutput = document.querySelector('#avax-today')
const avaxUpper = document.querySelector('.avax .up')

const shibTodayOutput = document.querySelector('#shib-today')
const shibUpper = document.querySelector('.shib .up')

const linkTodayOutput = document.querySelector('#link-today')
const linkUpper = document.querySelector('.link .up')

const bchTodayOutput = document.querySelector('#bch-today')
const bchUpper = document.querySelector('.bch .up')

const ltcTodayOutput = document.querySelector('#ltc-today')
const ltcUpper = document.querySelector('.ltc .up')

const dotTodayOutput = document.querySelector('#dot-today')
const dotUpper = document.querySelector('.dot .up')



const APIKey = 'free5YHpxI6FFIO3FOBzEIcgpHlqXDEp';
const APIUrl = `https://api.navasan.tech/latest/?api_key=${APIKey}&item=usd_sell`;

let today = new Date().toLocaleDateString('fa-IR');
console.log(today);
window.addEventListener("resize", function () {
    let Width = window.innerWidth;
    WidthText.innerHTML = `${Width}`
});


C.addEventListener("mouseover", event => {
    A.classList.add('hover')
    B.classList.add('hover')
  });
  
  C.addEventListener("mouseout", event => {
    A.classList.remove('hover')
    B.classList.remove('hover')
  });
B.addEventListener("mouseover", event => {
    A.classList.add('hover')
    C.classList.add('hover')
  });
  
  B.addEventListener("mouseout", event => {
    A.classList.remove('hover')
    C.classList.remove('hover')
  });
A.addEventListener("mouseover", event => {
    C.classList.add('hover')
    B.classList.add('hover')
  });
  
  A.addEventListener("mouseout", event => {
    C.classList.remove('hover')
    B.classList.remove('hover')
  });

// showMore1.addEventListener("mouseover", event => {
//     showMore1.innerHTML = '... درحال توسعه'
//   });
  
//   showMore1.addEventListener("mouseout", event => {
//     showMore1.innerHTML = 'نمایش بیشتر'
//   });
// showMore2.addEventListener("mouseover", event => {
//     showMore2.innerHTML = '... درحال توسعه'
//   });
  
//   showMore2.addEventListener("mouseout", event => {
//     showMore2.innerHTML = 'نمایش بیشتر'
//   });

let i = 0
  function showMoreCrypto() {
    const hidden = document.querySelector('.grid-container.hidden-i')
    hidden.classList.toggle('active')
    if (i % 2 == 0) {
        showMore2.innerHTML = 'نمایش کمتر' 
        upIcon.classList.remove('fa-chevron-down')
        upIcon.classList.add('fa-chevron-up')
    }
    else{
        showMore2.innerHTML = 'نمایش بیشتر'
        upIcon.classList.add('fa-chevron-down')
        upIcon.classList.remove('fa-chevron-up')
    }

    i++

  }



function start() {
        //BTC

        fetch(`https://api.coinbase.com/v2/exchange-rates?currency=BTC`)
        .then(response => {
            return response.json();
        })
        .then(btc => {
            btcPriceOutput.innerHTML = `\$${parseInt(btc.data.rates.USD)} <sup>دلار</sup>`
        })


    fetch(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC&tsyms=USD&api_key=28f055579645454046123d6e1f8500164ea473af9b34ddd3bd89869598c43768`)
    .then(response => {
        return response.json();
    })
    .then(data => {
        let x = data.RAW.BTC.USD.CHANGEPCTDAY
            y = Math.floor(x * 100) / 100;

            if( y < 0){ 
                btcUpper.classList.remove('fa-caret-up');
                btcUpper.classList.add('fa-caret-down');
                btcUpper.classList.add('down');
                btcTodayOutput.classList.add('down');

                btcTodayOutput.innerHTML = `${(y.toFixed(2))}%`
            }
            else{
                btcTodayOutput.innerHTML = `\+${(y.toFixed(2))}%`
            }

        })


    //ETH

    fetch(`https://api.coinbase.com/v2/exchange-rates?currency=eth`)
    .then(response => {
        return response.json();
    })
    .then(eth => {
        ethPriceOutput.innerHTML = `\$${parseInt(eth.data.rates.USD)} <sup>دلار</sup>`
    })


    fetch(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=eth&tsyms=USD&api_key=28f055579645454046123d6e1f8500164ea473af9b34ddd3bd89869598c43768`)
    .then(response => {
        return response.json();
    })
    .then(data => {
        let x = data.RAW.ETH.USD.CHANGEPCTDAY
        y = Math.floor(x * 100) / 100;

        if( y < 0){ 
            ethUpper.classList.remove('fa-caret-up');
            ethUpper.classList.add('fa-caret-down');
            ethUpper.classList.add('down');
            ethTodayOutput.classList.add('down');

            ethTodayOutput.innerHTML = `${(y.toFixed(2))}%`
        }
        else{
            ethTodayOutput.innerHTML = `\+${(y.toFixed(2))}%`
        }
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
    .then(data => {
        let x = data.RAW.BNB.USD.CHANGEPCTDAY
        y = Math.floor(x * 100) / 100;

        if( y < 0){ 
            bnbUpper.classList.remove('fa-caret-up');
            bnbUpper.classList.add('fa-caret-down');
            bnbUpper.classList.add('down');
            bnbTodayOutput.classList.add('down');

            bnbTodayOutput.innerHTML = `${(y.toFixed(2))}%`
        }
        else{
            bnbTodayOutput.innerHTML = `+${(y.toFixed(2))}%`
        }

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

            trxTodayOutput.innerHTML = `${(y.toFixed(2))}%`
        }
        else{
            trxTodayOutput.innerHTML = `+${(y.toFixed(2))}%`
        }
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


    fetch(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=doge&tsyms=USD&api_key=28f055579645454046123d6e1f8500164ea473af9b34ddd3bd89869598c43768`)
    .then(response => {
        return response.json();
    })
    .then(data => {
        let x = data.RAW.DOGE.USD.CHANGEPCTDAY
        y = Math.floor(x * 100) / 100;

        if( y < 0){ 
            dogeUpper.classList.remove('fa-caret-up');
            dogeUpper.classList.add('fa-caret-down');
            dogeUpper.classList.add('down');
            dogeTodayOutput.classList.add('down');

            dogeTodayOutput.innerHTML = `${(y.toFixed(2))}%`
        }
        else{
            dogeTodayOutput.innerHTML = `\+${(y.toFixed(2))}%`
        }
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


    fetch(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=sol&tsyms=USD&api_key=28f055579645454046123d6e1f8500164ea473af9b34ddd3bd89869598c43768`)
    .then(response => {
        return response.json();
    })
    .then(data => {
        let x = data.RAW.SOL.USD.CHANGEPCTDAY
        y = Math.floor(x * 100) / 100;

        if( y < 0){ 
            solUpper.classList.remove('fa-caret-up');
            solUpper.classList.add('fa-caret-down');
            solUpper.classList.add('down');
            solTodayOutput.classList.add('down');

            solTodayOutput.innerHTML = `${(y.toFixed(2))}%`
        }
        else{
            solTodayOutput.innerHTML = `\+${(y.toFixed(2))}%`
        }
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

    //XRP

    fetch(`https://api.coinbase.com/v2/exchange-rates?currency=sol`)
    .then(response => {
        return response.json();
    })
    .then(xrp => {
        let price = xrp.data.rates.USD
        price = Math.floor(price * 100) / 100;
        xrpPriceOutput.innerHTML = `\$${(price.toFixed(2))} <sup>دلار</sup>`
    })


    fetch(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=xrp&tsyms=USD&api_key=28f055579645454046123d6e1f8500164ea473af9b34ddd3bd89869598c43768`)
    .then(response => {
        return response.json();
    })
    .then(data => {
        let x = data.RAW.XRP.USD.CHANGEPCTDAY
        y = Math.floor(x * 100) / 100;

        if( y < 0){ 
            xrpUpper.classList.remove('fa-caret-up');
            xrpUpper.classList.add('fa-caret-down');
            xrpUpper.classList.add('down');
            xrpTodayOutput.classList.add('down');

            xrpTodayOutput.innerHTML = `${(y.toFixed(2))}%`
        }
        else{
            xrpTodayOutput.innerHTML = `\+${(y.toFixed(2))}%`
        }
    })

    //ADA

    fetch(`https://api.coinbase.com/v2/exchange-rates?currency=ada`)
    .then(response => {
        return response.json();
    })
    .then(ada => {
        let price = ada.data.rates.USD
        price = Math.floor(price * 100) / 100;
        adaPriceOutput.innerHTML = `\$${(price.toFixed(2))} <sup>دلار</sup>`
    })


    fetch(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=ada&tsyms=USD&api_key=28f055579645454046123d6e1f8500164ea473af9b34ddd3bd89869598c43768`)
    .then(response => {
        return response.json();
    })
    .then(data => {
        let x = data.RAW.ADA.USD.CHANGEPCTDAY
        y = Math.floor(x * 100) / 100;

        if( y < 0){ 
            adaUpper.classList.remove('fa-caret-up');
            adaUpper.classList.add('fa-caret-down');
            adaUpper.classList.add('down');
            adaTodayOutput.classList.add('down');

            adaTodayOutput.innerHTML = `${(y.toFixed(2))}%`
        }
        else{
            adaTodayOutput.innerHTML = `\+${(y.toFixed(2))}%`
        }
    })

    //AVAX

    fetch(`https://api.coinbase.com/v2/exchange-rates?currency=avax`)
    .then(response => {
        return response.json();
    })
    .then(avax => {
        let price = avax.data.rates.USD
        price = Math.floor(price * 100) / 100;
        avaxPriceOutput.innerHTML = `\$${(price.toFixed(2))} <sup>دلار</sup>`
    })


    fetch(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=avax&tsyms=USD&api_key=28f055579645454046123d6e1f8500164ea473af9b34ddd3bd89869598c43768`)
    .then(response => {
        return response.json();
    })
    .then(data => {
        let x = data.RAW.AVAX.USD.CHANGEPCTDAY
        y = Math.floor(x * 100) / 100;

        if( y < 0){ 
            avaxUpper.classList.remove('fa-caret-up');
            avaxUpper.classList.add('fa-caret-down');
            avaxUpper.classList.add('down');
            avaxTodayOutput.classList.add('down');

            avaxTodayOutput.innerHTML = `${(y.toFixed(2))}%`
        }
        else{
            avaxTodayOutput.innerHTML = `\+${(y.toFixed(2))}%`
        }
    })

    //SHIB

    fetch(`https://api.coinbase.com/v2/exchange-rates?currency=shib`)
    .then(response => {
        return response.json();
    })
    .then(shib => {
        let price = shib.data.rates.USD
        // price = Math.floor(price * 100) / 100;
        shibPriceOutput.innerHTML = `\$${price} <sup>دلار</sup>`
    })


    fetch(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=shib&tsyms=USD&api_key=28f055579645454046123d6e1f8500164ea473af9b34ddd3bd89869598c43768`)
    .then(response => {
        return response.json();
    })
    .then(data => {
        let x = data.RAW.SHIB.USD.CHANGEPCTDAY
        y = Math.floor(x * 100) / 100;

        if( y < 0){ 
            shibUpper.classList.remove('fa-caret-up');
            shibUpper.classList.add('fa-caret-down');
            shibUpper.classList.add('down');
            shibTodayOutput.classList.add('down');

            shibTodayOutput.innerHTML = `${(y.toFixed(2))}%`
        }
        else{
            shibTodayOutput.innerHTML = `\+${(y.toFixed(2))}%`
        }
    })

    //LINK

    fetch(`https://api.coinbase.com/v2/exchange-rates?currency=link`)
    .then(response => {
        return response.json();
    })
    .then(link => {
        let price = link.data.rates.USD
        price = Math.floor(price * 100) / 100;
        linkPriceOutput.innerHTML = `\$${price} <sup>دلار</sup>`
    })


    fetch(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=link&tsyms=USD&api_key=28f055579645454046123d6e1f8500164ea473af9b34ddd3bd89869598c43768`)
    .then(response => {
        return response.json();
    })
    .then(data => {
        let x = data.RAW.LINK.USD.CHANGEPCTDAY
        y = Math.floor(x * 100) / 100;

        if( y < 0){ 
            linkUpper.classList.remove('fa-caret-up');
            linkUpper.classList.add('fa-caret-down');
            linkUpper.classList.add('down');
            linkTodayOutput.classList.add('down');

            linkTodayOutput.innerHTML = `${(y.toFixed(2))}%`
        }
        else{
            linkTodayOutput.innerHTML = `\+${(y.toFixed(2))}%`
        }
    })

    //BCH

    fetch(`https://api.coinbase.com/v2/exchange-rates?currency=bch`)
    .then(response => {
        return response.json();
    })
    .then(bch => {
        let price = bch.data.rates.USD
        price = Math.floor(price * 100) / 100;
        bchPriceOutput.innerHTML = `\$${price} <sup>دلار</sup>`
    })


    fetch(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=bch&tsyms=USD&api_key=28f055579645454046123d6e1f8500164ea473af9b34ddd3bd89869598c43768`)
    .then(response => {
        return response.json();
    })
    .then(data => {
        let x = data.RAW.BCH.USD.CHANGEPCTDAY
        y = Math.floor(x * 100) / 100;

        if( y < 0){ 
            bchUpper.classList.remove('fa-caret-up');
            bchUpper.classList.add('fa-caret-down');
            bchUpper.classList.add('down');
            bchTodayOutput.classList.add('down');

            bchTodayOutput.innerHTML = `${(y.toFixed(2))}%`
        }
        else{
            bchTodayOutput.innerHTML = `\+${(y.toFixed(2))}%`
        }
    })

    //LTC

    fetch(`https://api.coinbase.com/v2/exchange-rates?currency=ltc`)
    .then(response => {
        return response.json();
    })
    .then(ltc => {
        let price = ltc.data.rates.USD
        price = Math.floor(price * 100) / 100;
        ltcPriceOutput.innerHTML = `\$${price} <sup>دلار</sup>`
    })


    fetch(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=ltc&tsyms=USD&api_key=28f055579645454046123d6e1f8500164ea473af9b34ddd3bd89869598c43768`)
    .then(response => {
        return response.json();
    })
    .then(data => {
        let x = data.RAW.LTC.USD.CHANGEPCTDAY
        y = Math.floor(x * 100) / 100;

        if( y < 0){ 
            ltcUpper.classList.remove('fa-caret-up');
            ltcUpper.classList.add('fa-caret-down');
            ltcUpper.classList.add('down');
            ltcTodayOutput.classList.add('down');

            ltcTodayOutput.innerHTML = `${(y.toFixed(2))}%`
        }
        else{
            ltcTodayOutput.innerHTML = `\+${(y.toFixed(2))}%`
        }
    })

    //DOT

    fetch(`https://api.coinbase.com/v2/exchange-rates?currency=dot`)
    .then(response => {
        return response.json();
    })
    .then(dot => {
        let price = dot.data.rates.USD
        price = Math.floor(price * 100) / 100;
        dotPriceOutput.innerHTML = `\$${price} <sup>دلار</sup>`
    })


    fetch(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=dot&tsyms=USD&api_key=28f055579645454046123d6e1f8500164ea473af9b34ddd3bd89869598c43768`)
    .then(response => {
        return response.json();
    })
    .then(data => {
        let x = data.RAW.DOT.USD.CHANGEPCTDAY
        y = Math.floor(x * 100) / 100;

        if( y < 0){ 
            dotUpper.classList.remove('fa-caret-up');
            dotUpper.classList.add('fa-caret-down');
            dotUpper.classList.add('down');
            dotTodayOutput.classList.add('down');

            dotTodayOutput.innerHTML = `${(y.toFixed(2))}%`
        }
        else{
            dotTodayOutput.innerHTML = `\+${(y.toFixed(2))}%`
        }
    })
}

setInterval(start, 12 * 60 * 60 * 1000); // 12 hours in milliseconds 