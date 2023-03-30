## About

Infinite Adversaries is a project that uses ChatGPT and DALL-E to create perpetual, procedural encounters that involve random weapons, adversaries, locations, and outcomes. Through prompts, ChatGPT is instructed to come up with a scenario that describes a physical confrontation - resulting in the user choosing which actions to take.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, install the project dependencies using

```bash
npm install
# or
yarn install
```

To run this project locally, you'll need an API key in order to make calls to both ChatGPT and DALL-E. Create an account at[openai.com](https://platform.openai.com/), and go through the steps to create an api-key.

Note: while requests cost money, you get a set amount of credit by signing up. You should be able to play around with this project for a while, before needing to actually pay for credits.

Next, create a `.env` file in the root of the directory that contains the following:

```bash
OPENAI_API_KEY=some-api-key
```

Replace `some-api-key` with your actual API key. Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. If all goes well, you should be running Infinite Adversaries locally on your machine!

## Play

Take a look at the files inside `app/prompts`, as these are the actual prompts that direct ChatGPT and DALL-E to generate content. You can either play with the existing logic, or simply replace the prompts outright with anything you like.

`weaponText.ts`: This controls the initial page, where ChatGPT determines what weapons to present to the user.

`encounterText.ts`: This controls the overall encounter with an adversary, along with the possible options and outcomes of each option. This also controls the "final" text that appears, should the user not survive the encounter.

`encounterImage.ts`: This controls what is sent to DALL-E, combining details of teh encounter with randomized parameters for the type of visual media desired.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
