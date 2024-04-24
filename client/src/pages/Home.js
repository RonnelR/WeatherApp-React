import React , {useState} from 'react'
import { IoLocation } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import toast from 'react-hot-toast'
import axios from 'axios'
import { FaWind } from "react-icons/fa";
import { FaWater } from "react-icons/fa";
import { RiCelsiusFill } from "react-icons/ri";


const Home =  () => {

  const [weatherDetails,setWeatherDetails] = useState([])
const [otherDetails,setOtherDetails] = useState()
const [icon,setIcon] = useState('')
const [city,setCity] = useState('')
const [main,setMain] = useState('')
const [pnfVisible,setPnfVisible] = useState(false)




//get weather details function
  const getWeatherDetails = async (e) =>{
    e.preventDefault()
    try {
        const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a94161039b5af3ab703313825fb167a4`);

        if(res?.data){
          toast.success("success full")
          setIcon(res?.data?.weather[0]?.icon)
          setMain(res?.data?.weather[0]?.main)
          setWeatherDetails(res?.data)
          setOtherDetails(res?.data?.main)
          setPnfVisible(false)
        }

    } catch (error) {
        toast.success(error)
        setCity("")
        setPnfVisible(true)
    }
}

  return (
    <div className='home'>

<div className='BodyContainer p-2'>
{/* input form */}
<>
        <div className='searchBox'>
  <div className='locationIcon'>
               <IoLocation/>
               </div>

                <input className='searchBar' type='text' placeholder='Enter your city...' value={city} onChange={(e)=>{setCity(e.target.value)}}/>

                <button className='btn' onClick={(e)=>{getWeatherDetails(e)}}><FaSearch/></button>
            
           
        </div>
    </>


{/* body */}



{/* page not found */}

{pnfVisible === true  ? <> 
<div className='text-center'>

<img style={{width:"200px",height:"200px"}} alt='pnf' src='https://static.vecteezy.com/system/resources/thumbnails/011/314/479/small_2x/illustrations-woman-using-binocular-looking-internet-connections-for-oops-404-error-design-concept-landing-page-vector.jpg'/>
</div></> : <>

{ icon && <div>
<div className='text-center'>
    <img alt='icon-for-weather' src={`https://openweathermap.org/img/wn/${icon}@2x.png` } />
    <h4>{Math.round(otherDetails?.temp - 273.15)}<RiCelsiusFill/></h4>
    <h2>{main}</h2>
    
</div>
    <div className='container'>
        <div className='row text-center'>
        <div className='col-sm-6'>
            <h4 >{otherDetails?.humidity}%</h4>
            <p ><FaWater/>Humidity</p>

            </div>
            <div className='col-sm-6' >

            <h4 >{Math.floor(weatherDetails?.wind?.speed)}Km/h</h4>
            <p ><FaWind/>Wind Speed</p>

            </div>
        </div>
    </div>
</div> }


</>  }  
 


</div>
    </div>
  )
}

export default Home

