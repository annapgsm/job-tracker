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
            placeholder="Company Name *"
            value={FormData.companyName}
            disabled={isSaving}
            onChange={handleChange}
            />

            <input
            type="text"
            placeholder="Job Title* "
            value={formData.jobTitle}
            disabled={isSaving}
            onChange={handleChange}
            />

            <input
                type="text"
                placeholder="Job Link"
                value={formData.jobLink}
                disabled={isSaving}
                onChange={handleChange}
            />

            <textarea
                placeholder="Job Description"
                value={formData.jobDescription}
                disabled={isSaving}
                onChange={handleChange}
            />

            <input
                type="number"
                placeholder="Salary"
                value={formData.salary}
                disabled={isSaving}
                onChange={handleChange}
            />

            <input
                type="text"
                placeholder="Platform"
                value={formData.platform}
                disabled={isSaving}
                onChange={handleChange}
            />

            <input
                type="text"
                placeholder="Location"
                value={formData.location}
                disabled={isSaving}
                onChange={handleChange}
            />

            <textarea
                placeholder="Additional Notes"
                value={formData.notes}
                disabled={isSaving}
                onChange={handleChange}
            />


            <select 
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

            <button type="submit" disabled={isSaving}>
                {editingJob ? 'Saving...' : editingJob ? 'Update Job' : 'Add'}
            </button>

            {editingJob && (
                <button type="button" onClick={handleCancelEdit}>
                    Cancel
                </button>
            )}
        </form>
    </div>
  );
}

export default JobForm;