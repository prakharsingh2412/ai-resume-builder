import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/shared/Navbar";
import LoginForm from "./components/auth/LoginForm";
import RegisterForm from "./components/auth/RegisterForm";
import ResumeBuilder from "./components/resume/ResumeBuilder";
import ResumeList from "./components/resume/ResumeList";
import ResumeViewer from "./components/resume/ResumeViewer";
import ResumeUpload from "./components/resume/ResumeUpload";
import CoverLetterBuilder from "./components/coverLetter/CoverLetterBuilder";
import CoverLetterList from "./components/coverLetter/CoverLetterList";
import JobScraper from "./components/job/JobScraper";
import JobDetails from "./components/job/JobDetails";
import InterviewQuestions from "./components/interview/InterviewQuestions";
import ChatInterface from "./components/chatbot/ChatInterface";
import ProtectedRoute from "./components/shared/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/resumes" element={<ProtectedRoute component={ResumeList} />} />
        <Route path="/resume/new" element={<ProtectedRoute component={ResumeBuilder} />} />
        <Route path="/resume/:id" element={<ProtectedRoute component={ResumeViewer} />} />
        <Route path="/resume/upload" element={<ProtectedRoute component={ResumeUpload} />} />
        <Route path="/cover-letters" element={<ProtectedRoute component={CoverLetterList} />} />
        <Route path="/cover-letter/new" element={<ProtectedRoute component={CoverLetterBuilder} />} />
        <Route path="/jobs/scrape" element={<ProtectedRoute component={JobScraper} />} />
        <Route path="/jobs/:id" element={<ProtectedRoute component={JobDetails} />} />
        <Route path="/interview-questions" element={<ProtectedRoute component={InterviewQuestions} />} />
        <Route path="/chat" element={<ProtectedRoute component={ChatInterface} />} />
      </Routes>
    </Router>
  );
};

export default App;