import React, { useEffect, useRef } from 'react';
import '../styles/SuccessPartners.css';

const SuccessPartners = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                    }
                });
            },
            {
                threshold: 0.1
            }
        );

        const partnerCards = document.querySelectorAll('.partner-card');
        partnerCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
            observer.observe(card);
        });

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    // Using placeholder images for partner logos
    const partnerLogos = {
        barns: '/assets/partners/barns.jpg',
        delonghi: '/assets/partners/delonghi.png',
        nescafe: '/assets/partners/nescafe.png',
        giffard: '/assets/partners/liqueurs & sirops giffard .png',
        torani: '/assets/partners/torani.png',
        kimbo: '/assets/partners/kimbo.webp',
        blackKnight: '/assets/partners/black-knight.png',
        soil: '/assets/partners/soil.png',
        kiffa: '/assets/partners/kiffa.jpeg',
        laCimbali: '/assets/partners/lacimbali.png',
        intenso: '/assets/partners/intenso-logo1.jpg',
        suwaa: '/assets/partners/suwaa.jpeg',
        hercoFoods: '/assets/partners/herco-foods.webp',
        hario: '/assets/partners/hario.webp',
        illy: '/assets/partners/Illy.png',
        bigTrain: '/assets/partners/big-train.png',
        ovvio: '/assets/partners/ovvio.jpeg',
        hillsBros: '/assets/partners/hill-bros.jpeg',
        bunn: '/assets/partners/bunn.png',
        caffeDiemme: '/assets/partners/coffe-diemme.png',
        nutella: '/assets/partners/nutella.png',
        daVinci: '/assets/partners/DaVinci-Banner.png',
        twinings: '/assets/partners/twinings-of-london.png',
        lavazza: '/assets/partners/lavazza.png',
        molinari: '/assets/partners/caffe-molinari.webp',
        monin: '/assets/partners/monin.png',
        aiello: '/assets/partners/aiello.png',
        mocafe: '/assets/partners/mocafe_Logo.jpg'
    
    };

    const partners = [
        { id: 1, name: 'Barns', logoKey: 'barns' },
        { id: 2, name: 'DeLonghi', logoKey: 'delonghi' },
        { id: 3, name: 'Nescafe', logoKey: 'nescafe' },
        { id: 4, name: 'Giffard', logoKey: 'giffard' },
        { id: 5, name: 'Torani', logoKey: 'torani' },
        { id: 6, name: 'Kimbo', logoKey: 'kimbo' },
        { id: 7, name: 'Black Knight', logoKey: 'blackKnight' },
        { id: 8, name: 'Soil', logoKey: 'soil' },
        { id: 9, name: 'Kiffa', logoKey: 'kiffa' },
        { id: 10, name: 'La Cimbali', logoKey: 'laCimbali' },
        { id: 11, name: 'Intenso', logoKey: 'intenso' },
        { id: 12, name: 'Suwaa', logoKey: 'suwaa' },
        { id: 13, name: 'Herco Foods', logoKey: 'hercoFoods' },
        { id: 14, name: 'Hario', logoKey: 'hario' },
        { id: 15, name: 'Illy', logoKey: 'illy' },
        { id: 16, name: 'Big Train', logoKey: 'bigTrain' },
        { id: 17, name: 'Ovvio', logoKey: 'ovvio' },
        { id: 18, name: 'Hills Bros', logoKey: 'hillsBros' },
        { id: 19, name: 'Bunn', logoKey: 'bunn' },
        { id: 20, name: 'Caffe Diemme', logoKey: 'caffeDiemme' },
        { id: 21, name: 'Nutella', logoKey: 'nutella' },
        { id: 22, name: 'DaVinci', logoKey: 'daVinci' },
        { id: 23, name: 'Twinings', logoKey: 'twinings' },
        { id: 25, name: 'Molinari', logoKey: 'molinari' },
        { id: 26, name: 'Monin', logoKey: 'monin' },
        { id: 27, name: 'Aiello', logoKey: 'aiello' },
        { id: 28, name: 'Mocafe', logoKey: 'mocafe' },
        { id: 29, name: 'Bunn', logoKey: 'bunn' }
    ];
    return (
        <section className="partners-section" ref={sectionRef}>
            <div className="partners-container">
                <div className="partners-header">
                    <h2 className="partners-title">Our Partners</h2>
                </div>

                <div className="partners-grid">
                    {partners.map((partner) => (
                        <div
                            key={partner.id}
                            className="partner-card"
                            title={partner.name}
                        >
                            <img
                                src={partnerLogos[partner.logoKey] || ''}
                                alt={partner.name}
                                className="partner-logo"
                                loading="lazy"
                                onError={(e) => {
                                    console.error(`Failed to load image for: ${partner.name}`);
                                    e.target.onerror = null;
                                    // Fallback to a placeholder image in the public directory if the main image fails to load
                                    e.target.src = 'https://via.placeholder.com/150x100?text=Logo+Not+Found';
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SuccessPartners;
