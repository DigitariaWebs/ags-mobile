// Signup Form Types
interface SignupFormData {
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

interface SignupFormErrors {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  terms: string;
}

// Login Form Types
interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface LoginFormErrors {
  email: string;
  password: string;
}

// Forgot Password Form Types
interface ForgotPasswordFormData {
  email: string;
}

interface ForgotPasswordFormErrors {
  email: string;
}
