import React, { useState } from "react";
import { validateSignUp } from "../../utils/validation";
import LoadingSpinner from "../Common/LoadingSpinner";
import ErrorMessage from "../Common/ErrorMessage";
import "../../styles/SignUpForm.css";

function SignUpForm({ onSignUp, isPanelActive }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  //STATE ĐỂ LƯU CÁC LỖI VALIDATION
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Thêm logic xóa lỗi khi người dùng gõ
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Xóa lỗi của trường đang nhập
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
    // Xóa lỗi submit chung
    if (submitError) setSubmitError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // VALIDATION
    const validationErrors = validateSignUp(formData);
    setErrors(validationErrors); // Cập nhật state lỗi

    // Nếu có lỗi, dừng lại
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsLoading(true);
    setSubmitError("");
    try {
      await onSignUp(formData);
    } catch (err) {
      setSubmitError(err.message || "Đăng ký thất bại.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-form-container">
      <form className="signup-form" onSubmit={handleSubmit} noValidate>
        <h1 className="signup-title">Tạo tài khoản</h1>
        {submitError && (
          <ErrorMessage
            message={submitError}
            onDismiss={() => setSubmitError("")}
          />
        )}

        {/* --- Các trường input --- */}
        {/* Username */}
        <div className="form-field-float">
          {/* CLASS LỖI VÀ HIỂN THỊ LỖI */}
          <input
            id="signup-username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            className={`form-input-float ${
              errors.username ? "form-input-error" : ""
            }`}
            placeholder=" "
            disabled={isLoading}
          />
          <label htmlFor="signup-username" className="form-label-float">
            Tên đăng nhập
          </label>
          {/* Hiển thị thông báo lỗi ngay bên dưới input */}
          {errors.username && (
            <div className="form-error">{errors.username}</div>
          )}
        </div>

        {/* ---EMAIL VÀ PASSWORD --- */}
        <div className="form-field-float">
          <input
            id="signup-email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`form-input-float ${
              errors.email ? "form-input-error" : ""
            }`}
            placeholder=" "
            disabled={isLoading}
          />
          <label htmlFor="signup-email" className="form-label-float">
            Email
          </label>
          {errors.email && <div className="form-error">{errors.email}</div>}
        </div>

        <div className="form-field-float">
          <input
            id="signup-password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            className={`form-input-float ${
              errors.password ? "form-input-error" : ""
            }`}
            placeholder=" "
            disabled={isLoading}
          />
          <label htmlFor="signup-password" className="form-label-float">
            Mật khẩu
          </label>
          {errors.password && (
            <div className="form-error">{errors.password}</div>
          )}
        </div>

        <button type="submit" className="submit-btn" disabled={isLoading}>
          {isLoading ? <LoadingSpinner size="small" /> : "Đăng ký"}
        </button>
        {/* Nút chuyển đổi giữa đăng ký và đăng nhập */}
        <div className="mobile-switch">
          Đã có tài khoản?
          <button
            type="button"
            onClick={() =>
              document
                .getElementById("auth-container")
                .classList.remove("right-panel-active")
            }
          >
            Đăng nhập
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignUpForm;
