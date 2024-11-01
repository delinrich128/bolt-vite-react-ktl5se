import React, { useState } from 'react';
import { Book, Plus, Edit2, Trash2, PlayCircle, Settings, Users, Clock } from 'lucide-react';
import { CourseWizard } from './CourseWizard';

interface Course {
  id: string;
  title: string;
  description: string;
  status: 'draft' | 'published';
  lessons: number;
  students: number;
  price: number;
}

export function TeacherDashboard() {
  const [showCourseWizard, setShowCourseWizard] = useState(false);
  const [courses, setCourses] = useState<Course[]>([
    {
      id: '1',
      title: 'Основы программирования для детей',
      description: 'Введение в мир программирования через игровые проекты',
      status: 'published',
      lessons: 12,
      students: 25,
      price: 45000
    },
    {
      id: '2',
      title: 'Создание веб-сайтов',
      description: 'Изучение HTML, CSS и JavaScript',
      status: 'draft',
      lessons: 8,
      students: 0,
      price: 35000
    }
  ]);

  const handleAddCourse = (newCourse: any) => {
    setCourses([...courses, {
      ...newCourse,
      id: (courses.length + 1).toString(),
      status: 'draft',
      students: 0
    }]);
    setShowCourseWizard(false);
  };

  const handleDeleteCourse = (courseId: string) => {
    setCourses(courses.filter(course => course.id !== courseId));
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('kk-KZ', {
      style: 'currency',
      currency: 'KZT',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Личный кабинет преподавателя</h1>
            <p className="text-gray-600 mt-1">Управляйте своими курсами и следите за прогрессом учеников</p>
          </div>
          <button 
            onClick={() => setShowCourseWizard(true)}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Plus className="h-5 w-5" />
            Создать курс
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Book className="h-6 w-6 text-indigo-600" />
                    <h3 className="text-lg font-semibold">{course.title}</h3>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      course.status === 'published'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {course.status === 'published' ? 'Опубликован' : 'Черновик'}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{course.description}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{course.lessons} уроков</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{course.students} учеников</span>
                  </div>
                </div>
                <div className="text-lg font-bold text-indigo-600 mb-4">
                  {formatPrice(course.price)}
                </div>
                <div className="flex gap-2">
                  <button className="flex items-center gap-1 px-3 py-2 text-sm text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors">
                    <Edit2 className="h-4 w-4" />
                    Редактировать
                  </button>
                  <button className="flex items-center gap-1 px-3 py-2 text-sm text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors">
                    <PlayCircle className="h-4 w-4" />
                    Предпросмотр
                  </button>
                  <button className="flex items-center gap-1 px-3 py-2 text-sm text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors">
                    <Settings className="h-4 w-4" />
                    Настройки
                  </button>
                  <button 
                    onClick={() => handleDeleteCourse(course.id)}
                    className="flex items-center gap-1 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors ml-auto"
                  >
                    <Trash2 className="h-4 w-4" />
                    Удалить
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {showCourseWizard && (
          <CourseWizard 
            onClose={() => setShowCourseWizard(false)} 
            onSave={handleAddCourse}
          />
        )}
      </div>
    </div>
  );
}