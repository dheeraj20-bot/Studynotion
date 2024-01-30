import React from 'react'

const CourseDetails = () => {
  
  const handleBuyCourse= ()=>{
    if(token){
        buyCourse()
        return
    }
  } 
  return (
    <div className='flex items-center  mt-10'>
        <button className='bg-yellow-50 p-6'
        onclick={()=>handleBuyCourse()}
        >
            Buy Now
            </button>
    </div>
  )
}

export default CourseDetails