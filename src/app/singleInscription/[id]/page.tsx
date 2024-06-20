
// "use client"
// import axios from 'axios';
// import { useRouter } from 'next/router';
// import { useEffect, useState } from 'react';

// const SelectedInscription = () => {
//   const router = useRouter();
//   const { id } = router.query;
//   const [inscriptionDetails, setInscriptionDetails] = useState<any | null>(null);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchInscriptionDetails = async () => {
//       try {
//         const response = await axios.get(`https://turbo.ordinalswallet.com/inscription/${id}`);
//         setInscriptionDetails(response.data);
//       } catch (error) {
//         console.error('Error fetching inscription details:', error);
//         setError('Failed to fetch inscription details.');
//       }
//     };

//     if (id) {
//       fetchInscriptionDetails();
//     }
//   }, [id]);

//   if (!inscriptionDetails) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p>Error: {error}</p>;
//   }

//   return (
//     <div>
//       {/* Display inscription details */}
//       <h1>Inscription Details</h1>
//       <p>ID: {inscriptionDetails.id}</p>
//       <p>Satoshi Price: {inscriptionDetails.satoshi_price}</p>
//       <p>Created: {inscriptionDetails.created}</p>
//       {/* Add more details as needed */}
//     </div>
//   );
// };

// export default SelectedInscription;
