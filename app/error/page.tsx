'use client';
import React from 'react';
import './error.scss';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import siemensSystem4004 from 'public/img/siemensSystem4004.jpg';

export default function ErrorPage() {
  const router = useRouter();

  return (
    <div className="container">
      <div className="error__content">
        <h3 className="error__content--title">An Error Appears</h3>
        <a href="https://www.youtube.com/watch?v=tMZ2j9yK_NY" target="_blank">
          <Image
            src={siemensSystem4004}
            priority
            className="error__content--image"
            alt="Siemens System 4004"
          />
        </a>
        <div className="error__content--text">
          {`As an image from a childhood long ago appears before your eyes, it slowly dawns on you that something has gone horribly, terribly wrong. A glitch in the Matrix, perhaps. Or a wrinkle in time. Or, more likely, an unnecessary comma in some malformed JSON.`}
        </div>
        <div className={'error__content--options'}></div>

        <div className="error__content--text">
          {`You have the sudden realization that you may be forced to return to your job and actually do work. Or go spend time with the other humans in your house, those people you call family. A chill travels down your spine.`}
        </div>
        <div className="error__content--text">
          {`There is the sound of wind in the distance, lessening to a whisper. The screen before you dims, almost imperceptibly, as though it waits to see what you will do next. Your fingers tremble slightly, as you consider the options before you.`}
        </div>
        <div className={'error__content--options'}>
          <button
            className="error__content--button tryAgain cta"
            onClick={() => router.push('/encounter')}
          >
            Try again: generate an adversary
          </button>
          <button className="error__content--button" onClick={() => router.push('/about')}>
            Learn more about this project
          </button>
          <button className="error__content--button" onClick={() => router.push('/')}>
            Start over with a new weapon
          </button>
          <button
            className="error__content--button"
            onClick={() =>
              window.open(
                'https://letmegooglethat.com/?q=How+can+I+create+a+chatbot+myself%2C+using+ChatGPT%3F',
              )
            }
          >
            Complain to the developer
          </button>
        </div>
      </div>
    </div>
  );
}
