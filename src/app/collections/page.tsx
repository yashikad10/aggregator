"use client"
import { useEffect, useState } from 'react';
import Link from 'next/link';
import AppsIcon from '@mui/icons-material/Apps';
import ViewListIcon from '@mui/icons-material/ViewList';
import { getCollections } from '@/apiHelper/getCollections';
import { useRouter } from 'next/navigation';
import { fetchBitcoinPrice } from '@/utils/fetchBitcoinPrice';

export default function Collections() {
  const [data, setData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewType, setViewType] = useState<'row' | 'grid'>('row');
  const [bitcoinPrice, setBitcoinPrice] = useState<number | null>(null);
const router = useRouter()
useEffect(() => {
  const fetchData = async () => {
    try {
      const collections = await getCollections();
      setData(collections);
      setFilteredData(collections);
    } catch (err: any) {
      console.error('Error fetching data:', err);
      setError('Error fetching data');
    }
  };

  const fetchAndSetBitcoinPrice = async () => {
    const price = await fetchBitcoinPrice();
    setBitcoinPrice(price);
  };

  fetchData();
  fetchAndSetBitcoinPrice();
}, []);

const convertFloorPriceToUSD = (satoshiPrice: number) => {
  if (!bitcoinPrice) return 'Loading...';
  const bitcoinPriceInSatoshi = bitcoinPrice * 1e8; // 1 Bitcoin = 100,000,000 Satoshis
  const priceInUSD = (satoshiPrice / bitcoinPriceInSatoshi) * bitcoinPrice;
  return `$${priceInUSD.toFixed(2)}`;
};

  const toggleView = () => {
    setViewType(viewType === 'row' ? 'grid' : 'row');
  };

  const handleSlug = (id:string)=> {
  router.push(`/singleCollection/${id}`)
  }

  return (
    <div className='text-white w-full p-6'>
  <div className='flex justify-between items-center mb-6'>
    <div className='flex items-center'>
      <h1 className='text-lg font-bold text-white font-cursive'>All Collections</h1>
      <button
        onClick={toggleView}
        className='ml-4 p-2 rounded bg-gray-700 text-white'>
        {viewType === 'row' ? <AppsIcon /> : <ViewListIcon />}
      </button>
    </div>
    <input
      type='text'
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder='Search by name or slug'
      className='p-2 rounded bg-gray-700 text-white placeholder-gray-400'
    />
  </div>
  {error ? (
    <p className='text-red-500'>{error}</p>
  ) : viewType === 'row' ? (
    <div className=''>
  <table className='w-full table-auto'>
    <thead className='bg-gradient-to-r from-[#212474] to-[#2f35e6] sticky top-0 z-10'>
      <tr>
        <th className='p-4 text-left text-gray-400'>Name</th>
        <th className='p-4 text-right text-gray-400'>Slug</th>
        <th className='p-4 text-right text-gray-400'>Floor Price </th>
        <th className='p-4 text-right text-gray-400'>Volume Week</th>
        <th className='p-4 text-right text-gray-400'>Volume Month</th>
        <th className='p-4 text-right text-gray-400'>Volume All Time</th>
      </tr>
    </thead>
    <tbody>
    {/* href={`/singleCollection/${item.slug}`}  */}
      {filteredData.length > 0 ? (
        filteredData.map((item, index) => (
          <tr key={index} className='border-b border-[#283277] hover:bg-[#0d103b] transition duration-200 cursor-pointer ' onClick={() => handleSlug(item.slug)}>
            <td className='p-4 flex items-center text-left'>
              {item.icon || item.banner_icon ? (
                <img
                  src={item.icon || item.banner_icon}
                  alt={item.name}
                  className='w-12 h-12 object-cover rounded-md mr-4'
                />
              ) : (
                <div className='w-12 h-12 flex items-center justify-center text-white mr-4'>N/A</div>
              )}
              
            </td>
            <td className='p-4 text-right'>{item.slug}</td>
            <td className='p-4 text-right'>{convertFloorPriceToUSD(item.floor_price)}</td>
            <td className='p-4 text-right'>{item.volume_week}</td>
            <td className='p-4 text-right'>{item.volume_month}</td>
            <td className='p-4 text-right'>{item.volume_all_time}</td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={6} className='p-4 text-center text-gray-400'>Loading...</td>
        </tr>
      )}
    </tbody>
  </table>
</div>

  ) : (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6'>
      {filteredData.length > 0 ? (
        filteredData.map((item, index) => (
          <Link key={index} href={`/singleCollection/${item.slug}`}>
            <div className='bg-gray-800 p-4 rounded-lg hover:bg-[#25303d] transition duration-200 cursor-pointer'>
              {item.icon || item.banner_icon ? (
                <img
                  src={item.icon || item.banner_icon}
                  alt={item.name}
                  className='w-full h-32 object-cover rounded-md mb-4'
                />
              ) : (
                <div className='w-full h-32 flex items-center justify-center text-white mb-4'>N/A</div>
              )}
              <h2 className='text-lg font-bold mb-2'>{item.name}</h2>
              <p className='text-gray-400 mb-1'>Slug: {item.slug}</p>
              <p className='text-gray-400 mb-1'>Floor Price: {convertFloorPriceToUSD(item.floor_price)}</p>
              <p className='text-gray-400 mb-1'>Volume Week: {item.volume_week}</p>
              <p className='text-gray-400 mb-1'>Volume Month: {item.volume_month}</p>
              <p className='text-gray-400'>Volume All Time: {item.volume_all_time}</p>
            </div>
          </Link>
        ))
      ) : (
        <p className='text-center text-gray-400'>Loading...</p>
      )}
    </div>
  )}
</div>


  );
}


