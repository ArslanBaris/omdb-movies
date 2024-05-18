import React from 'react'

interface ThumbProps {
    image: string;
    rating: number;
}

const Thumb: React.FC<ThumbProps> = ({ image, rating }) => {


    return (
        <>
            <div className='thumb-container'>
              <img className='thumb' src={image === 'N/A' ? '/images/no_image.jpg' : image} alt='movie-thumb' />
              <div className="score">{rating}</div>
            </div>
        </>
    )
}

export default Thumb