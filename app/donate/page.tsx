'use client';
import './donate.scss';
import { useRouter } from 'next/navigation';

export default function About() {
  const router = useRouter();

  return (
    <div className="container">
      <div className="donate__content">
        <h3>Donate</h3>
        <div className="donate__content--text">
          The source code for this project is available on GitHub. But I wanted to enable people to
          try out the project, without having to know all the ins and outs of setting up a NextJS
          project and running it locally.
        </div>
        <div className="donate__content--text">
          As of now, I&apos;m taking on the costs of keeping this project wired up. Each interaction
          includes the following:
          <ul>
            <li>A request to ChatGPT for random weapon data</li>
            <li>A request to ChatGPT for random encounter data</li>
            <li>A Request to DALL-E for an image</li>
          </ul>
        </div>
        <div className="donate__content--text">
          Price-wise, things break down like this
          <ul>
            <li>
              weapon data (text-davinci-003): 650 tokens / <span className="cost">$0.013</span>
            </li>
            <li>
              encounter data (text-davinci-003): 1500 tokens / <span className="cost">$0.03</span>
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
          If I get 100 people per day visiting, and each person just goes through just one
          encounter... that&apos;ll be <span className="cost">$6.00</span>. Over the course of a
          month, that&apos;s <span className="cost">$36</span>.
        </div>
        <div className="donate__content--text">
          I&apos;m honestly not sure how sustainable this site is, to keep active. I&apos;m willing
          to pay for a portion of it out of my own pocket. I&apos;m a huge fan of the Internet, and
          I&apos;ve received so many incredible things from so many incredible creators for free...
          I&apos;m down to do my part. But I guess we&apos;ll see just how much this site will cost,
          if folks start visiting on a regular basis.
        </div>
        <div className="donate__content--text">
          I don&apos;t particularly like asking for money, mostly because it has a subtle
          implication that the only reason I did all this stuff was to get paid. I like this kind of
          work, I like these kinds of projects. I&apos;d do it for free, all week long, if I could.
          And pretty much do.
        </div>
        <div className="donate__content--text">
          But AIs cost money, it turns out. So we&apos;ll see just how long we can keep things
          running. If you want to chip in a bit to keep the lights on, much appreciated.
        </div>
        <div className={'donate__content--options'}>
          <button className="donate__content--button cta" onClick={() => router.push('/about')}>
            Learn more about this project
          </button>
          <button
            className="donate__content--button"
            onClick={() => window.open('https:avoision.com')}
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
