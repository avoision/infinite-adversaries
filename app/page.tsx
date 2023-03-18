"use client";

import React, { useState, useEffect } from "react";
import "./page.scss";
import Image from "next/image";
import loader from "../public/img/Loading_icon.gif";
import { encounterPrompt } from "./prompts/encounterText";
import { imagePrompt } from "./prompts/encounterImage";

type EncounterOption = {
  // type: "attack" | "defend" | "counter" | "escape";
  type: string;
  description: string;
  damage: number;
  outcome: string;
  success: boolean;
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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // fetchEncounter();
  }, []);

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
      },
      {
        type: "defend",
        description: "Wait and block",
        damage: 18,
        outcome:
          "You brace yourself, readying your weapon to block the Manticore's attack. You wait, focusing on your breathing and the strength of your arms. The Manticore lunges forward, its claws and teeth glinting in the light. You manage to parry its attack, but not without sustaining some damage.",
        success: false,
      },
      {
        type: "improvise",
        description: "Find an object",
        damage: 22,
        outcome:
          "You scan the area, looking for something you can use as a weapon. You see a broken branch nearby and a small boulder a few feet away. You swiftly grab the branch and hurl it at the Manticore. It yelps in surprise, but it is not enough to stop it. You take a few steps back, preparing for the Manticore's counterattack.",
        success: false,
      },
      {
        type: "evade",
        description: "Dodge and retreat",
        damage: 0,
        outcome:
          "You duck and weave around the Manticore's attacks, quickly retreating into the nearby trees. You hear the Manticore snarling in frustration, but you have escaped unscathed. With a heavy heart, you turn and make your way back home.",
        success: true,
      },
    ],
    imageURL:
      "https://oaidalleapiprodscus.blob.core.windows.net/private/org-TvclE3HHlydCp5Hb9NvNeyl8/user-aELAcWRy1LRmLokHdUzjRo8t/img-d4ogX7ywiIQSAiUCA8vWHn27.png?st=2023-03-18T21%3A45%3A29Z&se=2023-03-18T23%3A45%3A29Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-03-18T19%3A09%3A26Z&ske=2023-03-19T19%3A09%3A26Z&sks=b&skv=2021-08-06&sig=LD24qoTofJ7UxNdFq1%2BrInpGjn8BY9k50rBbAV5mXmY%3D",
  };

  // const [getEncounter, setEncounter] = useState(emptyEncounter);
  const [getEncounter, setEncounter] = useState(mockEncounter);

  function clearEncounter() {
    setEncounter(emptyEncounter);
  }

  enum APIType {
    TEXT = "text",
    IMAGE = "image",
  }

  async function fetchEncounterDetails(apiType: APIType, prompt: string) {
    const apiURL = apiType === APIType.TEXT ? "/api/get-encounter" : "/api/get-image";
    const detailFetch = await fetch(apiURL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });

    const detailFetchConverted = await detailFetch.json();

    return detailFetchConverted;
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

  function renderLoader() {
    return (
      isLoading && (
        <div className="encounter__image--primary">
          <Image src={loader} alt="temp" />;
        </div>
      )
    );
  }

  function renderImage() {
    return (
      !isLoading &&
      getEncounter.imageURL !== "" && (
        <>
          <div className="encounter__image--primary">
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

  function renderOptions() {
    let options = null;
    if (!isLoading && getEncounter.options.length > 0) {
      options = (
        <>
          {getEncounter.options.map(option => {
            return (
              <button
                className="prompt-button"
                key={option.description}
                onClick={() => alert("woo")}
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

  return (
    <div className="container">
      <div className="encounter">
        <div className="encounter__image">
          {renderLoader()}
          {renderImage()}
        </div>

        <h3 className="encounter__title">{getEncounter.title}</h3>
        <div className="encounter__description">{getEncounter.paragraph1}</div>
        <div className="encounter__description">{getEncounter.paragraph2}</div>
        <div className="encounter__options">{renderOptions()}</div>

        <div className="encounter__riddleText">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </div>

        <button className="prompt-button" onClick={fetchEncounter}>
          New Encounter
        </button>
      </div>
    </div>
  );
}
