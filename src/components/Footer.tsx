import React from 'react';
import { GraduationCap, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap className="h-8 w-8 text-indigo-400" />
              <span className="text-2xl font-bold text-white">Sankids</span>
            </div>
            <p className="text-gray-400">Развиваем потенциал детей через современное образование</p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Контакты</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                <span>+7 (999) 123-45-67</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                <span>info@sankids.ru</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                <span>г. Москва, ул. Примерная, 123</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Курсы</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-indigo-400">Программирование</a></li>
              <li><a href="#" className="hover:text-indigo-400">Робототехника</a></li>
              <li><a href="#" className="hover:text-indigo-400">3D-моделирование</a></li>
              <li><a href="#" className="hover:text-indigo-400">Веб-дизайн</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Социальные сети</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-indigo-400">VKontakte</a></li>
              <li><a href="#" className="hover:text-indigo-400">Telegram</a></li>
              <li><a href="#" className="hover:text-indigo-400">YouTube</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>© 2024 Sankids. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}