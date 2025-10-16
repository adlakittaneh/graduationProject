import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../login.css";
import {
  auth,
  googleProvider,
  facebookProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
    accountType: "user",
    isLoading: false,
  });

  const [showResetModal, setShowResetModal] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [isResetLoading, setIsResetLoading] = useState(false);
  const [resetMessage, setResetMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUser((prev) => ({ ...prev, isLoading: true }));

    if (!user.email || !user.password) {
      alert("يرجى ملء جميع الحقول المطلوبة");
      setUser((prev) => ({ ...prev, isLoading: false }));
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );

      const userData = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName,
        role: user.accountType,
        loginTime: new Date().toISOString(),
      };
      localStorage.setItem("currentUser", JSON.stringify(userData));

      alert(
        `مرحباً ${
          userCredential.user.displayName || user.email
        }! تم تسجيل الدخول بنجاح`
      );
      navigate("/");
    } catch (error) {
      console.error(error);
      let errorMessage = "حدث خطأ في تسجيل الدخول";
      if (error.code === "auth/user-not-found")
        errorMessage = "لا يوجد حساب بهذا البريد الإلكتروني";
      else if (error.code === "auth/wrong-password")
        errorMessage = "كلمة المرور غير صحيحة";
      else if (error.code === "auth/invalid-email")
        errorMessage = "البريد الإلكتروني غير صحيح";
      alert(errorMessage);
    } finally {
      setUser((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const handleResetPassword = async () => {
    if (!resetEmail) {
      alert("يرجى إدخال البريد الإلكتروني");
      return;
    }
    setIsResetLoading(true);
    setResetMessage("");
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      setResetMessage(
        `تم إرسال رابط إعادة تعيين كلمة المرور إلى ${resetEmail}`
      );
    } catch (error) {
      console.error(error);
      let errorMessage = "حدث خطأ، حاول مرة أخرى";
      if (error.code === "auth/user-not-found")
        errorMessage = "لا يوجد مستخدم بهذا البريد الإلكتروني";
      else if (error.code === "auth/invalid-email")
        errorMessage = "البريد الإلكتروني غير صحيح";
      setResetMessage(errorMessage);
    } finally {
      setIsResetLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const userData = {
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName,
        role: user.accountType,
        loginTime: new Date().toISOString(),
      };
      localStorage.setItem("currentUser", JSON.stringify(userData));
      alert(`مرحباً ${result.user.displayName}`);
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("حدث خطأ في تسجيل الدخول عبر جوجل");
    }
  };

  const handleFacebookLogin = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      const userData = {
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName,
        role: user.accountType,
        loginTime: new Date().toISOString(),
      };
      localStorage.setItem("currentUser", JSON.stringify(userData));
      alert(`مرحباً ${result.user.displayName}`);
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("حدث خطأ في تسجيل الدخول عبر فيسبوك");
    }
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <h1>تسجيل الدخول</h1>
        <h2>مرحباً بعودتك إلى عقار</h2>
      </div>

      <form className="login-form" onSubmit={handleSubmit}>
        {/* البريد الإلكتروني */}
        <div className="form-group">
          <label className="form-label">البريد الإلكتروني</label>
          <div className="input-wrapper">
            <input
              type="email"
              className="form-input"
              placeholder="example@email.com"
              value={user.email}
              onChange={(e) =>
                setUser((prev) => ({ ...prev, email: e.target.value }))
              }
              required
            />
            <i className="fa-solid fa-envelope input-icon"></i>
          </div>
        </div>

        {/* كلمة المرور */}
        <div className="form-group">
          <label className="form-label">كلمة المرور</label>
          <div className="input-wrapper">
            <input
              type="password"
              className="form-input"
              placeholder="********"
              value={user.password}
              onChange={(e) =>
                setUser((prev) => ({ ...prev, password: e.target.value }))
              }
              required
            />
            <i className="fa-solid fa-lock input-icon"></i>
          </div>
        </div>

        {/* زر نسيت كلمة المرور */}
        <div className="forgot-password">
          <span
            style={{ color: "#d63384", cursor: "pointer" }}
            onClick={() => setShowResetModal(true)}
          >
            نسيت كلمة المرور؟
          </span>
        </div>

        {/* نوع الحساب */}
        <div className="form-group">
          <label className="form-label">نوع الحساب</label>
          <div className="input-wrapper">
            <select
              className="form-input"
              value={user.accountType}
              onChange={(e) =>
                setUser((prev) => ({ ...prev, accountType: e.target.value }))
              }
            >
              <option value="user">مستخدم عادي</option>
              <option value="owner">مالك عقار</option>
              <option value="admin">مدير النظام</option>
            </select>
          </div>
        </div>

        {/* زر تسجيل الدخول */}
        <button
          type="submit"
          className="login-button"
          disabled={user.isLoading}
        >
          {user.isLoading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
        </button>

        <div className="divider">
          <span>أو تسجيل الدخول بواسطة</span>
        </div>

        <div className="social-buttons">
          <button
            type="button"
            className="social-button"
            onClick={handleGoogleLogin}
          >
            <i className="fa-brands fa-google social-icon"></i> جوجل
          </button>
          <button
            type="button"
            className="social-button"
            onClick={handleFacebookLogin}
          >
            <i className="fa-brands fa-facebook-f social-icon"></i> فيسبوك
          </button>
        </div>
      </form>

      <div className="signup-link">
        ليس لديك حساب؟ <Link to="/signup">إنشاء حساب جديد</Link>
      </div>

      {/* Modal منبثق لإعادة تعيين كلمة المرور */}
      {showResetModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>إعادة تعيين كلمة المرور</h3>
            <p>
              أدخل بريدك الإلكتروني وسنرسل لك رابط لإعادة تعيين كلمة المرور.
            </p>
            <input
              type="email"
              placeholder="example@email.com"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
            />
            <button onClick={handleResetPassword} disabled={isResetLoading}>
              {isResetLoading ? "جاري الإرسال..." : "إرسال الرابط"}
            </button>
            {resetMessage && <p className="reset-message">{resetMessage}</p>}
            <button
              className="modal-close"
              onClick={() => setShowResetModal(false)}
            >
              إغلاق
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
