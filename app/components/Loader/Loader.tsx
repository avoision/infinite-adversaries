'use client';
import React, { useEffect, useState, useRef } from 'react';
import './loader.scss';
import { quoteSeeds } from './quotes';
import _ from 'lodash';
import { CSSTransition } from 'react-transition-group';
import Image from 'next/image';
import infinityLoader from 'public/img/Infinity-1.4s-231px.svg';

type LoaderProps = {
  isLoading: boolean;
  showLoader: boolean;
  onComplete?: () => void;
};

const Loader = (props: LoaderProps) => {
  const { isLoading, showLoader, onComplete } = props;
  const [getQuoteList, setQuoteList] = useState(['']);
  const [quotePos, setQuotePos] = useState(0);
  const textFadeInterval = 5000;

  const [fadeTextTransition, setFadeTextTransition] = useState(true);

  useEffect(() => {
    const randomQuotes = _.shuffle(quoteSeeds);
    setQuoteList(randomQuotes);
  }, []);

  useEffect(() => {
    const timeout = setInterval(() => {
      setFadeTextTransition(!fadeTextTransition);
    }, textFadeInterval);
    return () => clearInterval(timeout);
  }, [fadeTextTransition]);

  function updateQuotePos() {
    let newPos = quotePos + 1;
    newPos = newPos < getQuoteList.length ? newPos : 0;
    setQuotePos(newPos);
  }

  const loaderRef = useRef(null);
  const textRef = useRef(null);

  return (
    <CSSTransition
      nodeRef={loaderRef}
      in={isLoading}
      appear={true}
      timeout={{ appear: 3000, enter: 1000, exit: 500 }}
      classNames="loader"
      className="loader__outer loader"
      onExited={onComplete}
      unmountOnExit={true}
    >
      <div ref={loaderRef}>
        <div className="loader__inner">
          <div className="loader__content">
            <div className="loader__image">
              <Image
                src={infinityLoader}
                priority
                className="spinner"
                alt="alt"
                height="50"
                width="100"
              />
            </div>
            <CSSTransition
              nodeRef={textRef}
              in={isLoading && showLoader && fadeTextTransition}
              appear={true}
              timeout={{
                appear: 1000,
                enter: 1000,
                exit: 500,
              }}
              classNames="quoteFade"
              className="quote quoteFade"
              onExited={updateQuotePos}
            >
              <div ref={textRef}>{getQuoteList[quotePos]}</div>
            </CSSTransition>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};

export { Loader };
