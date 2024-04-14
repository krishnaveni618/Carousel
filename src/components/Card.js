import React, { useState } from 'react'
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs"
import './Card.css'


const Card = ({ data }) => {
    const [slide, setSlide] = useState(0);
    const nextSlide = () => {
        setSlide(slide === data.land_media.length - 1 ? 0 : slide + 1);
    };

    const prevSlide = () => {
        setSlide(slide === 0 ? data.land_media.length - 1 : slide - 1);
    };
    const getLandMediaUrl = () => {
        if (data.land_media.length > 0) {
            return data.land_media[slide].image
        } else {
            return ''
        }
    }
    return (
        <div>
            <div className="land-card">
                <div className='carousel'>
                
                    <BsArrowLeftCircleFill onClick={prevSlide} className="arrow arrow-left" />
                   
                    <BsArrowRightCircleFill
                        onClick={nextSlide}
                        className="arrow arrow-right"
            
                    />
                </div>
                
                <img src={getLandMediaUrl()} style={{ width: '100%', height: '60%' }} alt='loading' className='image'/>
              
                <div className="land-details">
                    <h3>{data.mandal_name},{data.village_name}</h3>
                    <h3>{data.district_name}(dt)</h3>
                    <h3>{data.total_land_size_in_acres.acres} Acrs {data.total_land_size_in_acres.guntas} Guntas . {data.price_per_acre_crore.crore} {data.price_per_acre_crore.lakh} per acre</h3>
                </div>
            </div>
        </div>
    )
}

export default Card
