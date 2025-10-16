import "./offerBox.css";
import { useState } from "react";

export default function OfferBox({ property }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // صور متعددة للعقار (يمكن إضافة المزيد)
  const images = property.images || [
    property.image,
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&h=300&fit=crop",
    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500&h=300&fit=crop",
    "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=500&h=300&fit=crop"
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="offerbox">
      <span className="tag">{property.tag}</span>
      
      {/* منطقة الصور مع أسهم التنقل */}
      <div className="image-container">
        <img src={images[currentImageIndex]} alt="property" />
        
        {/* أسهم التنقل */}
        {images.length > 1 && (
          <>
            <button 
              className="nav-arrow nav-arrow-left" 
              onClick={prevImage}
              aria-label="الصورة السابقة"
            >
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            
            <button 
              className="nav-arrow nav-arrow-right" 
              onClick={nextImage}
              aria-label="الصورة التالية"
            >
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </>
        )}
        
        {/* مؤشرات الصور */}
        {images.length > 1 && (
          <div className="image-indicators">
            {images.map((_, index) => (
              <button
                key={index}
                className={`indicator ${index === currentImageIndex ? 'active' : ''}`}
                onClick={() => setCurrentImageIndex(index)}
                aria-label={`انتقل للصورة ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="content">
        <h1>
          {property.type}
          {" في "} {property.city}{" "}
        </h1>

        <div className="location">
          <i className="fa-solid fa-location-dot"></i>
          <span style={{ fontSize: "18px" }}>
            {property.country}، {property.city}
          </span>
        </div>

        <div className="details">
          {property.type === "شقة" && (
            <>
              <span>
                <i className="fa-solid fa-bed"></i> {property.rooms}
              </span>
              <span>
                <i className="fa-solid fa-bath"></i> {property.bathrooms}
              </span>
              <span>
                <i className="fa-solid fa-ruler-combined"></i> {property.area} م
                <sup>2</sup>
              </span>
            </>
          )}
          {property.type === "محل تجاري" && (
            <>
              <span>
                <i className="fa-solid fa-bed"></i> {property.rooms}
              </span>
              <span>
                <i className="fa-solid fa-bath"></i> {property.bathrooms}
              </span>
              <span>
                <i className="fa-solid fa-ruler-combined"></i> {property.area} م
                <sup>2</sup>
              </span>
            </>
          )}

          {property.type === "مكتب" && (
            <>
              <span>
                <i className="fa-solid fa-ruler-combined"></i> {property.area} م
                <sup>2</sup>
              </span>
              <span>
                <i className="fa-solid fa-bath"></i> {property.bathrooms}
              </span>
            </>
          )}
          {property.type === "ارض" && (
            <>
              <span>
                <i className="fa-solid fa-ruler-combined"></i> {property.area} م
                <sup>2</sup>
              </span>
            </>
          )}
        </div>

        <div className="footer">
          <button>التفاصيل</button>
          <span className="price">{property.price} $</span>
        </div>
      </div>
    </div>
  );
}
