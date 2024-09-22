import React, { useState, useRef } from 'react';
import axios from 'axios';
import { BeatLoader } from 'react-spinners';

function ATSApp() {
    const [jobDesc, setJobDesc] = useState('');
    const [resumes, setResumes] = useState([]);
    const [qualifiedCandidates, setQualifiedCandidates] = useState([]);
    const [loading, setLoading] = useState(false); // Loading state
    const fileInputRef = useRef(null); // Reference for hidden file input

    const handleUpload = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading

        const formData = new FormData();
        formData.append('jobDesc', jobDesc);

        for (let i = 0; i < resumes.length; i++) {
            formData.append('resumes', resumes[i]);
        }

        try {
            const response = await axios.post('/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setQualifiedCandidates(response.data.qualifiedCandidates);
        } catch (error) {
            console.error('Error uploading files', error);
        }
        setLoading(false); // Stop loading
    };

    const handleFileClick = () => {
        fileInputRef.current.click(); // Trigger the hidden file input
    };

    return (
        <div className='mt-[100px] min-h-screen w-full flex flex-col items-center px-4'>
            <h1 className='font-bold text-3xl mb-6 text-center'>ATS Score Calculator</h1>
            <form onSubmit={handleUpload} className='w-full sm:w-4/5 lg:w-3/5 flex flex-col'>
                <div className='flex flex-wrap gap-6 justify-between items-start'>
                    <div className='flex flex-col w-full justify-around items-center'>
                        <div className='w-full md:w-[60%] flex flex-col'>
                            <label className='text-lg mb-2'>Job Description (Text)</label>
                            <textarea 
                                className='text-black mt-1 rounded-xl w-full h-[200px] p-5 text-sm'
                                value={jobDesc}
                                onChange={(e) => setJobDesc(e.target.value)}
                                required
                            />
                        </div>

                        <div className='w-full md:w-[35%] flex flex-col justify-center items-center mt-10'>
                            <label className='text-lg mb-2'>Upload Resumes (Multiple Files)</label>
                            <div className='flex items-center space-x-2'>
                                {/* Hidden file input */}
                                <input
                                    type="file"
                                    multiple
                                    ref={fileInputRef}
                                    onChange={(e) => setResumes(e.target.files)}
                                    style={{ display: 'none' }} // Hide the file input
                                    required
                                />
                                {/* Custom button to trigger the file input */}
                                <button
                                    type="button"
                                    onClick={handleFileClick}
                                    className="w-14 h-14 bg-[#BB1CCC] text-white text-3xl rounded-full hover:scale-105 transition-transform duration-300 flex justify-center items-center"
                                >
                                    <span className='mb-[10px] scale-125'>+</span>
                                </button>
                                {/* Optional: Text to show when no file is chosen */}
                                <span>{resumes.length > 0 ? `${resumes.length} files chosen` : 'No file chosen'}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <button 
                    className='bg-[#BB1CCC] w-full sm:w-60 h-14 hover:scale-105 transition-transform duration-300 mt-10 mx-auto block' 
                    type="submit"
                >
                    Get relevant CVs
                </button>
            </form>

            {loading ? (
                <div className='mt-10'>
                    <BeatLoader color="#BB1CCC" loading={loading} size={15} />
                </div>
            ) : (
                qualifiedCandidates.length > 0 && (
                    <div className='mt-10 w-full sm:w-4/5 lg:w-3/5 login p-20 mb-10'>
                        <h2 className='font-semibold text-lg mb-2'>Qualified Candidates (Score {'>'} 60):</h2>
                        <ul className='list-disc bg-white text-black py-2 mb-10 rounded-sm'>
                            {qualifiedCandidates.map((candidate, index) => (
                                <li key={index}>{candidate.name} - Score: {candidate.score}</li>
                            ))}
                        </ul>
                    </div>
                )
            )}
        </div>
    );
}

export default ATSApp;
