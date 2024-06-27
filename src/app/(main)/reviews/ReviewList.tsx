'use client';
import React, { useEffect, useState } from 'react';
import Container from '../core/Container';
import { Review } from '@/app/(admin)/admin/reviews/Review';
import { reviewRepository } from '@/app/(admin)/admin/reviews/repository';
import { Card, CardBody, Spinner } from '@nextui-org/react';
import RatingReview from './RatingDisplay';

export default function ReviewList() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    reviewRepository
      .publicReviews()
      .then((data) => {
        setReviews(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      {loading ? (
        <div className='flex justify-center'>
          <Spinner />
        </div>
      ) : (
        <Container width='md' className='flex flex-col gap-5'>
          {reviews.map((it) => (
            <Card key={it.id} radius='sm'>
              <CardBody className='p-5'>
                <p className='text-sm'>{it.comment}</p>
                <RatingReview rating={it.rating} />
              </CardBody>
            </Card>
          ))}
        </Container>
      )}
    </>
  );
}
