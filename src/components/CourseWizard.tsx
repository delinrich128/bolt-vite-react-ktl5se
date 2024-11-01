import React, { useState, useRef } from 'react';
import { Plus, Trash2, ChevronLeft, ChevronRight, Save, Eye, EyeOff, Play, Pause, Volume2, VolumeX } from 'lucide-react';

type LessonType = 'text' | 'video' | 'quiz';

interface LessonContent {
  text: string;
  video: string;
  audio: string;
  image: string;
}

interface Lesson {
  title: string;
  duration: string;
  type: LessonType;
  description: string;
  isEnabled: boolean;
  contents: LessonContent;
}

interface Section {
  title: string;
  lessons: Lesson[];
}

interface CourseData {
  title: string;
  description: string;
  sections: Section[];
  schedule: {
    startDate: string;
    endDate: string;
    maxStudents: number;
    price: number;
  };
}

interface CourseWizardProps {
  onClose: () => void;
  onSave: (courseData: CourseData) => void;
}

const steps = [
  {
    title: 'Основная информация',
    description: 'Название и описание курса',
    icon: Plus
  },
  {
    title: 'Структура',
    description: 'Разделы и уроки',
    icon: Plus
  },
  {
    title: 'Содержание',
    description: 'Материалы уроков',
    icon: Plus
  },
  {
    title: 'Расписание',
    description: 'Даты и стоимость',
    icon: Plus
  }
];

export function CourseWizard({ onClose, onSave }: CourseWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [previewMode, setPreviewMode] = useState(false);
  const [currentAudio, setCurrentAudio] = useState<{ sectionIndex: number; lessonIndex: number } | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const [courseData, setCourseData] = useState<CourseData>({
    title: '',
    description: '',
    sections: [{ 
      title: '', 
      lessons: [{ 
        title: '', 
        duration: '', 
        type: 'text',
        description: '',
        isEnabled: true,
        contents: {
          text: '',
          video: '',
          audio: '',
          image: ''
        }
      }] 
    }],
    schedule: { 
      startDate: '', 
      endDate: '', 
      maxStudents: 20,
      price: 35000
    }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCourseData({
      ...courseData,
      [e.target.name]: e.target.value
    });
  };

  const handleScheduleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCourseData({
      ...courseData,
      schedule: {
        ...courseData.schedule,
        [e.target.name]: e.target.type === 'number' ? Number(e.target.value) : e.target.value
      }
    });
  };

  const addSection = () => {
    setCourseData({
      ...courseData,
      sections: [
        ...courseData.sections,
        {
          title: '',
          lessons: [{
            title: '',
            duration: '',
            type: 'text',
            description: '',
            isEnabled: true,
            contents: {
              text: '',
              video: '',
              audio: '',
              image: ''
            }
          }]
        }
      ]
    });
  };

  const removeSection = (index: number) => {
    const newSections = [...courseData.sections];
    newSections.splice(index, 1);
    setCourseData({ ...courseData, sections: newSections });
  };

  const addLesson = (sectionIndex: number) => {
    const newSections = [...courseData.sections];
    newSections[sectionIndex].lessons.push({
      title: '',
      duration: '',
      type: 'text',
      description: '',
      isEnabled: true,
      contents: {
        text: '',
        video: '',
        audio: '',
        image: ''
      }
    });
    setCourseData({ ...courseData, sections: newSections });
  };

  const removeLesson = (sectionIndex: number, lessonIndex: number) => {
    const newSections = [...courseData.sections];
    newSections[sectionIndex].lessons.splice(lessonIndex, 1);
    setCourseData({ ...courseData, sections: newSections });
  };

  const toggleLessonStatus = (sectionIndex: number, lessonIndex: number) => {
    const newSections = [...courseData.sections];
    newSections[sectionIndex].lessons[lessonIndex].isEnabled = 
      !newSections[sectionIndex].lessons[lessonIndex].isEnabled;
    setCourseData({ ...courseData, sections: newSections });
  };

  const handleLessonChange = (
    sectionIndex: number,
    lessonIndex: number,
    field: string,
    value: string
  ) => {
    const newSections = [...courseData.sections];
    newSections[sectionIndex].lessons[lessonIndex] = {
      ...newSections[sectionIndex].lessons[lessonIndex],
      [field]: value
    };
    setCourseData({ ...courseData, sections: newSections });
  };

  const handleSubmit = () => {
    onSave(courseData);
  };

  const handleLessonContentChange = (
    sectionIndex: number,
    lessonIndex: number,
    contentType: keyof LessonContent,
    value: string
  ) => {
    setCourseData(prev => {
      const newSections = [...prev.sections];
      newSections[sectionIndex].lessons[lessonIndex].contents[contentType] = value;
      return { ...prev, sections: newSections };
    });
  };

  const toggleAudioPlayback = (sectionIndex: number, lessonIndex: number) => {
    if (currentAudio?.sectionIndex === sectionIndex && currentAudio?.lessonIndex === lessonIndex) {
      if (isPlaying) {
        audioRef.current?.pause();
      } else {
        audioRef.current?.play();
      }
      setIsPlaying(!isPlaying);
    } else {
      setCurrentAudio({ sectionIndex, lessonIndex });
      setIsPlaying(true);
      if (audioRef.current) {
        audioRef.current.src = courseData.sections[sectionIndex].lessons[lessonIndex].contents.audio;
        audioRef.current.play();
      }
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  const renderLessonContents = (lesson: Lesson, sectionIndex: number, lessonIndex: number) => {
    if (previewMode) {
      return (
        <div className="space-y-6 p-4 bg-gray-50 rounded-lg">
          {lesson.contents.text && (
            <div className="prose max-w-none">
              <h4 className="text-lg font-medium mb-2">Текстовое содержание</h4>
              <p>{lesson.contents.text}</p>
            </div>
          )}
          
          {lesson.contents.video && (
            <div>
              <h4 className="text-lg font-medium mb-2">Видео</h4>
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src={lesson.contents.video}
                  className="w-full h-64 rounded-lg"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}

          {lesson.contents.audio && (
            <div>
              <h4 className="text-lg font-medium mb-2">Аудио</h4>
              <div className="flex items-center gap-4 bg-white p-4 rounded-lg">
                <button
                  onClick={() => toggleAudioPlayback(sectionIndex, lessonIndex)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  {currentAudio?.sectionIndex === sectionIndex && 
                   currentAudio?.lessonIndex === lessonIndex && isPlaying ? (
                    <Pause className="w-6 h-6 text-gray-700" />
                  ) : (
                    <Play className="w-6 h-6 text-gray-700" />
                  )}
                </button>
                <button
                  onClick={toggleMute}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  {isMuted ? (
                    <VolumeX className="w-6 h-6 text-gray-700" />
                  ) : (
                    <Volume2 className="w-6 h-6 text-gray-700" />
                  )}
                </button>
                <div className="text-sm text-gray-600">
                  {lesson.contents.audio.split('/').pop()}
                </div>
              </div>
            </div>
          )}

          {lesson.contents.image && (
            <div>
              <h4 className="text-lg font-medium mb-2">Изображение</h4>
              <img
                src={lesson.contents.image}
                alt={lesson.title}
                className="w-full rounded-lg"
              />
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Текстовое содержание
          </label>
          <textarea
            value={lesson.contents.text}
            onChange={(e) => handleLessonContentChange(sectionIndex, lessonIndex, 'text', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            rows={4}
            placeholder="Введите текстовое содержание урока"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Видео
          </label>
          <div className="space-y-1">
            <input
              type="url"
              value={lesson.contents.video}
              onChange={(e) => handleLessonContentChange(sectionIndex, lessonIndex, 'video', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="Вставьте ссылку на видео (YouTube, Vimeo)"
            />
            <p className="text-sm text-gray-500">Поддерживаются ссылки YouTube, Vimeo</p>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Аудио
          </label>
          <div className="space-y-1">
            <input
              type="url"
              value={lesson.contents.audio}
              onChange={(e) => handleLessonContentChange(sectionIndex, lessonIndex, 'audio', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="Вставьте ссылку на аудио файл"
            />
            <p className="text-sm text-gray-500">Поддерживаются форматы MP3, WAV</p>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Изображение
          </label>
          <div className="space-y-1">
            <input
              type="url"
              value={lesson.contents.image}
              onChange={(e) => handleLessonContentChange(sectionIndex, lessonIndex, 'image', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="Вставьте ссылку на изображение"
            />
            <p className="text-sm text-gray-500">Поддерживаются форматы JPG, PNG, WebP</p>
          </div>
        </div>
      </div>
    );
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Название курса
              </label>
              <input
                type="text"
                name="title"
                value={courseData.title}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Введите название курса"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Описание курса
              </label>
              <textarea
                name="description"
                value={courseData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Опишите ваш курс"
              />
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            {courseData.sections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <input
                    type="text"
                    value={section.title}
                    onChange={(e) => {
                      const newSections = [...courseData.sections];
                      newSections[sectionIndex].title = e.target.value;
                      setCourseData({ ...courseData, sections: newSections });
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Название раздела"
                  />
                  <button
                    onClick={() => removeSection(sectionIndex)}
                    className="ml-2 text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-6">
                  {section.lessons.map((lesson, lessonIndex) => (
                    <div key={lessonIndex} className="space-y-4 p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => toggleLessonStatus(sectionIndex, lessonIndex)}
                          className={`p-1 rounded-md ${
                            lesson.isEnabled ? 'text-green-600 hover:text-green-700' : 'text-gray-400 hover:text-gray-500'
                          }`}
                        >
                          {lesson.isEnabled ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                        </button>
                        <input
                          type="text"
                          value={lesson.title}
                          onChange={(e) => handleLessonChange(sectionIndex, lessonIndex, 'title', e.target.value)}
                          className={`flex-1 px-4 py-2 border border-gray-300 rounded-lg ${
                            !lesson.isEnabled && 'opacity-50'
                          }`}
                          placeholder="Название урока"
                          disabled={!lesson.isEnabled}
                        />
                        <input
                          type="text"
                          value={lesson.duration}
                          onChange={(e) => handleLessonChange(sectionIndex, lessonIndex, 'duration', e.target.value)}
                          className={`w-32 px-4 py-2 border border-gray-300 rounded-lg ${
                            !lesson.isEnabled && 'opacity-50'
                          }`}
                          placeholder="Длительность"
                          disabled={!lesson.isEnabled}
                        />
                        <button
                          onClick={() => removeLesson(sectionIndex, lessonIndex)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                      {lesson.isEnabled && (
                        <div className="pl-4 border-l-2 border-indigo-200">
                          {renderLessonContents(lesson, sectionIndex, lessonIndex)}
                        </div>
                      )}
                    </div>
                  ))}
                  <button
                    onClick={() => addLesson(sectionIndex)}
                    className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700"
                  >
                    <Plus className="w-4 h-4" />
                    Добавить урок
                  </button>
                </div>
              </div>
            ))}
            <button
              onClick={addSection}
              className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700"
            >
              <Plus className="w-4 h-4" />
              Добавить раздел
            </button>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="flex justify-end mb-4">
              <button
                onClick={() => setPreviewMode(!previewMode)}
                className="flex items-center gap-2 px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
              >
                {previewMode ? (
                  <>
                    <Edit2 className="w-5 h-5" />
                    Редактировать
                  </>
                ) : (
                  <>
                    <Eye className="w-5 h-5" />
                    Предпросмотр
                  </>
                )}
              </button>
            </div>
            {courseData.sections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium mb-4">{section.title || 'Новый раздел'}</h3>
                <div className="space-y-4">
                  {section.lessons.map((lesson, lessonIndex) => (
                    <div key={lessonIndex} className="space-y-2">
                      <h4 className="text-sm font-medium">{lesson.title || 'Новый урок'}</h4>
                      <div className="pl-4 border-l-2 border-indigo-200">
                        {renderLessonContents(lesson, sectionIndex, lessonIndex)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <audio ref={audioRef} className="hidden" onEnded={() => setIsPlaying(false)} />
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Дата начала
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={courseData.schedule.startDate}
                  onChange={handleScheduleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Дата окончания
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={courseData.schedule.endDate}
                  onChange={handleScheduleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Максимум учеников
                </label>
                <input
                  type="number"
                  name="maxStudents"
                  value={courseData.schedule.maxStudents}
                  onChange={handleScheduleChange}
                  min="1"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Стоимость курса (₸)
                </label>
                <input
                  type="number"
                  name="price"
                  value={courseData.schedule.price}
                  onChange={handleScheduleChange}
                  min="0"
                  step="1000"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="Например: 35000"
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Создание курса</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          <div className="flex gap-8 mb-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`flex items-center ${
                  index < steps.length - 1 ? 'flex-1' : ''
                }`}
              >
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    index <= currentStep
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  <step.icon className="w-5 h-5" />
                </div>
                <div
                  className={`ml-3 ${
                    index === steps.length - 1 ? '' : 'flex-1'
                  }`}
                >
                  <p
                    className={`text-sm font-medium ${
                      index <= currentStep ? 'text-gray-900' : 'text-gray-500'
                    }`}
                  >
                    {step.title}
                  </p>
                  <p className="text-xs text-gray-500">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-0.5 flex-1 mx-4 ${
                      index < currentStep ? 'bg-indigo-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="mb-8">{renderStepContent()}</div>

          <div className="flex justify-between">
            <button
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50"
            >
              <ChevronLeft className="w-5 h-5" />
              Назад
            </button>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:text-gray-900"
              >
                Отмена
              </button>
              {currentStep === steps.length - 1 ? (
                <button 
                  onClick={handleSubmit}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  <Save className="w-5 h-5" />
                  Сохранить курс
                </button>
              ) : (
                <button
                  onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Далее
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}