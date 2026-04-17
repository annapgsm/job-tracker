import { useState, useEffect } from 'react';
import JobForm from './components/JobForm';
import Dialog from './components/Dialog';
import KanbanBoard from './components/KanbanBoard';
import JobDetails from './components/JobDetails';
import JobTable from './components/JobTable';
import Archive from './components/Archive';

import {
  getJobs,
  createJob,
  updateJob,
  deleteJob,
  archiveJob,
  restoreJob,
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
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [editingJob, setEditingJob] = useState(null);
  const [formError, setFormError] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [view, setView] = useState('kanban');
  const [section, setSection] = useState('pipeline');
  const isDetailsModalOpen = selectedJob !== null;
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    setError('');

    try {
      const data = await getJobs();
      setJobs(data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setError('Failed to load jobs.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!formData.companyName.trim() || !formData.jobTitle.trim()) {
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
        await updateJob(editingJob._id, jobData);
        setEditingJob(null);
      } else {
        await createJob(jobData);
      }

      await fetchJobs();
      setFormData(initialFormData);
      setIsFormModalOpen(false);
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
      contact: job.contact || '',
      notes: job.notes || '',
      status: job.status || 'Saved',
    });
    setFormError('');
    setIsFormModalOpen(true);
  };

  const handleArchive = async (id) => {
    const confirmed = window.confirm('Move this job to archive?');

    if (!confirmed) return;

    try {
      await archiveJob(id);
      await fetchJobs();
    } catch (error) {
      console.error('Error archiving job:', error);
    }
  };

  const handlePermanentDelete = async (id) => {
    const confirmed = window.confirm('Permanently delete this job? This cannot be undone.');

    if (!confirmed) return;

    try {
      await deleteJob(id);
      await fetchJobs();
    } catch (error) {
      console.error('Error deleting job permanently:', error);
    }
  };

  const handleRestore = async (id) => {
    try {
      await restoreJob(id);
      await fetchJobs();
    } catch (error) {
      console.error('Error restoring job:', error);
    }
  };

  const openAddModal = () => {
    setEditingJob(null);
    setFormData(initialFormData);
    setFormError('');
    setIsFormModalOpen(true);
  };

  const closeFormModal = () => {
    setIsFormModalOpen(false);
    setEditingJob(null);
    setFormData(initialFormData);
    setFormError('');
  };

  const openDetailsModal = (job) => {
    setSelectedJob(job);
  };

  const closeDetailsModal = () => {
    setSelectedJob(null);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setStatusFilter('All');
  };
  const activeJobs = jobs.filter((job) => !job.archived);
  const archivedJobs = jobs.filter((job) => job.archived);

  const filteredJobs = activeJobs.filter((job) => {
    const matchesSearch =
      job.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'All' || job.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  async function handleMoveJob(jobId, newStatus) {
    const currentJob = jobs.find((job) => job._id === jobId);

    if (!currentJob) return;
    if (currentJob.status === newStatus) return;

    const previousJobs = jobs;
    const optimisticDate = new Date().toISOString();

    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job._id === jobId
          ? {
              ...job,
              status: newStatus,
              dateUpdated: optimisticDate,
            }
          : job
      )
    );

    try {
      setError('');
      const updatedJob = await updateJob(jobId, {
        ...currentJob,
        status: newStatus,
      });

      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job._id === jobId ? { ...job, ...updatedJob } : job
        )
      );
    } catch (error) {
      console.error('Failed to move job:', error);
      setJobs(previousJobs);
      setError('Could not update job status. Please try again.');
    }
  }

  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="app-logo">J</div>
          <div className="app-name">JobTrack</div>
        </div>

        <nav className="nav-section">
          <div className="nav-label">Workspace</div>

          <button
            type="button"
            className={`nav-item ${section === 'pipeline' ? 'active' : ''}`}
            onClick={() => setSection('pipeline')}
          >
            <span className="nav-icon" aria-hidden="true">💼</span>
            Job Pipeline
          </button>

          <button
            type="button"
            className={`nav-item ${section === 'archive' ? 'active' : ''}`}
            onClick={() => setSection('archive')}
          >
            <span className="nav-icon" aria-hidden="true">📥</span>
            Archived Jobs
          </button>
        </nav>
      </aside>

      <main className="main-content">
        <header className="header">
          <div className="header-left">
            <h1 className="page-title">
              {section === 'pipeline' ? 'Job Pipeline' : 'Archive'}
            </h1>

            {section === 'pipeline' && (
              <div className="view-toggle">
                <button
                  type="button"
                  onClick={() => setView('kanban')}
                  className={view === 'kanban' ? 'active' : ''}
                >
                  Board
                </button>
                <button
                  type="button"
                  onClick={() => setView('table')}
                  className={view === 'table' ? 'active' : ''}
                >
                  List
                </button>
              </div>
            )}
          </div>

          {section === 'pipeline' && (
            <div className="header-controls">
              <div className="search-wrapper">
                <span className="search-icon" aria-hidden="true">🔍</span>
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search companies or titles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <select
                className="filter-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Jobs</option>
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>

              <button
                type="button"
                className="btn-secondary"
                onClick={handleClearFilters}
                disabled={searchTerm === '' && statusFilter === 'All'}
              >
                Clear
              </button>

              <button
                type="button"
                className="btn-primary"
                onClick={openAddModal}
              >
                <span aria-hidden="true">+</span>
                Add Job
              </button>
            </div>
          )}
        </header>

        <div className="content">
          {error && <p className="feedback-message error-message">{error}</p>}
          {loading && <p className="feedback-message">Loading jobs...</p>}

          {!loading && section === 'archive' && (
            <Archive
              jobs={archivedJobs}
              onRestore={handleRestore}
              onDelete={handlePermanentDelete}
              openDetailsModal={openDetailsModal}
            />
          )}

          {!loading && section === 'pipeline' && (
            <>
              {view === 'kanban' ? (
                <KanbanBoard
                  jobs={filteredJobs}
                  statuses={statuses}
                  handleEdit={handleEdit}
                  handleDelete={handleArchive}
                  openDetailsModal={openDetailsModal}
                  onMoveJob={handleMoveJob}
                />
              ) : (
                <JobTable
                  jobs={filteredJobs}
                  allJobs={jobs}
                  handleEdit={handleEdit}
                  handleDelete={handleArchive}
                  openDetailsModal={openDetailsModal}
                />
              )}
            </>
          )}
        </div>

        <Dialog isOpen={isFormModalOpen} onClose={closeFormModal}>
          <JobForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            editingJob={editingJob}
            formError={formError}
            setFormError={setFormError}
            isSaving={isSaving}
          />
        </Dialog>

        <Dialog isOpen={isDetailsModalOpen} onClose={closeDetailsModal}>
          <JobDetails
            job={selectedJob}
            onClose={closeDetailsModal}
            onEdit={(job) => {
              closeDetailsModal();
              handleEdit(job);
            }}
            onDelete={(id) => {
              closeDetailsModal();

              if (section === 'archive') {
                handlePermanentDelete(id);
              } else {
                handleArchive(id);
              }
            }}
          />
        </Dialog>
      </main>
    </div>
  );
}

export default App;