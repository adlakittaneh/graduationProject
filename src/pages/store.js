import React from "react";
import "../App.css";
import OfferBox from "../offerbox";

export default function Store() {
  const stores = [
    {
      id: 1,
      type: "محل تجاري",
      city: "بيت لحم",
      country: "فلسطين",
      rooms: 0,
      bathrooms: 1,
      area: 30,
      price: 75000,
      tag: "للبيع",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&h=300&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&h=300&fit=crop",
        "https://images.unsplash.com/photo-1555529904-4a6a0a4a0a4a?w=500&h=300&fit=crop",
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&h=300&fit=crop"
      ]
    },
    {
      id: 2,
      type: "محل تجاري",
      city: "رام الله",
      country: "فلسطين",
      rooms: 0,
      bathrooms: 1,
      area: 45,
      price: 1200,
      tag: "للايجار",
      image: "https://images.unsplash.com/photo-1555529904-4a6a0a4a0a4a?w=500&h=300&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1555529904-4a6a0a4a0a4a?w=500&h=300&fit=crop",
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&h=300&fit=crop",
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&h=300&fit=crop"
      ]
    },
    {
      id: 3,
      type: "محل تجاري",
      city: "نابلس",
      country: "فلسطين",
      rooms: 0,
      bathrooms: 1,
      area: 60,
      price: 95000,
      tag: "للبيع",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&h=300&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&h=300&fit=crop",
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&h=300&fit=crop",
        "https://images.unsplash.com/photo-1555529904-4a6a0a4a0a4a?w=500&h=300&fit=crop"
      ]
    }
  ];

  return (
    <div>
      <h2>
        تصفح أفضل <span style={{ color: "#b02a5b" }}>المحلات التجارية</span> المتاحة للبيع
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
            <option value="stores" selected>محلات تجارية</option>
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
        {stores.map((store) => (
          <OfferBox key={store.id} property={store} />
        ))}
      </div>
    </div>
  );
}
