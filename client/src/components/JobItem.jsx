function JobItem({ job, handleDelete, handleEdit }) {
  return (
    <div className="job-card">
      <h3>{job.companyName}</h3>
      <p>{job.jobTitle}</p>
      <span className="status">{job.status}</span>

      {job.location && <p>Location: {job.location}</p>}
      {job.platform && <p>Platform: {job.platform}</p>}
      {job.salary && <p>Salary: {job.salary}</p>}
      {job.notes && <p>Notes: {job.notes}</p>}
      
      {job.createdAt && (
        <p><strong>Created:</strong> {new Date(job.createdAt).toLocaleDateString()}</p>
      )}
      {job.updatedAt && (
        <p><strong>Updated:</strong> {new Date(job.updatedAt).toLocaleDateString()}</p>
      )}

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