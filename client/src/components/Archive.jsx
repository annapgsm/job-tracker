import { FaTrash, FaUndo } from 'react-icons/fa';

function Archive({ jobs, onRestore, onDelete, openDetailsModal }) {
  const getLatestDate = (job) => job.dateUpdated || job.dateSaved;

  const sortedJobs = [...jobs].sort((a, b) => {
    const latestA = getLatestDate(a);
    const latestB = getLatestDate(b);

    const timeA = latestA ? new Date(latestA).getTime() : 0;
    const timeB = latestB ? new Date(latestB).getTime() : 0;

    return timeB - timeA;
  });

  if (sortedJobs.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📥</div>
        <div className="empty-title">Archive is empty</div>
        <div className="empty-text">
          Archived jobs will appear here.
        </div>
      </div>
    );
  }

  return (
    <div className="table-wrapper">
      <table className="job-table">
        <thead>
          <tr>
            <th>Company</th>
            <th>Position</th>
            <th>Location</th>
            <th>Status</th>
            <th>Last Updated</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {sortedJobs.map((job) => (
            <tr
              key={job._id}
              className="table-row-clickable"
              onClick={() => openDetailsModal(job)}
            >
              <td>
                <div className="table-company-name">{job.companyName}</div>
              </td>

              <td>
                <div className="table-job-title">{job.jobTitle}</div>
                {job.platform && (
                  <div className="table-job-subtext">{job.platform}</div>
                )}
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
                    aria-label="Restore job"
                    className="table-icon-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRestore(job._id);
                    }}
                  >
                    <FaUndo />
                  </button>

                  <button
                    type="button"
                    aria-label="Delete permanently"
                    className="table-icon-button danger"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(job._id);
                    }}
                  >
                    <FaTrash />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Archive;