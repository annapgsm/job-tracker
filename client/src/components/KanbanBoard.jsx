function KanbanBoard({ jobs, handleEdit, handleDelete, openDetailsModal, statuses }) {
    
    const getLatestDate = (job) => job.dateUpdated || job.dateSaved;

    const sortedJobs = [...jobs].sort((a, b) => {
        const timeA = getLatestDate(a)
        ? new Date(getLatestDate(a)).getTime()
        : 0;

        const timeB = getLatestDate(b)
        ? new Date(getLatestDate(b)).getTime()
        : 0;

        return timeB - timeA;
    });

    return (
        <div className="kanban-board">
            {statuses.map((status) => {
                const columnJobs = sortedJobs.filter((job) => job.status === status);

                return (
                    <div key={status} className="kanban-column">
                        <h3>{status}</h3>

                        {columnJobs.map((job) => (
                            <div 
                                key={job._id} 
                                className="kanban-card"
                                onClick={() => openDetailsModal(job)}
                            >
                                <p>{job.companyName}</p>
                                <p>{job.jobTitle}</p>

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
                            </div>
                        ))}
                    </div>
                );
            })}
        </div>
    );
}

export default KanbanBoard;