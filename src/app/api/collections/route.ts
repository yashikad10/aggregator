import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

/**
 * GET handler for fetching data from the external API.
 * @param req NextRequest - The incoming request object.
 * @returns NextResponse - The response object containing fetched data or error message.
 */
export async function GET(req: NextRequest) {
    try {
        const apiUrl = 'https://turbo.ordinalswallet.com/collections';
        
        const response = await axios.get(apiUrl, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const collections = response.data.collections.map((collection: any) => ({
            
            name: collection.name,
            icon: collection.icon,
            banner_icon: collection.banner_icon,
            floor_price: collection.floor_price,
            volume_week: collection.volume_week,
            volume_month: collection.volume_month,
            volume_all_time: collection.volume_all_time,
            slug: collection.slug,
            inscription: collection.lowest_inscription_num,
            inscriptionHigh: collection.highest_inscription_num

        }));

        //console.log("----------------data-----------------",collections);

        return NextResponse.json({ collections });
    } catch (err: any) {
        console.error('Error fetching data:', err);
        return NextResponse.json({ message: 'SERVER ERROR' }, { status: 500 });
    }
}
