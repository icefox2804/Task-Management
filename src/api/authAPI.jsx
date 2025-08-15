const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

export const login = async ({ username, password }) => {
  try {
    const res = await fetch(`${API_BASE_URL}/users?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`);
    if (!res.ok) throw new Error('HTTP error ' + res.status);
    const data = await res.json();
    if (data.length === 0) throw new Error('Tên đăng nhập hoặc mật khẩu không đúng');
    const user = data[0];
    const token = 'fake-jwt-token';
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    return { user, token };
  } catch (err) {
    throw err;
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};