import React, { useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import './titleSequence.scss';

type TitleSequenceProps = {
  isLoading: boolean;
  onComplete: () => void;
};

const TitleSequence = (props: TitleSequenceProps) => {
  const { onComplete } = props;

  const [titleSequence, setTitleSequence] = useState(true);

  const titleSequenceRef = useRef(null);
  return (
    <CSSTransition
      nodeRef={titleSequenceRef}
      in={titleSequence}
      appear={true}
      timeout={{ enter: 3000, exit: 2000 }}
      classNames="titleSequence"
      className="titleSequence__outer titleSequence"
      unmountOnExit={true}
      onEntered={() => setTitleSequence(false)}
      onExited={onComplete}
    >
      <div ref={titleSequenceRef}>
        <div className="titleSequence__inner">
          <div className="titleSequence__content">
            <h1>infinite adversaries</h1>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};

export { TitleSequence };
