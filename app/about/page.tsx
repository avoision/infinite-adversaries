import react from 'React';

export default function About() {
  return (
    <div className="container">
      <div className="about">
        <h3>About</h3>
        <p>
          Keep in mind... we're asking an AI to imagine fantastical aliens and mythological
          creatures, and to spin up bespoke adventures via on-the-fly, unstructured JSON.
        </p>

        <div>
          <a href="https://www.buymeacoffee.com/felixjung" target="_blank">
            <img
              src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png"
              alt="Buy Me A Coffee"
              className="buyMeACoffee"
            />
          </a>
        </div>
      </div>
    </div>
  );
}
