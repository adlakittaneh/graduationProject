import React from "react";
import "../App.css";
import OfferBox from "../offerbox";

export default function Lands() {
  const lands = [
    {
      id: 1,
      type: "أرض",
      city: "نابلس",
      country: "فلسطين",
      rooms: 0,
      bathrooms: 0,
      area: 500,
      price: 200000,
      tag: "للبيع",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=500&h=300&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=500&h=300&fit=crop",
        "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=500&h=300&fit=crop",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop"
      ]
    },
    {
      id: 2,
      type: "أرض",
      city: "الخليل",
      country: "فلسطين",
      rooms: 0,
      bathrooms: 0,
      area: 1000,
      price: 150000,
      tag: "للبيع",
      image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=500&h=300&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=500&h=300&fit=crop",
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=500&h=300&fit=crop",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop"
      ]
    },
    {
      id: 3,
      type: "أرض",
      city: "رام الله",
      country: "فلسطين",
      rooms: 0,
      bathrooms: 0,
      area: 750,
      price: 300000,
      tag: "للبيع",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop",
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=500&h=300&fit=crop",
        "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=500&h=300&fit=crop"
      ]
    }
  ];

  return (
    <div>
      <h2>
        تصفح أفضل <span style={{ color: "#b02a5b" }}>الأراضي</span> المتاحة للبيع
        والإيجار
      </h2>

      <section className="headerPage">
        <section className="filter">
          <h3>تصفية النتائج</h3>

          <select id="price" name="propertyType">
            <option value="allproperty">جميع الأنواع</option>
            <option value="homes">شُقق</option>
            <option value="villas">فلل</option>
            <option value="lands" selected>أراضي</option>
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
        {lands.map((land) => (
          <OfferBox key={land.id} property={land} />
        ))}
      </div>
    </div>
  );
}
