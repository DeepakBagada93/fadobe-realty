'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '../supabase';

export default function Home() {
  const [properties, setProperties] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');

  useEffect(() => {
    const fetchProperties = async () => {
      let query = supabase.from('properties').select('*');

      if (selectedLocation) {
        query = query.eq('location', selectedLocation);
      }

      if (selectedPrice) {
        query = query.lte('price', selectedPrice); // Assuming price is a number
      }

      const { data, error } = await query;

      if (error) {
        setError('Failed to load properties.');
      } else {
        setProperties(data);
      }
    };

    fetchProperties();
  }, [selectedLocation, selectedPrice]);

  const filteredProperties = properties.filter(property =>
    property.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">Available Properties</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded mr-2"
        />
        <select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          className="border p-2 rounded mr-2"
        >
          <option value="">Select Location</option>
          {/* Add your location options here */}
          <option value="Location1">Location1</option>
          <option value="Location2">Location2</option>
          <option value="Location3">Location3</option>
        </select>
        <input
          type="number"
          placeholder="Max Price"
          value={selectedPrice}
          onChange={(e) => setSelectedPrice(e.target.value)}
          className="border p-2 rounded"
        />
      </div>

      {filteredProperties.length === 0 ? (
        <p>No properties available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <Link
              key={property.id}
              href={`/properties/${property.id}`}
              className="border p-4 rounded hover:shadow-lg transition"
            >
              <h2 className="font-bold text-lg">{property.title}</h2>
              <p className="text-sm text-gray-500">
                Location: {property.location}
              </p>
              <p className="text-sm text-gray-500">Price: {property.price}</p>
              {property.image_url && (
                <img
                  src={property.image_url}
                  alt={property.title}
                  className="mt-2 rounded"
                />
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}