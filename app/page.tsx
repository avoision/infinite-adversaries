'use client';
import React, { useState, useRef } from 'react';
import './styles/weapon.scss';
import { weaponPrompt } from './prompts/weaponText';
import _ from 'lodash';
import { Loader } from './components';
import { fetchEncounterDetails, APIType } from './api/openai';
import { CSSTransition } from 'react-transition-group';
import { useAppContext } from './components/AppContext/AppContext';
import { useRouter } from 'next/navigation';
import { TitleSequence } from './components/TitleSequence/TitleSequence';

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
  const { setHealth } = useAppContext();

  const [isLoading, setIsLoading] = useState(false);
  const [getInit, setInit] = useState(emptyInit);
  const [showLoader, setShowLoader] = useState(false);
  const [showWeaponIntro, setShowWeaponIntro] = useState(false);

  function routeToPage(destination: string) {
    setIsLoading(false);
    setShowLoader(false);
    router.push(destination);
  }
  async function fetchWeapons() {
    setIsLoading(true);

    try {
      const weaponDetails = await fetchEncounterDetails(APIType.TEXT, weaponPrompt);
      const randomWeapons = _.shuffle(weaponDetails.weaponOptions).slice(0, 3);

      const initDetails: Init = {
        ...weaponDetails,
        weaponOptions: randomWeapons,
      };

      if (!initDetails.paragraph || !randomWeapons[0].weaponName) {
        routeToPage('/error');
      }

      setIsLoading(false);
      setShowLoader(false);
      setInit(initDetails);
    } catch {
      routeToPage('/error');
    }
  }

  function init() {
    setHealth(100);

    setIsLoading(true);
    setShowLoader(true);
    fetchWeapons();
  }

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
      {
        <Loader
          isLoading={isLoading}
          showLoader={showLoader}
          onComplete={() => setShowWeaponIntro(true)}
        />
      }
      <div className="weapon__outer">
        <div className="weapon__inner">
          <CSSTransition
            nodeRef={weaponTextRef}
            in={allTextLoaded && showWeaponIntro}
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
