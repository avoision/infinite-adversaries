'use client';
import React, { useEffect, useState } from 'react';
import './loader.scss';
import { quoteSeeds } from './quotes';
import _ from 'lodash';

type LoaderProps = {
  isLoading: boolean;
};

const Loader = (props: LoaderProps) => {
  const { isLoading } = props;

  let randomQuotes: string[] = [];

  const [fadeProp, setFadeProp] = useState({ fadeStyle: 'loaderText--fadeIn' });

  const [getQuoteList, setQuoteList] = useState(randomQuotes);
  const [quotePos, setQuotePos] = useState(0);

  const textFadeInterval = 5000;

  useEffect(() => {
    randomQuotes = _.shuffle(quoteSeeds);
    setQuoteList(randomQuotes);
  }, []);

  useEffect(() => {
    const timeout = setInterval(() => {
      console.log('setInterval');

      if (!isLoading) {
        clearInterval(timeout);
      } else {
        if (fadeProp.fadeStyle === 'loaderText--fadeIn') {
          setFadeProp({
            fadeStyle: 'loaderText--fadeOut',
          });
        } else {
          let newPos = quotePos + 1;
          newPos = newPos < getQuoteList.length ? newPos : 0;
          setQuotePos(newPos);

          setFadeProp({
            fadeStyle: 'loaderText--fadeIn',
          });
        }
      }
    }, textFadeInterval);

    return () => clearInterval(timeout);
  }, [fadeProp, isLoading, quotePos, getQuoteList.length]);

  let rv = null;

  const loaderStyle = isLoading ? `loader__outer` : `loader__outer fadeOut`;

  // if (isLoading) {
  rv = (
    <div className={loaderStyle}>
      <div className="loader__inner">
        <div className="loader__content">
          <div className="loader__image">
            <div className="loader__image--bar" />
            <div className="loader__image--bar" />
            <div className="loader__image--bar" />
            <div className="loader__image--bar" />
            <div className="loader__image--bar" />
          </div>

          <div className={`${fadeProp.fadeStyle} quote`}>{getQuoteList[quotePos]}</div>
        </div>
      </div>
    </div>
  );
  // }

  return rv;
};

export { Loader };
