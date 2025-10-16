import React from "react";
import "../App.css";
import OfferBox from "../offerbox";

export default function Office() {
  const offices = [
    {
      id: 1,
      type: "مكتب",
      city: "رام الله",
      country: "فلسطين",
      rooms: 0,
      bathrooms: 1,
      area: 50,
      price: 150000,
      tag: "للبيع",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&h=300&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&h=300&fit=crop",
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=500&h=300&fit=crop",
        "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=500&h=300&fit=crop"
      ]
    },
    {
      id: 2,
      type: "مكتب",
      city: "نابلس",
      country: "فلسطين",
      rooms: 0,
      bathrooms: 2,
      area: 80,
      price: 2500,
      tag: "للايجار",
      image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=500&h=300&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=500&h=300&fit=crop",
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&h=300&fit=crop",
        "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=500&h=300&fit=crop"
      ]
    },
    {
      id: 3,
      type: "مكتب",
      city: "القدس",
      country: "فلسطين",
      rooms: 0,
      bathrooms: 1,
      area: 65,
      price: 180000,
      tag: "للبيع",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=500&h=300&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=500&h=300&fit=crop",
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&h=300&fit=crop",
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=500&h=300&fit=crop"
      ]
    }
  ];

  return (
    <div>
      <h2>
        تصفح أفضل <span style={{ color: "#b02a5b" }}>المكاتب</span> المتاحة للبيع
        والإيجار
      </h2>

      <section className="headerPage">
        <section className="filter">
          <h3>تصفية النتائج</h3>

          <select id="price" name="propertyType">
            <option value="allproperty">جميع الأنواع</option>
            <option value="homes">شُقق</option>
            <option value="villas">فلل</option>
            <option value="lands">أراضي</option>
            <option value="stores">محلات تجارية</option>
            <option value="office" selected>مكاتب</option>
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
        {offices.map((office) => (
          <OfferBox key={office.id} property={office} />
        ))}
      </div>
    </div>
  );
}
