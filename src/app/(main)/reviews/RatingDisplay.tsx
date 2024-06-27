import React from 'react';

type Props = {
  rating: number;
};
export default function RatingReview({ rating }: Props) {
  return (
    <div>
      {[1, 2, 3, 4, 5].map((star) => {
        return (
          <span
            className='start'
            style={{
              cursor: 'pointer',
              color: rating >= star ? 'gold' : '#ddd',
              fontSize: `1rem`,
            }}
          >
            {' '}
            ★{' '}
          </span>
        );
      })}
    </div>
  );
}
