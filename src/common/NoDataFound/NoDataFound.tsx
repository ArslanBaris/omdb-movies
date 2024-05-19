import { SentimentDissatisfied } from '@mui/icons-material'

const NoDataFound = () => (
    <div className='flex items-center justify-center flex-col text-sky-600' >
        <SentimentDissatisfied style={{fontSize:"40px"}} className='m-2' /> {" "}
        <span className='text-xl'>No Movies Found</span>
    </div>
)

export default NoDataFound