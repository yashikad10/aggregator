"use client"
import axios from 'axios';
import { notFound } from 'next/navigation';

type CollectionProps = {
  params: {
    slug: string;
  };
};

async function fetchCollection(slug: string) {
  try {
    const response = await axios.get('https://turbo.ordinalswallet.com/collection/${slug}/escrows');
    const collection = response.data.collection.find((item: any) => item.slug === slug);
    
    return collection || null;
  } catch (error) {
    console.error('Error fetching collection:', error);
    return null;
  }
}


export default async function CollectionPage({ params }: CollectionProps) {
  const { slug } = params;
  const collection = await fetchCollection(slug);
  if (!collection) {
    notFound();
  }

  return (
  <div className='text-white p-6 border border-[#283277] rounded-lg shadow-lg mt-4 w-1/2 justify-center'>
  <div className='flex items-center'>
    <div className='flex-1'>
      <p>ID: {collection.id}</p>
    </div>
  </div>
</div>

  );
}
