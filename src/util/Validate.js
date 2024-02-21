
// Validate email address
export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Validate phone number (10 digits)
export const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phoneNumber);
};

export const isValidUrl = (url) => {
  const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
  return urlRegex.test(url);
};
// Validate date format (YYYY-MM-DD)
export const validateDateFormat = (date) => {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    return dateRegex.test(date);
};

// Validate if start date is less than end date
export const validateStartDateBeforeEndDate = (startDate, endDate) => {
    return new Date(startDate) < new Date(endDate);
};

// Validate if a field is empty
export const validateNotEmpty = (value) => {
    return value.trim() !== '';
};

// Check if is number
export const isNumber = (value) => {
    return typeof parseInt(value) === 'number' && !isNaN(value);
  };
