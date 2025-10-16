import React from "react";
import "../homes.css";

export default function FilterSection() {
  return (
    <div>
      <h2>
        تصفح أفضل <span style={{ color: "#b02a5b" }}>الشُقق</span> المتاحة للبيع
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
    </div>
  );
}
