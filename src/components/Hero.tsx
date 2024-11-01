import React from 'react';

export function Hero() {
  return (
    <div className="relative h-[600px] bg-gradient-to-r from-indigo-600 to-purple-600">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative container mx-auto px-4 h-full flex items-center">
        <div className="max-w-2xl text-white">
          <h1 className="text-5xl font-bold mb-6">Открой мир знаний вместе с Sankids</h1>
          <p className="text-xl mb-8">Инновационный подход к образованию детей. Развиваем потенциал через игру и современные технологии.</p>
          <button className="bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold hover:bg-indigo-50 transition-colors">
            Записаться на пробный урок
          </button>
        </div>
      </div>
    </div>
  );
}