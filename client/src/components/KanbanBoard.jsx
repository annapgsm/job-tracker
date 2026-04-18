import { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

function KanbanBoard({
  jobs,
  handleEdit,
  handleDelete,
  openDetailsModal,
  statuses,
  onMoveJob,
}) {
  const [draggedJobId, setDraggedJobId] = useState(null);
  const [dragOverStatus, setDragOverStatus] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const getLatestDate = (job) => job.dateUpdated || job.dateSaved;

  const sortedJobs = [...jobs].sort((a, b) => {
    const timeA = getLatestDate(a)
      ? new Date(getLatestDate(a)).getTime()
      : 0;

    const timeB = getLatestDate(b)
      ? new Date(getLatestDate(b)).getTime()
      : 0;

    return timeB - timeA;
  });

  function handleDragStart(e, jobId) {
    e.dataTransfer.setData('jobId', jobId);
    setDraggedJobId(jobId);
    setIsDragging(true);
  }

  function handleDragEnd() {
    setDraggedJobId(null);
    setDragOverStatus(null);
    setTimeout(() => {
      setIsDragging(false);
    }, 0);
  }

  function handleDragOver(e, status) {
    e.preventDefault();
    if (dragOverStatus !== status) {
      setDragOverStatus(status);
    }
  }

  function handleDragLeave(e) {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setDragOverStatus(null);
    }
  }

  function handleDrop(e, newStatus) {
    e.preventDefault();
    const jobId = e.dataTransfer.getData('jobId');

    setDraggedJobId(null);
    setDragOverStatus(null);

    onMoveJob(jobId, newStatus);
  }

  function getStatusClass(status) {
    return status.toLowerCase();
  }

  function formatLatestActivity(job) {
    const latestDate = getLatestDate(job);

    if (!latestDate) return '-';

    return new Date(latestDate).toLocaleDateString();
  }

  function renderEmptyState(status) {
    const emptyMessages = {
      Saved: {
        icon: '📌',
        title: 'No saved jobs',
        text: 'Add jobs you want to revisit later.',
      },
      Applied: {
        icon: '✉️',
        title: 'No applications yet',
        text: 'Move jobs here once you apply.',
      },
      Interview: {
        icon: '🎯',
        title: 'No interviews yet',
        text: 'You are getting there.',
      },
      Offer: {
        icon: '🎉',
        title: 'No offers yet',
        text: 'Keep pushing forward.',
      },
      Rejected: {
        icon: '💪',
        title: 'Nothing here',
        text: 'Every no brings you closer.',
      },
    };

    const current = emptyMessages[status] || {
      icon: '📂',
      title: `No jobs in ${status}`,
      text: 'This column is empty right now.',
    };

    return (
      <div className="empty-state empty-state--column">
        <div className="empty-icon">{current.icon}</div>
        <div className="empty-title">{current.title}</div>
        <div className="empty-text">{current.text}</div>
      </div>
    );
  }

  return (
    <div className="kanban-board">
      {statuses.map((status) => {
        const columnJobs = sortedJobs.filter((job) => job.status === status);

        return (
          <section key={status} className="kanban-column">
            <div className="column-header">
              <div className="column-title">
                <span
                  className={`status-dot ${getStatusClass(status)}`}
                  aria-hidden="true"
                />
                <span className="column-name">{status}</span>
              </div>
              <span className="column-count">{columnJobs.length}</span>
            </div>

            <div
              className={`cards-container ${
                dragOverStatus === status ? 'cards-container--active' : ''
              }`}
              onDragOver={(e) => handleDragOver(e, status)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, status)}
            >
              {columnJobs.length === 0 ? (
                renderEmptyState(status)
              ) : (
                columnJobs.map((job) => (
                  <article
                    key={job._id}
                    className={`job-card ${
                      draggedJobId === job._id ? 'job-card--dragging' : ''
                    }`}
                    draggable
                    onDragStart={(e) => handleDragStart(e, job._id)}
                    onDragEnd={handleDragEnd}
                    onClick={() => {
                      if (!isDragging) {
                        openDetailsModal(job);
                      }
                    }}
                  >
                    <div className="card-header">
                      <div className="card-company">
                        <div className="company-name">{job.companyName}</div>
                        <div className="job-title">{job.jobTitle}</div>
                      </div>
                    </div>

                    <div className="card-meta">
                      <div className="meta-item">
                        <span className="meta-icon" aria-hidden="true">📍</span>
                        <span>{job.location || 'Location not set'}</span>
                      </div>

                      <div className="meta-item">
                        <span className="meta-icon" aria-hidden="true">📅</span>
                        <span>{formatLatestActivity(job)}</span>
                      </div>
                    </div>
                  </article>
                ))
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
}

export default KanbanBoard;