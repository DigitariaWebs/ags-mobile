import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  PropsWithChildren,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { trainingCourses } from "../data/training-courses";

const TrainingContext = createContext<TrainingContextType | undefined>(
  undefined,
);

const STORAGE_KEYS = {
  ENROLLED_COURSES: "@ags_enrolled_courses",
  COURSE_PROGRESS: "@ags_course_progress",
  LESSON_PROGRESS: "@ags_lesson_progress",
  BOOKMARKS: "@ags_bookmarks",
  NOTES: "@ags_notes",
  CERTIFICATES: "@ags_certificates",
};

export function TrainingProvider({ children }: PropsWithChildren) {
  const [courses] = useState<Course[]>(trainingCourses);
  const [enrolledCourses, setEnrolledCourses] = useState<string[]>([]);
  const [courseProgress, setCourseProgress] = useState<
    Record<string, CourseProgress>
  >({});
  const [lessonProgress, setLessonProgress] = useState<
    Record<string, LessonProgress>
  >({});
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load data from AsyncStorage on mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [
        enrolledCoursesData,
        courseProgressData,
        lessonProgressData,
        bookmarksData,
        notesData,
        certificatesData,
      ] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.ENROLLED_COURSES),
        AsyncStorage.getItem(STORAGE_KEYS.COURSE_PROGRESS),
        AsyncStorage.getItem(STORAGE_KEYS.LESSON_PROGRESS),
        AsyncStorage.getItem(STORAGE_KEYS.BOOKMARKS),
        AsyncStorage.getItem(STORAGE_KEYS.NOTES),
        AsyncStorage.getItem(STORAGE_KEYS.CERTIFICATES),
      ]);

      if (enrolledCoursesData)
        setEnrolledCourses(JSON.parse(enrolledCoursesData));
      if (courseProgressData) setCourseProgress(JSON.parse(courseProgressData));
      if (lessonProgressData) setLessonProgress(JSON.parse(lessonProgressData));
      if (bookmarksData) setBookmarks(JSON.parse(bookmarksData));
      if (notesData) setNotes(JSON.parse(notesData));
      if (certificatesData) setCertificates(JSON.parse(certificatesData));
    } catch (error) {
      console.error("Error loading training data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveToStorage = async (key: string, data: any) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error(`Error saving ${key}:`, error);
    }
  };

  const enrollInCourse = (courseId: string) => {
    if (enrolledCourses.includes(courseId)) return;

    const course = courses.find((c) => c.id === courseId);
    if (!course) return;

    const totalLessons = course.modules.reduce(
      (sum, module) => sum + module.lessons.length,
      0,
    );

    const newEnrolled = [...enrolledCourses, courseId];
    const newProgress: CourseProgress = {
      courseId,
      enrolledAt: new Date().toISOString(),
      lastAccessedAt: new Date().toISOString(),
      completedLessons: 0,
      totalLessons,
      progressPercentage: 0,
      quizScores: [],
      certificateEarned: false,
    };

    setEnrolledCourses(newEnrolled);
    setCourseProgress((prev) => ({ ...prev, [courseId]: newProgress }));

    saveToStorage(STORAGE_KEYS.ENROLLED_COURSES, newEnrolled);
    saveToStorage(STORAGE_KEYS.COURSE_PROGRESS, {
      ...courseProgress,
      [courseId]: newProgress,
    });
  };

  const updateLessonProgress = (
    lessonId: string,
    courseId: string,
    progress: Partial<LessonProgress>,
  ) => {
    const key = `${courseId}-${lessonId}`;
    const existing = lessonProgress[key] || {
      lessonId,
      courseId,
      completed: false,
      timeSpent: 0,
    };

    const updated = { ...existing, ...progress };
    const newLessonProgress = { ...lessonProgress, [key]: updated };
    setLessonProgress(newLessonProgress);

    // Update course progress
    if (courseProgress[courseId]) {
      const updatedCourseProgress = {
        ...courseProgress[courseId],
        lastAccessedAt: new Date().toISOString(),
      };
      setCourseProgress((prev) => ({
        ...prev,
        [courseId]: updatedCourseProgress,
      }));
      saveToStorage(STORAGE_KEYS.COURSE_PROGRESS, {
        ...courseProgress,
        [courseId]: updatedCourseProgress,
      });
    }

    saveToStorage(STORAGE_KEYS.LESSON_PROGRESS, newLessonProgress);
  };

  const completeLesson = (lessonId: string, courseId: string) => {
    const key = `${courseId}-${lessonId}`;
    const existing = lessonProgress[key] || {
      lessonId,
      courseId,
      completed: false,
      timeSpent: 0,
    };

    if (existing.completed) return;

    const completed: LessonProgress = {
      ...existing,
      completed: true,
      completedAt: new Date().toISOString(),
    };

    const newLessonProgress = { ...lessonProgress, [key]: completed };
    setLessonProgress(newLessonProgress);

    // Update course progress
    if (courseProgress[courseId]) {
      const completedCount = Object.values(newLessonProgress).filter(
        (lp) => lp.courseId === courseId && lp.completed,
      ).length;

      const totalLessons = courseProgress[courseId].totalLessons;
      const progressPercentage = Math.round(
        (completedCount / totalLessons) * 100,
      );

      const updatedCourseProgress: CourseProgress = {
        ...courseProgress[courseId],
        completedLessons: completedCount,
        progressPercentage,
        lastAccessedAt: new Date().toISOString(),
      };

      const newCourseProgress = {
        ...courseProgress,
        [courseId]: updatedCourseProgress,
      };
      setCourseProgress(newCourseProgress);
      saveToStorage(STORAGE_KEYS.COURSE_PROGRESS, newCourseProgress);
    }

    saveToStorage(STORAGE_KEYS.LESSON_PROGRESS, newLessonProgress);
  };

  const submitQuizAttempt = (attempt: QuizAttempt) => {
    const { courseId } = attempt;
    if (!courseProgress[courseId]) return;

    const updatedProgress = {
      ...courseProgress[courseId],
      quizScores: [...courseProgress[courseId].quizScores, attempt],
      lastAccessedAt: new Date().toISOString(),
    };

    const newCourseProgress = {
      ...courseProgress,
      [courseId]: updatedProgress,
    };
    setCourseProgress(newCourseProgress);
    saveToStorage(STORAGE_KEYS.COURSE_PROGRESS, newCourseProgress);

    // Check if eligible for certificate
    const course = courses.find((c) => c.id === courseId);
    if (course?.requiresCertification && course.certificationCriteria) {
      const { minimumScore, requiredLessons } = course.certificationCriteria;
      const completedLessons = updatedProgress.completedLessons;
      const avgScore =
        updatedProgress.quizScores.reduce((sum, q) => sum + q.score, 0) /
        updatedProgress.quizScores.length;

      if (completedLessons >= requiredLessons && avgScore >= minimumScore) {
        // Generate certificate
        generateCertificate(courseId);
      }
    }
  };

  const generateCertificate = (courseId: string) => {
    const course = courses.find((c) => c.id === courseId);
    if (!course || courseProgress[courseId]?.certificateEarned) return;

    const certificate: Certificate = {
      id: `cert-${courseId}-${Date.now()}`,
      courseId,
      userId: "current-user", // Replace with actual user ID
      userName: "Utilisateur", // Replace with actual user name
      issuedAt: new Date().toISOString(),
      verificationCode: generateVerificationCode(),
      onSiteTrainingCompleted: false,
    };

    const newCertificates = [...certificates, certificate];
    setCertificates(newCertificates);
    saveToStorage(STORAGE_KEYS.CERTIFICATES, newCertificates);

    // Update course progress
    const updatedProgress = {
      ...courseProgress[courseId],
      certificateEarned: true,
      certificateId: certificate.id,
    };
    const newCourseProgress = {
      ...courseProgress,
      [courseId]: updatedProgress,
    };
    setCourseProgress(newCourseProgress);
    saveToStorage(STORAGE_KEYS.COURSE_PROGRESS, newCourseProgress);
  };

  const generateVerificationCode = (): string => {
    return `AGS-${Date.now().toString(36).toUpperCase()}-${Math.random()
      .toString(36)
      .substring(2, 8)
      .toUpperCase()}`;
  };

  const addBookmark = (bookmark: Omit<Bookmark, "id" | "createdAt">) => {
    const newBookmark: Bookmark = {
      ...bookmark,
      id: `bookmark-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };

    const newBookmarks = [...bookmarks, newBookmark];
    setBookmarks(newBookmarks);
    saveToStorage(STORAGE_KEYS.BOOKMARKS, newBookmarks);
  };

  const removeBookmark = (bookmarkId: string) => {
    const newBookmarks = bookmarks.filter((b) => b.id !== bookmarkId);
    setBookmarks(newBookmarks);
    saveToStorage(STORAGE_KEYS.BOOKMARKS, newBookmarks);
  };

  const addNote = (note: Omit<Note, "id" | "createdAt" | "updatedAt">) => {
    const newNote: Note = {
      ...note,
      id: `note-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const newNotes = [...notes, newNote];
    setNotes(newNotes);
    saveToStorage(STORAGE_KEYS.NOTES, newNotes);
  };

  const updateNote = (noteId: string, content: string) => {
    const newNotes = notes.map((n) =>
      n.id === noteId
        ? { ...n, content, updatedAt: new Date().toISOString() }
        : n,
    );
    setNotes(newNotes);
    saveToStorage(STORAGE_KEYS.NOTES, newNotes);
  };

  const deleteNote = (noteId: string) => {
    const newNotes = notes.filter((n) => n.id !== noteId);
    setNotes(newNotes);
    saveToStorage(STORAGE_KEYS.NOTES, newNotes);
  };

  const downloadLesson = async (
    lessonId: string,
    courseId: string,
  ): Promise<void> => {
    // This would implement the actual download logic using expo-file-system
    // For now, it's a placeholder
    console.log(`Downloading lesson ${lessonId} from course ${courseId}`);
    // TODO: Implement file download using FileSystem from expo-file-system
  };

  const getCourseById = (courseId: string): Course | undefined => {
    return courses.find((c) => c.id === courseId);
  };

  const getLessonById = (
    courseId: string,
    lessonId: string,
  ): Lesson | undefined => {
    const course = getCourseById(courseId);
    if (!course) return undefined;

    for (const module of course.modules) {
      const lesson = module.lessons.find((l) => l.id === lessonId);
      if (lesson) return lesson;
    }
    return undefined;
  };

  const value: TrainingContextType = {
    courses,
    enrolledCourses,
    courseProgress,
    lessonProgress,
    bookmarks,
    notes,
    certificates,
    enrollInCourse,
    updateLessonProgress,
    completeLesson,
    submitQuizAttempt,
    addBookmark,
    removeBookmark,
    addNote,
    updateNote,
    deleteNote,
    downloadLesson,
    getCourseById,
    getLessonById,
  };

  if (isLoading) {
    return null; // Or a loading spinner
  }

  return (
    <TrainingContext.Provider value={value}>
      {children}
    </TrainingContext.Provider>
  );
}

export function useTraining() {
  const context = useContext(TrainingContext);
  if (context === undefined) {
    throw new Error("useTraining must be used within a TrainingProvider");
  }
  return context;
}
