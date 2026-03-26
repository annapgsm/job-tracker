import axios from 'axios';
import { useState, useEffect } from 'react';
import JobForm from './components/JobForm';
import JobList from './components/JobList';

function App() {
  const [companyName, setCompanyName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [status, setStatus] = useState('Applied');
  const [jobs, setJobs] = useState([]); //full list of job applications
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [editingJob, setEditingJob] = useState(null);
  
  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    setError(''); //clear any old error before a new request

    try {
      const response = await axios.get('http://localhost:5000/job-applications');
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setError('Failed to load jobs.')
    } finally { //runs whether sucess or failure happens
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const jobData = {
      companyName, 
      jobTitle,
      status
    };

    try {
      if (editingJob) {
        await axios.put(
          `http://localhost:5000/job-applications/${editingJob._id}`,
          jobData
        );
        setEditingJob(null);
      } else {
        //sends request to backendw
        await axios.post('http://localhost:5000/job-applications', jobData);
      }
      fetchJobs(); // refresh from DB
      //reset form 
      setCompanyName('');
      setJobTitle('');
      setStatus('Applied');
    } catch (error) {
      console.error('Error adding job:', error);
    };
  };

  const handleEdit = (job) => {
    setEditingJob(job);
    setCompanyName(job.companyName);
    setJobTitle(job.jobTitle);
    setStatus(job.status);
  }

  const handleCancelEdit = () => {
    setEditingJob(null);
    setCompany('');
    setPosition('');
    setStatus('Applied');
  };

  /* old delete- updated state only 
  const handleDelete = (indexToDelete) => {
    const updatedJobs = jobs.filter((job, index) => index !== indexToDelete); //keep every item, except the one whose index matches the clicked button. 
    setJobs(updatedJobs);
  }
  */

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/job-applications/${id}`);
      fetchJobs(); // refresh list
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  return (
    <div className="container">
      <h1>Job Tracker</h1>

      <JobForm 
        companyName={companyName}
        setCompanyName={setCompanyName}
        jobTitle={jobTitle}
        setJobTitle={setJobTitle}
        status={status}
        setStatus={setStatus}
        handleSubmit={handleSubmit}
        editingJob={editingJob}
        handleCancelEdit={handleCancelEdit}
      />
      <JobList 
        jobs={jobs} 
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        loading={loading}
        error={error}
      />
    </div>
  );
}

export default App;