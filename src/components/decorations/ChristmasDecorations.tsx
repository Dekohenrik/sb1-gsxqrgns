import React from 'react';

export const ChristmasDecorations: React.FC = () => {
  return (
    <div className="christmas-decorations">
      <div className="lights-top"></div>
      <div className="lights-left"></div>
      <div className="lights-right"></div>
      <div className="snowflakes" aria-hidden="true">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="snowflake">❅</div>
        ))}
      </div>
    </div>
  );
};