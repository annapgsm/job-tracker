function JobForm({
    formData, 
    handleChange,
    handleSubmit,
    editingJob,
    handleCancelEdit,
    formError,
    setFormError,
    isSaving,
}) {
    return (
        <div className="form-section">
        <h2>{editingJob ? 'Edit Job' : 'Add Job'}</h2>

        {formError && <p className="form-error">{formError}</p>}

        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="companyName"
                placeholder="Company Name *"
                value={formData.companyName}
                disabled={isSaving}
                onChange={handleChange}
            />

            <input
                type="text"
                name="jobTitle"
                placeholder="Job Title* "
                value={formData.jobTitle}
                disabled={isSaving}
                onChange={handleChange}
            />

            <input
                type="text"
                name="jobLink"
                placeholder="Job Link"
                value={formData.jobLink}
                disabled={isSaving}
                onChange={handleChange}
            />

            <textarea
                placeholder="Job Description"
                name="jobDescription"
                value={formData.jobDescription}
                disabled={isSaving}
                onChange={handleChange}
            />

            <input
                type="number"
                name="salary"
                placeholder="Salary"
                value={formData.salary}
                disabled={isSaving}
                onChange={handleChange}
            />

            <input
                type="text"
                name="platform"
                placeholder="Platform"
                value={formData.platform}
                disabled={isSaving}
                onChange={handleChange}
            />

            <input
                type="text"
                name="location"
                placeholder="Location"
                value={formData.location}
                disabled={isSaving}
                onChange={handleChange}
            />

            <textarea
                placeholder="Additional Notes"
                name="notes"
                value={formData.notes}
                disabled={isSaving}
                onChange={handleChange}
            />


            <select 
                name="status"
                value={formData.status}
                disabled={isSaving} 
                onChange={handleChange}
            >
                <option>Saved</option>
                <option>Applied</option>
                <option>Interview</option>
                <option>Offer</option>
                <option>Rejected</option>
            </select>

            <div className="form-actions">
                <button type="submit" disabled={isSaving}>
                    {isSaving ? 'Saving...' : editingJob ? 'Update Job' : 'Add'}
                </button>
    
                <button type="button" onClick={handleCancelEdit} disabled={isSaving}>
                    Cancel
                </button>
            </div>    
        </form>
    </div>
  );
}

export default JobForm;