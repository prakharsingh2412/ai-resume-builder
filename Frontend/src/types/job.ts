export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  url: string;
  createdAt: Date;
}

export interface JobScrapeResponse {
  jobData: Job;
  message: string;
}
