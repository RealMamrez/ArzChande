import CurrencyCard from './components/CurrencyCard'
import AddCard from './components/AddCard'

// Import flags
import btcFlag from './assets/bitcoin.svg'
import usdFlag from './assets/usd.svg'

function App() {
  const currencies = [
    {
      currency: 'Bitcoin',
      code: 'BTC',
      value: 89203,
      change: 0.25,
      flag: btcFlag
    },
    {
      currency: 'Dollar',
      code: 'USD',
      value: 102308,
      change: -0.01,
      flag: usdFlag
    },
    {
      currency: 'Bitcoin',
      code: 'BTC',
      value: 89203,
      change: 0.25,
      flag: btcFlag
    },
    {
      currency: 'Dollar',
      code: 'USD',
      value: 102308,
      change: -0.01,
      flag: usdFlag
    },
    {
      currency: 'Bitcoin',
      code: 'BTC',
      value: 89203,
      change: 0.25,
      flag: btcFlag
    },
    {
      currency: 'Dollar',
      code: 'USD',
      value: 102308,
      change: -0.01,
      flag: usdFlag
    }
  ]

  return (
    <div className="min-h-screen bg-[#121212] py-12 px-4 sm:px-6">
      <div className="container mx-auto max-w-7xl">
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-8 sm:mb-12 text-center">ArzChande?</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-16">
          {currencies.slice(0, 5).map((currency, index) => (
            <div key={index} className="w-full max-w-[500px] mx-auto">
              <CurrencyCard {...currency} />
            </div>
          ))}
          <div className="w-full max-w-[500px] mx-auto">
            <AddCard />
          </div>
        </div>

        <section className="mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 sm:mb-6">About ArzChande?</h2>
          <p className="text-gray-300 leading-relaxed text-base sm:text-lg">
            <span className="text-green-500">ArzChande</span> is your go-to platform for{' '}
            <span className="text-blue-500">real-time</span> exchange rates of fiat currencies and cryptocurrencies. 
            We provide <span className="text-blue-500">up-to-the-minute</span> price updates, market trends, and analytical insights 
            to help you make informed financial decisions. Whether you're a trader, investor, or just curious about 
            the value of digital assets, ArzChande ensures that you stay ahead of the market.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 sm:mb-6">Source Code</h2>
          <p className="text-gray-300 leading-relaxed text-base sm:text-lg">
            <span className="text-green-500">ArzChande</span> is an{' '}
            <span className="text-blue-500">open-source</span> project, built with transparency and community collaboration in mind. 
            You can explore, contribute, or even use the code for your own projects. The{' '}
            <a href="#" className="text-blue-500 hover:underline">full source code is available</a> on GitHub—feel free to check it out 
            and be part of the development!
          </p>
        </section>

        <section>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 sm:mb-6">Donate</h2>
          <p className="text-gray-300 leading-relaxed text-base sm:text-lg">
            We truly appreciate your support for <span className="text-green-500">ArzChande</span>! Your encouragement helps us continue 
            providing real-time exchange rates, market insights, and valuable financial tools. If you find our platform useful, 
            consider sharing it with others or supporting us in any way you can. Every bit of support helps us grow and improve! 🚀
          </p>
        </section>
      </div>
    </div>
  )
}

export default App
