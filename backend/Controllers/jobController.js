// jobController.js
import Job from "../model/jobSchema.js";

const getJobDetails = async (jobData) => {
  if (!jobData || !jobData.jobUrl) {
    throw new Error("Valid job data is required");
  }

  const jobDoc = {
    title: jobData.title || "",
    company: jobData.company || "",
    location: jobData.location || "",
    description: jobData.description || "",
    jobUrl: jobData.jobUrl,
  };

  console.log("👉 Prepared jobDoc:", jobDoc);

  await Job.updateOne({ jobUrl: jobData.jobUrl }, { $set: jobDoc }, { upsert: true });

  return jobDoc;
};

export default getJobDetails;
