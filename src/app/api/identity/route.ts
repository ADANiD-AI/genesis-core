import { NextResponse } from 'next/server';
import { handleRegistration, handleLogin } from '@/lib/controllers/identityController';

// This function will handle GET requests to /api/identity
export async function GET(request: Request) {
  return NextResponse.json({ message: "Hello from the identity API!" });
}

// This function will handle POST requests to /api/identity
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, data } = body;

    if (action === 'register') {
      const result = await handleRegistration(data);
      return NextResponse.json(result);
    }

    if (action === 'login') {
      const result = await handleLogin(data);
      return NextResponse.json(result);
    }
    
    return NextResponse.json({ message: "Invalid action." }, { status: 400 });

  } catch (error) {
    return NextResponse.json({ message: "Error processing request." }, { status: 500 });
  }
}
