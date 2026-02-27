import React from 'react';

const TrustCertificates = ({ className = "" }) => {
    const certificates = [
        { name: 'Emapana', src: '/assets/certificate/emapana.png' },
        { name: 'FSSAI', src: '/assets/certificate/fssai.png' },
        { name: 'NABL', src: '/assets/certificate/nabl.png' },
        { name: 'Natural', src: '/assets/certificate/natural.png' }
    ];

    return (
        <div className={`py-8 bg-white border-y border-border/50 ${className}`}>
            <div className="container mx-auto px-4">
                <div className="flex flex-row items-center justify-center gap-4 sm:gap-12 md:gap-20">
                    {certificates.map((cert) => (
                        <div key={cert.name} className="flex-shrink-0">
                            <img
                                src={cert.src}
                                alt={`${cert.name} Certificate`}
                                className="h-10 sm:h-16 md:h-20 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                                loading="lazy"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TrustCertificates;
