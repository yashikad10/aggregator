"use client"

import axios from 'axios';
import { useRouter } from 'next/navigation';
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

const Collections = ({ params }: CollectionProps) => {
  const router = useRouter();
  const { slug } = params;
  const [collection, setCollection] = useState<any | null>(null);
  const [inscription, setInscription] = useState<any[]>([]);
  const [loadInscriptions, setLoadInscriptions] = useState<boolean>(false);
  const [errorIns, setErrorIns] = useState<string | null>(null);

  useEffect(() => {
    const loadCollection = async () => {
      const fetchedCollection = await fetchCollection(slug);
      if (!fetchedCollection) {
        console.error('Collection not found');
        return;
      }
      setCollection(fetchedCollection);
      const fetchedData = await fetchInscriptions(fetchedCollection.slug);
      setInscription(fetchedData);
      setLoadInscriptions(false);
    };

    loadCollection();
  }, [slug]);

  const handleBuyNowClick = (inscription_id: string) => {
    const url = `https://ordinalswallet.com/inscription/${inscription_id}`;
    router.push(url);
  };

  return (
    <div>
      <div className='text-white p-6 rounded-lg shadow-lg mt-4 w-full mx-auto'>
        <div className='flex items-center mb-6'>
          <div className='mr-6'>
            {collection?.icon || collection?.banner_icon ? (
              <img
                src={collection?.icon || collection?.banner_icon}
                alt={collection?.name}
                className='w-32 h-32 object-cover'
              />
            ) : (
              <div className='w-32 h-32 flex items-center justify-center text-white bg-gray-700 rounded-full'>
                N/A
              </div>
            )}
          </div>
          <div className='text-white'>
            <h1 className='text-lg font-bold'>{collection?.name}</h1>
            <p>Floor Price: {collection?.floor_price}</p>
            <p>Slug: {collection?.slug}</p>
            <p>Desc: {collection?.description}</p>
          </div>
        </div>
      </div>
      <div className='mt-6 p-8'>
        <h2 className='text-3xl font-bold mb-4 text-white'>For Sale</h2>
        {loadInscriptions ? (
          <p>Loading inscriptions...</p>
        ) : errorIns ? (
          <p className='text-red-500'>{errorIns}</p>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6'>
            {inscription.map((data, index) => (
              <div
                key={index}
                className='border border-gray-400 rounded-lg cursor-pointer flex flex-col h-72'
              >
                <div className='flex-shrink-0 h-3/4'>
                  <img
                    src={`https://cdn.ordinalswallet.com/inscription/preview/${data.inscription_id}`}
                    className='w-full h-full object-cover'
                    alt={`Inscription ${data.id}`}
                  />
                </div>
                <div className=' p-2 flex justify-between '>
                  <p className='text-md text-white p-2'>Price: {data.satoshi_price}</p>
                  <div className='mt-auto'>
                    <button
                      className='text-white border border-white p-2 rounded-full '
                      onClick={() => handleBuyNowClick(data.inscription_id)}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Collections;
