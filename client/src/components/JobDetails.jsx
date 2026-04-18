import { FaEdit, FaTrash } from 'react-icons/fa';

function JobDetails({ job, onClose, onEdit, onDelete }) {
  if (!job) return null;

  const getLatestDate = (job) => job.dateUpdated || job.dateSaved;

  return (
    <div className="job-details">
      <div className="job-details-header">
        <span className={`status-badge status-${job.status.toLowerCase()}`}>
          {job.status}
        </span>

        <h2>{job.companyName}</h2>
        <p className="job-details-role">{job.jobTitle}</p>
      </div>

      <div className="job-details-actions">
        <button
          type="button"
          aria-label="Edit job"
          onClick={() => onEdit(job)}
        >
          <FaEdit />
        </button>

        <button
          type="button"
          aria-label="Delete job"
          onClick={() => onDelete(job._id)}
        >
          <FaTrash />
        </button>
      </div>

      <div className="job-details-content">
        {(job.location || job.platform || job.salary || job.contact) && (
          <div className="job-details-section">
            <h3>Overview</h3>

            <p>
              <span className="job-details-label">Location</span>
              <span>{job.location?.trim() || '-'}</span>
            </p>

            <p>
              <span className="job-details-label">Platform</span>
              <span>{job.platform?.trim() || '-'}</span>
            </p>

            <p>
              <span className="job-details-label">Salary</span>
              <span>{job.salary ?? '-'}</span>
            </p>

            <p>
              <span className="job-details-label">Contact</span>
              <span>{job.contact?.trim() || '-'}</span>
            </p>
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
            <p className="job-details-text">{job.jobDescription}</p>
          </div>
        )}

        {job.notes && (
          <div className="job-details-section">
            <h3>Notes</h3>
            <p className="job-details-text">{job.notes}</p>
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