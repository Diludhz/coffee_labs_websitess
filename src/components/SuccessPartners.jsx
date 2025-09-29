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

    // Import all partner logos with correct paths
    const partnerLogos = {
        // Fixed paths to match actual filenames in src/assets/partners
        barns: require('../Assets/partners/barns.jpg'),
        delonghi: require('../Assets/partners/delonghi.png'),
        nescafe: require('../Assets/partners/nescafe.png'),
        giffard: require('../Assets/partners/liqueurs & sirops giffard .png'),
        torani: require('../Assets/partners/torani.png'),
        kimbo: require('../Assets/partners/kimbo.webp'),
        blackKnight: require('../Assets/partners/black-knight.png'),
        soil: require('../Assets/partners/soil.png'),
        kiffa: require('../Assets/partners/kiffa.jpeg'),
        laCimbali: require('../Assets/partners/lacimbali.png'),
        intenso: require('../Assets/partners/intenso-logo1.jpg'),
        suwaa: require('../Assets/partners/suwaa.jpeg'),
        hercoFoods: require('../Assets/partners/herco-foods.webp'),
        hario: require('../Assets/partners/hario.webp'),
        illy: require('../Assets/partners/Illy.png'),
        bigTrain: require('../Assets/partners/big-train.png'),
        ovvio: require('../Assets/partners/ovvio.jpeg'),
        hillsBros: require('../Assets/partners/hill-bros.jpeg'),
        bunn: require('../Assets/partners/bunn.png'),
        caffeDiemme: require('../Assets/partners/coffe-diemme.png'),
        nutella: require('../Assets/partners/nutella.png'),
        daVinci: require('../Assets/partners/DaVinci-Banner.png'),
        twinings: require('../Assets/partners/twinings-of-london.png'),
        lavazza: require('../Assets/partners/lavazza.png'),
        molinari: require('../Assets/partners/caffe-molinari.webp'),
        monin: require('../Assets/partners/monin.png'),
        aiello: require('../Assets/partners/aiello.png'),
        mocafe: require('../Assets/partners/mocafe_Logo.jpg')
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
        { id: 28, name: 'Mocafe', logoKey: 'mocafe' }
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
                                    e.target.src = '/Assets/placeholder-logo.png';
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
