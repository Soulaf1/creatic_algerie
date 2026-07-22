import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Portfolio from '@/models/Portfolio';

export async function GET() {
  try {
    await dbConnect();
    const projets = await Portfolio.find({});
    return NextResponse.json(projets);
  } catch (error) {
    console.error('ERREUR PORTFOLIO:', error.message);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const projet = await Portfolio.create(body);
    return NextResponse.json(projet, { status: 201 });
  } catch (error) {
    console.error('ERREUR PORTFOLIO:', error.message);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}