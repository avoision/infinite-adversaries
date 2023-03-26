'use client';
import React, { useRef, useState } from 'react';
import './end.scss';
import { useRouter } from 'next/navigation';
import { CSSTransition } from 'react-transition-group';
import { useAppContext } from '../components/AppContext/AppContext';

export default function ErrorPage() {
  const [showText, setShowText] = useState(false);

  const { getFate } = useAppContext();

  const router = useRouter();
  function renderText() {
    const endContentStyles = showText ? 'endContent__outcome' : 'endContent__outcome invisible';

    return (
      // <div className="endContent__outcome">
      <div className={endContentStyles}>
        <div className="endContent__outcome--text">{getFate[0]}</div>
        <div className="endContent__outcome--text">{getFate[1]}</div>
        <div className={'endContent__outcome--options'}>
          <button className="endContent__outcome--button" onClick={() => router.push('/about')}>
            Learn about this project
          </button>
          <button className="endContent__outcome--button" onClick={() => router.push('/')}>
            Begin again
          </button>
        </div>
      </div>
    );
  }

  const tempBGRef = useRef(null);
  return (
    <div className="endContent__outer">
      <CSSTransition
        nodeRef={tempBGRef}
        in={true}
        appear={true}
        timeout={{
          appear: 1000,
        }}
        className="tempBG"
        classNames="tempBG"
        onEntered={() => setShowText(true)}
      >
        <div ref={tempBGRef}></div>
      </CSSTransition>
      <div className="endContent__inner">{renderText()}</div>
    </div>
  );
}
