import React, { useState } from 'react';
import axios from 'axios';
import { BeatLoader } from 'react-spinners';

function JdCreator() {
    const [designation, setDesignation] = useState('');
    const [experience, setExperience] = useState('');
    const [techstack, setTechstack] = useState('');
    const [preferredLocation, setPreferredLocation] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('http://127.0.0.1:3001/api/generate-job-description', {
                designation,
                experience,
                techstack,
                preferred_location: preferredLocation,
            });
            setJobDescription(response.data.jobDescription);
            setError('');
        } catch (err) {
            setError('Error generating job description');
            console.error(err);
        }
        setLoading(false);
    };

    return (
        <div className='mt-[100px] min-h-screen flex flex-col items-center px-4'>
            <h1 className='font-bold text-3xl mb-6 text-center'>Job Description Generator</h1>
            <form onSubmit={handleSubmit} className='w-full sm:w-4/5 lg:w-3/5 flex flex-col space-y-6'>
                
                <div className='flex flex-wrap gap-6 justify-between'>
                    <div className='text-white text-lg flex-1 min-w-[250px]'>
                        <label className='block mb-2'>Designation:</label>
                        <input 
                            className='text-black text-sm p-2 w-full' 
                            type="text"
                            value={designation}
                            onChange={(e) => setDesignation(e.target.value)}
                            required
                        />
                    </div>

                    <div className='text-white text-lg flex-1 min-w-[250px]'>
                        <label className='block mb-2'>Experience (Years):</label>
                        <input 
                            className='text-black text-sm p-2 w-full'
                            type="text"
                            value={experience}
                            onChange={(e) => setExperience(e.target.value)}
                            required
                        />
                    </div>

                    <div className='text-white text-lg flex-1 min-w-[250px]'>
                        <label className='block mb-2'>Tech Stack:</label>
                        <input 
                            className='text-black text-sm p-2 w-full'
                            type="text"
                            value={techstack}
                            onChange={(e) => setTechstack(e.target.value)}
                            required
                        />
                    </div>

                    <div className='text-white text-lg flex-1 min-w-[250px]'>
                        <label className='block mb-2'>Preferred Location:</label>
                        <input 
                            className='text-black text-sm p-2 w-full'
                            type="text"
                            value={preferredLocation}
                            onChange={(e) => setPreferredLocation(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <button className='text-white text-lg bg-[#BB1CCC] px-5 py-2 rounded hover:bg-[#7d1189] w-full sm:w-auto mx-auto' type="submit">
                    Generate Job Description
                </button>
            </form>

            {loading ? (
                <div className='mt-10'>
                    <BeatLoader color="#BB1CCC" loading={loading} size={15} />
                </div>
            ) : jobDescription && (
                <div className='mt-10 w-full flex flex-col items-center text-black mb-10'>
                    <h2 className='mb-2 font-semibold text-white'>Generated Job Description:</h2>
                    <p className='text-sm w-full sm:w-3/4 lg:w-2/3 bg-gray-100 p-4 rounded'>{jobDescription}</p>
                </div>
            )}

            {error && <p className='text-red-500 mt-4'>{error}</p>}
        </div>
    );
}

export default JdCreator;
