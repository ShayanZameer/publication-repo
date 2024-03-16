import React, { useEffect, useState } from 'react';
import Rating from 'react-rating-stars-component';

const ReviewSystem = ({value, editable}) => {
  const [rating, setRating] = useState(0);

  const handleRatingChange = (val) => {
    setRating(val);
  };

  useEffect(() => {
    if(!editable){
      setRating(value);
    }
  }, [editable])
  

  return (
    <Rating
      count={5}
      value={rating}
      size={24}
      activeColor="#ffd700"
      edit={editable}
      onChange={(val) => handleRatingChange(val)}
    />
  );
};

export default ReviewSystem;