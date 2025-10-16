import React from "react";
import "../App.css";
import OfferBox from "../offerbox";

export default function Vellas() {
  const villas = [
    {
      id: 1,
      type: "فيلا",
      city: "رام الله",
      country: "فلسطين",
      rooms: 5,
      bathrooms: 4,
      area: 300,
      price: 500000,
      tag: "للبيع",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=500&h=300&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=500&h=300&fit=crop",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=500&h=300&fit=crop",
        "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=500&h=300&fit=crop",
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=500&h=300&fit=crop"
      ]
    },
    {
      id: 2,
      type: "فيلا",
      city: "نابلس",
      country: "فلسطين",
      rooms: 4,
      bathrooms: 3,
      area: 250,
      price: 3500,
      tag: "للايجار",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=500&h=300&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=500&h=300&fit=crop",
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=500&h=300&fit=crop",
        "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=500&h=300&fit=crop"
      ]
    },
    {
      id: 3,
      type: "فيلا",
      city: "الخليل",
      country: "فلسطين",
      rooms: 6,
      bathrooms: 5,
      area: 400,
      price: 750000,
      tag: "للبيع",
      image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=500&h=300&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=500&h=300&fit=crop",
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=500&h=300&fit=crop",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=500&h=300&fit=crop"
      ]
    }
  ];

  return (
    <div>
      <h2>
        تصفح أفضل <span style={{ color: "#b02a5b" }}>الفلل</span> المتاحة للبيع
        والإيجار
      </h2>

      <section className="headerPage">
        <section className="filter">
          <h3>تصفية النتائج</h3>

          <select id="price" name="propertyType">
            <option value="allproperty">جميع الأنواع</option>
            <option value="homes">شُقق</option>
            <option value="villas" selected>فلل</option>
            <option value="lands">أراضي</option>
            <option value="stores">محلات تجارية</option>
            <option value="office">مكاتب</option>
          </select>

          <select id="type" name="propertyPrice">
            <option value="allPrice">جميع الأسعار</option>
            <option value="under50000">أقل من ٥٠٬٠٠٠ دينار</option>
            <option value="50000to70000">
              من ٥٠٬٠٠٠ دينار إلى ٧٠٬٠٠٠ دينار
            </option>
            <option value="80000to90000">
              من ٨٠٬٠٠٠ دينار إلى ٩٠٬٠٠٠ دينار
            </option>
            <option value="over1000000">١٬٠٠٠٬٠٠٠ دينار فأكثر</option>
          </select>

          <select id="city" name="propertyCity">
            <option value="allCity">جميع المدن</option>
            <option value="nablus">نابلس</option>
            <option value="ramallah">رام الله</option>
            <option value="hebron">الخليل</option>
            <option value="bethlehem">بيت لحم</option>
            <option value="jenin">جنين</option>
            <option value="quds">القدس</option>
          </select>

          <button className="searchbtn">ابحث</button>
          <button className="deletebtn">إعادة تعيين</button>
        </section>
      </section>

      <div className="offers-container">
        {villas.map((villa) => (
          <OfferBox key={villa.id} property={villa} />
        ))}
      </div>
    </div>
  );
}
