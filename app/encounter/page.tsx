'use client';
import React, { useState, useEffect, useRef } from 'react';
import './encounter.scss';
import { buildEncounterPrompt } from '../prompts/encounterText';
import { imagePrompt } from '../prompts/encounterImage';
import _ from 'lodash';
import { CharacterStats, Loader } from '../components';
import { fetchEncounterDetails, APIType } from '../api/openai';
import { CSSTransition } from 'react-transition-group';
import { useAppContext } from '../components/AppContext/AppContext';
import { useRouter } from 'next/navigation';

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
  keywords: string;
  title: string;
  options: EncounterOption[];
  imageURL: string;
}

export default function Encounter() {
  const mockEncounter = {
    creature: 'Manticore',
    paragraph1:
      'The air is thick with tension as you prepare to face off against the Manticore. It snarls, its lion body bristling with spikes and its bat wings spread wide. You stand in a clearing in the middle of a dense forest, surrounded by towering trees and choked with heavy fog. In the distance you can see a nearby river, the water crashing against jagged rocks. To your left, a fallen tree lies on the ground, its trunk covered in moss and mushrooms.',
    paragraph2:
      "The Manticore's eyes glow a deep red, its tail lashing in anticipation. To your right, a small boulder sits among a patch of wildflowers, and a few feet away you spot a broken branch. As you take in your surroundings, you realize that your only hope for survival is to choose your strategy wisely.",
    keywords: 'Manticore, forest, fog, river, fallen tree, boulder, wildflowers, broken branch',
    title: 'The Manticore of the Forest Fog',
    options: [
      {
        type: 'attack',
        description: 'Charge head-on',
        damage: 12,
        outcome:
          'You lunge forward, your weapon held tight in your hands. The Manticore rears back, ready to strike. As you approach, you can feel its hot breath on your face. Your attack is swift and true, but it is not enough to stop the Manticore. You quickly jump back and prepare for the next exchange.',
        success: false,
        hidden: false,
      },
      {
        type: 'defend',
        description: 'Wait and block',
        damage: 18,
        outcome:
          "You brace yourself, readying your weapon to block the Manticore's attack. You wait, focusing on your breathing and the strength of your arms. The Manticore lunges forward, its claws and teeth glinting in the light. You manage to parry its attack, but not without sustaining some damage.",
        success: false,
        hidden: false,
      },
      {
        type: 'improvise',
        description: 'Find an object',
        damage: 22,
        outcome:
          "You scan the area, looking for something you can use as a weapon. You see a broken branch nearby and a small boulder a few feet away. You swiftly grab the branch and hurl it at the Manticore. It yelps in surprise, but it is not enough to stop it. You take a few steps back, preparing for the Manticore's counterattack.",
        success: false,
        hidden: false,
      },
      {
        type: 'evade',
        description: 'Dodge and retreat',
        damage: 0,
        outcome:
          "You duck and weave around the Manticore's attacks, quickly retreating into the nearby trees. You hear the Manticore snarling in frustration, but you have escaped unscathed. With a heavy heart, you turn and make your way back home.",
        success: true,
        hidden: false,
      },
    ],
    imageURL:
      'https://openai-labs-public-images-prod.azureedge.net/user-aELAcWRy1LRmLokHdUzjRo8t/generations/generation-sY6Ni48Oh5Yq5IBV052WiKBu/image.webp',
  };

  const emptyEncounter: Encounter = {
    creature: '',
    paragraph1: '',
    paragraph2: '',
    keywords: '',
    title: '',
    options: [],
    imageURL: '',
  };

  const { weapon } = useAppContext();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [getEncounter, setEncounter] = useState(emptyEncounter);
  const [showLoader, setShowLoader] = useState(true);
  const [getCharacterHealth, setCharacterHealth] = useState(100);
  const [getOutcome, setOutcome] = useState<string[]>([]);

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

    try {
      // console.log(buildEncounterPrompt('knife'));

      const encounterPromptDetails = buildEncounterPrompt(weapon ? weapon : undefined);
      const textDetails = await fetchEncounterDetails(APIType.TEXT, encounterPromptDetails);

      if (!textDetails.title) {
        setIsLoading(false);
        router.push('/error');
        return;
      }

      const imagePromptDetails = imagePrompt(textDetails.paragraph1 + textDetails.paragraph2);
      const imageDetails = await fetchEncounterDetails(APIType.IMAGE, imagePromptDetails);

      const encounterDetails = {
        ...textDetails,
        imageURL: imageDetails.url,
      };

      console.log(encounterPromptDetails);
      console.log(encounterDetails);
      console.log(imagePromptDetails);

      setEncounter(encounterDetails);
      setIsLoading(false);
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
            <img src={getEncounter.imageURL} alt="temp" />
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
          {getEncounter.options.map(option => {
            return (
              <button
                key={option.description}
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

  function updateHealth(damage: number) {
    const updatedHealth = getCharacterHealth - damage;
    updatedHealth < 0 ? 0 : updatedHealth;

    setCharacterHealth(updatedHealth);
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
    const option = _.find(getEncounter.options, ['type', actionType]);
    if (!_.isEmpty(option)) {
      const newOutcome = [...getOutcome, option.outcome];
      setOutcome(newOutcome);

      if (option.success) {
        hideAllActions();
      } else {
        option.hidden = true;
      }

      const updatedOptions = {
        ...getEncounter.options,
        ...option,
      };

      const updatedEncounter = {
        ...getEncounter,
        ...updatedOptions,
      };

      updateHealth(option.damage);

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
                <div className="encounter__description">{getEncounter.paragraph1}</div>
                <div className="encounter__description">{getEncounter.paragraph2}</div>
                <div className="encounter__outcomes">{renderOutcomes()}</div>
                <div className="encounter__options">{renderOptions()}</div>

                <div>
                  <CharacterStats health={getCharacterHealth} />
                  <button className="prompt-button" onClick={() => setIsLoading(true)}>
                    Loading: true
                  </button>
                  <button className="prompt-button" onClick={() => setIsLoading(false)}>
                    Loading: false
                  </button>
                  <button
                    className="prompt-button"
                    onClick={() => fetchEncounter()}
                    // onClick={() => {
                    //   setEncounter(mockEncounter);
                    //   setIsLoading(false);
                    // }}
                  >
                    New Encounter
                  </button>
                  <br />
                </div>
              </>
            </div>
          </CSSTransition>
        </div>
      </div>

      <div className={isLoading ? 'foo' : 'hidden'}>
        <button
          className="prompt-button"
          onClick={() => fetchEncounter()}
          // onClick={() => {
          //   setEncounter(mockEncounter);
          //   setIsLoading(false);
          // }}
        >
          New Encounter
        </button>
        <br />
      </div>
    </>
  );
}
