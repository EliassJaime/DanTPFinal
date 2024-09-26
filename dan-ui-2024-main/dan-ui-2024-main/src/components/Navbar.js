"use client";
import Link from 'next/link';
import Image from 'next/image';

/*const Navbar = () => {
  return (
    <nav>
      <Link href="/clientes">Clientes</Link>
      <Link href="/productos">Productos</Link>
      <Link href="/pedidos">Pedidos</Link>
      <style jsx>{`
        nav {
          background: #333;
          padding: 10px;
        }
        a {
          color: white;
          margin-right: 10px;
          text-decoration: none;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;*/


const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link href="/">
        <img src="/logo-utn.png" alt="Logo" width={50} height={50} />
        </Link>
      </div>
      <div className="nav-links">
          <Link href="/clientes">Clientes</Link>
          <Link href="/productos">Productos</Link>
          <Link href="/pedidos">Pedidos</Link>
      </div>
      <style jsx>{`
        .navbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background-color: #0070f3;
          padding: 10px 20px;
          color: white;
        }
        .logo img {
          display: block;
        }
        .nav-links {
          display: flex;
          gap: 15px;
        }
        a {
          color: white;
          text-decoration: none;
          font-weight: bold;
          transition: color 0.3s ease;
        }
        a:hover {
          color: #eaeaea;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
