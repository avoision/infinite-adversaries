import react from "React";

export default function About() {
  return (
    <div className="container">
      <div className="about">
        <h3>About</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In accumsan ligula at laoreet
          consequat. Fusce a ante sit amet enim ornare eleifend. Interdum et malesuada fames ac ante
          ipsum primis in faucibus.
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
