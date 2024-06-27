'use client';
import React, { useEffect } from 'react';
import { reviewRepository } from './repository';

const Context = React.createContext<number>(0);

export default function UnseenReviewsProvider({ children }: any) {
  const [state, setState] = React.useState<number>(0);

  useEffect(() => {
    return reviewRepository.unseenReviews(setState);
  }, []);

  return <Context.Provider value={state}>{children}</Context.Provider>;
}

export function useUnseenReviews() {
  return React.useContext(Context);
}
