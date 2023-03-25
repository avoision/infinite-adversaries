'use client';
import React, { useState, useEffect, useRef } from 'react';
import './styles/weapon.scss';
import { weaponPrompt } from './prompts/weaponText';
import _ from 'lodash';
import { Loader } from './components';
import { fetchEncounterDetails, APIType } from './api/openai';
import { CSSTransition } from 'react-transition-group';
import { useAppContext } from './components/AppContext/AppContext';
import { useRouter } from 'next/navigation';
import { TitleSequence } from './TitleSequence/TitleSequence';

export default function Init() {
  type weaponOption = {
    weaponName: string;
  };

  interface Init {
    paragraph: string;
    weaponOptions: weaponOption[];
  }

  const emptyInit: Init = {
    paragraph: '',
    weaponOptions: [],
  };

  const router = useRouter();
  const { addWeapon } = useAppContext();

  const [isLoading, setIsLoading] = useState(false);
  const [getInit, setInit] = useState(emptyInit);
  const [showLoader, setShowLoader] = useState(false);

  function routeToPage(destination: string) {
    setIsLoading(false);
    setShowLoader(false);
    router.push(destination);
  }
  async function fetchWeapons() {
    setIsLoading(true);

    try {
      const weaponDetails = await fetchEncounterDetails(APIType.TEXT, weaponPrompt);
      // const weaponDetails = {
      //   weaponOptions: [
      //     {
      //       weaponName: 'Claymore',
      //     },
      //     {
      //       weaponName: 'Stun Gun',
      //     },
      //     {
      //       weaponName: 'Plastic knife',
      //     },
      //   ],
      //   paragraph:
      //     'You stand in a dimly lit chamber, the only illumination coming from the flickering flames of a single torch. In the center of the room, an ornate table stands, a silent sentinel. Three weapons, each one mysterious in its own way, rest on its surface, awaiting selection. The air is thick with anticipation and tension as you sense the powerful history of this room, and the grand destiny that awaits you in the moments that are to come.',
      // };

      const randomWeapons = _.shuffle(weaponDetails.weaponOptions).slice(0, 3);

      const initDetails: Init = {
        ...weaponDetails,
        weaponOptions: randomWeapons,
      };

      if (!initDetails.paragraph) {
        routeToPage('/error');
      }

      console.log(initDetails);
      setIsLoading(false);
      setShowLoader(false);
      setInit(initDetails);
    } catch {
      routeToPage('/error');
    }
  }

  function init() {
    setIsLoading(true);
    setShowLoader(true);
    fetchWeapons();
  }

  // useEffect(() => {
  //   function routeToPage(destination: string) {
  //     setIsLoading(false);
  //     setShowLoader(false);
  //     router.push(destination);
  //   }

  //   async function fetchWeapons() {
  //     setIsLoading(true);

  //     try {
  //       const weaponDetails = await fetchEncounterDetails(APIType.TEXT, weaponPrompt);
  //       // const weaponDetails = {
  //       //   weaponOptions: [
  //       //     {
  //       //       weaponName: 'Claymore',
  //       //     },
  //       //     {
  //       //       weaponName: 'Stun Gun',
  //       //     },
  //       //     {
  //       //       weaponName: 'Plastic knife',
  //       //     },
  //       //   ],
  //       //   paragraph:
  //       //     'You stand in a dimly lit chamber, the only illumination coming from the flickering flames of a single torch. In the center of the room, an ornate table stands, a silent sentinel. Three weapons, each one mysterious in its own way, rest on its surface, awaiting selection. The air is thick with anticipation and tension as you sense the powerful history of this room, and the grand destiny that awaits you in the moments that are to come.',
  //       // };

  //       const randomWeapons = _.shuffle(weaponDetails.weaponOptions).slice(0, 3);

  //       const initDetails: Init = {
  //         ...weaponDetails,
  //         weaponOptions: randomWeapons,
  //       };

  //       if (!initDetails.paragraph) {
  //         routeToPage('/error');
  //       }

  //       console.log(initDetails);
  //       setIsLoading(false);
  //       setShowLoader(false);
  //       setInit(initDetails);
  //     } catch {
  //       routeToPage('/error');
  //     }
  //   }
  //   fetchWeapons();
  // }, [router]);

  function takeAction(weaponName: string) {
    addWeapon(weaponName);
    router.push('/encounter');
  }

  const allTextLoaded = !!(!isLoading && getInit.weaponOptions.length > 0);

  function renderOptions() {
    let options = null;
    if (!isLoading && getInit.weaponOptions.length > 0) {
      options = (
        <>
          {getInit.weaponOptions.map((weapon, idx) => {
            return (
              <button key={idx + weapon.weaponName} onClick={() => takeAction(weapon.weaponName)}>
                Take the {weapon.weaponName}
              </button>
            );
          })}
        </>
      );
    }

    return options;
  }

  const weaponTextRef = useRef(null);
  return (
    <>
      <TitleSequence isLoading={isLoading} onComplete={init} />
      {<Loader isLoading={isLoading} showLoader={showLoader} />}
      <div className="weapon__outer">
        <div className="weapon__inner">
          <CSSTransition
            nodeRef={weaponTextRef}
            in={allTextLoaded && !showLoader && !isLoading}
            appear={true}
            timeout={{
              appear: 7000,
              enter: 1000,
              exit: 750,
            }}
            classNames="encounterText"
            className="weapon__content"
            unmountOnExit={true}
            onExited={() => setShowLoader(true)}
          >
            <div ref={weaponTextRef}>
              <div className="encounter__description">{getInit.paragraph}</div>
              <div className="encounter__options">{renderOptions()}</div>
            </div>
          </CSSTransition>
        </div>
      </div>
    </>
  );
}
