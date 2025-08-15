import React, { useState, useRef, useEffect } from "react";
import { validateLogin } from "../../utils/validation";
import LoadingSpinner from "../Common/LoadingSpinner";
import ErrorMessage from "../Common/ErrorMessage";
import "../../styles/LoginForm.css";

/**
 * Component Form Đăng Nhập Hoàn Chỉnh
 * - Quản lý trạng thái nội bộ (loading, errors).
 * - Sử dụng hiệu ứng Nhãn nổi (Floating Label).
 * - Tích hợp validation từ file utils.
 * - Tự động dọn dẹp lỗi khi panel không còn hoạt động.
 */
function LoginForm({ onLogin, isPanelActive }) {
  // --- STATE MANAGEMENT ---
  const [formData, setFormData] = useState({ username: "", password: "" });
  // State cho lỗi validation phía client (ví dụ: "mật khẩu quá ngắn")
  const [errors, setErrors] = useState({});
  // State cho lỗi từ phía server (ví dụ: "sai mật khẩu")
  const [submitError, setSubmitError] = useState("");
  // State để quản lý hiệu ứng loading
  const [isLoading, setIsLoading] = useState(false);

  // --- REFS ---
  const usernameRef = useRef(null);

  // --- LIFECYCLE EFFECT ---
  //  TỰ ĐỘNG DỌN DẸP KHI PANEL BỊ ẨN
  useEffect(() => {
    if (!isPanelActive) {
      // Xóa tất cả các lỗi và reset lại form
      setErrors({});
      setSubmitError("");
      setFormData({ username: "", password: "" });
    }
  }, [isPanelActive]); // Chạy lại mỗi khi panel thay đổi trạng thái active

  // --- EVENT HANDLERS ---
  // Xử lý khi người dùng nhập liệu
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Xóa lỗi validation của trường đang nhập
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
    // Xóa lỗi từ server
    if (submitError) {
      setSubmitError("");
    }
  };

  // form được submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // Xóa lỗi cũ trước khi validate lại
    setSubmitError("");

    // VALIDATION
    const validationErrors = validateLogin(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return; // Dừng lại nếu có lỗi
    }

    setIsLoading(true); // Bắt đầu loading
    try {
      await onLogin(formData); // Gọi hàm login từ App.js
    } catch (error) {
      // Bắt lỗi từ server và hiển thị
      setSubmitError(error.message || "Đăng nhập thất bại. Vui lòng thử lại.");
    } finally {
      setIsLoading(false); // Luôn dừng loading sau khi kết thúc
    }
  };

  return (
    <div className="login-form-container">
      <form className="login-form" onSubmit={handleSubmit} noValidate>
        <h2 className="login-title">Đăng nhập</h2>

        {/* Hiển thị lỗi từ server */}
        {submitError && (
          <ErrorMessage
            message={submitError}
            onDismiss={() => setSubmitError("")}
          />
        )}

        {/* 4. CẤU TRÚC FLOATING LABEL */}
        {/* --- Trường Username --- */}
        <div className="form-field-float">
          <input
            id="login-username"
            ref={usernameRef}
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            // Áp dụng class lỗi nếu có
            className={`form-input-float ${
              errors.username ? "form-input-error" : ""
            }`}
            placeholder=" "
            disabled={isLoading}
          />
          <label htmlFor="login-username" className="form-label-float">
            Username *
          </label>
          {/* Hiển thị lỗi validation */}
          {errors.username && (
            <div className="form-error">{errors.username}</div>
          )}
        </div>

        {/* --- Password --- */}
        <div className="form-field-float">
          <input
            id="login-password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className={`form-input-float ${
              errors.password ? "form-input-error" : ""
            }`}
            placeholder=" "
            disabled={isLoading}
          />
          <label htmlFor="login-password" className="form-label-float">
            Password *
          </label>
          {errors.password && (
            <div className="form-error">{errors.password}</div>
          )}
        </div>

        {/* Nút Submit với trạng thái loading */}
        <button type="submit" className="submit-btn" disabled={isLoading}>
          {isLoading ? (
            <>
              <LoadingSpinner size="small" />
              <span>Đang đăng nhập...</span>
            </>
          ) : (
            "Đăng nhập"
          )}
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
