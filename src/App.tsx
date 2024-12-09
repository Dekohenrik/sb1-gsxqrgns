import { useState } from 'react';
import { Calendar } from './components/Calendar';
import { EventModal } from './components/EventModal';
import { Sidebar } from './components/sidebar/Sidebar';
import { CalendarProvider } from './context/CalendarContext';
import { useCalendar } from './context/CalendarContext';
import { CalendarEvent } from './types/Event';

function CalendarApp() {
  const { events, addEvent, updateEvent, calendarTitle } = useCalendar();
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg hover:bg-gray-50 transition-colors duration-200"
        aria-label="Toggle Sidebar"
      >
        <svg
          className="w-6 h-6 text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isSidebarOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      <div className="flex">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        
        <div className={`flex-1 p-4 transition-all duration-300 ${isSidebarOpen ? 'ml-80' : 'ml-0'}`}>
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              {calendarTitle}
            </h1>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <Calendar
                events={events}
                onEventAdd={addEvent}
                onEventClick={handleEventClick}
              />
            </div>
            <EventModal
              event={selectedEvent}
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onUpdate={updateEvent}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <CalendarProvider>
      <CalendarApp />
    </CalendarProvider>
  );
}

export default App;