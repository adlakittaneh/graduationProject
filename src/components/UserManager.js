import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserManager.css';

const UserManager = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // تحميل بيانات المستخدم من localStorage
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const logout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    navigate('/');
  };

  const getRoleDisplayName = (role) => {
    const roleNames = {
      'admin': 'مسؤول',
      'owner': 'مالك عقار',
      'user': 'مستخدم عادي'
    };
    return roleNames[role] || 'غير محدد';
  };

  const getRoleIcon = (role) => {
    const roleIcons = {
      'admin': 'fa-shield-halved',
      'owner': 'fa-key',
      'user': 'fa-user'
    };
    return roleIcons[role] || 'fa-user';
  };

  if (isLoading) {
    return <div className="user-manager-loading">جاري التحميل...</div>;
  }

  if (!currentUser) {
    return (
      <div className="user-manager">
        <div className="login-prompt">
          <i className="fa-solid fa-user-circle"></i>
          <h3>مرحباً بك في عقار</h3>
          <p>سجل دخولك للاستفادة من جميع الخدمات</p>
          <div className="auth-buttons">
            <button 
              className="login-btn"
              onClick={() => navigate('/login')}
            >
              <i className="fa-solid fa-sign-in-alt"></i>
              تسجيل الدخول
            </button>
            <button 
              className="signup-btn"
              onClick={() => navigate('/signup')}
            >
              <i className="fa-solid fa-user-plus"></i>
              إنشاء حساب
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="user-manager">
      <div className="user-info">
        <div className="user-avatar">
          <i className={`fa-solid ${getRoleIcon(currentUser.role)}`}></i>
        </div>
        <div className="user-details">
          <h3>{currentUser.displayName || 'مستخدم'}</h3>
          <p className="user-role">
            <i className={`fa-solid ${getRoleIcon(currentUser.role)}`}></i>
            {getRoleDisplayName(currentUser.role)}
          </p>
          <p className="user-email">{currentUser.email}</p>
        </div>
      </div>
      
      <div className="user-actions">
        {currentUser.role === 'admin' && (
          <button 
            className="action-btn admin-btn"
            onClick={() => navigate('/admin-dashboard')}
          >
            <i className="fa-solid fa-tachometer-alt"></i>
            لوحة التحكم
          </button>
        )}
        
        {currentUser.role === 'owner' && (
          <button 
            className="action-btn owner-btn"
            onClick={() => navigate('/add-property')}
          >
            <i className="fa-solid fa-plus"></i>
            إضافة عقار
          </button>
        )}
        
        <button 
          className="action-btn profile-btn"
          onClick={() => navigate('/profile')}
        >
          <i className="fa-solid fa-user"></i>
          الملف الشخصي
        </button>
        
        <button 
          className="action-btn logout-btn"
          onClick={logout}
        >
          <i className="fa-solid fa-sign-out-alt"></i>
          تسجيل الخروج
        </button>
      </div>
    </div>
  );
};

export default UserManager;

