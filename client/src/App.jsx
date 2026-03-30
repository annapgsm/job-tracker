import { useState, useEffect } from 'react';
import JobForm from './components/JobForm';
import Dialog from './components/Dialog';
import KanbanBoard from './components/KanbanBoard';
import JobDetails from './components/JobDetails';
import JobTable from './components/JobTable';

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
  contact: '',
  notes: '',
  status: 'Saved',
};


function App() {
  const statuses = ['Saved', 'Applied', 'Interview', 'Offer', 'Rejected'];

  const [formData, setFormData] = useState(initialFormData);
  const [jobs, setJobs] = useState([]); //full list of job applications
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [editingJob, setEditingJob] = useState(null); //which job is being edited
  const [formError, setFormError] = useState(''); //validation/ submit error in JobForm
  const [isSaving, setIsSaving] = useState(false); //disable form while saving
  const [isFormModalOpen, setIsFormModalOpen] = useState(false); //-> controls JobForm
  const [selectedJob, setSelectedJob] = useState(null); //-> controls JobDetails
  const [view, setView] = useState('kanban');
  const isDetailsModalOpen = selectedJob !== null;
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');


  useEffect(() => {
    fetchJobs();
  }, []); // runs once when app first loads 


  const fetchJobs = async () => {
    setLoading(true);
    setError(''); //clear any old error before a new request

    try {
      const data = await getJobs(); //calls the backend
      console.log(data);
      setJobs(data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setError('Failed to load jobs.')
    } finally { //runs whether sucess or failure happens
      setLoading(false);
    }
  };

  //Main form submit logic, passed to JobForm 
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
      contact: formData.contact.trim(),
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

      await fetchJobs(); // refresh from DB
      setFormData(initialFormData); //reset form 
      setIsFormModalOpen(false); //close Modal

    } catch (error) {
      console.error('Error adding job:', error);
      setFormError('Failed to save job.');
    } finally {
      setIsSaving(false);
    }
  };

  //Update the correct field inside formData, passed to JobForm
  const handleChange = (e) => {
    const { name, value } = e.target; //input must have name="..."

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (formError) {
      setFormError('');
    }
  };

  //Prepares Form Modal to edit existing job, passed to KanbanBoard and JobTable
  const handleEdit = (job) => {
    setEditingJob(job); //stores job in editingJob
    setFormData({       //fills formData with that job's values
      companyName: job.companyName || '',
      jobTitle: job.jobTitle || '',
      jobLink: job.jobLink || '',
      jobDescription: job.jobDescription || '',
      salary: job.salary || '',
      platform: job.platform || '',
      location: job.location || '',
      contact: job.contact || '',
      notes: job.notes || '',
      status: job.status || 'Saved',
    });
    setFormError('');
    setIsFormModalOpen(true);
  };

  /* old delete- updated state only 
  const handleDelete = (indexToDelete) => {
    const updatedJobs = jobs.filter((job, index) => index !== indexToDelete); //keep every item, except the one whose index matches the clicked button. 
    setJobs(updatedJobs);
  }

  <JobList 
        jobs={jobs} 
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        loading={loading}
        error={error}
      />

  */

  //Delets job by id, then refreshed the joblist
  const handleDelete = async (id) => {
    try {
      await deleteJob(id);
      await fetchJobs(); // refresh list
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  //Prepared form modal for creating a new job
  const openAddModal = () => { //used when user clicks 'Add job'
    setEditingJob(null);
    setFormData(initialFormData);
    setFormError('');
    setIsFormModalOpen(true); //opens the form modal, used in Add-Job button
  };

  //Closes form modal and resets all form/edit state, passed to Modal and JobForm
  const closeFormModal = () => {
    setIsFormModalOpen(false);
    setEditingJob(null);
    setFormData(initialFormData);
    setFormError('');
  };

  //Stores a clicked Job in selectedJob state, passed to KanbanBoard and JobTable
  const openDetailsModal = (job) => {
    setSelectedJob(job);
  };

  //Closes details modal
  const closeDetailsModal = () => {
    setSelectedJob(null);
  };


  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'All' || job.status === statusFilter;

    return matchesSearch && matchesStatus; //only show job if it matches search and status filter
  });

  return (
    <div className="container">
      <h1>Job Tracker</h1>

      <div className="top-bar">
        <button type="button" onClick={openAddModal}>
          Add Job
        </button>

        <div className="filters">
          <input
            type="text"
            placeholder="Search company or title"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Statuses</option>
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div className="view-toggle">
          <button type="button" onClick={() => setView('kanban')}>
            Board
          </button>
          <button type="button" onClick={() => setView('table')}>
            List
          </button>
        </div>
      </div>


      {/* FORM */}
      <Dialog isOpen={isFormModalOpen} onClose={closeFormModal}>
        <JobForm 
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          editingJob={editingJob}
          closeFormModal={closeFormModal}
          formError={formError}
          setFormError={setFormError}
          isSaving={isSaving}
        />  
      </Dialog>

      {/* DETAILS */}
      <Dialog
        isOpen={isDetailsModalOpen} 
        onClose={closeDetailsModal}
      >
        <JobDetails
          job={selectedJob}
          onClose={closeDetailsModal}
        />
      </Dialog>
      
      {view === 'kanban' ? (
        <KanbanBoard
          jobs={filteredJobs}
          statuses={statuses}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          openDetailsModal={openDetailsModal}
        />
      ) : (
        <JobTable
          jobs={filteredJobs}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          openDetailsModal={openDetailsModal}
        />
      )}
      
    </div>
  );
}

export default App;