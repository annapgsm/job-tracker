function JobForm({
    companyName,
    setCompanyName,
    jobTitle,
    setJobTitle,
    status,
    setStatus,
    handleSubmit,
    editingJob,
    handleCancelEdit,
    formError,
    setFormError,
    isSaving,
}) {
    return (
        <div className="form-section">
        <h2>Add Job</h2>

        {formError && <p className="form-error">{formError}</p>}

        <form onSubmit={handleSubmit}>
            <input
            type="text"
            placeholder="Company Name"
            value={companyName}
            disabled={isSaving}
            onChange={(e) => {
                setCompanyName(e.target.value);
                if (formError) setFormError('');
            }}
            />

            <input
            type="text"
            placeholder="Job Title"
            value={jobTitle}
            disabled={isSaving}
            onChange={(e) => {
                setJobTitle(e.target.value)
                if (formError) setFormError('');
            }}
            />

            <select 
                value={status} 
                onChange={(e) => setStatus(e.target.value)}
                disabled={isSaving}
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