import React from 'react';

export const MarqueeBanner: React.FC = () => {
  const items = [
    '॥ श्री गणेशाय नमः ॥',
    'Sayali weds Travis',
    '26th November 2026',
    'Enrise by Sayaji, Amravati',
    '॥ शुभ विवाह ॥',
    'Mehendi · Haldi · Wedding',
    'अक्षता आणि आशीर्वादासाठी निमंत्रण',
  ];

  const repeated = [...items, ...items, ...items];

  return (
    <div
      className="w-full overflow-hidden py-3"
      style={{
        background:   'linear-gradient(to right, #F5EDE0, #EDE0CC, #F5EDE0)',
        borderTop:    '1px solid rgba(196,162,101,0.25)',
        borderBottom: '1px solid rgba(196,162,101,0.25)',
      }}
    >
      <div className="animate-marquee">
        {repeated.map((item, i) => (
          <span
            key={i}
            className="mx-8 inline-flex items-center gap-5 whitespace-nowrap"
            style={{
              fontFamily:    'Lora, serif',
              fontSize:      '0.78rem',
              letterSpacing: '0.10em',
              color:         '#8B7D6B',
            }}
          >
            {item}
            <span
              style={{
                display:      'inline-block',
                width:        '4px',
                height:       '4px',
                borderRadius: '50%',
                background:   '#C4A265',
              }}
            />
          </span>
        ))}
      </div>
    </div>
  );
};
