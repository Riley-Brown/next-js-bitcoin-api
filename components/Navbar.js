import Link from 'next/link';
const Navbar = () => (
  <div>
    <ul>
      <li>
        <Link href="/">
          <a>Home</a>
        </Link>
      </li>
      <li>
        <Link href="/about">
          <a>About</a>
        </Link>
      </li>
    </ul>
    <style jsx>{`
      ul {
        background: #444;
        color: #fff;
        list-style: none;
        display: flex;
      }
      ul li {
        font-size: 1.3rem;
        margin-right: 20px;
      }
      ul li a {
        color: #fff;
        text-decoration: none;
      }
    `}</style>
  </div>
);

export default Navbar;
