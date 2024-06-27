'use client';

import React, { useState, ChangeEvent, useTransition } from 'react';
import { Button, Textarea } from '@nextui-org/react';
import Container from '../core/Container';
import StarRatingComponent from 'react-star-rating-component';
import { reviewRepository } from '@/app/(admin)/admin/reviews/repository';
import { IconCheck } from '@tabler/icons-react';

interface ReviewData {
  rating: number;
  review: string;
}

export default function NewReview(): React.ReactElement {
  const [reviewData, setReviewData] = useState<ReviewData>({
    rating: 0,
    review: '',
  });
  const [submitting, startSubmitting] = useTransition();
  const [submitted, setSubmitted] = useState(false);

  const handleRatingChange = (nextValue: number): void => {
    setReviewData((prevData) => ({ ...prevData, rating: nextValue }));
  };

  const handleReviewChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;
    setReviewData((prevData) => ({ ...prevData, review: value }));
  };

  const handleSubmit = (): void => {
    startSubmitting(async () => {
      await reviewRepository.create({
        comment: reviewData.review,
        rating: reviewData.rating,
      });
      setSubmitted(true);
    });
  };

  const renderStarIcon = (
    index: number,
    value: number,
    name: string,
  ): React.ReactNode => {
    return (
      <span
        style={{
          fontSize: '1.7rem',
          color: index <= value ? '#ffb400' : '#ddd',
        }}
      >
        ★
      </span>
    );
  };

  return (
    <Container width={'sm'} className='flex flex-col gap-4'>
      <Textarea
        label='Review'
        placeholder='Please give us your feedback here...'
        value={reviewData.review}
        onChange={handleReviewChange}
      />
      <footer className='flex items-center justify-between'>
        <StarRatingComponent
          name='rate1'
          starCount={5}
          value={reviewData.rating}
          onStarClick={handleRatingChange}
          renderStarIcon={renderStarIcon}
          starColor='#ffb400'
          emptyStarColor='#ddd'
        />
        <Button
          variant='flat'
          isDisabled={submitted}
          endContent={submitted && <IconCheck size={20} />}
          onClick={handleSubmit}
          isLoading={submitting}
        >
          Submit
        </Button>
      </footer>
    </Container>
  );
}
