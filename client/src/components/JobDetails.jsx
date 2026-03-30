function JobDetails({ job, onClose }) {
  if (!job) return null;

  return (
    <div>
      <h2>{job.companyName}</h2>
      <p><strong>Job Title:</strong> {job.jobTitle}</p>
      <p><strong>Status:</strong> {job.status}</p>
      
      {job.jobDescription && <p><strong>Description:</strong> {job.jobDescription}</p>}

      {job.location && <p><strong>Location:</strong> {job.location}</p>}
      {job.salary && <p><strong>Salary:</strong> {job.salary}</p>}
      {job.platform && <p><strong>Platform:</strong> {job.platform}</p>}
      {job.contact && <p><strong>Contact:</strong> {job.contact}</p>}
      {job.jobLink && <p><strong>Link:</strong> {job.jobLink}</p>}

      {job.notes && <p><strong>Notes:</strong> {job.notes}</p>}

      {job.createdAt && (
        <p><strong>Created:</strong> {new Date(job.createdAt).toLocaleDateString()}</p>
      )}

      <button type="button" onClick={onClose}>Close</button>
    </div>
  );
}

export default JobDetails;