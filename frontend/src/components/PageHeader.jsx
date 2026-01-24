import React from 'react';

const PageHeader = ({ title = "Accepted Tenders", subtitle = "Here are the tenders you have successfully secured." }) => {
    return (
        <div className="page-header-full-width">
            <div className="header-content">
                <h1 className="header-main-title">{title}</h1>
                <p className="header-subtitle">{subtitle}</p>
            </div>
        </div>
    );
};

export default PageHeader;