import React from 'react';
import PageHeader from './PageHeader';

const HeaderDemo = () => {
    return (
        <div>
            <PageHeader 
                title="Accepted Tenders" 
                subtitle="Here are the tenders you have successfully secured."
            />
            
            {/* Demo content below the header */}
            <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ 
                    background: '#FFFFFF',
                    borderRadius: '8px',
                    padding: '30px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                    marginBottom: '2rem'
                }}>
                    <h2 style={{ 
                        color: '#1F3A5F',
                        marginBottom: '20px',
                        fontSize: '28px'
                    }}>
                        Tender Management Dashboard
                    </h2>
                    <p style={{ 
                        color: '#5A6B7B',
                        lineHeight: '1.6',
                        fontSize: '16px'
                    }}>
                        This professional header can be used across all pages of your eTender Alert platform. 
                        The blue gradient design creates a clean, enterprise-grade appearance that's perfect 
                        for government procurement portals and tender management systems.
                    </p>
                    
                    <div style={{ 
                        marginTop: '30px',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                        gap: '20px'
                    }}>
                        <div style={{
                            background: '#F5F9FF',
                            padding: '20px',
                            borderRadius: '6px',
                            border: '1px solid #E5EAF0'
                        }}>
                            <h3 style={{ color: '#1F3A5F', marginBottom: '10px' }}>Key Features</h3>
                            <ul style={{ color: '#5A6B7B', paddingLeft: '20px' }}>
                                <li>Full-width responsive design</li>
                                <li>Professional blue gradient</li>
                                <li>Subtle particle effects</li>
                                <li>Clean typography</li>
                            </ul>
                        </div>
                        
                        <div style={{
                            background: '#F5F9FF',
                            padding: '20px',
                            borderRadius: '6px',
                            border: '1px solid #E5EAF0'
                        }}>
                            <h3 style={{ color: '#1F3A5F', marginBottom: '10px' }}>Benefits</h3>
                            <ul style={{ color: '#5A6B7B', paddingLeft: '20px' }}>
                                <li>Enterprise-grade appearance</li>
                                <li>Government portal ready</li>
                                <li>Fully responsive layout</li>
                                <li>Modern procurement styling</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeaderDemo;