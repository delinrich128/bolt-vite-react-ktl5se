import React from 'react';
import { BookOpen, Clock, Award, PlayCircle, Calendar, Bell, Settings2, BarChart2 } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  progress: number;
  nextLesson: string;
  instructor: string;
  thumbnail: string;
  nextClass: string;
}

interface Assignment {
  id: string;
  title: string;
  course: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'graded';
  grade?: number;
}

interface Notification {
  id: string;
  type: 'assignment' | 'announcement' | 'feedback';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export function StudentDashboard() {
  const enrolledCourses: Course[] = [
    {
      id: '1',
      title: 'Основы программирования для детей',
      progress: 45,
      nextLesson: 'Циклы и условия',
      instructor: 'Анна Петрова',
      thumbnail: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=300&h=200&q=80',
      nextClass: '2024-03-20T15:00:00'
    },
    {
      id: '2',
      title: 'Создание веб-сайтов',
      progress: 20,
      nextLesson: 'CSS стили',
      instructor: 'Иван Сидоров',
      thumbnail: 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=300&h=200&q=80',
      nextClass: '2024-03-21T16:30:00'
    }
  ];

  const assignments: Assignment[] = [
    {
      id: '1',
      title: 'Создание простой игры',
      course: 'Основы программирования для детей',
      dueDate: '2024-03-25',
      status: 'pending'
    },
    {
      id: '2',
      title: 'Верстка landing page',
      course: 'Создание веб-сайтов',
      dueDate: '2024-03-23',
      status: 'submitted'
    },
    {
      id: '3',
      title: 'Алгоритмы сортировки',
      course: 'Основы программирования для детей',
      dueDate: '2024-03-18',
      status: 'graded',
      grade: 95
    }
  ];

  const notifications: Notification[] = [
    {
      id: '1',
      type: 'assignment',
      title: 'Новое задание',
      message: 'Добавлено новое задание по курсу "Основы программирования"',
      time: '2 часа назад',
      read: false
    },
    {
      id: '2',
      type: 'feedback',
      title: 'Оценка за задание',
      message: 'Ваша работа "Верстка landing page" проверена',
      time: '1 день назад',
      read: true
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Добро пожаловать!</h1>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center gap-4">
                <div className="bg-indigo-100 p-3 rounded-lg">
                  <BookOpen className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Активные курсы</p>
                  <p className="text-2xl font-bold">{enrolledCourses.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center gap-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <Clock className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Часов обучения</p>
                  <p className="text-2xl font-bold">24</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center gap-4">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Award className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Достижения</p>
                  <p className="text-2xl font-bold">5</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center gap-4">
                <div className="bg-yellow-100 p-3 rounded-lg">
                  <BarChart2 className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Средний балл</p>
                  <p className="text-2xl font-bold">92</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Мои курсы</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {enrolledCourses.map((course) => (
                  <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
                      <p className="text-sm text-gray-500 mb-4">
                        Преподаватель: {course.instructor}
                      </p>
                      <div className="mb-4">
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>Прогресс</span>
                          <span>{course.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-indigo-600 rounded-full h-2"
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="text-sm text-gray-500">
                          Следующий урок: {course.nextLesson}
                        </div>
                        <button className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700">
                          <PlayCircle className="h-5 w-5" />
                          Продолжить
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Задания</h2>
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="divide-y divide-gray-200">
                  {assignments.map((assignment) => (
                    <div key={assignment.id} className="p-4 hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">{assignment.title}</h3>
                          <p className="text-sm text-gray-500">{assignment.course}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-sm text-gray-500">
                            Сдать до: {new Date(assignment.dueDate).toLocaleDateString()}
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-sm ${
                              assignment.status === 'pending'
                                ? 'bg-yellow-100 text-yellow-800'
                                : assignment.status === 'submitted'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-green-100 text-green-800'
                            }`}
                          >
                            {assignment.status === 'pending'
                              ? 'Ожидает выполнения'
                              : assignment.status === 'submitted'
                              ? 'На проверке'
                              : `Оценка: ${assignment.grade}`}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Расписание занятий</h2>
              <div className="bg-white rounded-lg shadow-md p-4">
                <div className="space-y-4">
                  {enrolledCourses.map((course) => (
                    <div key={course.id} className="flex items-center gap-4">
                      <Calendar className="h-5 w-5 text-indigo-600" />
                      <div>
                        <p className="font-medium">{course.title}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(course.nextClass).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Уведомления</h2>
              <div className="bg-white rounded-lg shadow-md divide-y divide-gray-200">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 ${notification.read ? '' : 'bg-indigo-50'}`}
                  >
                    <div className="flex items-start gap-4">
                      <Bell className={`h-5 w-5 ${notification.read ? 'text-gray-400' : 'text-indigo-600'}`} />
                      <div>
                        <p className="font-medium">{notification.title}</p>
                        <p className="text-sm text-gray-600">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Быстрые действия</h2>
              <div className="bg-white rounded-lg shadow-md p-4">
                <div className="space-y-2">
                  <button className="w-full flex items-center gap-2 px-4 py-2 text-left hover:bg-gray-50 rounded-lg">
                    <Calendar className="h-5 w-5 text-indigo-600" />
                    <span>Записаться на консультацию</span>
                  </button>
                  <button className="w-full flex items-center gap-2 px-4 py-2 text-left hover:bg-gray-50 rounded-lg">
                    <Settings2 className="h-5 w-5 text-indigo-600" />
                    <span>Настройки профиля</span>
                  </button>
                  <button className="w-full flex items-center gap-2 px-4 py-2 text-left hover:bg-gray-50 rounded-lg">
                    <Bell className="h-5 w-5 text-indigo-600" />
                    <span>Настройки уведомлений</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}