import { AccessTime, Today } from '@mui/icons-material';
import React from 'react'

interface InfoBarProps {
  Runtime: string;
  BoxOffice: string;
  Released: string;
}

const InfoBar: React.FC<InfoBarProps> = ({
    Runtime,
    BoxOffice,
    Released
}) => {
  return (
    <div className='information-bar-wrapper'> 
    <div className='information-bar-content'>
      <div className='column'>
        <AccessTime className='mr-1' />
        <h3> {Runtime} </h3>
      </div>
      <div className='column'>
        <h3> {BoxOffice}</h3>
      </div>
      <div className='column'>
        <Today className='mr-1' />
        <h3> {Released}</h3>
      </div>
    </div>
  </div>
  )
}

export default InfoBar