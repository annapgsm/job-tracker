function JobItem({ job, handleDelete, handleEdit }) {
  return (
    <div className="job-card">
      <h3>{job.companyName}</h3>
      <p>{job.jobTitle}</p>
      <span className="status">{job.status}</span>

      <div className="actions">
        <button type="button" onClick={() => handleEdit(job)}>
          Edit
        </button>
        
        <button type="button" onClick={() => handleDelete(job._id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default JobItem;