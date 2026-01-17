// Signup Form Types
interface SignupFormData {
  firstName: string;
  lastName: string;
  gender: string;
  userType: "job_seeker" | "farm_owner" | "";
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

interface SignupFormErrors {
  firstName: string;
  lastName: string;
  userType: string;
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

// Advice Form Types
interface AdviceFormData {
  region: string;
  department: string;
  municipality: string;
  cultivatedArea: string;
  areaUnit: "sqm" | "hectare";
  soilType: string;
  productionType: string;
  crop: string;
}

interface AdviceFormErrors {
  region?: string;
  department?: string;
  municipality?: string;
  cultivatedArea?: string;
  soilType?: string;
  productionType?: string;
  crop?: string;
}

// User Context Types
type UserType = "job_seeker" | "farm_owner";

interface UserContextType {
  userType: UserType;
  setUserType: (type: UserType) => void;
  toggleUserType: () => void;
}

// Job Types
interface Job {
  id: string;
  title: string;
  farmName: string;
  location: string;
  region: string;
  department: string;
  contractType: "CDI" | "CDD" | "Saisonnier" | "Stage";
  salaryRange: string;
  description: string;
  requirements: string[];
  postedDate: string;
  applicantsCount: number;
}

interface JobApplication {
  id: string;
  jobId: string;
  applicantName: string;
  applicantEmail: string;
  applicantPhone: string;
  education: string;
  experience: string;
  appliedDate: string;
  status: "pending" | "reviewed" | "accepted" | "rejected";
  coverLetter?: string;
}

// Job Posting Form Types
interface JobPostingFormData {
  title: string;
  farmName: string;
  location: string;
  region: string;
  department: string;
  contractType: "CDI" | "CDD" | "Saisonnier" | "Stage" | "";
  salaryRange: string;
  description: string;
  requirements: string;
}

interface JobPostingFormErrors {
  title: string;
  farmName: string;
  location: string;
  region: string;
  department: string;
  contractType: string;
  salaryRange: string;
  description: string;
  requirements: string;
}
