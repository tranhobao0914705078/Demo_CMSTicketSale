import React, { useState } from 'react'
import styles from './Calendar.module.css';
import { monthNames } from '../Store/StoreCalendar';
import { getNumberOfDaysInMonth, getStoredDay, range } from'./index';

interface Props {
  className: string;
  onSelectDate: (date: string | null) => void; 
}

export const CalendarCustom = ({ className, onSelectDate }: Props) => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectDate, setSelectDate] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'day' | 'week'>('day'); // Thêm trạng thái chế độ xem

  const toggleNextMonth = () => {
    if (currentMonth < 11) {
      setCurrentMonth((prev) => prev + 1);
    } else {
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
    }
  };

  const togglePrevMonth = () => {
    if (currentMonth > 0) {
      setCurrentMonth((prev) => prev - 1);
    } else {
      setCurrentMonth(11);
      setCurrentYear((prev) => prev - 1);
    }
  };

  const handleSelectDate = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const currentDate = new Date();
    const month = currentDate.getMonth() + 1; // Month is zero-based, so we add 1
    const year = currentDate.getFullYear();
    const day = target.getAttribute('data-day');
    const getDate = `${day}/${month}/${year}`
    onSelectDate(getDate);
    setSelectDate(day);
  }

  const handleViewModeChange = (mode: 'day' | 'week') => {
    setViewMode(mode);
  };

  const isCurrentDate = (year: number, month: number, day: number) => {
    const date = new Date(year, month, day);
    return date.toDateString() === currentDate.toDateString();
  };

  return (
    <div className={`${styles.PickerWrapper} ${className}`}>
        <div className={styles.Header}>
          <p className={styles.icon} onClick={togglePrevMonth}> prev </p>
          <p>{monthNames[currentMonth]} {currentYear}</p>
          <p className={styles.icon} onClick={toggleNextMonth}> next </p>
        </div>
        <div className={styles.selectRadio}>
            <div className={styles.selectDateRadio}>
              <input
                type="radio"
                name="date"
                checked={viewMode === 'day'} 
                onChange={() => handleViewModeChange('day')} 
              />
              <p>Theo ngày</p>
            </div>
            <div className={styles.selectDateRadio}>
              <input
                type="radio"
                name="date"
                checked={viewMode === 'week'} // Kiểm tra chế độ xem hiện tại
                onChange={() => handleViewModeChange('week')} // Xử lý khi chọn chế độ xem "Theo tu
              />
              <p>Theo Tuần</p>
            </div>
        </div>
        <div className={styles.bodyCalendar}>
          <div className={styles.dayCalendar}>
            {getStoredDay(currentYear, currentMonth).map((day, index) =>
              <p className={styles.day} key={index}>{day}</p>
            )}
          </div>
          <div className={styles.dayCalendar} onClick={handleSelectDate}>
            {range(
                1,
                getNumberOfDaysInMonth(currentYear, currentMonth) +  1 
            ).map((day) =>
              <p id='day' data-day={day} key={day} 
                className={`
                  ${selectDate === day.toString() ? styles.active : ''} 
                  ${isCurrentDate(currentYear, currentMonth, day) ? styles.currentDate : ''}
                  ${styles.titleDay}
                `}>
                {day}
              </p>
            )}
          </div>
        </div>
    </div>
  )}