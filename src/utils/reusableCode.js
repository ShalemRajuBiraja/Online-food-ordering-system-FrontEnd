

export const isEmailValid = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

export const isUserLoggedIn = () => {
    const token = localStorage.getItem("token");
    return !!token; // Returns true if token exists, false otherwise
}

export const nameRegex = /^[a-zA-Z\s]+$/; // Only letters and spaces
export const mobileRegex = /^[0-9]{10}$/; // 10 digit number
export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/; // At least 6 characters with uppercase, lowercase, and number