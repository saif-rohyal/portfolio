import { NextResponse } from 'next/server';

export async function GET() {
  const phoneEnv = process.env.WHATSAPP_PHONE || "+923295152017";
  // Clean phone string to digits only for wa.me URL
  const cleanPhone = phoneEnv.replace(/[^\d]/g, '');
  const message = encodeURIComponent("Hello Saif, I explored your AI engineer portfolio and would like to connect!");
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${message}`;

  return NextResponse.redirect(whatsappUrl, {
    status: 307,
    headers: {
      'Cache-Control': 'no-store, max-age=0',
      'Referrer-Policy': 'no-referrer',
    },
  });
}
