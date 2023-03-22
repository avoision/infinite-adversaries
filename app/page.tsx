"use client";

import React, { useState, useEffect } from "react";
import "./styles/encounter.scss";
import Image from "next/image";
import loader from "../public/img/Loading_icon.gif";
import { encounterPrompt } from "./prompts/encounterText";
import { imagePrompt } from "./prompts/encounterImage";
import _ from "lodash";
import { CharacterStats, Loader } from "./components";
import { fetchEncounterDetails, APIType } from "./api/openai";

type EncounterOption = {
  // type: "attack" | "defend" | "counter" | "escape";
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
  summary: string;
  options: EncounterOption[];
  imageURL: string;
}

export default function Encounter() {
  const mockEncounter = {
    creature: "Manticore",
    paragraph1:
      "The air is thick with tension as you prepare to face off against the Manticore. It snarls, its lion body bristling with spikes and its bat wings spread wide. You stand in a clearing in the middle of a dense forest, surrounded by towering trees and choked with heavy fog. In the distance you can see a nearby river, the water crashing against jagged rocks. To your left, a fallen tree lies on the ground, its trunk covered in moss and mushrooms.",
    paragraph2:
      "The Manticore's eyes glow a deep red, its tail lashing in anticipation. To your right, a small boulder sits among a patch of wildflowers, and a few feet away you spot a broken branch. As you take in your surroundings, you realize that your only hope for survival is to choose your strategy wisely.",
    keywords: "Manticore, forest, fog, river, fallen tree, boulder, wildflowers, broken branch",
    title: "The Manticore of the Forest Fog",
    options: [
      {
        type: "attack",
        description: "Charge head-on",
        damage: 12,
        outcome:
          "You lunge forward, your weapon held tight in your hands. The Manticore rears back, ready to strike. As you approach, you can feel its hot breath on your face. Your attack is swift and true, but it is not enough to stop the Manticore. You quickly jump back and prepare for the next exchange.",
        success: false,
        hidden: false,
      },
      {
        type: "defend",
        description: "Wait and block",
        damage: 18,
        outcome:
          "You brace yourself, readying your weapon to block the Manticore's attack. You wait, focusing on your breathing and the strength of your arms. The Manticore lunges forward, its claws and teeth glinting in the light. You manage to parry its attack, but not without sustaining some damage.",
        success: false,
        hidden: false,
      },
      {
        type: "improvise",
        description: "Find an object",
        damage: 22,
        outcome:
          "You scan the area, looking for something you can use as a weapon. You see a broken branch nearby and a small boulder a few feet away. You swiftly grab the branch and hurl it at the Manticore. It yelps in surprise, but it is not enough to stop it. You take a few steps back, preparing for the Manticore's counterattack.",
        success: false,
        hidden: false,
      },
      {
        type: "evade",
        description: "Dodge and retreat",
        damage: 0,
        outcome:
          "You duck and weave around the Manticore's attacks, quickly retreating into the nearby trees. You hear the Manticore snarling in frustration, but you have escaped unscathed. With a heavy heart, you turn and make your way back home.",
        success: true,
        hidden: false,
      },
    ],
    imageURL:
      "https://openai-labs-public-images-prod.azureedge.net/user-aELAcWRy1LRmLokHdUzjRo8t/generations/generation-sY6Ni48Oh5Yq5IBV052WiKBu/image.webp",
  };

  const emptyEncounter: Encounter = {
    creature: "",
    paragraph1: "",
    paragraph2: "",
    keywords: "",
    title: "",
    summary: "",
    options: [],
    imageURL: "",
  };

  const [isLoading, setIsLoading] = useState(true);
  const [getEncounter, setEncounter] = useState(emptyEncounter);
  const [getCharacterHealth, setCharacterHealth] = useState(100);
  const [getOutcome, setOutcome] = useState<string[]>([]);

  useEffect(() => {
    // fetchEncounter();
  }, []);

  function clearEncounter() {
    setEncounter(emptyEncounter);
    setOutcome([]);
  }

  async function fetchEncounter() {
    clearEncounter();
    setIsLoading(true);

    try {
      console.log("%cfetching encounter...", "background: green; color: white; display: block;");
      const textDetails = await fetchEncounterDetails(APIType.TEXT, encounterPrompt);

      const imagePromptDetails = imagePrompt(textDetails.keywords);
      const imageDetails = await fetchEncounterDetails(APIType.IMAGE, imagePromptDetails);

      const encounterDetails = {
        ...textDetails,
        imageURL: imageDetails.url,
      };

      console.log(encounterDetails);
      setEncounter(encounterDetails);

      setIsLoading(false);
    } catch {
      setIsLoading(false);
      console.error("Problem!");
    }
  }

  // function renderLoader() {
  //   return (
  //     isLoading && (
  //       <div className="encounter__image--primary">
  //         <Image src={loader} alt="temp" />
  //       </div>
  //     )
  //   );
  // }

  function renderImage() {
    return (
      !isLoading &&
      getEncounter.imageURL !== "" && (
        <>
          <div className="encounter__image--primary fadeIn">
            <img src={getEncounter.imageURL} alt="temp" />
          </div>
          <div
            className="encounter__image--blurred"
            style={{ backgroundImage: `url(${getEncounter.imageURL})` }}
          />
        </>
      )
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
    const option = _.find(getEncounter.options, ["type", actionType]);
    if (!_.isEmpty(option)) {
      console.log(option);

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

  return (
    <>
      {<Loader isLoading={isLoading} />}
      <div className="container">
        <div className="encounter">
          <div className="encounter__image">
            {/* {renderLoader()} */}
            {renderImage()}
          </div>

          {renderTitle()}
          <div className="encounter__description">{getEncounter.paragraph1}</div>
          <div className="encounter__description">{getEncounter.paragraph2}</div>
          <div className="encounter__outcomes">{renderOutcomes()}</div>
          <div className="encounter__options">{renderOptions()}</div>

          {/* {<CharacterStats health={getCharacterHealth} isLoading={isLoading} />}

          <button className="prompt-button" onClick={fetchEncounter}>
            New Encounter
          </button> */}
          <br />
          <button className="prompt-button" onClick={() => setIsLoading(true)}>
            Loading: true
          </button>
          <button className="prompt-button" onClick={() => setIsLoading(false)}>
            Loading: false
          </button>
          <br />
        </div>
      </div>
    </>
  );
}
