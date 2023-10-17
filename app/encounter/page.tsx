'use client';
import React, { useState, useEffect, useRef } from 'react';
import './encounter.scss';
import {
  buildEncounterPrompt,
  buildOptionsPrompt,
  getRandomWeapon,
} from '../prompts/encounterText';
import { imagePrompt } from '../prompts/encounterImage';
import _ from 'lodash';
import { CharacterStats, Loader } from '../components';
import { fetchEncounterDetails, fetchEncounterImage } from '../api/openai';
import { CSSTransition } from 'react-transition-group';
import { useAppContext } from '../components/AppContext/AppContext';
import { useRouter } from 'next/navigation';
import { mockEncounter } from '../mocks/mockEncounter';
import { initialLetter } from '../fonts';

type EncounterOption = {
  type: string;
  description: string;
  damage: number;
  outcome: string;
  success: boolean;
  hidden: boolean;
};

interface Encounter {
  creature: string;
  paragraph1: string;
  paragraph2: string;
  imagePrompt: string;
  title: string;
  fatalOutcome1: string;
  fatalOutcome2: string;
  options: EncounterOption[];
  imageURL: string;
}

function Encounter() {
  const emptyEncounter: Encounter = {
    creature: '',
    paragraph1: '',
    paragraph2: '',
    imagePrompt: '',
    title: '',
    fatalOutcome1: '',
    fatalOutcome2: '',
    options: [],
    imageURL: '',
  };

  const { weapon } = useAppContext();
  const { health, setHealth } = useAppContext();
  const { setFate } = useAppContext();

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [getEncounter, setEncounter] = useState(emptyEncounter);
  const [showLoader, setShowLoader] = useState(true);
  const [showStats, setShowStats] = useState(false);
  const [getOutcome, setOutcome] = useState<string[]>([]);
  const [showDamage, setShowDamage] = useState(false);
  const [getEncounterActive, setEncounterActive] = useState(true);

  useEffect(() => {
    fetchEncounter();
  }, []);

  function clearEncounter() {
    setEncounter(emptyEncounter);
    setOutcome([]);
  }

  async function fetchEncounter() {
    clearEncounter();
    setIsLoading(true);
    setEncounterActive(true);
    setShowStats(false);

    // No weapon in prod, start over
    if (process.env.NODE_ENV !== 'development' && !weapon) {
      router.push('/');
      return;
    }

    try {
      const encounterWeapon = weapon ? weapon : getRandomWeapon();
      const encounterPromptDetails: string = buildEncounterPrompt(encounterWeapon);

      const encounterSetup = await fetchEncounterDetails(encounterPromptDetails);

      setFate([encounterSetup.fatalOutcome1, encounterSetup.fatalOutcome2]);

      if (!encounterSetup.paragraph1) {
        setIsLoading(false);
        router.push('/error');
        return;
      }

      const optionsPromptDetails = buildOptionsPrompt(
        weapon,
        encounterSetup.creature,
        encounterSetup.paragraph1,
      );

      const optionsSetup = await fetchEncounterDetails(optionsPromptDetails);

      if (!optionsSetup.options[0].outcome) {
        setIsLoading(false);
        router.push('/error');
        return;
      }

      const imagePromptDetails = imagePrompt(encounterSetup.imagePrompt);
      const imageDetails = await fetchEncounterImage(imagePromptDetails);

      const encounterDetails = {
        ...encounterSetup,
        ...optionsSetup,
        imageURL: imageDetails.url,
      };

      // const encounterDetails = mockEncounter;

      setEncounter(encounterDetails);
      setIsLoading(false);
      setShowStats(true);
    } catch {
      setIsLoading(false);
      router.push('/error');
    }
  }

  const encounterImageRef = useRef(null);
  const encounterTextRef = useRef(null);

  function renderImage() {
    return (
      <CSSTransition
        nodeRef={encounterImageRef}
        in={imageLoaded}
        appear={true}
        timeout={{
          appear: 5000,
          enter: 1000,
          exit: 750,
        }}
        classNames="encounterImage"
        className="encounter__image"
        unmountOnExit={true}
      >
        <div ref={encounterImageRef}>
          <div className="encounter__image--primary">
            <img src={getEncounter.imageURL} alt={getEncounter.paragraph1} />
          </div>
          <div
            className="encounter__image--blurred"
            style={{ backgroundImage: `url(${getEncounter.imageURL})` }}
          />
        </div>
      </CSSTransition>
    );
  }

  function renderTitle() {
    return getEncounter.title && <h3 className="encounter__title">{getEncounter.title}</h3>;
  }

  function renderOptions() {
    let options = null;
    if (!isLoading && getEncounter.options.length > 0) {
      options = (
        <>
          {getEncounter.options.map((option, idx) => {
            return (
              <button
                key={option.description}
                tabIndex={idx}
                onClick={() => takeAction(option.type)}
                hidden={option.hidden}
              >
                {option.description}
              </button>
            );
          })}
        </>
      );
    }

    return options;
  }

  function renderOutcomes() {
    return (
      getOutcome && (
        <>
          {getOutcome.map((outcome, idx) => {
            return (
              <div key={`outcome-${idx}`} className="outcome fadeInText">
                {outcome}
              </div>
            );
          })}
        </>
      )
    );
  }

  function triggerDamage() {
    setShowDamage(true);
    setTimeout(() => {
      setShowDamage(false);
    }, 750);
  }

  function getUpdatedHealth(damage: number) {
    let updatedHealth = health - damage;
    updatedHealth = updatedHealth < 0 ? 0 : updatedHealth;

    return updatedHealth;
  }

  function hideAllActions() {
    const updatedOptions = getEncounter.options.map(option => (option.hidden = true));

    const updatedEncounter = {
      ...getEncounter,
      ...updatedOptions,
    };
    setEncounter(updatedEncounter);
  }

  function takeAction(actionType: string) {
    window.scrollTo(0, document.body.scrollHeight);

    const option = _.find(getEncounter.options, ['type', actionType]);
    if (!_.isEmpty(option)) {
      const newOutcome = [...getOutcome, option.outcome];

      if (option.success) {
        setOutcome(newOutcome);
        setEncounterActive(false);
        hideAllActions();
      } else {
        option.hidden = true;
        triggerDamage();

        const updatedHealth = getUpdatedHealth(option.damage);

        if (updatedHealth > 0) {
          setHealth(updatedHealth);
          setOutcome(newOutcome);
        } else {
          // Death
          router.push('/end');
        }
      }

      const updatedOptions = {
        ...getEncounter.options,
        ...option,
      };

      const updatedEncounter = {
        ...getEncounter,
        ...updatedOptions,
      };

      setEncounter(updatedEncounter);
    }
  }

  const imageLoaded = !isLoading && getEncounter.imageURL !== '';
  const allTextLoaded = !!(
    !isLoading &&
    getEncounter.title &&
    getEncounter.options.length > 0 &&
    getOutcome
  );

  const encounterOptionsStyle = getEncounterActive ? 'encounter__options' : 'hidden';
  const continueStyle = !getEncounterActive ? 'continue__option' : 'hidden';

  return (
    <>
      {<Loader isLoading={isLoading} showLoader={showLoader} />}

      <div className="container">
        <div className="encounter">
          {renderImage()}

          <CSSTransition
            nodeRef={encounterTextRef}
            in={allTextLoaded}
            appear={true}
            timeout={{
              appear: 3000,
              enter: 1000,
              exit: 750,
            }}
            classNames="encounterText"
            unmountOnExit={true}
            onExited={() => setShowLoader(true)}
          >
            <div ref={encounterTextRef}>
              <>
                {renderTitle()}
                <div
                  className={`encounter__description encounter__description__firstParagraph ${initialLetter.variable}`}
                >
                  {getEncounter.paragraph1}
                </div>
                <div className="encounter__description">{getEncounter.paragraph2}</div>
                <div className="encounter__outcomes">{renderOutcomes()}</div>
                <div className={encounterOptionsStyle}>{renderOptions()}</div>

                <div className={continueStyle}>
                  <button tabIndex={100} onClick={() => fetchEncounter()}>
                    Continue
                  </button>
                </div>

                <CharacterStats health={health} showDamage={showDamage} isHidden={!showStats} />
              </>
            </div>
          </CSSTransition>
        </div>
      </div>
    </>
  );
}

export default Encounter;
export type { Encounter, EncounterOption };
