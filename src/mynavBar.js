import { useState } from "react";
import { Link } from "react-router-dom";
import "./navBar.css";

export default function NavBar() {
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const handleLinkClick = () => {
    setMenuOpen(false);
  };
  const [menuOpen, setMenuOpen] = useState(false);
  const pages = [
    { id: 1, name: "الرئيسيه", path: "/" },
    /* { id: 2, name: "للبيع", path: "/sale" },
    { id: 3, name: "للايجار", path: "/rent" },
    { id: 4, name: "للشراء", path: "/buy" },*/
    { id: 5, name: "الاتصال", path: "/contact" },
    { id: 6, name: "المفضلة", path: "/favorites" },
    { id: 7, name: "اضف عقاراً", path: "/add" },
    { id: 8, name: "انشاء حساب", path: "/signup" },
    { id: 9, name: "تسجيل الدخول", path: "/login" },
  ];

  const createBtnList = pages.map((item) => {
    return (
      <li key={item.id}>
        <Link to={item.path} onClick={handleLinkClick}>
          {item.name}
        </Link>
      </li>
    );
  });

  return (
    <header>
      <nav>
        {/* زر الهامبرغر */}
        <div className="menu-toggle" id="menu-toggle" onClick={toggleMenu}>
          <i className="fa-solid fa-bars"></i>
        </div>

        {/* logo */}
        <ul className="nav-right" id="nav-right">
          <li>
            <Link to="/home" className="logo">
              <span>عقار</span>
            </Link>
          </li>
        </ul>

        {/* list */}
        <ul className={`nav-left ${menuOpen ? "active" : ""}`} id="nav-left">
          {createBtnList}
        </ul>
      </nav>
    </header>
  );
}
