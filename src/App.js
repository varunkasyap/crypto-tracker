import './App.css';
import { useEffect, useState } from 'react';
import Axios from "axios"
import Coin from "./components/coin"
import apiKey from "./apikey"

function App() {

  const [coins, setCoins] = useState([])
  const [searchWord, setSearchWord] = useState("")


  const apiUrl = 'https://openapiv1.coinstats.app/coins'

  useEffect(() => {
    Axios.get(apiUrl, {
      params: {
        limit: '100',
        currency: 'INR'
      },
      headers: {
        'Authorization': `Bearer ${apiKey}`
      }
    }).then((response) => {
      setCoins(response.data.result)
    }).catch((error) => {
      console.log(error)
    })

  }, [])

  const filteredCoins = coins.filter((coin) => {
    return coin.name.toLowerCase().includes(searchWord.toLowerCase());
  })


  return (
    <div className='App'>
      <div className="cryptoHeader">
        <h1 className='mainHeading'>Crypto Tracker</h1>
        <input type="text" placeholder='Search...' onChange={(event) => { setSearchWord(event.target.value) }} />
      </div>
      <div className="cryptoDisplay">{filteredCoins.map((coin) => {
        return <Coin name={coin.name} icon={coin.icon} price={coin.price.toLocaleString()} symbol={coin.symbol} key={coin.id} />
      })}</div>
      <p style={{ textAlign: 'center' }}>Varun Kasyap</p>
    </div>
  );
}

export default App;
