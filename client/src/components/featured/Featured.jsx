import React from 'react'
import "./Featured.css"
import useFetch from '../../hooks/useFetch'

export const Featured = () => {

    const { data, loading, error } = useFetch("http://localhost:8800/api/hotels/countByCity?cities=Kathmandu,Pokhara,Nuwakot");
    

  return (
    <div className='featured'>
       {loading ? "Loading please wait" : (
        <>
        <div className="featuredItem">
            <img src="https://r-xx.bstatic.com/xdata/images/city/170x136/664666.jpg?k=e7f2be1324d4595363ec6d46d988eb21cee118a5530ce0a19a18cf85c4473d2e&o=" alt="" className="featuredImg" />
            <div className="featuredTitles">
                <h1>Kathmandu</h1>
                <h2>{data[0]} properties</h2>
            </div>
        </div>
        <div className="featuredItem">
            <img src="https://q-xx.bstatic.com/xdata/images/city/170x136/664657.jpg?k=c1d999b8766abab322730158d960eec68af7910fec9ff61b5339636fd74dfb0e&o=" alt="" className="featuredImg" />
            <div className="featuredTitles">
                <h1>Pokhara</h1>
                <h2>{data[1]} properties</h2>
            </div>
        </div>
        <div className="featuredItem">
            <img src="https://q-xx.bstatic.com/xdata/images/city/170x136/941487.jpg?k=c75b3673cb4808baa048069f28bf3adc8850629afb64f9a2a11a24861e37d17f&o=" alt="" className="featuredImg" />
            <div className="featuredTitles">
                <h1>Nagarkot</h1>
                <h2>{data[2]} properties</h2>
            </div>
        </div>
        </>)}

    </div>
  )
}
