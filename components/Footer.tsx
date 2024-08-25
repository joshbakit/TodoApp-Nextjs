import React from "react";

const Footer = () => {
  return (
    <div className="absolute bottom-0">
      <footer className="footer footer-center bg-base-100 text-base-content p-4 rounded">
        <aside>
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved by JoshBakit
          </p>
        </aside>
      </footer>
    </div>
  );
};

export default Footer;
