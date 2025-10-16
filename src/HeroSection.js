import "./HeroSection.css";
import { useState } from "react";
export default function HeroSection() {
  const [searchText, setSearchText] = useState("");
  const handleSearch = () => {
    console.log("تم البحث عن:", searchText);
    // هون ممكن تضيفي منطق البحث أو التنقل لصفحة النتائج
  };

  return (
    <section className="style1">
      <img src="./images/background.png" className="bg-image" alt="error" />

      <div className="style1-inner">
        <div className="hero-badge">
          <div className="hero-text">
            <h1 className="hero-title">مرحباً بك في عقار</h1>
            <p className="hero-subtitle">
              خطوتك الأولى لاكتشاف أفضل الفرص العقارية
            </p>
          </div>
        </div>

        <br />

        <div className="inputSearch">
          <i>
            <i className="fa-brands fa-searchengin"></i>
          </i>
          <input
            className="input"
            type="text"
            placeholder="ابحث عن عقارك من هُنا ... (مثال : شقه مفروشه في نابلس)"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button onClick={handleSearch}>بحث</button>
        </div>
      </div>
    </section>
  );
}
