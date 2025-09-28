import React, { useEffect, useRef } from 'react';
import { FaArrowRight } from 'react-icons/fa';
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
        barns: require('../assets/partners/barns.jpg'),
        delonghi: require('../assets/partners/delonghi.png'),
        nescafe: require('../assets/partners/nescafe.png'),
        giffard: require('../assets/partners/liqueurs & sirops giffard .png'), // Note the space before .png
        torani: require('../assets/partners/torani.png'),
        kimbo: require('../assets/partners/kimbo.webp'),
        blackKnight: require('../assets/partners/black-knight.png'),
        soil: require('../assets/partners/soil.png'),
        kiffa: require('../assets/partners/kiffa.jpeg'),
        laCimbali: require('../assets/partners/lacimbali.png'),
        intenso: require('../assets/partners/intenso-logo1.jpg'),
        suwaa: require('../assets/partners/suwaa.jpeg'),
        hercoFoods: require('../assets/partners/herco-foods.webp'),
        hario: require('../assets/partners/hario.webp'),
        illy: require('../assets/partners/Illy.png'), // Fixed case sensitivity
        bigTrain: require('../assets/partners/big-train.png'),
        ovvio: require('../assets/partners/ovvio.jpeg'),
        hillsBros: require('../assets/partners/hill-bros.jpeg'),
        bunn: require('../assets/partners/bunn.png'),
        caffeDiemme: require('../assets/partners/coffe-diemme.png'), // Fixed typo
        nutella: require('../assets/partners/nutella.png'),
        daVinci: require('../assets/partners/DaVinci-Banner.png'), // Fixed case sensitivity
        twinings: require('../assets/partners/twinings-of-london.png'),
        lavazza: require('../assets/partners/lavazza.png'),
        molinari: require('../assets/partners/caffe-molinari.webp'),
        monin: require('../assets/partners/monin.png'),
        aiello: require('../assets/partners/aiello.png'),
        mocafe: require('../assets/partners/mocafe_Logo.jpg') // Fixed case sensitivity and underscore
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
