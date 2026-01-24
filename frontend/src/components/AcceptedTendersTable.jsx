import React from 'react';

const AcceptedTendersTable = ({ acceptedTenders, onSelectTender }) => {
    return (
        <div className="accepted-tenders-table-container mb-4">
            <div className="table-wrapper">
                <table className="accepted-tenders-table">
                    <thead>
                        <tr>
                            <th>Tender Title</th>
                            <th>Category</th>
                            <th>Acceptance Date</th>
                            <th>Status</th>
                            <th>Contract Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {acceptedTenders.map(t => (
                            <tr key={`row-${t.id}`} onClick={() => onSelectTender(t)}>
                                <td className="tender-title-cell">{t.title}</td>
                                <td className="category-cell">{t.category || t.department || '—'}</td>
                                <td className="date-cell">{t.acceptanceDate || t.submissionDate || '—'}</td>
                                <td className="status-cell">
                                    <span className="status-badge status-accepted">
                                        {t.status || 'Accepted'}
                                    </span>
                                </td>
                                <td className="value-cell">{t.amount || t.contractValue || '—'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            {/* Pagination Controls */}
            <div className="pagination-controls">
                <button className="pagination-btn pagination-prev" disabled>
                    <i className="fas fa-chevron-left"></i>
                    <span>Previous</span>
                </button>
                
                <div className="pagination-pages">
                    <button className="pagination-page active">1</button>
                    <button className="pagination-page">2</button>
                    <button className="pagination-page">3</button>
                    <span className="pagination-ellipsis">...</span>
                    <button className="pagination-page">10</button>
                </div>
                
                <button className="pagination-btn pagination-next">
                    <span>Next</span>
                    <i className="fas fa-chevron-right"></i>
                </button>
            </div>
        </div>
    );
};

export default AcceptedTendersTable;