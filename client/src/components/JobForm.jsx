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
}) {
    return (
        <div className="form-section">
        <h2>Add Job</h2>
        <form onSubmit={handleSubmit}>
            <input
            type="text"
            placeholder="Company Name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            />

            <input
            type="text"
            placeholder="Job Title"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            />

            <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option>Saved</option>
                <option>Applied</option>
                <option>Interview</option>
                <option>Offer</option>
                <option>Rejected</option>
            </select>

            <button type="submit">
                {editingJob ? 'Update Job' : 'Add'}
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