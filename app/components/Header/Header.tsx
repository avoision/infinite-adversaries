import Link from 'next/link';

const Header = () => {
  return (
    <header>
      <h1>
        <Link href="/">infinite adversaries</Link>
      </h1>

      <nav>
        <Link className="link" href="/donate">
          donate
        </Link>
        <Link className="link" href="/about">
          about
        </Link>
      </nav>
    </header>
  );
};

export { Header };
