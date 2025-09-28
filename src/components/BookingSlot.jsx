import React, { useState } from 'react';
import '../styles/BookingSlot.css';

const BookingSlot = () => {
  const [selectedPlan, setSelectedPlan] = useState('platinum');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: 1,
    specialRequests: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const plan = plans.find(p => p.id === selectedPlan);
    const message = `Booking Confirmed!\n\n` +
      `Plan: ${plan.name}\n` +
      `Price: ${plan.price}\n` +
      `Date: ${formData.date || 'Not specified'}\n` +
      `Time: ${formData.time || 'Not specified'}\n` +
      `Guests: ${formData.guests || '1'}\n\n` +
      `Included Features:\n${plan.fullFeatures.map(f => '• ' + f).join('\n')}`;
    
    console.log('Booking submitted:', { ...formData, plan: selectedPlan });
    alert(message);
  };

  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      price: '$29',
      features: [
        '✓ 2 hours private space',
        '✓ Up to 5 guests',
        '✓ Standard seating',
        '✓ Basic coffee',
        '✓ Free Wi-Fi'
      ],
      fullFeatures: [
        '2 hours of private space',
        'Standard seating',
        'Basic coffee selection',
        'Free Wi-Fi',
        'Up to 5 guests',
        'Printing services',
        'Writing materials'
      ]
    },
    {
      id: 'platinum',
      name: 'Platinum',
      price: '$59',
      featured: true,
      features: [
        '✓ 4 hours private space',
        '✓ Up to 10 guests',
        '✓ Premium seating',
        '✓ Gourmet coffee & snacks',
        '✓ Projector available'
      ],
      fullFeatures: [
        '4 hours of private space',
        'Premium seating',
        'Gourmet coffee selection',
        'Complimentary snacks',
        'High-speed Wi-Fi',
        'Up to 10 guests',
        'Projector available',
        'Library access',
        'Office amenities'
      ]
    },
    {
      id: 'gold',
      name: 'Executive',
      price: '$99',
      features: [
        '✓ Full day access',
        '✓ Up to 20 guests',
        '✓ Luxury seating',
        '✓ Premium coffee bar',
        '✓ A/V equipment'
      ],
      fullFeatures: [
        'Full day access (8 hours)',
        'Luxury executive seating',
        'Premium coffee bar',
        'Complimentary breakfast',
        'Dedicated host',
        'Premium Wi-Fi',
        'Up to 20 guests',
        'Audio/Visual equipment',
        'Private entrance',
        'Kids area',
        'Hotel benefits'
      ]
    }
  ];

  const selectedPlanData = plans.find(plan => plan.id === selectedPlan);

  return (
    <div className="booking-container">
      <h1>Booking Slot</h1>
      <p className="booking-subtitle">Choose the perfect plan for your gathering</p>
      
      <div className="pricing-cards">
        {plans.map((plan) => (
          <div 
            key={plan.id}
            className={`pricing-card ${selectedPlan === plan.id ? 'selected' : ''} ${plan.id}-card`}
            onClick={() => setSelectedPlan(plan.id)}
          >
            {plan.featured && <div className="featured-badge">Most Popular</div>}
            <h3>{plan.name}</h3>
            <div className="price">
              {plan.price}
              <span>per session</span>
            </div>
            <ul className="features">
              {plan.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
            <div className="select-plan">
              {selectedPlan === plan.id ? '✓ Selected Plan' : 'Select Plan'}
            </div>
          </div>
        ))}
      </div>

      <form className="booking-form" onSubmit={handleSubmit}>
        <h2>Your Information</h2>
        
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            placeholder="Enter your full name"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="your.email@example.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              placeholder="+1 (___) ___-____"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="date">Booking Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              required
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          <div className="form-group">
            <label htmlFor="time">Preferred Time</label>
            <select
              id="time"
              name="time"
              value={formData.time}
              onChange={handleInputChange}
              required
            >
              <option value="">Select time slot</option>
              <option value="09:00">09:00 AM</option>
              <option value="10:00">10:00 AM</option>
              <option value="11:00">11:00 AM</option>
              <option value="12:00">12:00 PM</option>
              <option value="13:00">01:00 PM</option>
              <option value="14:00">02:00 PM</option>
              <option value="15:00">03:00 PM</option>
              <option value="16:00">04:00 PM</option>
              <option value="17:00">05:00 PM</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="guests">Number of Guests</label>
            <select
              id="guests"
              name="guests"
              value={formData.guests}
              onChange={handleInputChange}
              required
            >
              {Array.from({ length: 20 }, (_, i) => i + 1).map(num => (
                <option key={num} value={num}>{num} {num === 1 ? 'person' : 'people'}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="specialRequests">Special Requests</label>
          <textarea
            id="specialRequests"
            name="specialRequests"
            value={formData.specialRequests}
            onChange={handleInputChange}
            placeholder="Any special requirements, dietary restrictions, or additional requests?"
            rows="4"
          />
        </div>

       

        <button type="submit" className="submit-booking">
          <span>BOOK NOW - {selectedPlanData?.price}</span>
        </button>
      </form>
    </div>
  );
};

export default BookingSlot;