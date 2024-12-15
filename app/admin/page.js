'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../../supabase';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    image_url: '',
  });
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/admin/login'); // Redirect if not logged in
      } else {
        setUser(session.user);
      }
    };
    checkSession();
  }, [router]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase.from('properties').insert([form]);

    if (error) {
      console.error('Error adding property:', error);
      alert('Failed to add property!');
    } else {
      alert('Property added successfully!');
      setForm({ title: '', description: '', price: '', location: '', image_url: '' });
    }
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add New Property</h2>
      {['title', 'description', 'price', 'location', 'image_url'].map((field) => (
        <div key={field} className="mb-4">
          <label className="block text-sm font-medium mb-1 capitalize">{field}</label>
          <input
            type="text"
            name={field}
            value={form[field]}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>
      ))}
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Add Property
      </button>
    </form>
  );
}
