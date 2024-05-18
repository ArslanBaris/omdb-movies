import React from 'react'

interface InfoBarProps {
  Runtime: string;
  BoxOffice: string;
  Director: string;
}

const InfoBar: React.FC<InfoBarProps> = ({
    Runtime,
    BoxOffice,
    Director
}) => {
  return (
    <div className='information-bar-wrapper'> 
    <div className='information-bar-content'>
      <div className='column'>
        <h3>Running time: {Runtime} </h3>
      </div>
      <div className='column'>
        <h3>Box Office: {BoxOffice}</h3>
      </div>
      <div className='column'>
        <h3>Director: {Director}</h3>
      </div>
    </div>
  </div>
  )
}

export default InfoBar