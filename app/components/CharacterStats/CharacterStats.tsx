"use client";

import React from "react";
import "./characterStats.scss";

interface CharacterStatsProps {
  health: number;
  isLoading: boolean;
}

const CharacterStats = (props: CharacterStatsProps) => {
  const { health, isLoading } = props;
  let rv = null;

  if (!isLoading) {
    rv = (
      <div className="stats">
        <div className="health">
          health
          <progress id="health" value={health} max="100" className="takeDamage" />
        </div>
      </div>
    );
  }

  return rv;
};

export { CharacterStats };
