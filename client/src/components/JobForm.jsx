function JobForm({
  formData,
  handleChange,
  handleSubmit,
  editingJob,
  formError,
  isSaving,
}) {
  return (
    <div className="form-section">
      <div className="form-header">
        <h2>{editingJob ? 'Edit Job' : 'Add Job'}</h2>
        <p className="form-subtitle">
          Fill in the details below to track your application.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="companyName">Company Name *</label>
          <input
            id="companyName"
            type="text"
            name="companyName"
            placeholder="e.g. Google"
            value={formData.companyName}
            disabled={isSaving}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="jobTitle">Job Title *</label>
          <input
            id="jobTitle"
            type="text"
            name="jobTitle"
            placeholder="e.g. Senior Copywriter"
            value={formData.jobTitle}
            disabled={isSaving}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="jobLink">Job Link</label>
          <input
            id="jobLink"
            type="text"
            name="jobLink"
            placeholder="Paste the job posting URL"
            value={formData.jobLink}
            disabled={isSaving}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="jobDescription">Job Description</label>
          <textarea
            id="jobDescription"
            name="jobDescription"
            placeholder="Add a short summary of the role"
            value={formData.jobDescription}
            disabled={isSaving}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="salary">Salary</label>
          <input
            id="salary"
            type="number"
            name="salary"
            placeholder="e.g. 65000"
            value={formData.salary}
            disabled={isSaving}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="platform">Platform</label>
          <input
            id="platform"
            type="text"
            name="platform"
            placeholder="e.g. LinkedIn"
            value={formData.platform}
            disabled={isSaving}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            id="location"
            type="text"
            name="location"
            placeholder="e.g. Berlin"
            value={formData.location}
            disabled={isSaving}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="contact">Contact</label>
          <input
            id="contact"
            type="text"
            name="contact"
            placeholder="Recruiter or contact name"
            value={formData.contact}
            disabled={isSaving}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="notes">Additional Notes</label>
          <textarea
            id="notes"
            name="notes"
            placeholder="Anything important to remember"
            value={formData.notes}
            disabled={isSaving}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            disabled={isSaving}
            onChange={handleChange}
          >
            <option value="Saved">Saved</option>
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        {formError && <p className="form-error">{formError}</p>}

        <div className="form-actions form-actions--single">
          <button type="submit" className="btn-primary form-submit-button" disabled={isSaving}>
            {isSaving ? 'Saving...' : editingJob ? 'Update Job' : 'Add Job'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default JobForm;