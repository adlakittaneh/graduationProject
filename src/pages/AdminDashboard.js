import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
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
    if (currentUser && currentUser.role !== 'admin') {
      alert('ليس لديك صلاحية للوصول إلى لوحة التحكم');
      navigate('/');
    }
  }, [currentUser, navigate]);
  const [pendingProperties, setPendingProperties] = useState([
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
      owner: "محمد أحمد",
      submittedDate: "2024-01-15",
      status: "قيد المراجعة"
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
      owner: "سارة محمد",
      submittedDate: "2024-01-14",
      status: "قيد المراجعة"
    }
  ]);

  const [publishedProperties, setPublishedProperties] = useState([
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
      owner: "أحمد علي",
      publishedDate: "2024-01-10",
      status: "منشور"
    }
  ]);

  const handleApprove = (propertyId) => {
    const property = pendingProperties.find(p => p.id === propertyId);
    if (property) {
      // نقل العقار من قيد المراجعة إلى المنشورة
      setPendingProperties(prev => prev.filter(p => p.id !== propertyId));
      setPublishedProperties(prev => [{
        ...property,
        status: "منشور",
        publishedDate: new Date().toISOString().split('T')[0]
      }, ...prev]);
      alert("تم الموافقة على العقار ✅");
    }
  };

  const handleReject = (propertyId) => {
    if (window.confirm("هل أنت متأكد من رفض هذا العقار؟")) {
      setPendingProperties(prev => prev.filter(p => p.id !== propertyId));
      alert("تم رفض العقار ❌");
    }
  };

  const handleUnpublish = (propertyId) => {
    if (window.confirm("هل أنت متأكد من إلغاء نشر هذا العقار؟")) {
      setPublishedProperties(prev => prev.filter(p => p.id !== propertyId));
      alert("تم إلغاء نشر العقار");
    }
  };

  return (
    <div className="admin-dashboard" dir="rtl">
      <div className="dashboard-header">
        <h1>لوحة تحكم المسؤول</h1>
        <p>مرحباً {currentUser?.name}، يمكنك إدارة العقارات من هنا</p>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fa-solid fa-clock"></i>
          </div>
          <div className="stat-content">
            <h3>{pendingProperties.length}</h3>
            <p>عقارات قيد المراجعة</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fa-solid fa-check-circle"></i>
          </div>
          <div className="stat-content">
            <h3>{publishedProperties.length}</h3>
            <p>عقارات منشورة</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fa-solid fa-users"></i>
          </div>
          <div className="stat-content">
            <h3>25</h3>
            <p>إجمالي المستخدمين</p>
          </div>
        </div>
      </div>

      <div className="dashboard-sections">
        {/* العقارات قيد المراجعة */}
        <section className="pending-section">
          <h2>العقارات قيد المراجعة</h2>
          {pendingProperties.length > 0 ? (
            <div className="properties-grid">
              {pendingProperties.map((property) => (
                <div key={property.id} className="property-card pending">
                  <div className="property-image">
                    <img src={property.image} alt={property.title} />
                    <div className="status-badge pending">قيد المراجعة</div>
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
                    </div>
                    
                    <div className="property-price">
                      <span className="price">{property.price} د.أ</span>
                    </div>
                    
                    <div className="property-meta">
                      <p><strong>المالك:</strong> {property.owner}</p>
                      <p><strong>تاريخ الإرسال:</strong> {property.submittedDate}</p>
                    </div>
                    
                    <div className="admin-actions">
                      <button 
                        className="approve-btn"
                        onClick={() => handleApprove(property.id)}
                      >
                        <i className="fa-solid fa-check"></i>
                        موافقة
                      </button>
                      <button 
                        className="reject-btn"
                        onClick={() => handleReject(property.id)}
                      >
                        <i className="fa-solid fa-times"></i>
                        رفض
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <i className="fa-solid fa-check-circle"></i>
              <h3>لا توجد عقارات قيد المراجعة</h3>
              <p>جميع العقارات تم مراجعتها</p>
            </div>
          )}
        </section>

        {/* العقارات المنشورة */}
        <section className="published-section">
          <h2>العقارات المنشورة</h2>
          {publishedProperties.length > 0 ? (
            <div className="properties-grid">
              {publishedProperties.map((property) => (
                <div key={property.id} className="property-card published">
                  <div className="property-image">
                    <img src={property.image} alt={property.title} />
                    <div className="status-badge published">منشور</div>
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
                    </div>
                    
                    <div className="property-price">
                      <span className="price">{property.price} د.أ</span>
                    </div>
                    
                    <div className="property-meta">
                      <p><strong>المالك:</strong> {property.owner}</p>
                      <p><strong>تاريخ النشر:</strong> {property.publishedDate}</p>
                    </div>
                    
                    <div className="admin-actions">
                      <button 
                        className="unpublish-btn"
                        onClick={() => handleUnpublish(property.id)}
                      >
                        <i className="fa-solid fa-eye-slash"></i>
                        إلغاء النشر
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <i className="fa-solid fa-home"></i>
              <h3>لا توجد عقارات منشورة</h3>
              <p>لم يتم نشر أي عقارات بعد</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
