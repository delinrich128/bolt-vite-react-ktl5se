import React from 'react';
import { Code, Palette, Brain } from 'lucide-react';

const lessons = [
  {
    icon: Code,
    title: 'Программирование',
    description: 'Основы кодирования через игровые проекты',
    price: '1500₽',
    duration: '45 минут'
  },
  {
    icon: Palette,
    title: 'Цифровое искусство',
    description: 'Создание digital-иллюстраций и анимации',
    price: '1500₽',
    duration: '45 минут'
  },
  {
    icon: Brain,
    title: 'Логика и математика',
    description: 'Развитие мышления через интерактивные задачи',
    price: '1500₽',
    duration: '45 минут'
  }
];

export function TrialLessons() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Пробные занятия</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {lessons.map((lesson, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-8 transform hover:-translate-y-1 transition-transform">
              <lesson.icon className="w-12 h-12 text-indigo-600 mb-6" />
              <h3 className="text-xl font-bold mb-4">{lesson.title}</h3>
              <p className="text-gray-600 mb-6">{lesson.description}</p>
              <div className="flex justify-between items-center mb-6">
                <span className="text-2xl font-bold text-indigo-600">{lesson.price}</span>
                <span className="text-gray-500">{lesson.duration}</span>
              </div>
              <button className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors">
                Записаться
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}