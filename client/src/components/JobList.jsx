import JobItem from './JobItem';

function JobList({ jobs,handleEdit, handleDelete, loading, error }) {
    return (
        <div className="list-section">
            <h2>Applications</h2>

            {loading ? (
                <p>Loading jobs...</p>
            ) : error ? (
                <p>{error}</p>
            ) : jobs.length === 0 ? (
                <p>No jobs yet.</p>
            ) : (
                jobs.map((job) => (
                    <JobItem 
                        key={job._id} 
                        job={job} 
                        handleDelete={handleDelete}
                        handleEdit={handleEdit} 
                    />
                ))
            )}
        </div>
    );
}

export default JobList;