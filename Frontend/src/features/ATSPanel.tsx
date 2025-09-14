import React, { useState } from 'react';
import AtsScanner from './ATSScanner';
import { scoreResume } from '../service/resumeApi';

interface AtsPanelProps {
  jobDescription: string;
  resumeContent: string;
}

const AtsPanel: React.FC<AtsPanelProps> = ({ jobDescription, resumeContent }) => {
  const [scanResult, setScanResult] = useState<{ score: number; feedback?: string }>({ 
    score: 0, 
    feedback: '' 
  });
  const [isScanning, setIsScanning] = useState(false);

  const handleAnalyzeResume = async () => {
    if (!jobDescription || !resumeContent) {
      alert('Please provide both job description and resume content');
      return;
    }

    setIsScanning(true);
    try {
      const result = await scoreResume(resumeContent, jobDescription);
      setScanResult({
        score: result.score,
        feedback: result.feedback
      });
    } catch (error) {
      console.error('ATS Analysis failed:', error);
      setScanResult({
        score: 0,
        feedback: 'Analysis failed. Please try again.'
      });
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-2xl">
      <h2 className="text-2xl font-bold text-white mb-4">ATS Analysis</h2>
      
      <button 
        onClick={handleAnalyzeResume}
        disabled={isScanning}
        className={`w-full py-2 px-4 rounded-md font-semibold mb-6 
          ${isScanning 
            ? 'bg-blue-400 cursor-not-allowed' 
            : 'bg-blue-600 hover:bg-blue-700'} 
          text-white transition-colors duration-200`}
      >
        {isScanning ? 'Analyzing...' : 'Analyze Resume'}
      </button>

      {scanResult.score > 0 && (
        <AtsScanner scanResult={scanResult} />
      )}
      
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-white mb-2">Job Description</h3>
        <div className="bg-gray-700 p-4 rounded">
          <p className="text-gray-300 whitespace-pre-wrap">{jobDescription}</p>
        </div>
      </div>
    </div>
  );
};

export default AtsPanel;