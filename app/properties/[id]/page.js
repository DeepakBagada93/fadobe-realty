'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../../supabase';
import { useParams } from 'next/navigation'; // Get dynamic route params in a Client Component

export default function PropertyDetails() {
  const { id } = useParams(); // Fetch `id` from the route params
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('properties')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          throw new Error('Failed to fetch property details');
        }
        setProperty(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProperty();
    }
  }, [id]);

  if (loading) {
    return <p>Loading property details...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">{property.title}</h2>
      <p className="text-lg mb-4">{property.description}</p>
      <p className="text-sm text-gray-500 mb-4">
        Location: {property.location}
      </p>
      <p className="text-sm text-gray-500 mb-4">Price: {property.price}</p>
      {property.image_url && (
        <img
          src={property.image_url}
          alt={property.title}
          className="rounded shadow-lg"
        />
      )}
      <button
        onClick={() => window.history.back()}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Back to Listings
      </button>
    </div>
  );
}
