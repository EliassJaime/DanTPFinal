"use client";
import Navbar from './Navbar';
import Sidebar from './Sidebar';
/*const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="container">
        <Sidebar />
        <main>{children}</main>
      </div>
      <style jsx>{`
        .container {
          display: flex;
        }
        main {
          flex: 1;
          padding: 20px;
        }
      `}</style>
    </div>
  );
};*/

import Image from 'next/image';


const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="main-container">
        <Sidebar />
        <main>{children}</main>
      </div>
      <style jsx>{`
        .main-container {
          display: flex;
          min-height: 100vh;
        }
        main {
          flex: 1;
          padding: 20px;
          background-color: #f4f4f4;
        }
      `}</style>
    </div>
  );
};

export default Layout;



