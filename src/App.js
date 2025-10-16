import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Footer from "./myFooter";
import NavBar from "./mynavBar";
import OfferBox from "./offerbox";
import HeroSection from "./HeroSection";
import PropertyContainer from "./PropertyContainer";
import Sale from "../src/pages/Sale";
import Rent from "../src/pages/Rent";
import Buy from "../src/pages/Buy";
import Contact from "../src/pages/Contact";
import Favorites from "../src/pages/Favorites";
import AddProperty from "../src/pages/addProperty";
import SignUp from "../src/pages/singUpPage";
import Login from "../src/pages/LogInForm";
import Homes from "../src/pages/homes";
import Vellas from "../src/pages/vella";
import Lands from "../src/pages/lands";
import Stores from "../src/pages/store";
import Offices from "../src/pages/office";

function App() {
  const properties = [
    {
      id: 1,
      type: "شقة",
      city: "نابلس",
      country: "فلسطين",
      rooms: 3,
      bathrooms: 2,
      area: 108,
      price: 250000,
      tag: "للبيع",
      image:
        "https://opensooq-images.os-cdn.com/previews/640x480/d5/2b/d52bedab713514319562abc56df3f10d72aa0eeeab3bd2ed9f5697206ca3c505.jpg.webp",
    },
    {
      id: 2,
      type: "مكتب",
      city: "رام الله",
      country: "فلسطين",
      rooms: 0,
      bathrooms: 1,
      area: 50,
      price: 150000,
      tag: "للايجار",
      image:
        "https://img.edilportale.com/products/quando-l-shaped-office-desk-mdd-238780-rel845ce444.jpg",
    },
    {
      id: 3,
      type: "محل تجاري",
      city: "بيت لحم ",
      country: "فلسطين",
      rooms: 2,
      bathrooms: 1,
      area: 50,
      price: 150000,
      tag: "للبيع",
      image:
        "https://mostaql.hsoubcdn.com/uploads/thumbnails/1152843/61dc16b3562c8/%D8%AA%D8%B5%D9%85%D9%8A%D9%85-%D8%AF%D8%A7%D8%AE%D9%84%D9%8A-%D8%AA%D8%B5%D9%85%D9%8A%D9%85-%D9%85%D9%86%D8%A7%D8%B2%D9%84-%D8%AA%D8%B5%D9%85%D9%8A%D9%85-%D8%A5%D8%A8%D8%AF%D8%A7%D8%B9%D9%8A-%D8%AA%D8%B5%D9%85%D9%8A%D9%85-%D8%A7%D9%84%D8%A3%D8%AB%D8%A7%D8%AB-%D8%AA%D8%B5%D9%85%D9%8A%D9%85-%D8%AF%D9%8A%D9%83%D9%88%D8%B1-Interior-Design-3D-Modeling-landscape-Design-Rendering-2.jpg",
    },
  ];

  return (
    <div>
      <NavBar />

      <Routes>
        {/* الصفحة الرئيسية */}
        <Route
          path="/"
          element={
            <>
              <HeroSection />
              <section className="style2">
                <h1>تصفح حسب النوع</h1>
                <h5>اختر نوع العقار الذي يناسبك</h5>
              </section>
              <PropertyContainer />
              <h5>أفضل العروض المتاحه حالياً</h5>
              <div className="offers-container">
                {properties.map((property) => (
                  <OfferBox key={property.id} property={property} />
                ))}
              </div>
            </>
          }
        />

        {/* إعادة توجيه من /home إلى الصفحة الرئيسية */}
        <Route path="/home" element={<Navigate to="/" replace />} />

        {/* باقي الصفحات */}
        <Route path="/sale" element={<Sale />} />
        <Route path="/rent" element={<Rent />} />
        <Route path="/buy" element={<Buy />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/add" element={<AddProperty />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        
        {/* صفحات أنواع العقارات */}
        <Route path="/homes" element={<Homes />} />
        <Route path="/villas" element={<Vellas />} />
        <Route path="/lands" element={<Lands />} />
        <Route path="/stores" element={<Stores />} />
        <Route path="/offices" element={<Offices />} />

        {/* معالجة أي مسار غير معروف */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
