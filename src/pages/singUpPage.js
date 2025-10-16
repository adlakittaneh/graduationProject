import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../singUpPage.css"; // رابط ملف CSS نفسه اللي عندك
import {
  auth,
  googleProvider,
  facebookProvider,
  signInWithPopup,
} from "../firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    accountType: "seeker", // "seeker" or "owner"
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAccountType = (type) => {
    setFormData((prev) => ({ ...prev, accountType: type }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // التحقق من تطابق كلمة المرور
    if (formData.password !== formData.confirmPassword) {
      alert("كلمة المرور غير متطابقة");
      setIsLoading(false);
      return;
    }

    try {
      // إنشاء الحساب
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      // إرسال رسالة التحقق
      await sendEmailVerification(userCredential.user);

      // حفظ بيانات المستخدم في localStorage
      const userData = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: formData.fullName,
        role: formData.accountType === "seeker" ? "user" : "owner",
        loginTime: new Date().toISOString(),
      };
      localStorage.setItem("currentUser", JSON.stringify(userData));

      console.log("User created:", userCredential.user);

      alert("تم إنشاء حسابك بنجاح! يرجى تسجيل الدخول ");

      // توجيه للصفحة الرئيسية
      navigate("/login");
    } catch (error) {
      console.error("Signup error:", error);
      let errorMessage = "حدث خطأ في إنشاء الحساب";

      if (error.code === "auth/email-already-in-use") {
        errorMessage = "هذا البريد الإلكتروني مستخدم بالفعل";
      } else if (error.code === "auth/weak-password") {
        errorMessage = "كلمة المرور ضعيفة جداً";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "البريد الإلكتروني غير صحيح";
      }

      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("Google user:", result.user);

      // حفظ بيانات المستخدم في localStorage
      const userData = {
        uid: result.user.uid,
        displayName: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
        role: formData.accountType === "seeker" ? "user" : "owner",
        signupMethod: "google",
        loginTime: new Date().toISOString(),
      };
      localStorage.setItem("currentUser", JSON.stringify(userData));

      alert(`مرحباً ${result.user.displayName}! تم تسجيل الدخول بنجاح`);

      // توجيه للصفحة الرئيسية
      navigate("/");
    } catch (error) {
      console.error("Google signup error:", error);
      alert("حدث خطأ في تسجيل الدخول عبر جوجل");
    }
  };

  const handleFacebookSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      console.log("Facebook user:", result.user);

      // حفظ بيانات المستخدم في localStorage
      const userData = {
        uid: result.user.uid,
        displayName: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
        role: formData.accountType === "seeker" ? "user" : "owner",
        signupMethod: "facebook",
        loginTime: new Date().toISOString(),
      };
      localStorage.setItem("currentUser", JSON.stringify(userData));

      alert(`مرحباً ${result.user.displayName}! تم تسجيل الدخول بنجاح`);

      // توجيه للصفحة الرئيسية
      navigate("/");
    } catch (error) {
      console.error("Facebook signup error:", error);
      alert("حدث خطأ في تسجيل الدخول عبر فيسبوك");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-header">
        <h1>إنشاء حساب جديد</h1>
        <h2>انضم إلى منصة عقار اليوم</h2>
      </div>

      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">الاسم الكامل</label>
          <div className="input-wrapper">
            <input
              type="text"
              name="fullName"
              className="form-input"
              placeholder="مراد احمد"
              value={formData.fullName}
              onChange={handleChange}
            />
            <i className="fa-solid fa-user input-icon"></i>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">البريد الإلكتروني</label>
          <div className="input-wrapper">
            <input
              type="email"
              name="email"
              className="form-input"
              placeholder="example@email.com"
              value={formData.email}
              onChange={handleChange}
            />
            <i className="fa-solid fa-envelope input-icon"></i>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">رقم الهاتف</label>
          <div className="input-wrapper">
            <input
              type="tel"
              name="phone"
              className="form-input"
              placeholder="+971 50 123 4567"
              value={formData.phone}
              onChange={handleChange}
            />
            <i className="fa-solid fa-phone input-icon"></i>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">كلمة المرور</label>
          <div className="input-wrapper">
            <input
              type="password"
              name="password"
              className="form-input"
              placeholder="********"
              value={formData.password}
              onChange={handleChange}
            />
            <i className="fa-solid fa-lock input-icon"></i>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">تأكيد كلمة المرور</label>
          <div className="input-wrapper">
            <input
              type="password"
              name="confirmPassword"
              className="form-input"
              placeholder="********"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <i className="fa-solid fa-lock input-icon"></i>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">نوع الحساب</label>
          <div className="account-type-selection">
            <div
              className={`account-type-option ${
                formData.accountType === "seeker" ? "selected" : ""
              }`}
              onClick={() => handleAccountType("seeker")}
            >
              <div className="option-content">
                <i className="fa-solid fa-search"></i>
                <div className="option-text">
                  <h3>باحث عن عقار</h3>
                  <p>أبحث عن عقار للشراء أو الإيجار</p>
                </div>
              </div>
            </div>

            <div
              className={`account-type-option ${
                formData.accountType === "owner" ? "selected" : ""
              }`}
              onClick={() => handleAccountType("owner")}
            >
              <div className="option-content">
                <i className="fa-solid fa-home"></i>
                <div className="option-text">
                  <h3>مالك عقار</h3>
                  <p>أريد عرض عقاراتي للبيع أو الإيجار</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button type="submit" className="signup-button" disabled={isLoading}>
          {isLoading ? "جاري إنشاء الحساب..." : "إنشاء حساب"}
        </button>

        <div className="divider">
          <span>أو التسجيل بواسطة</span>
        </div>

        <div className="social-buttons">
          <button
            type="button"
            className="social-button"
            onClick={handleGoogleSignUp}
          >
            <i className="fa-brands fa-google social-icon"></i> جوجل
          </button>
          <button
            type="button"
            className="social-button"
            onClick={handleFacebookSignUp}
          >
            <i className="fa-brands fa-facebook-f social-icon"></i> فيسبوك
          </button>
        </div>
      </form>

      <div className="login-link">
        لديك حساب بالفعل؟ <Link to="/login">تسجيل الدخول</Link>
      </div>
    </div>
  );
}
