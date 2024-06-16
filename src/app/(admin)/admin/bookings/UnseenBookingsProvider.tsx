'use client';
import React, { useEffect } from 'react';
import { bookingRepository } from './repository';

const Context = React.createContext<number>(0);

export default function UnseenBookingsProvider({ children }: any) {
  const [state, setState] = React.useState<number>(0);

  useEffect(() => {
    return bookingRepository.unseenBookings(setState);
  }, []);

  return <Context.Provider value={state}>{children}</Context.Provider>;
}

export function useUnseenBookings() {
  return React.useContext(Context);
}
