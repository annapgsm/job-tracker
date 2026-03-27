import { useState, useEffect } from 'react';
import JobForm from './components/JobForm';
import JobList from './components/JobList';
import Modal from './components/modal';
import {
  getJobs,
  createJob,
  updateJob,
  deleteJob,
} from './api';

const initialFormData = {
  companyName: '',
  jobTitle: '',
  jobLink: '',
  jobDescription: '',
  salary: '',
  platform: '',
  location: '',
  notes: '',
  status: 'Saved',
};

function App() {

  const [formData, setFormData] = useState(initialFormData);
  const [jobs, setJobs] = useState([]); //full list of job applications
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [editingJob, setEditingJob] = useState(null);
  const [formError, setFormError] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

    if(!formData.companyName.trim() || !formData.jobTitle.trim()) {
      setFormError('Company and job title are required.');
      return;
    }

    const jobData = {
      companyName: formData.companyName.trim(), 
      jobTitle: formData.jobTitle.trim(),
      jobLink: formData.jobLink.trim(),
      jobDescription: formData.jobDescription.trim(),
      salary: formData.salary ? Number(formData.salary) : undefined,
      platform: formData.platform.trim(),
      location: formData.location.trim(),
      notes: formData.notes.trim(),
      status: formData.status,
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
      setFormData(initialFormData); //reset form 
      setIsModalOpen(false); //close Modal

    } catch (error) {
      console.error('Error adding job:', error);
      setFormError('Failed to save job.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (formError) {
      setFormError('');
    }
  };

  const handleEdit = (job) => {
    setEditingJob(job);
    setFormData({
      companyName: job.companyName || '',
      jobTitle: job.jobTitle || '',
      jobLink: job.jobLink || '',
      jobDescription: job.jobDescription || '',
      salary: job.salary || '',
      platform: job.platform || '',
      location: job.location || '',
      notes: job.notes || '',
      status: job.status || 'Saved',
    });
    setFormError('');
    setIsModalOpen(true);
  };

  const handleCancelEdit = () => {
    closeModal();
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

  const openAddModal = () => { //used when user clicks 'Add job'
    setEditingJob(null);
    setFormData(initialFormData);
    setFormError('');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingJob(null);
    setFormData(initialFormData);
    setFormError('');
  };

  return (
    <div className="container">
      <h1>Job Tracker</h1>

      <button type="button" onClick={openAddModal}>
        Add Job
      </button>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <JobForm 
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          editingJob={editingJob}
          handleCancelEdit={handleCancelEdit}
          formError={formError}
          setFormError={setFormError}
          isSaving={isSaving}
        />  
      </Modal>
      

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