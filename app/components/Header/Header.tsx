import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/img/logo.png";

const Header = () => {
  return (
    <header>
      <Image src={logo} alt="logo" className="logo" />;
      <nav>
        <Link className="link" href="/about">
          ?
        </Link>
      </nav>
    </header>
  );
};

export { Header };
