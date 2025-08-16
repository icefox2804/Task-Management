import React, { useState, useEffect } from "react";
import Navbar from "./components/Auth/Navbar";
import LoginForm from "./components/Auth/LoginForm";
import SignUpForm from "./components/Auth/SignUpForm";
import TaskManagement from "./components/Tasks/TaskManagement";
import ErrorMessage from "./components/Common/ErrorMessage";
import "./styles/App.css";
import "./styles/AuthContainer.css"; // File CSS cho hiệu ứng

function App() {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [globalError, setGlobalError] = useState(null);
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);

  useEffect(() => {
    checkExistingAuth();
  }, []);

  const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";
  // Kiểm tra phiên đăng nhập đã tồn tại chưa
  // Nếu có, tự động đăng nhập
  // Nếu không, hiển thị form đăng nhập/đăng ký
  const checkExistingAuth = async () => {
    setAuthLoading(true);
    try {
      const savedUser = localStorage.getItem("taskapp_user");
      const savedToken = localStorage.getItem("taskapp_token");
      if (savedUser && savedToken) {
        const userData = JSON.parse(savedUser);
        const isValidSession = await verifySession(userData.id, savedToken);
        if (isValidSession) {
          setUser(userData);
          setIsLoggedIn(true);
        } else {
          clearAuthData();
        }
      }
    } catch (error) {
      console.error("Auth check error:", error);
      clearAuthData();
    } finally {
      setAuthLoading(false);
    }
  };

  const verifySession = async (userId, token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${userId}`);
      return response.ok;
    } catch (error) {
      return false;
    }
  };

  const clearAuthData = () => {
    localStorage.removeItem("taskapp_user");
    localStorage.removeItem("taskapp_token");
    setUser(null);
    setIsLoggedIn(false);
  };

  const handleLogin = async (credentials) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/users?username=${credentials.username}`
      );
      if (!response.ok) {
        throw new Error("Network error");
      }
      const users = await response.json();
      const foundUser = users.find(
        (user) =>
          user.username === credentials.username &&
          user.password === credentials.password
      );
      if (!foundUser) {
        throw new Error("Username hoặc password không đúng");
      }
      const token = `token_${foundUser.id}_${Date.now()}`;
      localStorage.setItem(
        "taskapp_user",
        JSON.stringify({
          id: foundUser.id,
          username: foundUser.username,
          email: foundUser.email,
        })
      );
      localStorage.setItem("taskapp_token", token);
      setUser({
        id: foundUser.id,
        username: foundUser.username,
        email: foundUser.email,
      });
      setIsLoggedIn(true);
      setGlobalError(null);
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const handleLogout = async () => {
    try {
      clearAuthData();
      setGlobalError(null);
    } catch (error) {
      console.error("Logout error:", error);
      setGlobalError("Có lỗi khi đăng xuất. Vui lòng thử lại.");
    }
  };

  // ĐĂNG KÝ
  const handleSignUp = async (credentials) => {
    try {
      // Kiểm tra xem username đã tồn tại chưa
      const checkUser = await fetch(
        `${API_BASE_URL}/users?username=${credentials.username}`
      );
      const existingUsers = await checkUser.json();
      if (existingUsers.length > 0) {
        throw new Error("Username đã tồn tại.");
      }
      // Tạo user mới
      const response = await fetch(`${API_BASE_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error("Không thể tạo tài khoản.");
      }
      // Tự động đăng nhập sau khi đăng ký thành công
      await handleLogin(credentials);
    } catch (error) {
      console.error("Sign up error:", error);
      throw error; // Ném lỗi để SignUpForm có thể hiển thị
    }
  };

  // --- Phần render đã có ---
  if (authLoading) {
    return (
      <div className="app-loading">
        <div className="loading-container">
          <div className="app-logo">✔</div>
          <h1>Task Manager</h1>
          <div className="loading-spinner"></div>
          <p>Đang kiểm tra phiên đăng nhập...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      {globalError && (
        <div className="global-error">
          <ErrorMessage
            message={globalError}
            onDismiss={() => setGlobalError(null)}
          />
        </div>
      )}
      <Navbar isLoggedIn={isLoggedIn} user={user} onLogout={handleLogout} />

      <main className="app-main">
        {isLoggedIn ? (
          <TaskManagement user={user} />
        ) : (
          <div
            className={`auth-container ${
              isRightPanelActive ? "right-panel-active" : ""
            }`}
            id="auth-container"
          >
            {/* Form Đăng Ký */}
            <div className="form-container sign-up-container">
              <SignUpForm
                onSignUp={handleSignUp}
                isPanelActive={isRightPanelActive}
              />
            </div>
            {/* Form Đăng Nhập */}
            <div className="form-container sign-in-container">
              <LoginForm
                onLogin={handleLogin}
                isPanelActive={!isRightPanelActive}
              />
            </div>
            {/* Lớp phủ trượt qua lại */}
            <div className="overlay-container">
              <div className="overlay">
                <div className="overlay-panel overlay-left">
                  <h1>Chào mừng bạn trở lại!</h1>
                  <p>
                    Để tiếp tục kết nối, vui lòng đăng nhập bằng thông tin của
                    bạn
                  </p>
                  <button
                    className="ghost"
                    id="signIn"
                    onClick={() => setIsRightPanelActive(false)}
                  >
                    Đăng nhập
                  </button>
                </div>
                <div className="overlay-panel overlay-right">
                  <h1>Bạn chưa có tài khoản !</h1>
                  <p>
                    Vui lòng nhập thông tin cá nhân và bắt đầu hành trình quản
                    lý công việc
                  </p>
                  <button
                    className="ghost"
                    id="signUp"
                    onClick={() => setIsRightPanelActive(true)}
                  >
                    Đăng ký
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>&copy; 2025 Task Manager. Built with React & JSON Server.</p>{" "}
      </footer>
    </div>
  );
}

export default App;
