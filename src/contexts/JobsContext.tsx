import React, {
  createContext,
  useContext,
  useState,
  PropsWithChildren,
} from "react";
import { mockJobs, mockMyJobs, mockApplicants } from "@/data/mockJobs";
import { Alert } from "react-native";

interface JobsContextType {
  // All available jobs (for job seekers)
  allJobs: Job[];

  // User's posted jobs (for recruiters)
  myJobs: Job[];
  setMyJobs: (jobs: Job[]) => void;

  // Applications by job ID
  applications: Record<string, JobApplication[]>;

  // CRUD operations
  createJob: (job: Omit<Job, "id" | "postedDate" | "applicantsCount">) => void;
  updateJob: (id: string, job: Partial<Job>) => void;
  deleteJob: (id: string) => void;
  duplicateJob: (id: string) => void;
  getJobById: (id: string) => Job | undefined;

  // Application operations
  submitApplication: (
    application: Omit<JobApplication, "id" | "appliedDate" | "status">,
  ) => void;
  updateApplicationStatus: (
    applicationId: string,
    jobId: string,
    status: "pending" | "reviewed" | "accepted" | "rejected",
  ) => void;
  getApplicationsByJobId: (jobId: string) => JobApplication[];
  getMyApplications: (applicantId: string) => JobApplication[];
  getAcceptedJobsForUser: (applicantId: string) => Job[];
  hasApplied: (jobId: string, applicantId: string) => boolean;
}

const JobsContext = createContext<JobsContextType | undefined>(undefined);

export function JobsProvider({ children }: PropsWithChildren) {
  const [allJobs] = useState<Job[]>(mockJobs);
  const [myJobs, setMyJobs] = useState<Job[]>(mockMyJobs);
  const [applications, setApplications] =
    useState<Record<string, JobApplication[]>>(mockApplicants);

  const createJob = (
    jobData: Omit<Job, "id" | "postedDate" | "applicantsCount">,
  ) => {
    const newJob: Job = {
      ...jobData,
      id: `job-${Date.now()}`,
      postedDate: new Date().toISOString().split("T")[0],
      applicantsCount: 0,
    };
    setMyJobs([newJob, ...myJobs]);
    Alert.alert("Succès", "Votre offre a été publiée avec succès");
  };

  const updateJob = (id: string, jobData: Partial<Job>) => {
    setMyJobs(
      myJobs.map((job) => (job.id === id ? { ...job, ...jobData } : job)),
    );
    Alert.alert("Succès", "L'offre a été mise à jour avec succès");
  };

  const deleteJob = (id: string) => {
    Alert.alert(
      "Supprimer l'offre",
      "Êtes-vous sûr de vouloir supprimer cette offre ?",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Supprimer",
          style: "destructive",
          onPress: () => {
            setMyJobs(myJobs.filter((job) => job.id !== id));
            Alert.alert("Succès", "L'offre a été supprimée");
          },
        },
      ],
    );
  };

  const duplicateJob = (id: string) => {
    const jobToDuplicate = myJobs.find((job) => job.id === id);
    if (!jobToDuplicate) return;

    const newJob: Job = {
      ...jobToDuplicate,
      id: `job-${Date.now()}`,
      title: `${jobToDuplicate.title} (Copie)`,
      postedDate: new Date().toISOString().split("T")[0],
      applicantsCount: 0,
    };
    setMyJobs([newJob, ...myJobs]);
    Alert.alert("Succès", "L'offre a été dupliquée");
  };

  const getJobById = (id: string): Job | undefined => {
    return (
      myJobs.find((job) => job.id === id) ||
      allJobs.find((job) => job.id === id)
    );
  };

  const submitApplication = (
    applicationData: Omit<JobApplication, "id" | "appliedDate" | "status">,
  ) => {
    const newApplication: JobApplication = {
      ...applicationData,
      id: `app-${Date.now()}`,
      appliedDate: new Date().toISOString().split("T")[0],
      status: "pending",
    };
    setApplications((prev) => {
      const existing = prev[applicationData.jobId] ?? [];
      return {
        ...prev,
        [applicationData.jobId]: [...existing, newApplication],
      };
    });
  };

  const updateApplicationStatus = (
    applicationId: string,
    jobId: string,
    status: "pending" | "reviewed" | "accepted" | "rejected",
  ) => {
    const label =
      status === "accepted"
        ? "Accepter"
        : status === "rejected"
          ? "Rejeter"
          : status === "reviewed"
            ? "Marquer comme examiné"
            : "Remettre en attente";

    Alert.alert("Confirmation", `${label} cette candidature ?`, [
      { text: "Annuler", style: "cancel" },
      {
        text: "Confirmer",
        onPress: () => {
          setApplications((prev) => {
            const jobApps = prev[jobId] ?? [];
            return {
              ...prev,
              [jobId]: jobApps.map((app) =>
                app.id === applicationId ? { ...app, status } : app,
              ),
            };
          });
          Alert.alert("Succès", "Le statut a été mis à jour");
        },
      },
    ]);
  };

  const getApplicationsByJobId = (jobId: string): JobApplication[] => {
    return applications[jobId] ?? [];
  };

  const getMyApplications = (applicantId: string): JobApplication[] => {
    return Object.values(applications)
      .flat()
      .filter((app) => app.applicantId === applicantId);
  };

  const hasApplied = (jobId: string, applicantId: string): boolean => {
    return (applications[jobId] ?? []).some(
      (app) => app.applicantId === applicantId,
    );
  };

  const getAcceptedJobsForUser = (applicantId: string): Job[] => {
    const acceptedJobIds = Object.entries(applications)
      .filter(([, apps]) =>
        apps.some(
          (app) => app.applicantId === applicantId && app.status === "accepted",
        ),
      )
      .map(([jobId]) => jobId);

    return [...allJobs, ...myJobs].filter((job) =>
      acceptedJobIds.includes(job.id),
    );
  };

  const value: JobsContextType = {
    allJobs,
    myJobs,
    setMyJobs,
    applications,
    createJob,
    updateJob,
    deleteJob,
    duplicateJob,
    getJobById,
    submitApplication,
    updateApplicationStatus,
    getApplicationsByJobId,
    getMyApplications,
    getAcceptedJobsForUser,
    hasApplied,
  };

  return <JobsContext.Provider value={value}>{children}</JobsContext.Provider>;
}

export function useJobs() {
  const context = useContext(JobsContext);
  if (context === undefined) {
    throw new Error("useJobs must be used within a JobsProvider");
  }
  return context;
}
