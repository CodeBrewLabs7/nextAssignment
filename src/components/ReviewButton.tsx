import React from 'react'
import { Button } from '@mui/material';


interface ViewReviewsButtonProps {
    onClick: () => void;
  }
  
// to be included as action button 
const ReviewButton:React.FC<ViewReviewsButtonProps> = ({onClick}) => {
  return (
  <Button variant="contained" color="primary" onClick={onClick} sx={{fontSize:"8px"}}>
    View Reviews
  </Button>
  )
}

export default ReviewButton