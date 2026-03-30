function JobTable({ jobs, handleEdit, handleDelete, openDetailsModal }) {
    const getLatestDate = (job) => job.dateUpdated || job.dateSaved;

    const sortedJobs = [...jobs].sort((a, b) => {
        const latestA = getLatestDate(a);
        const latestB = getLatestDate(b);

        const timeA = latestA ? new Date(latestA).getTime() : 0;
        const timeB = latestB ? new Date(latestB).getTime() : 0;

        return timeB - timeA;
    });

    return (
        <div className="table-wrapper">
        <table className="job-table">
            <thead>
            <tr>
                <th>Company</th>
                <th>Job Title</th>
                <th>Status</th>
                <th>Platform</th>
                <th>Location</th>
                <th>Created</th>
                <th>Updated</th>
            </tr>
            </thead>

            <tbody>
            {sortedJobs.length === 0 ? (
                <tr>
                    <td colSpan="7">No jobs yet.</td>
                </tr>
            ) : (
                sortedJobs.map((job) => (
                <tr
                    key={job._id}
                    onClick={() => openDetailsModal(job)}
                    className="table-row-clickable"
                >
                    <td>{job.companyName}</td>
                    <td>{job.jobTitle}</td>
                    <td>{job.status}</td>
                    <td>{job.platform || '-'}</td>
                    <td>{job.location || '-'}</td>
                    <td>{job.dateSaved ? new Date(job.dateSaved).toLocaleDateString() : '-'}</td>
                    <td>
                        {getLatestDate(job)
                            ? new Date(getLatestDate(job)).toLocaleString()
                            : '-'}
                    </td>
                    <td>
                        <button
                            type="button"
                            onClick={(e) => {
                            e.stopPropagation();
                            handleEdit(job);
                            }}
                        >
                            Edit
                        </button>

                        <button
                            type="button"
                            onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(job._id);
                            }}
                        >
                            Delete
                        </button>
                    </td>
                </tr>
                ))
            )}
            </tbody>
        </table>
        </div>
    );
}

export default JobTable;