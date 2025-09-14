export interface Resume {
  id: string;
  userId: string;
  fullName: string;
  emailAddress: string;
  contactNumber: string;
  jobTitle: string;
  educationDetails: string;
  workExperience: string;
  skills: string[];
  createdAt: string;
  updatedAt: string;
}

// This is what the form sends
export interface ResumeInput {
  fullName: string;
  emailAddress: string;
  contactNumber: string;
  educationDetails: string;
  workExperience: string;
  skillSet: string; // <-- single string (textarea input)
}
