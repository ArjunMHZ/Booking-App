import React, { useState, useContext } from 'react'
import "./Hotel.css"
import { Navbar } from "../../components/navbar/Navbar"
import { Header } from "../../components/header/Header"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleArrowLeft, faCircleArrowRight, faCircleXmark, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { MailList } from "../../components/mailList/MailList";
import { Footer } from "../../components/footer/Footer";
import useFetch from '../../hooks/useFetch'
import { useLocation, useNavigate } from 'react-router-dom'
import { SearchContext } from '../../context/SearchContext'
import { AuthContext } from '../../context/AuthContext'
import { Reserve } from '../../components/reserve/Reserve'

export const Hotel = () => {

  const location = useLocation()
  const id = location.pathname.split("/")[2];

  
  const[slideNumber, setSlideNumber] = useState(0);
  const[openSlider, setOpenSlider] = useState(false);
  const[openModal, setOpenModal] = useState(false);

  const {data, loading, error } = useFetch(`http://localhost:8800/api/hotels/find/${id}`)

  
  const { dates, options } = useContext(SearchContext)
  
  const {user} = useContext(AuthContext);
  const navigate = useNavigate()
  
  const MILLISECONDS_PER_DAY = 1000* 60 * 60 * 24;
  function dayDifference(date1, date2){
      const timeDiff = Math.abs(date2.getTime() - date1.getTime());
      const diffDays = Math.ceil(timeDiff/ MILLISECONDS_PER_DAY);
      return diffDays;
  }

  const days = (dayDifference(dates[0].endDate, dates[0].startDate))


  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpenSlider(true);
  }

  const handleMove = (direction) =>{
    let newSlideNumber;

    if(direction === "l"){
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    }else{
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  }


  const handleClick = () => {
    if (user) {
      setOpenModal(true)
    } else {
      navigate("/login")
    }
  }

  return (
    <div>
      <Navbar />
      <Header type="list" />

      {loading ? "loading" : (
        <div className="hotelContainer">
        
        {openSlider && <div className="slider">
            <FontAwesomeIcon icon={faCircleXmark} className='close' onClick={() => setOpenSlider(false)}/>
            <FontAwesomeIcon icon={faCircleArrowLeft} className='arrow' onClick={()=> handleMove("l")}/>
            <div className="sliderWrapper">
              <img key={slideNumber} src={data.photos[slideNumber]} alt="" className='sliderImg'/>
            </div>
            <FontAwesomeIcon icon={faCircleArrowRight} className='arrow' onClick={()=> handleMove("r")}/>
        </div>}
        
        <div className="hotelWrapper">
          <button onClick={handleClick} className="bookNow">Reserve or book now</button>
          <h1 className="hotelTitle">{data.name}</h1>
          <div className="hotelAddres">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>{data.address}</span>
          </div>
          <span className="hotelDistance">
            {data.distance}
          </span>
          <span className="hotelPriceHighlight">
            Low NPR {data.cheapestPrice}rates • No booking fees • Find cheaper? We'll refund the difference
          </span>
          <div className="hotelImages">
            {data.photos?.map((photos, i)=>(
              <div className="hotelImgWrapper" key={i}>
                <img onClick={()=>handleOpen(i)} src={photos} alt="" className="hotelImg" />
              </div>
            ))}
          </div>
          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
              <h1 className="hotelTitle">{data.title}</h1>
              <p className="hotelDesc">
                {data.desc}
              </p>
            </div>
            <div className="hotelDetailsPrice">
              <h1>Perfect for a {days}-night stay!</h1>
              <span>
                Situated in the real heart of Tokyo, this hotel has an excellent location score of 9.1
              </span>
              <h2><b>NPR {days * data.cheapestPrice * options.room}</b> ({days} nights)</h2>
              <button onClick={handleClick}>Reserve or book now!</button>
            </div>
          </div>
        </div>

        <MailList />
        <Footer className="footer"/>

      </div>
      )}
      
      {openModal && <Reserve setOpenSlider={setOpenModal} hotelId={id}/>}
    </div>
  )
}
