'use client';
import './about.scss';
import { useRouter } from 'next/navigation';

export default function About() {
  const router = useRouter();

  return (
    <div className="container">
      <div className="about__content">
        <h3>About</h3>
        <div className="about__content--text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In accumsan ligula at laoreet
          consequat. Fusce a ante sit amet enim ornare eleifend. Interdum et malesuada fames ac ante
          ipsum primis in faucibus.
        </div>
        <div className="about__content--text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In accumsan ligula at laoreet
          consequat. Fusce a ante sit amet enim ornare eleifend. Interdum et malesuada fames ac ante
          ipsum primis in faucibus.
        </div>
        <div className="about__content--text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In accumsan ligula at laoreet
          consequat. Fusce a ante sit amet enim ornare eleifend. Interdum et malesuada fames ac ante
          ipsum primis in faucibus.
        </div>

        <div className={'about__content--options'}>
          <button className="about__content--button cta" onClick={() => router.push('/donate')}>
            Keep the site running: Donate
          </button>
          <button
            className="about__content--button"
            onClick={() => window.open('https:avoision.com')}
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

{
  /* <a href="https://www.buymeacoffee.com/felixjung" target="_blank">
  <img
    src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png"
    alt="Buy Me A Coffee"
    className="buyMeACoffee"
  />
</a>; */
}
