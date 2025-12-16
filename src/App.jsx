// src/App.jsx
import { useState, useEffect } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { 
  Calendar, CheckCircle, User, Mail, Lock, Eye, EyeOff,
  Camera, Sun, Moon, Edit2, Save, Phone, MapPin, Briefcase,
  LogOut, Clock, Tag, X, ArrowLeft, Check, LogIn, Star,
  ChevronLeft, ChevronRight, Bell, Settings, CreditCard,
  Shield, Zap, Globe, Download, Users, Award, Crown,
  Sparkles, TrendingUp, Calendar as CalendarIcon, Home,
  Plus, Trash2, MoreVertical, Filter, Search, AlertCircle,
  BarChart, Target, FolderPlus, ListTodo, CalendarDays
} from 'lucide-react';

// Mongolian translations
const translations = {
  en: {
    // Navigation
    dashboard: "Dashboard",
    calendar: "Calendar",
    premium: "Premium",
    profile: "Profile",
    logout: "Logout",
    
    // Authentication
    login: "Нэвтрэх",
    register: "Бүртгүүлэх",
    welcomeBack: "Тавтай морилно уу",
    signInToAccount: "Аккаунтааа нээнэ үү",
    emailAddress: "Имэйл хаяг",
    password: "Нууц үг",
    rememberMe: "Намайг сана",
    forgotPassword: "Нууц үгээ мартсан уу?",
    dontHaveAccount: "Аккаунт байхгүй юу?",
    signUp: "Бүртгүүлэх",
    createAccount: "Шинэ аккаунт үүсгэх",
    joinUs: "Бидэнтэй нэгдээрэй",
    fullName: "Бүтэн нэр",
    confirmPassword: "Нууц үг давтах",
    agreeToTerms: "Үйлчилгээний нөхцөл, Нууцлалын бодлогыг зөвшөөрч байна",
    orContinueWith: "Эсвэл үргэлжлүүлэх",
    tryDemoAccount: "Демо аккаунтоор оролдох",
    
    // Dashboard
    welcomeUser: "Сайн байна уу",
    pendingTasks: "дутуу даалгавар байна",
    taskCompletion: "Даалгаврын гүйцэтгэл",
    tasksCompleted: "Дууссан даалгавар",
    createPersonalPlan: "Хувийн төлөвлөгөө үүсгэх",
    startOrganizing: "Даалгавар, зорилгоо эхлүүлэх",
    start: "Эхлэх",
    yourTasks: "Таны даалгаврууд",
    done: "Дууссан",
    pending: "Хүлээгдэж байна",
    
    // Task CRUD
    addNewTask: "Шинэ даалгавар нэмэх",
    editTask: "Даалгавар засах",
    deleteTask: "Даалгавар устгах",
    taskTitle: "Даалгаврын гарчиг",
    taskDescription: "Дэлгэрэнгүй мэдээлэл",
    dueDate: "Дуусах хугацаа",
    priority: "Чухал ач холбогдол",
    category: "Ангилал",
    saveTask: "Даалгавар хадгалах",
    cancel: "Цуцлах",
    deleteConfirmation: "Даалгаврыг устгахдаа итгэлтэй байна уу?",
    highPriority: "Өндөр",
    mediumPriority: "Дунд",
    lowPriority: "Бага",
    work: "Ажил",
    personal: "Хувийн",
    health: "Эрүүл мэнд",
    finance: "Санхүү",
    education: "Боловсрол",
    filterBy: "Шүүх",
    allTasks: "Бүх даалгавар",
    searchTasks: "Даалгавар хайх",
    noTasksFound: "Даалгавар олдсонгүй",
    addYourFirstTask: "Эхний даалгавраа нэмнэ үү",
    
    // Profile
    editProfile: "Профайл засах",
    cleanWhiteEdit: "Цэвэр цагаан хэв маяг",
    profileInformation: "Профайлын мэдээлэл",
    professionalInformation: "Мэргэжлийн мэдээлэл",
    jobTitle: "Албан тушаал",
    bio: "Товч танилцуулга",
    saveChanges: "Өөрчлөлтүүдийг хадгалах",
    saveExit: "Хадгалах & Гарах",
    uploadNewPhoto: "Шинэ зураг оруулах",
    googleAccount: "Google аккаунт",
    profilePictureManaged: "Профайл зургийг Google удирддаг",
    
    // Calendar
    manageSchedule: "Хуваарь, уулзалтуудыг удирдах",
    today: "Өнөөдөр",
    hasTasks: "Даалгавартай",
    
    // Premium
    upgradeToPremium: "Premium хувилбарт шилжих",
    unlockFeatures: "Дараах онцлог шинж чанаруудыг нээнэ үү",
    currentPlan: "Одоогийн төлөвлөгөө",
    free: "Үнэгүй",
    premiumPlan: "Premium төлөвлөгөө",
    perMonth: "сар бүр",
    choosePlan: "Төлөвлөгөө сонгох",
    featuresIncluded: "Оролцсон онцлог шинжүүд",
    advancedAnalytics: "Дэвшилтэт шинжилгээ",
    unlimitedTasks: "Хязгааргүй даалгавар",
    prioritySupport: "Тэргүүлэх дэмжлэг",
    customThemes: "Хувийн сэдвүүд",
    exportData: "Өгөгдөл экспортлох",
    teamCollaboration: "Багийн хамтын ажиллагаа",
    earlyAccess: "Эрт нээлт",
    exclusiveBadges: "Онцгой тэмдэглэгээ",
    secureBackup: "Аюулгүй нөөцлөлт",
    currentlyUsing: "Одоо хэрэглэж байна",
    upgradeNow: "Одоо шинэчлэх",
    
    // Stats
    quickStats: "Товч статистик",
    tasksToday: "Өнөөдрийн даалгавар",
    productivityScore: "Бүтээмжийн оноо",
    streak: "Дараалсан өдрүүд",
    
    // Common
    loading: "Уншиж байна...",
    signingIn: "Нэвтэрч байна...",
    creatingAccount: "Аккаунт үүсгэж байна...",
    darkMode: "Харанхуй горим",
    lightMode: "Гэрэлтэй горим",
    allRightsReserved: "Бүх эрх хуулиар хамгаалагдсан",
    demoCredentials: "Демо: demo@example.com / demo123",
    connectedWithGoogle: "Google-ээр холбогдсон",
    emailAccount: "Имэйл аккаунт",
    monthNames: ["Нэгдүгээр сар", "Хоёрдугаар сар", "Гуравдугаар сар", "Дөрөвдүгээр сар", "Тавдугаар сар", "Зургадугаар сар", "Долдугаар сар", "Наймдугаар сар", "Есдүгээр сар", "Аравдугаар сар", "Арван нэгдүгээр сар", "Арван хоёрдугаар сар"],
    dayNames: ["Ня", "Да", "Мя", "Лх", "Пү", "Ба", "Бя"],
  },
  mn: {
    // Navigation
    dashboard: "Хянах самбар",
    calendar: "Календар",
    premium: "Premium",
    profile: "Профайл",
    logout: "Гарах",
    
    // Authentication
    login: "Нэвтрэх",
    register: "Бүртгүүлэх",
    welcomeBack: "Тавтай морилно уу",
    signInToAccount: "Аккаунтааа нээнэ үү",
    emailAddress: "Имэйл хаяг",
    password: "Нууц үг",
    rememberMe: "Намайг сана",
    forgotPassword: "Нууц үгээ мартсан уу?",
    dontHaveAccount: "Аккаунт байхгүй юу?",
    signUp: "Бүртгүүлэх",
    createAccount: "Шинэ аккаунт үүсгэх",
    joinUs: "Бидэнтэй нэгдээрэй",
    fullName: "Бүтэн нэр",
    confirmPassword: "Нууц үг давтах",
    agreeToTerms: "Үйлчилгээний нөхцөл, Нууцлалын бодлогыг зөвшөөрч байна",
    orContinueWith: "Эсвэл үргэлжлүүлэх",
    tryDemoAccount: "Демо аккаунтоор оролдох",
    
    // Dashboard
    welcomeUser: "Сайн байна уу",
    pendingTasks: "дутуу даалгавар байна",
    taskCompletion: "Даалгаврын гүйцэтгэл",
    tasksCompleted: "Дууссан даалгавар",
    createPersonalPlan: "Хувийн төлөвлөгөө үүсгэх",
    startOrganizing: "Даалгавар, зорилгоо эхлүүлэх",
    start: "Эхлэх",
    yourTasks: "Таны даалгаврууд",
    done: "Дууссан",
    pending: "Хүлээгдэж байна",
    
    // Task CRUD
    addNewTask: "Шинэ даалгавар нэмэх",
    editTask: "Даалгавар засах",
    deleteTask: "Даалгавар устгах",
    taskTitle: "Даалгаврын гарчиг",
    taskDescription: "Дэлгэрэнгүй мэдээлэл",
    dueDate: "Дуусах хугацаа",
    priority: "Чухал ач холбогдол",
    category: "Ангилал",
    saveTask: "Даалгавар хадгалах",
    cancel: "Цуцлах",
    deleteConfirmation: "Даалгаврыг устгахдаа итгэлтэй байна уу?",
    highPriority: "Өндөр",
    mediumPriority: "Дунд",
    lowPriority: "Бага",
    work: "Ажил",
    personal: "Хувийн",
    health: "Эрүүл мэнд",
    finance: "Санхүү",
    education: "Боловсрол",
    filterBy: "Шүүх",
    allTasks: "Бүх даалгавар",
    searchTasks: "Даалгавар хайх",
    noTasksFound: "Даалгавар олдсонгүй",
    addYourFirstTask: "Эхний даалгавраа нэмнэ үү",
    
    // Profile
    editProfile: "Профайл засах",
    cleanWhiteEdit: "Цэвэр цагаан хэв маяг",
    profileInformation: "Профайлын мэдээлэл",
    professionalInformation: "Мэргэжлийн мэдээлэл",
    jobTitle: "Албан тушаал",
    bio: "Товч танилцуулга",
    saveChanges: "Өөрчлөлтүүдийг хадгалах",
    saveExit: "Хадгалах & Гарах",
    uploadNewPhoto: "Шинэ зураг оруулах",
    googleAccount: "Google аккаунт",
    profilePictureManaged: "Профайл зургийг Google удирддаг",
    
    // Calendar
    manageSchedule: "Хуваарь, уулзалтуудыг удирдах",
    today: "Өнөөдөр",
    hasTasks: "Даалгавартай",
    
    // Premium
    upgradeToPremium: "Premium хувилбарт шилжих",
    unlockFeatures: "Дараах онцлог шинж чанаруудыг нээнэ үү",
    currentPlan: "Одоогийн төлөвлөгөө",
    free: "Үнэгүй",
    premiumPlan: "Premium төлөвлөгөө",
    perMonth: "сар бүр",
    choosePlan: "Төлөвлөгөө сонгох",
    featuresIncluded: "Оролцсон онцлог шинжүүд",
    advancedAnalytics: "Дэвшилтэт шинжилгээ",
    unlimitedTasks: "Хязгааргүй даалгавар",
    prioritySupport: "Тэргүүлэх дэмжлэг",
    customThemes: "Хувийн сэдвүүд",
    exportData: "Өгөгдөл экспортлох",
    teamCollaboration: "Багийн хамтын ажиллагаа",
    earlyAccess: "Эрт нээлт",
    exclusiveBadges: "Онцгой тэмдэглэгээ",
    secureBackup: "Аюулгүй нөөцлөлт",
    currentlyUsing: "Одоо хэрэглэж байна",
    upgradeNow: "Одоо шинэчлэх",
    
    // Stats
    quickStats: "Товч статистик",
    tasksToday: "Өнөөдрийн даалгавар",
    productivityScore: "Бүтээмжийн оноо",
    streak: "Дараалсан өдрүүд",
    
    // Common
    loading: "Уншиж байна...",
    signingIn: "Нэвтэрч байна...",
    creatingAccount: "Аккаунт үүсгэж байна...",
    darkMode: "Харанхуй горим",
    lightMode: "Гэрэлтэй горим",
    allRightsReserved: "Бүх эрх хуулиар хамгаалагдсан",
    demoCredentials: "Демо: demo@example.com / demo123",
    connectedWithGoogle: "Google-ээр холбогдсон",
    emailAccount: "Имэйл аккаунт",
    monthNames: ["Нэгдүгээр сар", "Хоёрдугаар сар", "Гуравдугаар сар", "Дөрөвдүгээр сар", "Тавдугаар сар", "Зургадугаар сар", "Долдугаар сар", "Наймдугаар сар", "Есдүгээр сар", "Аравдугаар сар", "Арван нэгдүгээр сар", "Арван хоёрдугаар сар"],
    dayNames: ["Ня", "Да", "Мя", "Лх", "Пү", "Ба", "Бя"],
  }
};

function App() {
  // Language state
  const [language, setLanguage] = useState('mn');
  const t = translations[language];
  
  // Authentication state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [activeView, setActiveView] = useState('dashboard');
  const [loginMethod, setLoginMethod] = useState('email');
  
  // UI state
  const [darkMode, setDarkMode] = useState(false);
  const [profileEditMode, setProfileEditMode] = useState(false);
  const [cleanWhiteMode, setCleanWhiteMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Calendar state
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Task CRUD state
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // New task form state
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: new Date().toISOString().split('T')[0],
    priority: 'medium',
    category: 'personal',
    completed: false
  });

  // User data
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    jobTitle: "",
    bio: "",
    avatar: "",
    googleId: "",
    loginMethod: "",
    isPremium: false
  });

  // Form data
  const [loginData, setLoginData] = useState({ 
    email: 'demo@example.com',
    password: 'demo123',
    rememberMe: false 
  });
  
  const [registerData, setRegisterData] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    confirmPassword: '' 
  });

  // Categories and priorities
  const categories = [
    { value: 'work', label: t.work, color: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' },
    { value: 'personal', label: t.personal, color: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' },
    { value: 'health', label: t.health, color: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300' },
    { value: 'finance', label: t.finance, color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300' },
    { value: 'education', label: t.education, color: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300' },
  ];

  const priorities = [
    { value: 'high', label: t.highPriority, color: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300' },
    { value: 'medium', label: t.mediumPriority, color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300' },
    { value: 'low', label: t.lowPriority, color: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' },
  ];

  // Tasks data - localStorage-с уншиж эсвэл анхны өгөгдөл
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      return JSON.parse(savedTasks);
    }
    return [
      { 
        id: 1, 
        title: "Төслийн санал боловсруулах", 
        description: "Мэдээлэл технологийн төслийн дэлгэрэнгүй санал боловсруулах",
        completed: true, 
        date: "2024-03-22", 
        priority: "high",
        category: "work"
      },
      { 
        id: 2, 
        title: "Багийн хурлын 2 цагт", 
        description: "Долоо хоногийн хурлын хуралдаан",
        completed: true, 
        date: "2024-03-22", 
        priority: "medium",
        category: "work"
      },
      { 
        id: 3, 
        title: "Хоолны дэлгүүрт очих", 
        description: "Гол хоол, жимс, ногоо худалдаж авах",
        completed: true, 
        date: "2024-03-22", 
        priority: "low",
        category: "personal"
      },
      { 
        id: 4, 
        title: "Портфолио шинэчлэх", 
        description: "Сүүлийн төслүүдийг портфолионд нэмэх",
        completed: false, 
        date: new Date().toISOString().split('T')[0], 
        priority: "high",
        category: "work"
      },
      { 
        id: 5, 
        title: "Ээж рүү залгах", 
        description: "Гэр бүлийн мэдээлэл солилцох",
        completed: false, 
        date: new Date().toISOString().split('T')[0], 
        priority: "medium",
        category: "personal"
      },
    ];
  });

  // Calculate stats
  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const completionPercentage = Math.round((completedTasks / totalTasks) * 100);

  // Filtered tasks
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || task.category === filterCategory;
    const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'completed' && task.completed) ||
                         (filterStatus === 'pending' && !task.completed);
    
    return matchesSearch && matchesCategory && matchesPriority && matchesStatus;
  });

  // Save tasks to localStorage
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Task CRUD Operations
  const handleAddTask = () => {
    setEditingTask(null);
    setNewTask({
      title: '',
      description: '',
      dueDate: new Date().toISOString().split('T')[0],
      priority: 'medium',
      category: 'personal',
      completed: false
    });
    setShowTaskModal(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setNewTask({
      title: task.title,
      description: task.description || '',
      dueDate: task.date,
      priority: task.priority,
      category: task.category,
      completed: task.completed
    });
    setShowTaskModal(true);
  };

  const handleDeleteTask = (task) => {
    setTaskToDelete(task);
    setShowDeleteModal(true);
  };

  const confirmDeleteTask = () => {
    setTasks(tasks.filter(task => task.id !== taskToDelete.id));
    setShowDeleteModal(false);
    setTaskToDelete(null);
  };

  const saveTask = () => {
    if (!newTask.title.trim()) {
      alert(t.taskTitle + ' оруулна уу!');
      return;
    }

    if (editingTask) {
      // Update existing task
      setTasks(tasks.map(task => 
        task.id === editingTask.id 
          ? { 
              ...task, 
              title: newTask.title,
              description: newTask.description,
              date: newTask.dueDate,
              priority: newTask.priority,
              category: newTask.category,
              completed: newTask.completed
            }
          : task
      ));
    } else {
      // Add new task
      const newTaskObj = {
        id: tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1,
        title: newTask.title,
        description: newTask.description,
        completed: newTask.completed,
        date: newTask.dueDate,
        priority: newTask.priority,
        category: newTask.category
      };
      setTasks([...tasks, newTaskObj]);
    }

    setShowTaskModal(false);
    setNewTask({
      title: '',
      description: '',
      dueDate: new Date().toISOString().split('T')[0],
      priority: 'medium',
      category: 'personal',
      completed: false
    });
    setEditingTask(null);
  };

  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) {
      return t.today;
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Маргааш';
    } else {
      return date.toLocaleDateString('mn-MN', { month: 'short', day: 'numeric' });
    }
  };

  // Calendar functions
  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const generateCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const days = [];
    
    // Previous month days
    const prevMonthDays = getDaysInMonth(year, month - 1);
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({ day: prevMonthDays - i, isCurrentMonth: false, isToday: false });
    }
    
    // Current month days
    const today = new Date();
    for (let i = 1; i <= daysInMonth; i++) {
      const isToday = today.getDate() === i && today.getMonth() === month && today.getFullYear() === year;
      days.push({ day: i, isCurrentMonth: true, isToday });
    }
    
    // Next month days
    const totalCells = 42; // 6 weeks * 7 days
    const nextMonthDays = totalCells - days.length;
    for (let i = 1; i <= nextMonthDays; i++) {
      days.push({ day: i, isCurrentMonth: false, isToday: false });
    }
    
    return days;
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
    setSelectedDate(new Date());
  };

  // Handle Google Login Success
  const handleGoogleLoginSuccess = (credentialResponse) => {
    if (credentialResponse.credential) {
      const decodedToken = jwtDecode(credentialResponse.credential);
      
      setUser({
        name: decodedToken.name,
        email: decodedToken.email,
        phone: "",
        location: "",
        jobTitle: "Google хэрэглэгч",
        bio: "Google-ээр нэвтэрсэн",
        avatar: decodedToken.picture,
        googleId: decodedToken.sub,
        loginMethod: 'google',
        isPremium: false
      });
      
      setIsLoggedIn(true);
      setLoginMethod('google');
      setActiveView('dashboard');
      
      localStorage.setItem('user', JSON.stringify({
        name: decodedToken.name,
        email: decodedToken.email,
        avatar: decodedToken.picture,
        googleId: decodedToken.sub,
        loginMethod: 'google',
        isPremium: false
      }));
    }
  };

  const handleGoogleLoginError = () => {
    alert('Google нэвтрэлт амжилтгүй боллоо. Дахин оролдоно уу.');
  };

  // Handle Email/Password Login
  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      setUser({
        name: "Жамиэль Смит",
        email: loginData.email,
        phone: "+976 (55) 123-4567",
        location: "Улаанбаатар, Монгол",
        jobTitle: "Програм хангамжийн инженер",
        bio: "Даалгавар, цаг хуваарь удирдах програм хангамжид сонирхолтой.",
        avatar: null,
        googleId: "",
        loginMethod: 'email',
        isPremium: false
      });
      
      setIsLoggedIn(true);
      setLoginMethod('email');
      setActiveView('dashboard');
      setLoading(false);
      
      localStorage.setItem('user', JSON.stringify({
        name: "Жамиэль Смит",
        email: loginData.email,
        loginMethod: 'email',
        isPremium: false
      }));
    }, 1000);
  };

  // Handle Registration
  const handleRegister = (e) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      alert("Нууц үгнүүд таарахгүй байна!");
      return;
    }
    
    setLoading(true);
    setTimeout(() => {
      setUser({
        name: registerData.name,
        email: registerData.email,
        phone: "",
        location: "",
        jobTitle: "Шинэ хэрэглэгч",
        bio: "Personal Planner-д тавтай морил!",
        avatar: null,
        googleId: "",
        loginMethod: 'email',
        isPremium: false
      });
      
      setIsLoggedIn(true);
      setLoginMethod('email');
      setActiveView('dashboard');
      setLoading(false);
      
      localStorage.setItem('user', JSON.stringify({
        name: registerData.name,
        email: registerData.email,
        loginMethod: 'email',
        isPremium: false
      }));
    }, 1000);
  };

  // Handle Logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginMethod('email');
    setActiveView('dashboard');
    localStorage.removeItem('user');
  };

  // Profile handlers
  const toggleProfileEdit = () => {
    setProfileEditMode(!profileEditMode);
  };

  const toggleCleanWhiteMode = () => {
    setCleanWhiteMode(!cleanWhiteMode);
    setProfileEditMode(true);
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    setProfileEditMode(false);
    setCleanWhiteMode(false);
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUser({ ...user, avatar: event.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Upgrade to Premium
  const handleUpgradeToPremium = () => {
    setUser({ ...user, isPremium: true });
    setActiveView('dashboard');
    alert('Та Premium гишүүн боллоо! Баяр хүргэе!');
  };

  // Check for saved user on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      if (userData.loginMethod === 'google') {
        setUser({
          name: userData.name || "Google хэрэглэгч",
          email: userData.email || "user@gmail.com",
          phone: "",
          location: "Google аккаунт",
          jobTitle: "Google хэрэглэгч",
          bio: "Google-ээр нэвтэрсэн",
          avatar: userData.avatar || null,
          googleId: userData.googleId || "",
          loginMethod: 'google',
          isPremium: userData.isPremium || false
        });
      } else {
        setUser({
          name: userData.name || "Жамиэль Смит",
          email: userData.email || "demo@example.com",
          phone: "+976 (55) 123-4567",
          location: "Улаанбаатар, Монгол",
          jobTitle: "Програм хангамжийн инженер",
          bio: "Даалгавар, цаг хуваарь удирдах програм хангамжид сонирхолтой.",
          avatar: null,
          googleId: "",
          loginMethod: 'email',
          isPremium: userData.isPremium || false
        });
      }
      setIsLoggedIn(true);
      setLoginMethod(userData.loginMethod || 'email');
    }
  }, []);

  // Task Modal Component
  const TaskModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {editingTask ? t.editTask : t.addNewTask}
            </h2>
            <button
              onClick={() => setShowTaskModal(false)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t.taskTitle} *
              </label>
              <input
                type="text"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent dark:text-white"
                placeholder="Даалгаврын гарчиг оруулна уу"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t.taskDescription}
              </label>
              <textarea
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent dark:text-white resize-none"
                placeholder="Дэлгэрэнгүй мэдээлэл"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t.dueDate}
                </label>
                <input
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t.priority}
                </label>
                <select
                  value={newTask.priority}
                  onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent dark:text-white"
                >
                  {priorities.map(priority => (
                    <option key={priority.value} value={priority.value} className="dark:bg-gray-800">
                      {priority.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t.category}
              </label>
              <select
                value={newTask.category}
                onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent dark:text-white"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value} className="dark:bg-gray-800">
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="completed"
                checked={newTask.completed}
                onChange={(e) => setNewTask({ ...newTask, completed: e.target.checked })}
                className="w-4 h-4 text-blue-600 rounded border-gray-300"
              />
              <label htmlFor="completed" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                Дууссан
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-6 mt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setShowTaskModal(false)}
              className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              {t.cancel}
            </button>
            <button
              onClick={saveTask}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {t.saveTask}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Delete Confirmation Modal
  const DeleteConfirmationModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle className="w-8 h-8 text-red-500" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{t.deleteTask}</h3>
          </div>
          
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            "{taskToDelete?.title}" {t.deleteConfirmation}
          </p>

          <div className="flex justify-end gap-4">
            <button
              onClick={() => setShowDeleteModal(false)}
              className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              {t.cancel}
            </button>
            <button
              onClick={confirmDeleteTask}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              {t.deleteTask}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Render Calendar View
  const renderCalendarView = () => {
    const calendarDays = generateCalendar();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    
    return (
      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                {t.monthNames[currentMonth]} {currentYear}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">{t.manageSchedule}</p>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={prevMonth}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={goToToday}
                className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg font-medium"
              >
                {t.today}
              </button>
              <button 
                onClick={nextMonth}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2 mb-4">
            {t.dayNames.map(day => (
              <div key={day} className="text-center font-semibold text-gray-600 dark:text-gray-400 py-2">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {calendarDays.map((dayData, index) => {
              const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(dayData.day).padStart(2, '0')}`;
              const hasTasks = tasks.some(task => task.date === dateStr);
              
              return (
                <div
                  key={index}
                  onClick={() => {
                    const selected = new Date(currentYear, currentMonth, dayData.day);
                    setSelectedDate(selected);
                    if (hasTasks) {
                      setSearchQuery('');
                      setFilterCategory('all');
                      setFilterPriority('all');
                      setFilterStatus('all');
                    }
                  }}
                  className={`min-h-24 p-2 border rounded-lg cursor-pointer transition-all ${
                    dayData.isCurrentMonth 
                      ? 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700' 
                      : 'border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900'
                  } ${dayData.isToday ? 'ring-2 ring-blue-500' : ''} ${
                    selectedDate.getDate() === dayData.day && 
                    selectedDate.getMonth() === currentMonth && 
                    selectedDate.getFullYear() === currentYear
                      ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-700'
                      : ''
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className={`font-semibold ${
                      dayData.isCurrentMonth 
                        ? dayData.isToday 
                          ? 'text-blue-600 dark:text-blue-400' 
                          : 'text-gray-800 dark:text-white'
                        : 'text-gray-400 dark:text-gray-600'
                    }`}>
                      {dayData.day}
                    </span>
                    {hasTasks && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    )}
                  </div>
                  <div className="space-y-1">
                    {tasks.filter(task => task.date === dateStr).slice(0, 2).map(task => (
                      <div key={task.id} className="text-xs p-1 bg-blue-50 dark:bg-blue-900 rounded truncate">
                        {task.title}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Day Tasks */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              {selectedDate.toLocaleDateString('mn-MN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </h3>
            <button
              onClick={() => {
                setNewTask({
                  ...newTask,
                  dueDate: selectedDate.toISOString().split('T')[0]
                });
                setEditingTask(null);
                setShowTaskModal(true);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus className="w-4 h-4" />
              {t.addNewTask}
            </button>
          </div>
          
          <div className="space-y-3">
            {tasks
              .filter(task => task.date === selectedDate.toISOString().split('T')[0])
              .map(task => (
              <div key={task.id} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => toggleTaskCompletion(task.id)}
                    className={`w-5 h-5 rounded flex items-center justify-center ${task.completed ? 'bg-green-500' : 'border-2 border-gray-300 dark:border-gray-500'}`}
                  >
                    {task.completed && <CheckCircle className="w-3 h-3 text-white" />}
                  </button>
                  <div>
                    <span className={`font-medium ${task.completed ? 'line-through text-gray-400' : 'text-gray-800 dark:text-white'}`}>
                      {task.title}
                    </span>
                    {task.description && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 truncate">
                        {task.description}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    priorities.find(p => p.value === task.priority)?.color
                  }`}>
                    {priorities.find(p => p.value === task.priority)?.label}
                  </span>
                  <button
                    onClick={() => handleEditTask(task)}
                    className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                  >
                    <Edit2 className="w-4 h-4 text-gray-500" />
                  </button>
                  <button
                    onClick={() => handleDeleteTask(task)}
                    className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </div>
            ))}
            {tasks.filter(task => task.date === selectedDate.toISOString().split('T')[0]).length === 0 && (
              <div className="text-center py-8">
                <CalendarDays className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500 dark:text-gray-400">Энэ өдөр даалгавар байхгүй байна</p>
                <button
                  onClick={() => {
                    setNewTask({
                      ...newTask,
                      dueDate: selectedDate.toISOString().split('T')[0]
                    });
                    setEditingTask(null);
                    setShowTaskModal(true);
                  }}
                  className="mt-3 text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Шинэ даалгавар нэмэх
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Render Premium View
  const renderPremiumView = () => {
    return (
      <div className="space-y-6">
        {/* Premium Hero */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl shadow-xl p-8 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="md:w-2/3">
              <h1 className="text-3xl font-bold mb-4">{t.upgradeToPremium}</h1>
              <p className="text-purple-100 mb-6">
                {t.unlockFeatures}
              </p>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  <span>Хязгааргүй даалгавар</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  <span>Аюулгүй нөөцлөлт</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  <span>Түргэн дэмжлэг</span>
                </div>
              </div>
            </div>
            <div className="md:w-1/3">
              <Crown className="w-32 h-32 mx-auto text-yellow-300" />
            </div>
          </div>
        </div>

        {/* Plans Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Free Plan */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border-2 border-gray-200 dark:border-gray-700">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{t.currentPlan}</h3>
              <div className="text-4xl font-bold text-gray-800 dark:text-white mb-1">{t.free}</div>
              <p className="text-gray-600 dark:text-gray-400">Үргэлж үнэгүй</p>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-gray-700 dark:text-gray-300">Хязгаарлагдмал даалгавар</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-gray-700 dark:text-gray-300">Үндсэн календар</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-gray-700 dark:text-gray-300">Имэйл дэмжлэг</span>
              </div>
              <div className="flex items-center gap-3">
                <X className="w-5 h-5 text-gray-400" />
                <span className="text-gray-400 line-through">Дэвшилтэт шинжилгээ</span>
              </div>
              <div className="flex items-center gap-3">
                <X className="w-5 h-5 text-gray-400" />
                <span className="text-gray-400 line-through">Хувийн сэдвүүд</span>
              </div>
            </div>
            
            <button
              disabled={!user.isPremium}
              className={`w-full py-3 rounded-lg font-medium ${
                user.isPremium
                  ? 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {user.isPremium ? t.currentlyUsing : t.currentlyUsing}
            </button>
          </div>

          {/* Premium Plan */}
          <div className="bg-gradient-to-b from-blue-900 to-purple-900 rounded-2xl shadow-xl p-6 border-2 border-yellow-400 relative overflow-hidden">
            <div className="absolute top-4 right-4">
              <div className="px-3 py-1 bg-yellow-400 text-blue-900 text-sm font-bold rounded-full">
                POPULAR
              </div>
            </div>
            
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-white mb-2">{t.premiumPlan}</h3>
              <div className="text-4xl font-bold text-white mb-1">₮29,900</div>
              <p className="text-blue-200">{t.perMonth}</p>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3">
                <Star className="w-5 h-5 text-yellow-400" />
                <span className="text-white font-medium">Хязгааргүй даалгавар</span>
              </div>
              <div className="flex items-center gap-3">
                <Star className="w-5 h-5 text-yellow-400" />
                <span className="text-white font-medium">Дэвшилтэт шинжилгээ</span>
              </div>
              <div className="flex items-center gap-3">
                <Star className="w-5 h-5 text-yellow-400" />
                <span className="text-white font-medium">Тэргүүлэх дэмжлэг</span>
              </div>
              <div className="flex items-center gap-3">
                <Star className="w-5 h-5 text-yellow-400" />
                <span className="text-white font-medium">Хувийн сэдвүүд</span>
              </div>
              <div className="flex items-center gap-3">
                <Star className="w-5 h-5 text-yellow-400" />
                <span className="text-white font-medium">Өгөгдөл экспортлох</span>
              </div>
            </div>
            
            <button
              onClick={handleUpgradeToPremium}
              disabled={user.isPremium}
              className={`w-full py-3 rounded-lg font-medium transition-all ${
                user.isPremium
                  ? 'bg-yellow-400 text-blue-900'
                  : 'bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-blue-900 font-bold'
              }`}
            >
              {user.isPremium ? 'PREMIUM ГИШҮҮН' : t.upgradeNow}
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">{t.featuresIncluded}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h4 className="font-semibold text-gray-800 dark:text-white mb-2">{t.advancedAnalytics}</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Бүтээмж, гүйцэтгэлийн дэлгэрэнгүй шинжилгээ</p>
            </div>
            
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
                <Download className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h4 className="font-semibold text-gray-800 dark:text-white mb-2">{t.exportData}</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">PDF, Excel форматаар өгөгдөл татаж авах</p>
            </div>
            
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h4 className="font-semibold text-gray-800 dark:text-white mb-2">{t.teamCollaboration}</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Багийн гишүүдтэй хамтран ажиллах</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render Dashboard View with Task Management
  const renderDashboardView = () => (
    <>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">{t.taskCompletion}</h2>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative w-24 h-24">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="10" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#3b82f6" strokeWidth="10"
                    strokeLinecap="round" strokeDasharray={`${completionPercentage * 2.51} 251`} transform="rotate(-90 50 50)" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-2xl font-bold text-gray-800 dark:text-white">{completionPercentage}%</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">Дууссан</span>
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-800 dark:text-white">{completedTasks}/{totalTasks}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{t.tasksCompleted}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl shadow-lg p-6 text-white">
          <h2 className="text-lg font-semibold mb-4">{t.createPersonalPlan}</h2>
          <p className="text-blue-100 mb-6">{t.startOrganizing}</p>
          <button 
            onClick={handleAddTask}
            className="flex items-center justify-center gap-2 bg-white text-blue-700 font-semibold py-3 px-6 rounded-full hover:bg-blue-50 transition-colors"
          >
            <Plus className="w-5 h-5" />
            {t.addNewTask}
          </button>
        </div>
      </div>

      {/* Task Management */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">{t.yourTasks}</h2>
          <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
            ({completedTasks}/{totalTasks}) Дууссан
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent dark:text-white"
              placeholder={t.searchTasks}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t.category}
              </label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent dark:text-white"
              >
                <option value="all">{t.allTasks}</option>
                {categories.map(category => (
                  <option key={category.value} value={category.value} className="dark:bg-gray-800">
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t.priority}
              </label>
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent dark:text-white"
              >
                <option value="all">{t.allTasks}</option>
                {priorities.map(priority => (
                  <option key={priority.value} value={priority.value} className="dark:bg-gray-800">
                    {priority.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Төлөв
              </label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent dark:text-white"
              >
                <option value="all">Бүх даалгавар</option>
                <option value="pending">Хүлээгдэж байна</option>
                <option value="completed">Дууссан</option>
              </select>
            </div>
          </div>
        </div>

        {/* Task List */}
        <div className="space-y-4">
          {filteredTasks.length > 0 ? (
            filteredTasks.map(task => (
              <div key={task.id} className="flex items-center justify-between p-4 border border-gray-100 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <div className="flex items-start gap-4">
                  <button 
                    onClick={() => toggleTaskCompletion(task.id)}
                    className={`w-6 h-6 rounded-full flex items-center justify-center mt-1 ${task.completed ? 'bg-green-500' : 'border-2 border-gray-300 dark:border-gray-500'}`}
                  >
                    {task.completed && <CheckCircle className="w-4 h-4 text-white" />}
                  </button>
                  <div className="flex-1">
                    <div className={`font-medium ${task.completed ? 'text-gray-400 line-through' : 'text-gray-800 dark:text-white'}`}>
                      {task.title}
                    </div>
                    {task.description && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {task.description}
                      </p>
                    )}
                    <div className="flex flex-wrap items-center gap-3 mt-2">
                      <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                        <Clock className="w-3 h-3" />
                        {formatDate(task.date)}
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <Tag className="w-3 h-3" />
                        <span className={`px-2 py-0.5 rounded-full text-xs ${
                          categories.find(c => c.value === task.category)?.color
                        }`}>
                          {categories.find(c => c.value === task.category)?.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <span className={`px-2 py-0.5 rounded-full text-xs ${
                          priorities.find(p => p.value === task.priority)?.color
                        }`}>
                          {priorities.find(p => p.value === task.priority)?.label}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                    task.completed ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' :
                    'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                  }`}>
                    {task.completed ? t.done : t.pending}
                  </span>
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleEditTask(task)}
                      className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                      title={t.editTask}
                    >
                      <Edit2 className="w-4 h-4 text-gray-500" />
                    </button>
                    <button
                      onClick={() => handleDeleteTask(task)}
                      className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                      title={t.deleteTask}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <FolderPlus className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                {t.noTasksFound}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {searchQuery || filterCategory !== 'all' || filterPriority !== 'all' || filterStatus !== 'all'
                  ? 'Шүүлттэй таарсан даалгавар олдсонгүй'
                  : t.addYourFirstTask}
              </p>
              <button
                onClick={handleAddTask}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mx-auto"
              >
                <Plus className="w-4 h-4" />
                {t.addNewTask}
              </button>
            </div>
          )}
        </div>

        {/* Add Task Button */}
        <button 
          onClick={handleAddTask}
          className="mt-6 w-full py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl text-gray-500 dark:text-gray-400 hover:border-blue-500 hover:text-blue-500 transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          {t.addNewTask}
        </button>
      </div>
    </>
  );

  // Login/Register Page
  if (!isLoggedIn) {
    return (
      <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
        <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'}`}>
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col items-center justify-center min-h-[90vh]">
              {/* Language Toggle */}
              <div className="mb-4">
                <button
                  onClick={() => setLanguage(language === 'mn' ? 'en' : 'mn')}
                  className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  {language === 'mn' ? 'English' : 'Монгол'}
                </button>
              </div>

              {/* Header */}
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Calendar className="w-10 h-10 text-blue-600" />
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Personal Planner</h1>
                </div>
                <p className="text-gray-600 dark:text-gray-400">Таны даалгавар, цаг хугацааны туслах</p>
              </div>

              {/* Auth Card */}
              <div className="w-full max-w-md">
                {/* Toggle Buttons */}
                <div className="flex mb-6 bg-white dark:bg-gray-800 rounded-xl p-1">
                  <button
                    onClick={() => setShowLogin(true)}
                    className={`flex-1 py-3 rounded-lg font-medium ${showLogin ? 'bg-blue-600 text-white' : 'text-gray-600 dark:text-gray-400'}`}
                  >
                    {t.login}
                  </button>
                  <button
                    onClick={() => setShowLogin(false)}
                    className={`flex-1 py-3 rounded-lg font-medium ${!showLogin ? 'bg-blue-600 text-white' : 'text-gray-600 dark:text-gray-400'}`}
                  >
                    {t.register}
                  </button>
                </div>

                {/* Login Options */}
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700"></div>
                    <span className="text-gray-500 dark:text-gray-400 text-sm">{t.orContinueWith}</span>
                    <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700"></div>
                  </div>
                  
                  {/* Google Login Button */}
                  <div className="flex justify-center">
                    <GoogleLogin
                      onSuccess={handleGoogleLoginSuccess}
                      onError={handleGoogleLoginError}
                      shape="rectangular"
                      theme="filled_blue"
                      size="large"
                      text="signin_with"
                      width="320"
                    />
                  </div>
                </div>

                {/* Login Form */}
                {showLogin ? (
                  <form onSubmit={handleLogin} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{t.welcomeBack}</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">{t.signInToAccount}</p>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          {t.emailAddress}
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="email"
                            value={loginData.email}
                            onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                            className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent dark:text-white"
                            placeholder="you@example.com"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          {t.password}
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type={showPassword ? "text" : "password"}
                            value={loginData.password}
                            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                            className="w-full pl-12 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent dark:text-white"
                            placeholder="••••••••"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                          >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={loginData.rememberMe}
                            onChange={(e) => setLoginData({ ...loginData, rememberMe: e.target.checked })}
                            className="w-4 h-4 text-blue-600 rounded"
                          />
                          <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{t.rememberMe}</span>
                        </label>
                        <a href="#" className="text-sm text-blue-600 dark:text-blue-400">
                          {t.forgotPassword}
                        </a>
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                      >
                        {loading ? t.signingIn : t.login}
                      </button>

                      <div className="text-center">
                        <p className="text-gray-600 dark:text-gray-400">
                          {t.dontHaveAccount}{' '}
                          <button
                            type="button"
                            onClick={() => setShowLogin(false)}
                            className="text-blue-600 dark:text-blue-400 font-medium"
                          >
                            {t.signUp}
                          </button>
                        </p>
                      </div>
                    </div>
                  </form>
                ) : (
                  /* Register Form */
                  <form onSubmit={handleRegister} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{t.createAccount}</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">{t.joinUs}</p>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          {t.fullName}
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="text"
                            value={registerData.name}
                            onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                            className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent dark:text-white"
                            placeholder="John Doe"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          {t.emailAddress}
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="email"
                            value={registerData.email}
                            onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                            className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent dark:text-white"
                            placeholder="you@example.com"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          {t.password}
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type={showPassword ? "text" : "password"}
                            value={registerData.password}
                            onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                            className="w-full pl-12 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent dark:text-white"
                            placeholder="••••••••"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                          >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          {t.confirmPassword}
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            value={registerData.confirmPassword}
                            onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                            className="w-full pl-12 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent dark:text-white"
                            placeholder="••••••••"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                          >
                            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                      >
                        {loading ? t.creatingAccount : t.createAccount}
                      </button>

                      <div className="text-center">
                        <p className="text-gray-600 dark:text-gray-400">
                          {t.dontHaveAccount}{' '}
                          <button
                            type="button"
                            onClick={() => setShowLogin(true)}
                            className="text-blue-600 dark:text-blue-400 font-medium"
                          >
                            {t.signIn}
                          </button>
                        </p>
                      </div>
                    </div>
                  </form>
                )}

                {/* Demo Login Button */}
                <div className="mt-6">
                  <button
                    onClick={() => {
                      setLoginData({ email: 'demo@example.com', password: 'demo123', rememberMe: false });
                      handleLogin({ preventDefault: () => {} });
                    }}
                    className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg"
                  >
                    {t.tryDemoAccount}
                  </button>
                </div>

                {/* Dark Mode Toggle */}
                <div className="mt-6 flex justify-center">
                  <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg"
                  >
                    {darkMode ? (
                      <>
                        <Sun className="w-5 h-5 text-yellow-500" />
                        <span className="text-gray-700 dark:text-gray-300">{t.lightMode}</span>
                      </>
                    ) : (
                      <>
                        <Moon className="w-5 h-5 text-gray-700" />
                        <span className="text-gray-700">{t.darkMode}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-8 text-center text-gray-500 dark:text-gray-400 text-sm">
                <p>{t.allRightsReserved}</p>
                <p className="mt-1">{t.demoCredentials}</p>
              </div>
            </div>
          </div>
        </div>
      </GoogleOAuthProvider>
    );
  }

  // Clean White Profile Edit Mode
  if (cleanWhiteMode && profileEditMode) {
    return (
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white border-b border-gray-100 shadow-sm">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setCleanWhiteMode(false);
                  setProfileEditMode(false);
                }}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <User className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">{t.editProfile}</h1>
            </div>
            <button
              onClick={handleProfileUpdate}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <Check className="w-5 h-5" />
              {t.saveExit}
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 py-8">
          <form onSubmit={handleProfileUpdate} className="space-y-8">
            {/* Avatar */}
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="w-40 h-40 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-5xl font-bold mb-4">
                  {user.avatar ? (
                    <img 
                      src={user.avatar} 
                      alt="Profile" 
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    user.name.charAt(0)
                  )}
                </div>
                <label className="absolute bottom-4 right-4 bg-white p-3 rounded-full shadow-lg border border-gray-200 cursor-pointer">
                  <Camera className="w-5 h-5 text-gray-700" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    className="hidden"
                  />
                </label>
              </div>
              <p className="text-gray-600 mt-2">{t.uploadNewPhoto}</p>
            </div>

            {/* Personal Info */}
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-2xl p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">{t.profileInformation}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t.fullName}
                    </label>
                    <input
                      type="text"
                      value={user.name}
                      onChange={(e) => setUser({ ...user, name: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t.emailAddress}
                    </label>
                    <input
                      type="email"
                      value={user.email}
                      onChange={(e) => setUser({ ...user, email: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t.phone}
                    </label>
                    <input
                      type="tel"
                      value={user.phone}
                      onChange={(e) => setUser({ ...user, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t.location}
                    </label>
                    <input
                      type="text"
                      value={user.location}
                      onChange={(e) => setUser({ ...user, location: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Professional Info */}
              <div className="bg-gray-50 rounded-2xl p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">{t.professionalInformation}</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t.jobTitle}
                    </label>
                    <input
                      type="text"
                      value={user.jobTitle}
                      onChange={(e) => setUser({ ...user, jobTitle: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t.bio}
                    </label>
                    <textarea
                      value={user.bio}
                      onChange={(e) => setUser({ ...user, bio: e.target.value })}
                      rows="4"
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg resize-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => {
                  setCleanWhiteMode(false);
                  setProfileEditMode(false);
                }}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                {t.cancel}
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
              >
                <Save className="w-5 h-5" />
                {t.saveChanges}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Main Dashboard
  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Task Modal */}
      {showTaskModal && <TaskModal />}
      
      {/* Delete Confirmation Modal */}
      {showDeleteModal && <DeleteConfirmationModal />}

      {/* Profile Edit Modal */}
      {profileEditMode && !cleanWhiteMode && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t.editProfile}</h2>
                <div className="flex items-center gap-3">
                  <button
                    onClick={toggleCleanWhiteMode}
                    className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg"
                  >
                    {t.cleanWhiteEdit}
                  </button>
                  <button
                    onClick={toggleProfileEdit}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                  >
                    <X className="w-6 h-6 text-gray-500" />
                  </button>
                </div>
              </div>

              <form onSubmit={handleProfileUpdate} className="space-y-6">
                <div className="flex flex-col items-center">
                  <div className="relative mb-4">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold">
                      {user.avatar ? (
                        <img 
                          src={user.avatar} 
                          alt="Profile" 
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        user.name.charAt(0)
                      )}
                    </div>
                    <label className="absolute bottom-2 right-2 bg-white dark:bg-gray-700 p-2 rounded-full shadow-lg border border-gray-200 dark:border-gray-600 cursor-pointer">
                      <Camera className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t.fullName}
                    </label>
                    <input
                      type="text"
                      value={user.name}
                      onChange={(e) => setUser({ ...user, name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t.emailAddress}
                    </label>
                    <input
                      type="email"
                      value={user.email}
                      onChange={(e) => setUser({ ...user, email: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t.phone}
                    </label>
                    <input
                      type="tel"
                      value={user.phone}
                      onChange={(e) => setUser({ ...user, phone: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t.location}
                    </label>
                    <input
                      type="text"
                      value={user.location}
                      onChange={(e) => setUser({ ...user, location: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t.jobTitle}
                  </label>
                  <input
                    type="text"
                    value={user.jobTitle}
                    onChange={(e) => setUser({ ...user, jobTitle: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t.bio}
                  </label>
                  <textarea
                    value={user.bio}
                    onChange={(e) => setUser({ ...user, bio: e.target.value })}
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent dark:text-white resize-none"
                  />
                </div>

                <div className="flex justify-end gap-4 pt-4">
                  <button
                    type="button"
                    onClick={toggleProfileEdit}
                    className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg"
                  >
                    {t.cancel}
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    {t.saveChanges}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto p-4 md:p-6">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Personal Planner</h1>
            </div>
            
            {/* Language Toggle */}
            <button
              onClick={() => setLanguage(language === 'mn' ? 'en' : 'mn')}
              className="px-3 py-1 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              {language === 'mn' ? 'English' : 'Монгол'}
            </button>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Premium Badge */}
            {user.isPremium && (
              <div className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-blue-900 rounded-full text-sm font-bold">
                <Crown className="w-4 h-4" />
                <span>PREMIUM</span>
              </div>
            )}

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
            >
              {darkMode ? (
                <Sun className="w-6 h-6 text-yellow-500" />
              ) : (
                <Moon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              )}
            </button>

            {/* Profile */}
            <div className="flex items-center gap-3">
              <div className="text-right hidden md:block">
                <div className="font-medium text-gray-800 dark:text-white">{user.name}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {user.isPremium ? 'Premium гишүүн' : 'Энгийн гишүүн'}
                </div>
              </div>
              <button 
                onClick={toggleProfileEdit}
                className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold"
              >
                {user.avatar ? (
                  <img 
                    src={user.avatar} 
                    alt="Profile" 
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  user.name.charAt(0)
                )}
              </button>
              <button
                onClick={handleLogout}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
              >
                <LogOut className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </div>
        </header>

        {/* Navigation */}
        <div className="flex mb-6 bg-white dark:bg-gray-800 rounded-xl p-1">
          <button
            onClick={() => setActiveView('dashboard')}
            className={`flex-1 py-3 rounded-lg font-medium flex items-center justify-center gap-2 ${
              activeView === 'dashboard' 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <Home className="w-5 h-5" />
            {t.dashboard}
          </button>
          <button
            onClick={() => setActiveView('calendar')}
            className={`flex-1 py-3 rounded-lg font-medium flex items-center justify-center gap-2 ${
              activeView === 'calendar' 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <CalendarIcon className="w-5 h-5" />
            {t.calendar}
          </button>
          <button
            onClick={() => setActiveView('premium')}
            className={`flex-1 py-3 rounded-lg font-medium flex items-center justify-center gap-2 ${
              activeView === 'premium' 
                ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white' 
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <Crown className="w-5 h-5" />
            {t.premium}
          </button>
          <button
            onClick={() => setActiveView('profile')}
            className={`flex-1 py-3 rounded-lg font-medium flex items-center justify-center gap-2 ${
              activeView === 'profile' 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <User className="w-5 h-5" />
            {t.profile}
          </button>
        </div>

        {/* Main Content */}
        <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Welcome Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                    {t.welcomeUser}, {user.name.split(' ')[0]}!
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    {totalTasks - completedTasks} {t.pendingTasks}
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handleAddTask}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700"
                  >
                    <Plus className="w-4 h-4" />
                    {t.addNewTask}
                  </button>
                  <button
                    onClick={toggleProfileEdit}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
                  >
                    <Edit2 className="w-4 h-4" />
                    {t.editProfile}
                  </button>
                </div>
              </div>
            </div>

            {/* Dynamic Content based on Active View */}
            {activeView === 'dashboard' && renderDashboardView()}
            {activeView === 'calendar' && renderCalendarView()}
            {activeView === 'premium' && renderPremiumView()}
            
            {/* Profile View */}
            {activeView === 'profile' && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold mb-4">
                    {user.avatar ? (
                      <img 
                        src={user.avatar} 
                        alt="Profile" 
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      user.name.charAt(0)
                    )}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{user.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{user.jobTitle}</p>
                  <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">{user.location}</p>
                  <div className="mt-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      user.isPremium 
                        ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-blue-900'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}>
                      {user.isPremium ? 'Premium гишүүн' : 'Энгийн гишүүн'}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <Mail className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    <span className="text-gray-700 dark:text-gray-300">{user.email}</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <Phone className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    <span className="text-gray-700 dark:text-gray-300">{user.phone || "Тохируулаагүй"}</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <Briefcase className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    <span className="text-gray-700 dark:text-gray-300">{user.jobTitle}</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-3">{t.bio}</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{user.bio}</p>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={toggleProfileEdit}
                    className="flex-1 py-3 border-2 border-blue-600 text-blue-600 dark:text-blue-400 rounded-xl"
                  >
                    {t.editProfile}
                  </button>
                  <button
                    onClick={toggleCleanWhiteMode}
                    className="flex-1 py-3 bg-blue-600 text-white rounded-xl"
                  >
                    {t.cleanWhiteEdit}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Profile Summary */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold mb-4">
                  {user.avatar ? (
                    <img 
                      src={user.avatar} 
                      alt="Profile" 
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    user.name.charAt(0)
                  )}
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">{user.name}</h3>
                <p className="text-gray-600 dark:text-gray-400">{user.jobTitle}</p>
                <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">{user.location}</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <Mail className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  <span className="text-gray-700 dark:text-gray-300">{user.email}</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <Phone className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  <span className="text-gray-700 dark:text-gray-300">{user.phone || "Тохируулаагүй"}</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <Briefcase className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  <span className="text-gray-700 dark:text-gray-300">{user.jobTitle}</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
                <h4 className="font-semibold text-gray-800 dark:text-white mb-3">{t.bio}</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{user.bio}</p>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleAddTask}
                  className="flex-1 py-3 border-2 border-green-600 text-green-600 dark:text-green-400 rounded-xl"
                >
                  <Plus className="w-4 h-4 inline mr-1" />
                  {t.addNewTask}
                </button>
                <button
                  onClick={toggleProfileEdit}
                  className="flex-1 py-3 bg-blue-600 text-white rounded-xl"
                >
                  {t.editProfile}
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h3 className="font-semibold text-gray-800 dark:text-white mb-4">{t.quickStats}</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="text-gray-600 dark:text-gray-400">{t.tasksToday}</div>
                  <div className="font-semibold text-gray-800 dark:text-white">
                    {tasks.filter(task => task.date === new Date().toISOString().split('T')[0]).length}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-gray-600 dark:text-gray-400">{t.productivityScore}</div>
                  <div className="font-semibold text-green-600 dark:text-green-400">{completionPercentage}%</div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-gray-600 dark:text-gray-400">{t.streak}</div>
                  <div className="font-semibold text-orange-600 dark:text-orange-400">7 {language === 'mn' ? 'өдөр' : 'days'}</div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Түргэн үйлдлүүд</h3>
              <div className="space-y-3">
                <button
                  onClick={handleAddTask}
                  className="w-full flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30"
                >
                  <Plus className="w-5 h-5" />
                  <span>Шинэ даалгавар нэмэх</span>
                </button>
                <button
                  onClick={() => setActiveView('calendar')}
                  className="w-full flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Календар харах</span>
                </button>
                {!user.isPremium && (
                  <button
                    onClick={() => setActiveView('premium')}
                    className="w-full flex items-center gap-3 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 text-yellow-700 dark:text-yellow-300 rounded-lg hover:from-yellow-100 hover:to-orange-100"
                  >
                    <Crown className="w-5 h-5" />
                    <span>Premium шилжих</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-8 text-center text-gray-500 dark:text-gray-400 text-sm">
          <p>Personal Planner • {new Date().toLocaleDateString()} • {language === 'mn' ? 'Монгол хэл' : 'English'}</p>
        </footer>
      </div>
    </div>
  );
}

export default App;