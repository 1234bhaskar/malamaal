import "./App.css";
import axios from "axios";
import Coin from "./Coin";
import { React, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

//https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false

const App = () => {
  const { loginWithRedirect, isAuthenticated, logout, user } = useAuth0(); //for login
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false"
        )
        .then((res) => {
          setCoins(res.data);
        })
        .catch((error) => console.log(error));
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="coin-app flex flex-col items-center mt-5 overflow-y-auto no-scrollbar">
      {isAuthenticated ? (
        <button
          onClick={() =>
            logout({ logoutParams: { returnTo: window.location.origin } })
          }
          className="border rounded-sm sm:absolute sm:right-10 p-1 hover:bg-gradient-to-r to-blue-400 from-purple-600 duration-1000 ease-in-out hover:scale-105"
        >
          Log Out
        </button>
      ) : (
        <button
          onClick={() => loginWithRedirect()}
          className="border rounded-sm sm:absolute sm:right-10 p-1 hover:bg-gradient-to-r to-blue-400 from-purple-600 duration-500 ease-in-out hover:scale-105"
        >
          Log In
        </button>
      )}
      {isAuthenticated && (
        <div className="sm:absolute sm:left-0 sm:m-1 sm:flex flex items-center">
          <img
            src={user.picture}
            alt={user.name}
            className="h-8 rounded-2xl mx-2"
          />
          <div>{user.name}</div>
        </div>
      )}

      <div className="coin-search flex flex-col items-center">
        <h1 className="coin-text text-3xl sm:text-6xl">Search a currency</h1>
        <form>
          <input
            type="text"
            placeholder="Search"
            className="coin-input outline-none rounded-sm mt-14 w-64 h-11 pl-3 text-white text-xl bg-gradient-to-r to-blue-400 from-purple-600 font-bold "
            onChange={handleChange}
          />
        </form>
      </div>
      {filteredCoins.map((coin) => {
        return (
          <Coin
            key={coin.id}
            name={coin.name}
            image={coin.image}
            volume={coin.market_cap}
            price={coin.current_price}
            symbol={coin.symbol}
            priceChange={coin.price_change_percentage_24h}
          />
        );
      })}
    </div>
  );
};

export default App;
