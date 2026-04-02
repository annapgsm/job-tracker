import { FaEdit, FaTrash } from 'react-icons/fa';

function JobDetails({ job, onClose, onEdit, onDelete }) {
  if (!job) return null;

  const getLatestDate = (job) => job.dateUpdated || job.dateSaved;

  return (
    <div className="job-details">

      <div className="job-details-header">
        <p className="job-details-eyebrow">{job.status}</p>
        <br/>
        <h2>{job.companyName}</h2>
        <p><strong>Job Title:</strong> {job.jobTitle}</p>
      </div>  

      <div className="job-details-actions">
        <button type="button" aria-label="Edit job" onClick={() => onEdit(job)}>
          <FaEdit />
        </button>
        <button type="button" aria-label="Delete job" onClick={() => onDelete(job._id)}>
          <FaTrash />
        </button>
      </div> 

      <div className="job-details-content">
        {(job.location || job.platform) && (
          <div className="job-details-section">
            <h3>Overview</h3>
            {job.location && (
              <p>
                <span className="job-details-label">Location</span>
                <span>{job.location}</span>
              </p>
            )}
            {job.platform && (
              <p>
                <span className="job-details-label">Platform</span>
                <span>{job.platform}</span>
              </p>
            )}
            {job.salary && (
              <p>
                <span className="job-details-label">Salary</span>
                <span>{job.salary}</span>
              </p>
            )}
            {job.contact && (
              <p>
                <span className="job-details-label">Contact</span>
                <span>{job.contact}</span>
              </p>
            )}
          </div>
        )}

        {job.jobLink && (
          <div className="job-details-section">
            <h3>Job Link</h3>
            <a
              href={job.jobLink}
              target="_blank"
              rel="noreferrer"
              className="job-details-link"
            >
              Open job posting
            </a>
          </div>
        )}

        {job.jobDescription && (
          <div className="job-details-section">
            <h3>Description</h3>
            <p>{job.jobDescription}</p>
          </div>
        )}

        {job.notes && (
          <div className="job-details-section">
            <h3>Notes</h3>
            <p>{job.notes}</p>
          </div>
        )}

        <div className="job-details-section">
          <h3>Activity</h3>
          {job.dateSaved && (
            <p>
              <span className="job-details-label">Saved</span>
              <span>{new Date(job.dateSaved).toLocaleDateString()}</span>
            </p>
          )}
          {getLatestDate(job) && (
            <p>
              <span className="job-details-label">Last activity</span>
              <span>{new Date(getLatestDate(job)).toLocaleDateString()}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default JobDetails;