import { useState, useEffect } from 'react';
import JobForm from './components/JobForm';
import JobList from './components/JobList';
import {
  getJobs,
  createJob,
  updateJob,
  deleteJob,
} from './api';

function App() {
  const [companyName, setCompanyName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [status, setStatus] = useState('Applied');
  const [jobs, setJobs] = useState([]); //full list of job applications
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [editingJob, setEditingJob] = useState(null);
  const [formError, setFormError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {

    setLoading(true);
    setError(''); //clear any old error before a new request

    try {
      const data = await getJobs();
      setJobs(data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setError('Failed to load jobs.')
    } finally { //runs whether sucess or failure happens
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if(!companyName.trim() || !jobTitle.trim()) {
      setFormError('Company and job title are required.');
      return;
    }

    const jobData = {
      companyName: companyName.trim(), 
      jobTitle: jobTitle.trim(),
      status,
    };

    setIsSaving(true);

    try {
      if (editingJob) {
        await updateJob(editingJob._id,jobData);
        setEditingJob(null);
      } else {
        //sends request to backendw
        await createJob(jobData);
      }

      fetchJobs(); // refresh from DB
      //reset form 
      setCompanyName('');
      setJobTitle('');
      setStatus('Applied');
    } catch (error) {
      console.error('Error adding job:', error);
      setFormError('Failed to save job.');
    } finally {
      setIsSaving(false);
    }
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
      await deleteJob(id);
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
        formError={formError}
        setFormError={setFormError}
        isSaving={isSaving}
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