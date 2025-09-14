import { useState } from 'react';
import { createResume } from '../../services/resume';
import type { ResumeInput } from '../../types/resume';  // ✅ type-only import
import './ResumeBuilder.css';

const ResumeBuilder = () => {
  const [data, setData] = useState<ResumeInput>({
    fullName: '',
    emailAddress: '',
    contactNumber: '',
    educationDetails: '',
    workExperience: '',
    skillSet: '',
  });

  const updateField = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const submitResume = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await createResume(data); // ✅ now accepts ResumeInput
      console.log('Generated Resume:', result);
    } catch (error) {
      console.error('Failed to generate resume:', error);
    }
  };

  return (
    <div className="resume-builder">
      <h2>Create Your Resume</h2>
      <form onSubmit={submitResume}>
        <input
          type="text"
          name="fullName"
          placeholder="Enter Your Full Name"
          value={data.fullName}
          onChange={updateField}
          required
        />
        <input
          type="email"
          name="emailAddress"
          placeholder="Enter Your Email"
          value={data.emailAddress}
          onChange={updateField}
          required
        />
        <input
          type="tel"
          name="contactNumber"
          placeholder="Enter Your Phone Number"
          value={data.contactNumber}
          onChange={updateField}
          required
        />
        <textarea
          name="educationDetails"
          placeholder="Your Education Background"
          value={data.educationDetails}
          onChange={updateField}
          required
        />
        <textarea
          name="workExperience"
          placeholder="Your Work Experience"
          value={data.workExperience}
          onChange={updateField}
          required
        />
        <textarea
          name="skillSet"
          placeholder="Your Skills"
          value={data.skillSet}
          onChange={updateField}
          required
        />
        <button type="submit">Generate Resume</button>
      </form>
    </div>
  );
};

export default ResumeBuilder;
