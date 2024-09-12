"use client";
import Link from 'next/link';
/*const Sidebar = () => {
    return (
      <aside>
        <p>Sidebar content</p>
        <style jsx>{`
          aside {
            width: 200px;
            background: #f4f4f4;
            padding: 20px;
          }
        `}</style>
      </aside>
    );
  };
  
  export default Sidebar;*/
  /*const Sidebar = () => {
    return (
      <aside className="sidebar">
        <ul>
          <li><Link href="/">Panel de control</Link></li>
          <li><Link href="/clientes">Clientes</Link></li>
          <li><Link href="/productos">Productos</Link></li>
          <li><Link href="/pedidos">Pedidos</Link></li>
        </ul>
        <style jsx>{`
          .sidebar {
            width: 250px;
            background-color: #0070f3;
            padding: 20px;
            border-right: 1px solid #ddd;
          }
          ul {
            list-style-type: none;
            padding: 0;
          }
          li {
            margin-bottom: 15px;
          }
          a {
            color: #0070f3;
            text-decoration: none;
            font-weight: bold;
          }
          a:hover {
            color: #0070f3;
            text-decoration: underline;
          }
        `}</style>
      </aside>
    );
  };
  
  export default Sidebar;*/

import { useState } from 'react';

/*const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div style={styles.sidebar(isOpen)}>
      <button style={styles.toggleButton} onClick={toggleSidebar}>
        {isOpen ? '◀' : '▶'}
      </button>
      {isOpen && (
        <ul style={styles.list}>
          <li style={styles.listItem}><Link href="/">Panel de control</Link></li>
          <li style={styles.listItem}><Link href="/clientes">Clientes</Link></li>
          <li style={styles.listItem}><Link href="/productos">Productos</Link></li>
          <li style={styles.listItem}><Link href="/pedidos">Pedidos</Link></li>
        </ul>
      )}
    </div>
  );
};

const styles = {
  sidebar: (isOpen) => ({
    width: isOpen ? '200px' : '60px',
    background: '#0070f3' ,
    padding: '20px',
    transition: 'width 0.3s ease',
    position: 'relative',
    overflow: 'hidden'
  }),
  toggleButton: {
    position: 'absolute',
    top: '10px',
    left: '10px',
    background: '#ddd',
    border: 'none',
    padding: '10px',
    cursor: 'pointer',
    fontSize: '1.2rem'
  },
  list: {
    listStyleType: 'none',
    padding: '0',
  },
  listItem: {
    marginBottom: '10px'
  }
};

export default Sidebar;*/

import { FaBars } from 'react-icons/fa';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleCloseSidebar = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="navbar">
        <FaBars className="menu-icon" onClick={toggleSidebar} />
      </div>
      
      <aside className={`sidebar ${isOpen ? 'open' : ''}`} onMouseLeave={handleCloseSidebar}>
        <ul>
          <li><Link href="/">Panel de control</Link></li>
          <li><Link href="/clientes">Clientes</Link></li>
          <li><Link href="/productos">Productos</Link></li>
          <li><Link href="/pedidos">Pedidos</Link></li>
        </ul>
      </aside>

      <style jsx>{`
        .navbar {
          position: fixed;
          top: 10px;
          left: 10px;
          z-index: 1000;
        }

        .menu-icon {
          font-size: 30px;
          cursor: pointer;
          color: #fff;
        }

        .sidebar {
          position: fixed;
          top: 0;
          left: 0;
          width: 200px;
          height: 100vh;
          background-color: #0070f3;
          color: white;
          padding: 30px;
          display: flex;
          flex-direction: column;
          transform: translateX(-100%);
          transition: transform 0.3s ease-in-out;
        }

        .sidebar.open {
          transform: translateX(0);
        }

        ul {
          list-style-type: none;
          padding: 0;
        }

        li {
          margin-bottom: 20px;
        }

        a {
          color: white;
          text-decoration: none;
          font-size: 18px;
        }

        a:hover {
          text-decoration: underline;
        }
      `}</style>
    </>
  );
}

