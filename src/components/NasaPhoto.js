import React, { useState, useEffect } from 'react';
import NavBar from "./NavBar";

export default function NasaPhoto() {
    const [photoData, setPhotoData] = useState(null);
    const [selectedDate, setSelectedDate] = useState("");

    useEffect(() => {
        fetchPhoto();
    }, [selectedDate]); // Fetch photo data when selected date changes

    const apiKey = process.env.NASA_API_KEY;
    async function fetchPhoto() {
    
        const res = await fetch(
            `https://api.nasa.gov/planetary/apod?api_key=BtPTREBwVghP5VXpAylbFRHyfsrMhnTnwBpJRQZl&date=${selectedDate}`
        );
        const data = await res.json();
        setPhotoData(data);
    }

    // Handle date input change
    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    return (
        <>
            <NavBar />
            <div>
                <label htmlFor="dateInput">Select Date:</label>
                <input 
                    type="date" 
                    id="dateInput" 
                    value={selectedDate} 
                    onChange={handleDateChange} 
                />
            </div>
            {/* Render photo or video based on photoData */}
            <div className='nasa-photo'> 
                {photoData && (
                    <>
                        {photoData.media_type === "image" ? (
                            <img src={photoData.url} alt={photoData.title} />
                        ) : (
                            <iframe 
                                title="video"
                                src={photoData.url}
                                frameBorder="0"
                                gesture="media"
                                allow="encrypted-media"
                                allowFullScreen
                                className="photo"
                            />
                        )}
                        <div>
                            <h1>{photoData.title}</h1>
                            <p className='date'>{photoData.date}</p>
                            <p className='explanation'>{photoData.explanation}</p>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
