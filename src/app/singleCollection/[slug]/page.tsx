
"use client"
import axios from 'axios';
import { notFound } from 'next/navigation';
import { useState, useEffect } from 'react';

type CollectionProps = {
  params: {
    slug: string;
  };
};

async function fetchCollection(slug: string) {
  try {
    const response = await axios.get(`https://turbo.ordinalswallet.com/collections`);
    const collection = response.data.collections.find((item: any) => item.slug === slug);

    return collection || null;
  } catch (error) {
    console.error('Error fetching collection:', error);
    return null;
  }
}

export async function fetchInscriptions(slug: string) {
  try {
      const apiUrl = `https://turbo.ordinalswallet.com/collection/${slug}/escrows`;
      const response = await axios.get(apiUrl);

      if (response.status !== 200) {
          throw new Error('Failed to fetch escrows');
      }

      return response.data;
  } catch (error) {
      console.error('Error fetching escrows:', error);
      return []; 
  }
}

export default function Collections({ params }: CollectionProps) {
  const { slug } = params;
  const [collection, setCollection] = useState<any | null>(null);
  const [inscription, setInscription] = useState<any[]>([]);
  const [loadInscriptions, setLoadInscriptions] = useState<boolean>(false);
  const [errorIns, setErrorIns] = useState<string | null>(null);

  useEffect(() => {
    const loadCollection = async () => {
      const fetchedCollection = await fetchCollection(slug);
      if (!fetchedCollection) {
        notFound();
      } else {
        setCollection(fetchedCollection);
        const fetchedData = await fetchInscriptions(fetchedCollection.slug);
        setInscription(fetchedData);
      }
    };

    loadCollection();
  }, [slug]);

  if (!collection) {
    return null; 
  }

  return (
    <div>
    <div className='text-white p-6 border border-[#283277] rounded-lg shadow-lg mt-4 w-1/2 mx-auto'>
      <div className='flex items-center mb-6'>
        <div className='flex-1'>
          <h1 className='text-lg font-bold'>{collection.name}</h1>
          <p>Floor Price: {collection.floor_price}</p>
          <p>Volume Week: {collection.volume_week}</p>
          <p>Volume Month: {collection.volume_month}</p>
          <p>Volume All Time: {collection.volume_all_time}</p>
          <p>Slug: {collection.slug}</p>
          <p>Inscription: {collection.inscription}</p>
          <p>Highest Inscription: {collection.inscriptionHigh}</p>
        </div>
        <div className='ml-6'>
          {collection.icon || collection.banner_icon ? (
            <img
              src={collection.icon || collection.banner_icon}
              alt={collection.name}
              className='w-32 h-32 object-cover rounded-full'
            />
          ) : (
            <div className='w-32 h-32 flex items-center justify-center text-white bg-gray-700 rounded-full'>
              N/A
            </div>
          )}
        </div>
      </div>

      
    </div>
    <div className='mt-6 p-8'>
  <h2 className='text-lg font-bold mb-2'>Inscriptions</h2>
  {loadInscriptions ? (
    <p>Loading inscriptions...</p>
  ) : errorIns ? (
    <p className='text-red-500'>{errorIns}</p>
  ) : (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
      {inscription.map((data, index) => (
        <div key={index} className='border border-gray-400 p-4 rounded-lg flex items-start'>
          <div className='flex-shrink-0 w-16 h-16'>
            <img src={`https://cdn.ordinalswallet.com/inscription/preview/${data.inscription_id}`} className='w-full h-full object-contain' />
          </div>
          <div className='ml-4 flex-1'>
            <p className='text-sm text-gray-600 mb-1'>ID: {data.id}</p>
            
            <p className='text-sm text-gray-600 mb-1'>Satoshi Price: {data.satoshi_price}</p>
            <p className='text-sm text-gray-600 mb-1'>Created: {data.created}</p>
          </div>
        </div>
      ))}
    </div>
  )}
</div>


    </div>
    
  );
}
