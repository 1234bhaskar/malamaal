import React from 'react'

const Coin = ({name,image,symbol,price,volume,priceChange}) => {
  return (
    <div className='coin-container flex justify-center '>
        <div className='coin-row flex justify-start items-center h-40 border-b border-gray-300 w-fit '>
            <div className='coin flex items-center pr-7 '>
                <img className='h-14 ' src={image} alt='crypto'/>
                <h1 className='h-8 w-8 m-10 text-2xl px-10 '>{name}</h1>
                <p className='coin-symbol mx-14 uppercase'>{symbol}</p>
                </div>
                <div className='coin-data flex text-center justify-between w-full'>
                    <p className='coin-price w-28 mr-7'>₹{price}</p>
                    <p className='coin-volume w-40'>₹{volume.toLocaleString()}</p>
                    {
                        priceChange<0 ?(
                            <p className='coin-percent text-red-500 w-full'>{priceChange.toFixed(2)}%</p>
                        )  :(
                              <p className='coin-percent text-green-500 w-full'>{priceChange.toFixed(2)}%</p>
                        )
                    }
                </div>
        </div>
        
    </div>
  )
}

export default Coin