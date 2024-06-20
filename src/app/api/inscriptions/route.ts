import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

/**
 * GET handler for fetching data from the external API.
 * @param req NextRequest - The incoming request object.
 * @returns NextResponse - The response object containing fetched data or error message.
 */
export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const slug = searchParams.get('slug');

        if (!slug) {
            return NextResponse.json({ message: 'Slug parameter is required' }, { status: 400 });
        }

        const apiUrl = `https://turbo.ordinalswallet.com/collection/${slug}/escrows`;

        const response = await axios.get(apiUrl, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log(response.data); 

        return NextResponse.json(response.data);
    } catch (err: any) {
        console.error('Error fetching data:', err);
        return NextResponse.json({ message: 'SERVER ERROR' }, { status: 500 });
    }
}
