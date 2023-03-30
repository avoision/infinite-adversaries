'use client';
import './about.scss';
import { useRouter } from 'next/navigation';

export default function About() {
  const router = useRouter();

  return (
    <div className="container">
      <div className="about__content">
        <h3>About the Project</h3>
        <div className="about__content--text">
          Infinite Adversaries uses ChatGPT to generate perpetual, randomized encounters, pitting
          you against a never-ending army of imaginary enemies. Inspired by the classic{' '}
          <a href="https://en.wikipedia.org/wiki/Choose_Your_Own_Adventure">
            &ldquo;Choose Your Own Adventure&rdquo; books
          </a>{' '}
          from the 1980&apos;s, as well as Dungeons and Dragons, this project is a new take on an
          old theme: stories written and narrated by Artificial Intelligence.
        </div>
        <div className="about__content--text">
          You begin by discovering a table, and are presented with a choice of weapon. Behind the
          scenes, ChatGPT is prompted to create a random list of weapons, which changes with each
          visit. This weapon is then equipped for every encounter.
        </div>
        <div className="about__content--text">
          For each encounter, ChatGPT is asked to pick an adversary at random, and to imagine a
          location where a physical encounter is imminent. ChatGPT also imagines a set of four
          possible actions to take, as well as the outcomes of each action. Some actions result in
          damage. If you survive an encounter, you move on to another.
        </div>
        <div className="about__content--text">
          The actions and outcomes are influenced by the weapon you selected. To visualize the
          encounter, DALL-E is used to generate a random image based on the weapon, adversary, and
          location. In fact, as part of the prompt, ChatGPT is asked to come up with a one-sentence
          summary of the encounter, appropriate for a DALL-E image prompt. Because hey - why have a
          human tell an AI what to do, when you can have an AI tell another AI what to do? What
          could possibly go wrong there?
        </div>
        <div className="about__content--text">
          The code for this project is{' '}
          <a href="https://github.com/avoision/infinite-adversaries">hosted on GitHub</a>. The
          prompts that power this site (how the weapons, adversaries, and outcomes are generated)
          can be found{' '}
          <a href="https://github.com/avoision/infinite-adversaries/tree/main/app/prompts">
            in this directory
          </a>
          .
        </div>

        <h3 className="authorTitle">About the Author</h3>
        <div className="about__content--text">
          Felix Jung is a developer who had a former life as a writer. Regardless of whether
          he&apos;s writing a villanelle or a unit test, he finds it pleasurable figuring out the
          right words in the right order.
        </div>
        <div className="about__content--text">
          Note: he&apos;s sometimes lazy, as evidenced by the fact that he{' '}
          <a href="https://avoision.com/2015/08/26/villanelle-bot-poems-in-the-villanelle-form-created-using-random-posts-from-twitter.php">
            created a Twitter Bot
          </a>{' '}
          to generate villanelles automatically (
          <a href="https://twitter.com/villanellebot">@villanelleBot</a>). He might get even lazier,
          if he can figure out a way to get ChatGPT to do this for him.
        </div>
        <div className="about__content--text">
          By day, Felix works at <a href="https://grubhub.com/">Grubhub</a> where he types on a
          keyboard and stares into a monitor all day. At home when he&apos;s relaxing, Felix enjoys
          typing on a different keyboard and staring into a different monitor.
        </div>
        <div className="about__content--text">
          Felix lives in Chicago, with his wife <a href="https://avoision.com/tag/liz">Liz</a>, and
          their two bunny rabbits: <a href="https://avoision.com/tag/daisy">Daisy</a> and{' '}
          <a href="https://avoision.com/tag/hugo">Hugo</a>. He runs{' '}
          <a href="https://avoision.com/">avoision.com</a>, a personal blog he&apos;s been updating
          since 2002.
        </div>
        <div className={'about__content--options'}>
          <button
            className="about__content--button"
            onClick={() => window.open('https://www.buymeacoffee.com/felixjung')}
          >
            Buy me a coffee
          </button>
          <button
            className="about__content--button"
            onClick={() => window.open('https://avoision.com')}
          >
            visit avoision.com
          </button>

          <button
            className="about__content--button"
            onClick={e => {
              window.location.href = 'mailto:felixjung@gmail.com';
              e.preventDefault();
            }}
          >
            Contact Felix
          </button>
        </div>
      </div>
    </div>
  );
}
