import React from 'react'
import "./SearchItem.css"
import { Link } from 'react-router-dom'

export const SearchItem = ({item}) => {
  return (
    <div className='searchItem'>
        <img src={item.photos[0]} alt="" className="siImg" />
        <div className="siDesc">
            <h1 className="siTitle">{item.name}</h1>
            <span className="siDistance">{item.distance}</span>
            <span className="siTaxiOp">Metro access</span>
            <span className="siSubtitle">
                Deluxe King Room with Skyline View
            </span>
            <span className="siFeatures">
                {item.desc}
            </span>
            <span className="siCancelOp">Free cancellation</span>
            <span className="siCancelOpSubtitle">No payment needed - <small>pay at the property</small></span>
        </div>
        <div className="siDetails">
            {item.rating && <div className="siRating">
                <span>Excellent</span>
                <button>{item.rating}</button>
            </div>}
            <div className="siDetailText">
                <span className="siPrice">NPR {item.cheapestPrice}</span>
                <span className="siTaxOp">+NPR 2000 taxes and charges</span>
                <Link to={`/hotels/${item._id}`}>
                  <button className="siCheckButton">See availability</button>
                </Link>
            </div>
        </div>
    </div>
  )
}
