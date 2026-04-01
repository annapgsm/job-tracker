import { FaEdit, FaTrash } from 'react-icons/fa';

function JobTable({ jobs, allJobs, handleEdit, handleDelete, openDetailsModal }) {
    
    const getLatestDate = (job) => job.dateUpdated || job.dateSaved;
    //table should show newest activity first
    const sortedJobs = [...jobs].sort((a, b) => {
        //get latest activity date for each pair of jobs
        const latestA = getLatestDate(a);
        const latestB = getLatestDate(b);
        //converting dates to timestamps
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
                <th>Actions</th>
            </tr>
            </thead>

            <tbody>
            {sortedJobs.length === 0 ? (
                <tr>
                    <td colSpan="8">
                        { allJobs.length === 0 ?(
                            "No jobs saved yet. Add your first one!"
                        ) : (
                            "No results match your filters."
                        )}
                    </td>
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
                            aria-label="Edit job"
                            onClick={(e) => {
                            e.stopPropagation();
                            handleEdit(job);
                            }}
                        >
                            <FaEdit />
                        </button>

                        <button
                            type="button"
                            aria-label="Delete job"
                            onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(job._id);
                            }}
                        >
                            <FaTrash />
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