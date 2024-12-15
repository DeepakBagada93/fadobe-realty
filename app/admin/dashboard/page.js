'use client';
import { useState, useEffect } from 'react';
import { supabase, signOutAdmin } from '../../../supabase';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const [properties, setProperties] = useState([]);
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    image_url: '',
  });
  const router = useRouter();

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/admin/login');
      }
    };

    const fetchProperties = async () => {
      const { data, error } = await supabase.from('properties').select('*');
      if (!error) {
        setProperties(data);
      }
    };

    fetchSession();
    fetchProperties();
  }, [router]);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddProperty = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from('properties').insert([form]);
    if (error) {
      alert('Error adding property');
    } else {
      alert('Property added successfully!');
      setForm({
        title: '',
        description: '',
        price: '',
        location: '',
        image_url: '',
      });
      const { data } = await supabase.from('properties').select('*');
      setProperties(data);
    }
  };

  const handleLogout = async () => {
    await signOutAdmin();
    router.push('/admin/login');
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Admin Dashboard</h2>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white p-2 rounded"
        >
          Logout
        </button>
      </div>

      <form onSubmit={handleAddProperty} className="p-4 bg-gray-100 rounded mb-6">
        <h3 className="text-xl font-bold mb-4">Add New Property</h3>
        {['title', 'description', 'price', 'location', 'image_url'].map((field) => (
          <div key={field} className="mb-4">
            <label className="block text-sm font-medium mb-1 capitalize">{field}</label>
            <input
              type="text"
              name={field}
              value={form[field]}
              onChange={handleInputChange}
              className="w-full border rounded p-2"
              required
            />
          </div>
        ))}
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Add Property
        </button>
      </form>

      <h3 className="text-xl font-bold mb-4">Properties</h3>
      {properties.length === 0 ? (
        <p>No properties available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <div key={property.id} className="border p-4 rounded">
              <h4 className="font-bold">{property.title}</h4>
              <p>{property.description}</p>
              <p className="text-sm text-gray-500">Location: {property.location}</p>
              <p className="text-sm text-gray-500">Price: {property.price}</p>
              {property.image_url && (
                <img src={property.image_url} alt={property.title} className="mt-2 rounded" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
