import { FaEdit, FaTrash } from 'react-icons/fa';

function JobTable({ jobs, allJobs, handleEdit, handleDelete, openDetailsModal }) {
  const getLatestDate = (job) => job.dateUpdated || job.dateSaved;

  const sortedJobs = [...jobs].sort((a, b) => {
    const latestA = getLatestDate(a);
    const latestB = getLatestDate(b);

    const timeA = latestA ? new Date(latestA).getTime() : 0;
    const timeB = latestB ? new Date(latestB).getTime() : 0;

    return timeB - timeA;
  });

  return (
    <div className="table-wrapper">
      <table className="job-table">
        <thead>
          <tr>
            <th>Company</th>
            <th>Position</th>
            <th>Location</th>
            <th>Status</th>
            <th>Last Activity</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {sortedJobs.length === 0 ? (
            <tr>
              <td colSpan="6" className="job-table-empty">
                {allJobs.length === 0
                  ? 'No jobs saved yet. Add your first one!'
                  : 'No results match your filters.'}
              </td>
            </tr>
          ) : (
            sortedJobs.map((job) => (
              <tr
                key={job._id}
                onClick={() => openDetailsModal(job)}
                className="table-row-clickable"
              >
                <td className="table-company-cell">
                  <div className="table-company-name">{job.companyName}</div>
                </td>

                <td className="table-position-cell">
                  <div className="table-job-title">{job.jobTitle}</div>
                </td>

                <td>{job.location || '-'}</td>

                <td>
                  <span className={`status-badge status-${job.status.toLowerCase()}`}>
                    {job.status}
                  </span>
                </td>

                <td>
                  {getLatestDate(job)
                    ? new Date(getLatestDate(job)).toLocaleDateString()
                    : '-'}
                </td>

                <td>
                  <div className="table-actions">
                    <button
                      type="button"
                      aria-label="Edit job"
                      className="table-icon-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(job);
                      }}
                    >
                      <FaEdit />
                    </button>

                    <button
                      type="button"
                      aria-label="Delete job"
                      className="table-icon-button danger"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(job._id);
                      }}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default JobTable;