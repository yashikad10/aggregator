'use server'
import axios from 'axios';

export async function getInscriptions(slug: string) {
  try {
    const response = await axios.get('/api/inscriptions');
    return response.data;
  } catch (error) {
    console.error('Error fetching escrow data:', error);
    return null;
  }
}
