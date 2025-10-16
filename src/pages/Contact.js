import React, { useState } from "react";
import "../contact.css";

export default function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState(null); // null | "sending" | "success" | "error"

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    // مثال: هنا ممكن تبعتي البيانات لـ API. الآن بنعمل محاكاة.
    try {
      // محاكاة إرسال (لو عندك API استبدلي الجزء ده بطلب fetch/axios)
      await new Promise((res) => setTimeout(res, 800));

      // بعد الإرسال الناجح
      setStatus("success");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <section
      className="contact-section"
      dir="rtl"
      aria-labelledby="contact-title"
    >
      <h2 id="contact-title">تواصل معنا</h2>
      <p>
        هل لديك استفسار أو ترغب بمعرفة المزيد عن عقاراتنا؟ أرسل لنا رسالة وسنرد
        عليك في أقرب وقت.
      </p>

      <form className="contact-form" onSubmit={handleSubmit}>
        <label htmlFor="name">الاسم الكامل</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="اكتب اسمك الكامل"
          value={form.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">البريد الإلكتروني</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="example@email.com"
          value={form.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="phone">رقم الهاتف</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          placeholder="05XXXXXXXX"
          value={form.phone}
          onChange={handleChange}
          required
        />

        <label htmlFor="message">الرسالة</label>
        <textarea
          id="message"
          name="message"
          rows="5"
          placeholder="اكتب رسالتك هنا..."
          value={form.message}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={status === "sending"}>
          {status === "sending" ? "جاري الإرسال..." : "إرسال"}
        </button>

        {status === "success" && (
          <p className="success-msg">تم إرسال الرسالة بنجاح ✅</p>
        )}
        {status === "error" && (
          <p className="error-msg">حصل خطأ أثناء الإرسال. جرّب مرة ثانية.</p>
        )}
      </form>
    </section>
  );
}
