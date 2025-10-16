import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropertyContainer from "../PropertyContainer";
import "../addProperty.css";

export default function AddProperty() {
  const [showForm, setShowForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  // تحميل بيانات المستخدم
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  // فحص الصلاحيات
  useEffect(() => {
    if (currentUser && currentUser.role !== 'owner' && currentUser.role !== 'admin') {
      alert('ليس لديك صلاحية لإضافة العقارات');
      navigate('/');
    }
  }, [currentUser, navigate]);
  
  // بيانات وهمية للعقارات المنشورة
  const [publishedProperties, setPublishedProperties] = useState([
    {
      id: 1,
      title: "شقة في وسط المدينة",
      location: "رام الله",
      price: "150000",
      type: "شقة",
      offerType: "للبيع",
      area: "120",
      bedrooms: 3,
      bathrooms: 2,
      image: "./images/eco-house.png",
      status: "منشور"
    },
    {
      id: 2,
      title: "فيلا فاخرة مع حديقة",
      location: "بيت لحم",
      price: "300000",
      type: "فيلا",
      offerType: "للبيع",
      area: "250",
      bedrooms: 4,
      bathrooms: 3,
      image: "./images/house.png",
      status: "قيد المراجعة"
    },
    {
      id: 3,
      title: "محل تجاري في شارع رئيسي",
      location: "نابلس",
      price: "80000",
      type: "محل تجاري",
      offerType: "للإيجار",
      area: "80",
      bedrooms: 0,
      bathrooms: 1,
      image: "./images/shop.png",
      status: "منشور"
    }
  ]);

  const [form, setForm] = useState({
    flocation: "",
    desc: "",
    offerType: "forSale",
    propertyType: "home",
    price: "",
    area: "",
    bedRoomNumber: "",
    pathRoomNumber: "",
    parckingNumber: "",
    constructionYear: "",
    isfurnished: false,
    hasGarden: false,
    hasCAC: false,
    hasBalcony: false,
    nearSchool: false,
    Swimmingpool: false,
    mediaUpload: [],
  });

  const [previewImages, setPreviewImages] = useState([]);

  // دالة لتحويل نوع العقار إلى نص مقروء
  const getPropertyTypeLabel = (type) => {
    const typeLabels = {
      home: "شقة",
      villa: "فيلا", 
      store: "محل تجاري",
      office: "مكتب",
      land: "أرض"
    };
    return typeLabels[type] || "عقار";
  };

  // دالة لتحويل النص إلى نوع العقار للنموذج
  const getPropertyTypeValue = (label) => {
    const typeValues = {
      "شقة": "home",
      "فيلا": "villa",
      "محل تجاري": "store", 
      "مكتب": "office",
      "أرض": "land"
    };
    return typeValues[label] || "home";
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "checkbox") {
      setForm((prev) => ({ ...prev, [name]: checked }));
    } else if (type === "file") {
      const fileArray = Array.from(files);
      
      // التحقق من الحد الأقصى للصور (10 صور)
      if (form.mediaUpload.length + fileArray.length > 10) {
        alert("يمكنك رفع 10 صور كحد أقصى");
        return;
      }
      
      // إضافة الصور الجديدة للصور الموجودة بدلاً من استبدالها
      setForm((prev) => ({ 
        ...prev, 
        mediaUpload: [...prev.mediaUpload, ...fileArray] 
      }));
      
      // إضافة معاينة الصور الجديدة للصور الموجودة
      const newPreviewUrls = fileArray.map((file) => URL.createObjectURL(file));
      setPreviewImages((prev) => [...prev, ...newPreviewUrls]);
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  // وظيفة لحذف صورة معينة
  const removeImage = (index) => {
    setForm((prev) => ({
      ...prev,
      mediaUpload: prev.mediaUpload.filter((_, i) => i !== index)
    }));
    
    // تحرير الذاكرة للصورة المحذوفة
    URL.revokeObjectURL(previewImages[index]);
    
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Property data submitted:", form);
    
    // إنشاء/تحديث بيانات العقار
    const propertyData = {
      id: editingProperty ? editingProperty.id : Date.now(),
      title: form.flocation || "عقار جديد",
      location: form.flocation || "غير محدد",
      price: form.price || "0",
      type: getPropertyTypeLabel(form.propertyType),
      offerType: form.offerType === "forSale" ? "للبيع" : "للإيجار",
      area: form.area || "0",
      bedrooms: parseInt(form.bedRoomNumber) || 0,
      bathrooms: parseInt(form.pathRoomNumber) || 0,
      image: form.mediaUpload.length > 0 ? URL.createObjectURL(form.mediaUpload[0]) : (editingProperty ? editingProperty.image : "./images/eco-house.png"),
      status: editingProperty ? editingProperty.status : "قيد المراجعة",
      description: form.desc || "",
      parking: parseInt(form.parckingNumber) || 0,
      constructionYear: form.constructionYear || "",
      features: {
        isfurnished: form.isfurnished,
        hasGarden: form.hasGarden,
        hasCAC: form.hasCAC,
        hasBalcony: form.hasBalcony,
        nearSchool: form.nearSchool,
        Swimmingpool: form.Swimmingpool
      }
    };
    
    if (editingProperty) {
      // تحديث العقار الموجود
      setPublishedProperties(prev => 
        prev.map(property => 
          property.id === editingProperty.id ? propertyData : property
        )
      );
      alert("تم تحديث العقار بنجاح ✅");
    } else {
      // إضافة عقار جديد
      setPublishedProperties(prev => [propertyData, ...prev]);
      alert("تم إرسال العقار للمراجعة ✅");
    }
    
    // إعادة تعيين النموذج وإخفاء النموذج
    setForm({
      flocation: "",
      desc: "",
      offerType: "forSale",
      propertyType: "home",
      price: "",
      area: "",
      bedRoomNumber: "",
      pathRoomNumber: "",
      parckingNumber: "",
      constructionYear: "",
      isfurnished: false,
      hasGarden: false,
      hasCAC: false,
      hasBalcony: false,
      nearSchool: false,
      Swimmingpool: false,
      mediaUpload: [],
    });
    setPreviewImages([]);
    setEditingProperty(null);
    setShowForm(false);
  };

  const handleCancel = () => {
    const message = editingProperty ? "إلغاء التعديل؟" : "إلغاء الإضافة؟";
    if (window.confirm(`هل أنت متأكد من ${message}`)) {
      setForm({
        flocation: "",
        desc: "",
        offerType: "forSale",
        propertyType: "home",
        price: "",
        area: "",
        bedRoomNumber: "",
        pathRoomNumber: "",
        parckingNumber: "",
        constructionYear: "",
        isfurnished: false,
        hasGarden: false,
        hasCAC: false,
        hasBalcony: false,
        nearSchool: false,
        Swimmingpool: false,
        mediaUpload: [],
      });
      setPreviewImages([]);
      setEditingProperty(null);
      setShowForm(false);
    }
  };

  // دالة حذف العقار
  const handleDeleteProperty = (propertyId) => {
    if (window.confirm("هل أنت متأكد من حذف هذا العقار؟")) {
      setPublishedProperties(prev => prev.filter(property => property.id !== propertyId));
      alert("تم حذف العقار بنجاح");
    }
  };

  // دالة تعديل العقار
  const handleEditProperty = (propertyId) => {
    const property = publishedProperties.find(p => p.id === propertyId);
    if (!property) return;

    // تحميل بيانات العقار في النموذج مع فحص القيم
    setForm({
      flocation: property.title || "",
      desc: property.description || "",
      offerType: property.offerType === "للبيع" ? "forSale" : "forRent",
      propertyType: getPropertyTypeValue(property.type),
      price: property.price || "",
      area: property.area || "",
      bedRoomNumber: (property.bedrooms || 0).toString(),
      pathRoomNumber: (property.bathrooms || 0).toString(),
      parckingNumber: (property.parking || 0).toString(),
      constructionYear: property.constructionYear || "",
      isfurnished: property.features?.isfurnished || false,
      hasGarden: property.features?.hasGarden || false,
      hasCAC: property.features?.hasCAC || false,
      hasBalcony: property.features?.hasBalcony || false,
      nearSchool: property.features?.nearSchool || false,
      Swimmingpool: property.features?.Swimmingpool || false,
      mediaUpload: [],
    });

    // تعيين العقار المراد تعديله
    setEditingProperty(property);
    
    // إظهار النموذج
    setShowForm(true);
  };

  return (
    <div className="add-property-container" dir="rtl">
      {!showForm ? (
        <>
          <h1>عقاراتي المنشورة</h1>
          <h2>مرحباً {currentUser?.displayName}، إدارة العقارات التي قمت بنشرها</h2>
          
          <div className="add-property-btn-container">
            <button 
              className="add-property-btn"
              onClick={() => setShowForm(true)}
            >
              <i className="fa-solid fa-plus"></i>
              إضافة عقار جديد
            </button>
          </div>

          <div className="published-properties">
            {publishedProperties.length > 0 ? (
              <div className="properties-grid">
                {publishedProperties.map((property) => (
                  <div key={property.id} className="property-card">
                    <div className="property-image">
                      <img src={property.image} alt={property.title} />
                      <div className={`status-badge ${property.status === 'منشور' ? 'published' : 'pending'}`}>
                        {property.status}
                      </div>
                    </div>
                    <div className="property-info">
                      <h3>{property.title}</h3>
                      <p className="location">
                        <i className="fa-solid fa-location-dot"></i>
                        {property.location}
                      </p>
                      <div className="property-details">
                        <span className="type">{property.type}</span>
                        <span className="offer-type">{property.offerType}</span>
                      </div>
                      <div className="property-specs">
                        <span>المساحة: {property.area} م²</span>
                        {property.bedrooms > 0 && <span>غرف النوم: {property.bedrooms}</span>}
                        <span>الحمامات: {property.bathrooms}</span>
                        {property.parking > 0 && <span>مواقف: {property.parking}</span>}
                        {property.constructionYear && <span>سنة البناء: {property.constructionYear}</span>}
                      </div>
                      
                      {/* عرض المميزات */}
                      {property.features && (
                        <div className="property-features">
                          {property.features.isfurnished && <span className="feature-tag">مفروش</span>}
                          {property.features.hasGarden && <span className="feature-tag">حديقة</span>}
                          {property.features.hasCAC && <span className="feature-tag">مكيفات</span>}
                          {property.features.hasBalcony && <span className="feature-tag">شرفة</span>}
                          {property.features.nearSchool && <span className="feature-tag">قريب من المدارس</span>}
                          {property.features.Swimmingpool && <span className="feature-tag">مسبح</span>}
                        </div>
                      )}
                      <div className="property-price">
                        <span className="price">{property.price} د.أ</span>
                      </div>
                      <div className="property-actions">
                        <button 
                          className="edit-btn"
                          onClick={() => handleEditProperty(property.id)}
                        >
                          <i className="fa-solid fa-edit"></i>
                          تعديل
                        </button>
                        <button 
                          className="delete-btn"
                          onClick={() => handleDeleteProperty(property.id)}
                        >
                          <i className="fa-solid fa-trash"></i>
                          حذف
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-properties">
                <i className="fa-solid fa-home"></i>
                <h3>لم تقم بنشر أي عقارات بعد</h3>
                <p>ابدأ بإضافة عقارك الأول</p>
                <button 
                  className="add-first-property-btn"
                  onClick={() => setShowForm(true)}
                >
                  إضافة عقار جديد
                </button>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <h1>{editingProperty ? "تعديل العقار" : "أضف عقارك"}</h1>
          <h2>
            {editingProperty 
              ? "قم بتعديل بيانات العقار أدناه" 
              : "املأ النموذج أدناه لإضافة عقارك. سيتم مراجعة العقار من قبل فريقنا قبل نشره."
            }
          </h2>

      <div className="formsContainer">
        {/* --- Basic Info --- */}
        <section className="basicForm">
          <h3>معلومات أساسية</h3>
          <label htmlFor="flocation">عنوان العقار *</label>
          <input
            type="text"
            id="flocation"
            name="flocation"
            placeholder="مثال : شقة في وسط المدينة"
            value={form.flocation}
            onChange={handleChange}
            required
          />

          <label htmlFor="desc">الوصف</label>
          <input
            type="text"
            id="desc"
            name="desc"
            placeholder="اكتب وصفاً تفصيلياً للعقار..."
            value={form.desc}
            onChange={handleChange}
          />

          <div className="cont">
            <label htmlFor="offerType">نوع العرض</label>
            <select
              id="offerType"
              name="offerType"
              value={form.offerType}
              onChange={handleChange}
            >
              <option value="forSale">للبيع</option>
              <option value="forRent">للإيجار</option>
            </select>

            <label htmlFor="propertyType">نوع العقار</label>
            <select
              id="propertyType"
              name="propertyType"
              value={form.propertyType}
              onChange={handleChange}
            >
              <option value="home">شقة</option>
              <option value="villa">فيلا</option>
              <option value="store">محل تجاري</option>
              <option value="office">مكتب</option>
              <option value="land">أرض</option>
            </select>

            <label htmlFor="price">السعر (بالدينار)</label>
            <input
              type="number"
              id="price"
              name="price"
              min="0"
              placeholder="0"
              value={form.price}
              onChange={handleChange}
            />
          </div>
        </section>

        {/* --- Specifications --- */}
        <section className="specificationForm">
          <h3>المواصفات</h3>
          <label htmlFor="area">
            المساحة (م<sup>2</sup>)
          </label>
          <input
            type="number"
            id="area"
            name="area"
            min="0"
            placeholder="0"
            value={form.area}
            onChange={handleChange}
          />

          <label htmlFor="bedRoomNumber">غرف النوم</label>
          <input
            type="number"
            id="bedRoomNumber"
            name="bedRoomNumber"
            min="0"
            placeholder="0"
            value={form.bedRoomNumber}
            onChange={handleChange}
          />

          <label htmlFor="pathRoomNumber">الحمامات</label>
          <input
            type="number"
            id="pathRoomNumber"
            name="pathRoomNumber"
            min="0"
            placeholder="0"
            value={form.pathRoomNumber}
            onChange={handleChange}
          />

          <label htmlFor="parckingNumber">مواقف السيارات</label>
          <input
            type="number"
            id="parckingNumber"
            name="parckingNumber"
            min="0"
            placeholder="0"
            value={form.parckingNumber}
            onChange={handleChange}
          />

          <label htmlFor="constructionYear">سنة البناء</label>
          <input
            type="number"
            id="constructionYear"
            name="constructionYear"
            min="1900"
            max="2025"
            placeholder="0"
            value={form.constructionYear}
            onChange={handleChange}
          />

          <div className="feature-item">
            <input
              type="checkbox"
              id="isfurnished"
              name="isfurnished"
              checked={form.isfurnished}
              onChange={handleChange}
            />
            <label htmlFor="isfurnished">العقار مفروش</label>
          </div>
        </section>

        {/* --- Features --- */}
        <section className="Features">
          <h3>المميزات</h3>
          {[
            ["hasGarden", "حديقة"],
            ["hasCAC", "مكيفات مركزية"],
            ["hasBalcony", "شرفة"],
            ["nearSchool", "قريب من المدارس"],
            ["Swimmingpool", "مسبح"],
          ].map(([key, label]) => (
            <div className="feature-item" key={key}>
              <input
                type="checkbox"
                id={key}
                name={key}
                checked={form[key]}
                onChange={handleChange}
              />
              <label htmlFor={key}>{label}</label>
            </div>
          ))}
        </section>

        {/* --- Media --- */}
        <section className="media">
          <h3>الصور والفيديو</h3>

          <label htmlFor="mediaUpload" className="upload-box">
            <div className="upload-content">
              <i className="fa-solid fa-arrow-up-from-bracket"></i>
              <p>اضغط لرفع الصور أو اسحبها هنا</p>
              <span>(PNG, JPG, JPEG — حد أقصى 10 صور)</span>
              {previewImages.length > 0 && (
                <p className="upload-count">
                  تم رفع {previewImages.length} صورة
                </p>
              )}
            </div>
          </label>

          <input
            type="file"
            id="mediaUpload"
            name="mediaUpload"
            accept="image/*"
            multiple
            hidden
            onChange={handleChange}
          />

          <div id="preview" className="preview">
            {previewImages.map((src, i) => (
              <div key={i} className="preview-item">
                <img src={src} alt={`preview ${i}`} />
                <button 
                  type="button" 
                  className="remove-image-btn"
                  onClick={() => removeImage(i)}
                  title="حذف الصورة"
                >
                  <i className="fa-solid fa-times"></i>
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>

          <div className="submitSection">
            <button onClick={handleSubmit}>
              {editingProperty ? "حفظ التعديلات" : "إرسال للمراجعة"}
            </button>
            <button type="button" className="cancel" onClick={handleCancel}>
              {editingProperty ? "إلغاء التعديل" : "إلغاء"}
            </button>
            <button 
              type="button" 
              className="back-to-properties"
              onClick={() => {
                setEditingProperty(null);
                setShowForm(false);
              }}
            >
              <i className="fa-solid fa-arrow-right"></i>
              العودة للعقارات
            </button>
          </div>

          <h3 className="note">
            {editingProperty 
              ? "سيتم حفظ التعديلات فوراً" 
              : "سيتم مراجعة عقارك من قبل فريقنا خلال 24–48 ساعة. سنرسل لك إشعاراً عند الموافقة على نشره."
            }
          </h3>
        </>
      )}
    </div>
  );
}
