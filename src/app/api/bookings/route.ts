import { Booking } from '@/app/(admin)/admin/bookings/Booking';
import { NextRequest, NextResponse } from 'next/server';
import { processBooking } from './service';

export async function POST(request: NextRequest) {
  const booking = (await request.json()) as Booking;
  await processBooking(booking);
  return NextResponse.json({ message: 'Booking created' }, { status: 201 });
}
