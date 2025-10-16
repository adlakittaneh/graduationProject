import { Link } from "react-router-dom";
import "./footer.css"; // تأكدي من وجود ملف التنسيق

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        {/* العمود الأول */}
        <div className="footer-col brand">
          <h4>عقاراتي</h4>
          <p>منصة عقارية ذكية تساعدك في إيجاد العقار المثالي بسهولة وأمان</p>
        </div>

        {/* العمود الثاني */}
        <div className="footer-col">
          <h4>روابط سريعة</h4>
          <ol className="footer-links">
            <li>
              <Link to="/sale">عقارات للبيع</Link>
            </li>
            <li>
              <Link to="/rent">عقارات للإيجار</Link>
            </li>
            <li>
              <Link to="/add">أضف عقارك</Link>
            </li>
            <li>
              <Link to="/contact">اتصل بنا</Link>
            </li>
          </ol>
        </div>

        {/* العمود الثالث */}
        <div className="footer-col">
          <h4>أنواع العقارات</h4>
          <ol className="footer-links">
            <li>
              <Link to="/homes">شقق</Link>
            </li>
            <li>
              <Link to="/villas">فلل</Link>
            </li>
            <li>
              <Link to="/lands">أراضي</Link>
            </li>
            <li>
              <Link to="/stores">محلات تجارية</Link>
            </li>
            <li>
              <Link to="/offices">مكاتب</Link>
            </li>
          </ol>
        </div>

        {/* العمود الرابع */}
        <div className="footer-col">
          <h4>خدمات إضافية</h4>
          <ol className="footer-links">
            <li>
              <Link to="/favorites">المفضلة</Link>
            </li>
            <li>
              <Link to="/login">تسجيل الدخول</Link>
            </li>
            <li>
              <Link to="/signup">إنشاء حساب</Link>
            </li>
            <li>
              <Link to="/buy">شراء عقار</Link>
            </li>
          </ol>
        </div>

        {/* العمود الخامس */}
        <div className="footer-col">
          <h4>تواصل معنا</h4>
          <ol className="social-list">
            <li>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.linkedin.com/in/adla-kittaneh2003/"
                aria-label="LinkedIn"
              >
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
            </li>
            <li>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.instagram.com/adol_h_kittaneh/"
                aria-label="Instagram"
              >
                <i className="fa-brands fa-instagram"></i>
              </a>
            </li>
            <li>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.facebook.com/ad.l.h.kittaneh/"
                aria-label="Facebook"
              >
                <i className="fa-brands fa-facebook-f"></i>
              </a>
            </li>
          </ol>
        </div>
      </div>
    </footer>
  );
}
