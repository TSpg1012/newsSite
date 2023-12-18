import React from "react";
import image from "./../Images/nbclogo.png";
import image2 from "../Images/pngegg.png";
import "./FooterC.scss";
type Props = {};

function Footer({}: Props) {
  return (
    <footer
      style={{
        backgroundColor: "#102039",
        display: "flex",
        gap: "40px",
      }}
    >
      <div className="logo">
        <a href="https://www.nbc.com/">
          <img src={image} alt="" style={{ height: "30px" }} />
        </a>
      </div>
      <div className="footerInfo">
        <div className="infoList" style={{ display: "flex", gap: "100px" }}>
          <ul>
            <li>ABOUT</li>
            <li>CONTACT</li>
            <li>HELP</li>
            <li>CAREERS</li>
            <li>AD CHOICES</li>
          </ul>
          <ul>
            <li>PRIVACY POLICY</li>
            <li>COOKIE NOTICE</li>
            <li>CA NOTICE</li>
            <li>TERMS OF SERVICE</li>
            <li>NBC NEWS SITEMAP</li>
          </ul>
          <ul>
            <li>CLOSED CAPTIONING</li>
            <li>ADVERTISE</li>
            <li>SELECT SHOPPING</li>
            <li>SELECT PERSONAL FINANCE</li>
          </ul>
        </div>
        <div className="copyrights">
          <p>
            <span> &copy; 2023 NBC UNIVERSAL</span>
          </p>
        </div>
        <ul className="othernbc">
          <li>
            <a href="./">
              <img src={image2} alt="" style={{ height: "20px" }} /> NBC NEWS
            </a>
          </li>
          <li>
            <a href="https://www.msnbc.com/">
              <img src={image2} alt="" style={{ height: "20px" }} /> MSNBC
            </a>
          </li>
          <li>
            <a href="https://www.today.com/">
              <img src={image2} alt="" style={{ height: "20px" }} /> TODAY
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
