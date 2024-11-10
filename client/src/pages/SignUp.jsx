import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function SignUp() {
  // Initialize the form data state with empty fields
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState(null); // Track errors
  const [loading, setLoading] = useState(false); // Track loading state

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value, // Dynamically update state based on input ID
    });
  };

  console.log(formData); // Check the form data state in the console

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    setLoading(true); // Set loading state
    setError(null); // Reset previous error

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Send form data as JSON
      });

      if (!res.ok) {
        const errorText = await res.text(); // Retrieve raw error message
        throw new Error(errorText || 'Signup failed!');
      }

      const data = await res.json(); // Parse the response as JSON
      console.log(data); // Log the response data

      navigate('/sign-in');
      
    } catch (error) {
      console.error('Error:', error.message);
      setError(error.message); // Display error message to the user
    } finally {
      setLoading(false); // Stop loading state
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          className="border p-3 rounded-lg"
          id="username"
          onChange={handleChange}
          value={formData.username} // Bind input value to state
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-3 rounded-lg"
          id="email"
          onChange={handleChange}
          value={formData.email} // Bind input value to state
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleChange}
          value={formData.password} // Bind input value to state
        />
        <button
          disabled={loading}
          className="bg-gray-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>} {/* Display error */}
      <div className="flex gap-2 mt-5">
        <p>Have an Account?</p>
        <Link to="/sign-in">
          <span className="text-blue-500">Sign in</span>
        </Link>
      </div> 
    </div>
  );
}
