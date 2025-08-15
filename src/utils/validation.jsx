export const validateSignUp = ({
  username,
  email,
  password,
  confirmPassword,
}) => {
  const errors = {};

  // Kiểm tra Username
  if (!username || !username.trim()) {
    errors.username = "Username không được để trống";
  } else if (username.trim().length < 3) {
    errors.username = "Username phải có ít nhất 3 ký tự";
  }

  // Kiểm tra Email
  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    errors.email = "Địa chỉ email không hợp lệ";
  }

  // Kiểm tra Password
  if (!password) {
    errors.password = "Password không được để trống";
  } else if (password.length < 6) {
    errors.password = "Password phải có ít nhất 6 ký tự";
  }

  // Kiểm tra Confirm Password
  if (password !== confirmPassword) {
    errors.confirmPassword = "Mật khẩu xác nhận không khớp";
  }

  return errors;
};

// Kiểm tra dữ liệu cho form Đăng Ký.

export const validateLogin = ({ username, password }) => {
  const errors = {};

  if (!username || !username.trim()) {
    errors.username = "Username không được để trống";
  } else if (username.trim().length < 3) {
    errors.username = "Username phải có ít nhất 3 ký tự";
  }

  if (!password) {
    errors.password = "Password không được để trống";
  } else if (password.length < 6) {
    errors.password = "Password phải có ít nhất 6 ký tự";
  }

  return errors;
};

/**
 * Kiểm tra dữ liệu cho một Task.
 */
export const validateTask = (task) => {
  const errors = {};

  // Title validation
  if (!task.title || !task.title.trim()) {
    errors.title = "Title là bắt buộc";
  } else if (task.title.trim().length < 5) {
    errors.title = "Title phải có ít nhất 5 ký tự";
  } else if (task.title.length > 100) {
    errors.title = "Title tối đa 100 ký tự";
  }

  // Description validation
  if (task.description && task.description.length > 500) {
    errors.description = "Mô tả tối đa 500 ký tự";
  }

  // Status and Priority validation
  if (!task.status) errors.status = "Status là bắt buộc";
  if (!task.priority) errors.priority = "Priority là bắt buộc";

  // Due Date validation
  if (!task.dueDate) {
    errors.dueDate = "Due Date là bắt buộc";
  } else {
    const due = new Date(task.dueDate);
    if (isNaN(due.getTime())) {
      errors.dueDate = "Định dạng ngày không hợp lệ";
    } else {
      const now = new Date();
      // So sánh với đầu ngày hôm nay (không tính giờ)
      if (due < new Date(now.toDateString())) {
        errors.dueDate = "Due Date không được là ngày trong quá khứ";
      }
    }
  }
  return errors;
};
