'use client';

import React, { useRef } from 'react';
import './characterStats.scss';
import { CSSTransition } from 'react-transition-group';

interface CharacterStatsProps {
  health: number;
  showDamage: boolean;
  isHidden: boolean;
}

const CharacterStats = (props: CharacterStatsProps) => {
  const { health, showDamage, isHidden } = props;
  const statsRef = useRef(null);

  let rv = null;
  if (!isHidden) {
    rv = (
      <CSSTransition
        nodeRef={statsRef}
        in={showDamage}
        timeout={{
          enter: 500,
          exit: 500,
        }}
        classNames="showDamage"
        className="stats"
      >
        <div ref={statsRef} className="stats">
          <div className="health">
            health
            <progress id="health" value={health} max="100" />
          </div>
        </div>
      </CSSTransition>
    );
  }

  return rv;
};

export { CharacterStats };
