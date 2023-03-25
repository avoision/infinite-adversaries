'use client';

import React from 'react';
import './characterStats.scss';

interface CharacterStatsProps {
  health: number;
}

const CharacterStats = (props: CharacterStatsProps) => {
  const { health } = props;

  return (
    <div className="stats">
      <div className="health">
        health
        <progress id="health" value={health} max="100" className="takeDamage" />
      </div>
    </div>
  );
};

export { CharacterStats };
