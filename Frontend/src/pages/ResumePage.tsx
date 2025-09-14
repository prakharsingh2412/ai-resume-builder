import React, { useState } from 'react';
import AtsPanel from '../features/ATSPanel';

const Resume = () => {
  const [jobDescription, setJobDescription] = useState('');
  const [resumeContent, setResumeContent] = useState('');

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-white mb-8">Resume Analysis</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">Job Description</h3>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="w-full h-64 p-4 bg-gray-700 text-white rounded-lg 
                focus:ring-2 focus:ring-blue-500 border-none resize-none"
              placeholder="Paste job description here..."
            />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">Resume Content</h3>
            <textarea
              value={resumeContent}
              onChange={(e) => setResumeContent(e.target.value)}
              className="w-full h-64 p-4 bg-gray-700 text-white rounded-lg 
                focus:ring-2 focus:ring-blue-500 border-none resize-none"
              placeholder="Paste your resume content here..."
            />
          </div>
        </div>

        <AtsPanel 
          jobDescription={jobDescription}
          resumeContent={resumeContent}
        />
      </div>
    </div>
  );
};

export default Resume;