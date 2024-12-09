import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarEvent } from '../types/Event';
import { CreateEventModal } from './CreateEventModal';
import { getSeasonalTheme } from '../utils/seasonalThemes';
import { ChristmasDecorations } from './decorations/ChristmasDecorations';

interface CalendarProps {
  events: CalendarEvent[];
  onEventAdd: (event: CalendarEvent) => void;
  onEventClick: (event: CalendarEvent) => void;
}

export const Calendar: React.FC<CalendarProps> = ({ events, onEventAdd, onEventClick }) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedDates, setSelectedDates] = useState<{ start: Date; end: Date } | null>(null);
  const [currentTheme, setCurrentTheme] = useState(getSeasonalTheme(new Date()));

  useEffect(() => {
    const updateTheme = () => {
      setCurrentTheme(getSeasonalTheme(new Date()));
    };

    updateTheme();
    const interval = setInterval(updateTheme, 1000 * 60 * 60 * 24);

    return () => clearInterval(interval);
  }, []);

  const handleDateSelect = (selectInfo: any) => {
    setSelectedDates({
      start: selectInfo.start,
      end: selectInfo.end,
    });
    setIsCreateModalOpen(true);
    selectInfo.view.calendar.unselect();
  };

  return (
    <div 
      className={`h-full rounded-lg shadow-lg p-4 transition-colors duration-300 relative overflow-hidden ${
        currentTheme.isChristmas ? 'christmas-theme' : ''
      }`}
      style={{ 
        backgroundColor: currentTheme.backgroundColor,
        border: `1px solid ${currentTheme.borderColor}`,
        color: currentTheme.textColor
      }}
    >
      {currentTheme.isChristmas && <ChristmasDecorations />}
      <div className="mb-4 text-sm font-medium" style={{ color: currentTheme.textColor }}>
        Current Season: {currentTheme.name}
      </div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        initialView="dayGridMonth"
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        weekends={true}
        events={events}
        select={handleDateSelect}
        eventClick={(info) => onEventClick(info.event as unknown as CalendarEvent)}
        height="auto"
        contentHeight="auto"
        slotDuration="00:30:00"
        slotLabelFormat={{
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        }}
        eventTimeFormat={{
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        }}
        dayCellClassNames={() => ['transition-colors', 'duration-300']}
        dayCellDidMount={(arg) => {
          const cellTheme = getSeasonalTheme(arg.date);
          arg.el.style.backgroundColor = cellTheme.backgroundColor;
          arg.el.style.borderColor = cellTheme.borderColor;
        }}
      />
      {selectedDates && (
        <CreateEventModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSave={onEventAdd}
          startDate={selectedDates.start}
          endDate={selectedDates.end}
        />
      )}
    </div>
  );
};