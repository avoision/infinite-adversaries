'use client';
import React from 'react';
import './error.scss';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import siemensSystem4004 from 'public/img/siemensSystem4004.jpg';

export default function ErrorPage() {
  const router = useRouter();

  function goHome() {
    // router.push('/');
    router.push('/encounter');
  }

  return (
    <>
      <div className="error__outer">
        <div className="error__inner">
          <div className="error__content">
            <h3 className="error__content--title">Something went wrong</h3>
            <Image
              src={siemensSystem4004}
              priority
              className="error__content--image"
              alt="Siemens System 4004"
            />
            <div className="error__content--text">
              {`Keep in mind... we're asking an AI to
              imagine fantastical aliens and mythological creatures, and to spin up bespoke adventures via on-the-fly, unstructured JSON.`}
            </div>
            <div className="error__content--text">{`I'm amazed this even works at all.`}</div>
            <button className="error__content--button" onClick={goHome}>
              Try again
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
