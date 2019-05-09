import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Timer = ({ secondsElapsed, className }) => {
  const [totalSecondsElapsed, setSecondsElapsed] = useState(
    secondsElapsed || 0
  );

  // Make the timer "tick"
  useEffect(() => {
    const tick = setTimeout(() => {
      setSecondsElapsed(totalSecondsElapsed + 1);
    }, 1000);
    return () => {
      clearTimeout(tick);
    };
  });

  const seconds = (totalSecondsElapsed % 60).toFixed().padStart(2, 0);
  const minutes = (Math.floor(totalSecondsElapsed / 60) % 60)
    .toString()
    .padStart(2, 0);
  const hours = Math.floor(totalSecondsElapsed / 60 / 60)
    .toString()
    .padStart(2, 0);

  return (
    <div className={className}>
      <div className="unit hours">
        <div className="value">{hours}</div>
        <div className="label">hours</div>
      </div>
      <div className="unit minutes">
        <div className="value">{minutes}</div>
        <div className="label">minutes</div>
      </div>
      <div className="unit seconds">
        <div className="value">{seconds}</div>
        <div className="label">seconds</div>
      </div>
    </div>
  );
};

export default styled(Timer)`
  display: flex;
  .unit {
    margin-right: 20px;
    .value {
      font-weight: 600;
      font-size: 4rem;
      text-align: center;
    }
    .label {
      text-align: center;
    }
  }
`;
