import React from 'react';
import { GraduationCap, LogIn } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <GraduationCap className="h-8 w-8 text-indigo-600" />
          <span className="text-2xl font-bold text-indigo-600">Sankids</span>
        </div>
        <nav className="flex items-center gap-8">
          <ul className="flex gap-6">
            <li><a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Главная</a></li>
            <li><a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Курсы</a></li>
            <li><a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">О нас</a></li>
            <li><a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Контакты</a></li>
          </ul>
          <a 
            href="/auth" 
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <LogIn className="h-4 w-4" />
            <span>Войти</span>
          </a>
        </nav>
      </div>
    </header>
  );
}