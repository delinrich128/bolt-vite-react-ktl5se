import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { TeacherDashboard } from './components/TeacherDashboard';
import { StudentDashboard } from './components/StudentDashboard';
import { Settings2, LogOut } from 'lucide-react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // For demo purposes
  const [userRole, setUserRole] = useState<'teacher' | 'student'>('teacher');

  const handleRoleSwitch = () => {
    setUserRole(userRole === 'teacher' ? 'student' : 'teacher');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      {isLoggedIn && (
        <div className="fixed top-20 right-4 z-50 bg-white rounded-lg shadow-lg p-4">
          <div className="flex flex-col gap-2">
            <button
              onClick={handleRoleSwitch}
              className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors"
            >
              <Settings2 className="h-5 w-5" />
              <span>Switch to {userRole === 'teacher' ? 'Student' : 'Teacher'}</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
      <main className="flex-1">
        {isLoggedIn ? (
          userRole === 'teacher' ? (
            <TeacherDashboard />
          ) : (
            <StudentDashboard />
          )
        ) : (
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to Sankids</h2>
              <button
                onClick={() => setIsLoggedIn(true)}
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Login to Continue
              </button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;