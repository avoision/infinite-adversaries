'use client';
import './donate.scss';
import { useRouter } from 'next/navigation';

export default function Donate() {
  const router = useRouter();

  return (
    <div className="container">
      <div className="donate__content">
        <h3>Donate</h3>
        <div className="donate__content--text">
          While the source code for this project is{' '}
          <a href="https://github.com/avoision/infinite-adversaries">available on GitHub</a>, I
          recognize that not everyone&apos;s a developer. I wanted folks to be able to try out a few
          encounters, without needing to know the ins and outs of setting up a NextJS project on
          their local machine.
        </div>
        <div className="donate__content--text">
          To that end - I&apos;m taking on the costs of keeping this project wired up. Here are the
          various calls that happen:
          <ul>
            <li>A request to ChatGPT for random weapon data</li>
            <li>A request to ChatGPT for random encounter data</li>
            <li>A request to ChatGPT for random options data</li>
            <li>A Request to DALL-E for an image</li>
          </ul>
        </div>
        <div className="donate__content--text">
          Price-wise, things break down roughly like this
          <ul>
            <li>
              weapon data (text-davinci-003): 650 tokens / <span className="cost">$0.013</span>
            </li>
            <li>
              encounter data (text-davinci-003): 900 tokens / <span className="cost">$0.018</span>
            </li>
            <li>
              options data (text-davinci-003): 600 tokens / <span className="cost">$0.012</span>
            </li>
            <li>
              image: <span className="cost">$0.02</span>
            </li>
          </ul>
        </div>
        <div className="donate__content--text">
          So for a single encounter, start to finish, it&apos;s looking to be a little over{' '}
          <span className="cost">$0.06</span>. Not terrible, in the grand scheme of things. But it
          gets a little tricky, if this site gets popular.
        </div>
        <div className="donate__content--text">
          If I get 100 people visiting per day and each person goes through just one encounter...
          that&apos;ll be <span className="cost">$6.00</span>. Assuming that small amount of traffic
          stays steady, that turns into <span className="cost">$42</span> at the end of a week.
        </div>
        <div className="donate__content--text">
          I don&apos;t particularly like asking for money, mostly because it has a subtle
          implication that the only reason I did all this stuff was to get paid. But AIs cost money
          it turns out.
        </div>
        <div className="donate__content--text">
          So depending on the traffic I get, we&apos;ll see how long I can afford to keep things
          running. If you enjoyed this project and want to chip in a few dollars to keep the lights
          on, well... much appreciated. Thanks!
        </div>
        <div className={'donate__content--options'}>
          <button
            className="donate__content--button cta"
            onClick={() => window.open('https://www.buymeacoffee.com/felixjung')}
          >
            Donate to the project
          </button>
          <button className="donate__content--button" onClick={() => router.push('/about')}>
            Learn more about the project
          </button>
          <button
            className="donate__content--button"
            onClick={() => window.open('https://avoision.com')}
          >
            visit avoision.com
          </button>
          <button
            className="donate__content--button"
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
