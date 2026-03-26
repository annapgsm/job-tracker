function JobItem({ job, handleDelete, handleEdit }) {
  return (
    <div>
      <h3>{job.companyName}</h3>
      <p>{job.jobTitle}</p>
      <p>{job.status}</p>

      <button type="button" onClick={() => handleEdit(job)}>
        Edit
      </button>
      
      <button type="button" onClick={() => handleDelete(job._id)}>
        Delete
      </button>
    </div>
  );
}

export default JobItem;