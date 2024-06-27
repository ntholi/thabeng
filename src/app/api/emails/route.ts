import { NextRequest, NextResponse } from 'next/server';
import { sendMail } from './service';

export async function POST(request: NextRequest) {
  const { to, subject, text } = await request.json();

  try {
    let info = await sendMail(to, subject, text);

    console.log('Message sent: %s', info.messageId);
    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Error sending email' }, { status: 500 });
  }
}
