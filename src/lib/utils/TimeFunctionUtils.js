import moment from 'moment';
import { ModeEnum } from '../DateTimeRangePicker';

export const generateHours = () => {
  const hours = [];
  for (let i = 0; i < 24; i++) {
    hours.push(i);
  }
  return hours;
};

export const generateMinutes = () => {
  const minutes = [];
  for (let i = 0; i < 60; i++) {
    if (i < 10) {
      minutes.push(`0${i.toString()}`);
    } else {
      minutes.push(i.toString());
    }
  }
  return minutes;
};

function workOutMonthYear(date, secondDate, mode, pastSearchFriendly, smartMode) {
  // If both months are different months then
  // allow normal display in the calendar
  const selectedMonth = date.month();
  const otherMonth = secondDate.month();
  if (selectedMonth !== otherMonth) {
    return date;
  }
  // If pastSearch Friendly mode is on and both months are the same and the same year
  // have "end"/right as the month and "start"/left as -1 month
  if (date.year() === secondDate.year() && mode === ModeEnum.start && pastSearchFriendly && smartMode) {
    let lastMonth = JSON.parse(JSON.stringify(date));
    lastMonth = moment(lastMonth);
    lastMonth.subtract(1, 'month');
    return lastMonth;
  }
  // If pastSearch Friendly mode is off and both months are the same and the same year
  // have "end"/right as the month and "start"/left as +1 month
  if (date.year() === secondDate.year() && mode === ModeEnum.end && !pastSearchFriendly && smartMode) {
    let lastMonth = JSON.parse(JSON.stringify(date));
    lastMonth = moment(lastMonth);
    lastMonth.add(1, 'month');
    return lastMonth;
  }
  return date;
}

export const getMonth = (date, secondDate, mode, pastSearchFriendly, smartMode) =>
  workOutMonthYear(date, secondDate, mode, pastSearchFriendly, smartMode).month();

export const getYear = (date, secondDate, mode, pastSearchFriendly, smartMode) =>
  workOutMonthYear(date, secondDate, mode, pastSearchFriendly, smartMode).year();

const getDaysBeforeStartMonday = firstDayOfMonth => {
  const fourtyTwoDays = [];
  const dayBeforeFirstDayOfMonth = firstDayOfMonth.day() - 1; // We dont want to include the first day of the new month
  // Case whereby day before is a Saturday (6) and we require Saturday back to Monday for that week
  if (dayBeforeFirstDayOfMonth === -1) {
    for (let i = 6; i > 0; i--) {
      let firstDayOfMonthCopy = firstDayOfMonth.clone();
      firstDayOfMonthCopy = firstDayOfMonthCopy.subtract(i, 'd');
      fourtyTwoDays.push(firstDayOfMonthCopy);
    }
  }
  // Case Whereby day before first day is the Sunday (0), therefore we want the entire previous week
  if (dayBeforeFirstDayOfMonth === 0) {
    for (let i = 7; i > 0; i--) {
      let firstDayOfMonthCopy = firstDayOfMonth.clone();
      firstDayOfMonthCopy = firstDayOfMonthCopy.subtract(i, 'd');
      fourtyTwoDays.push(firstDayOfMonthCopy);
    }
  }
  // Every other day
  else {
    for (let i = dayBeforeFirstDayOfMonth; i > 0; i--) {
      let firstDayOfMonthCopy = firstDayOfMonth.clone();
      firstDayOfMonthCopy = firstDayOfMonthCopy.subtract(i, 'd');
      fourtyTwoDays.push(firstDayOfMonthCopy);
    }
  }
  return fourtyTwoDays;
};

const getDaysBeforeStartSunday = firstDayOfMonth => {
  const fourtyTwoDays = [];
  const dayBeforeFirstDayOfMonth = firstDayOfMonth.day() - 1; // We dont want to include the first day of the new month

  // Case whereby we need all previous week days
  if (dayBeforeFirstDayOfMonth === -1) {
    for (let i = 7; i > 0; i--) {
      let firstDayOfMonthCopy = firstDayOfMonth.clone();
      firstDayOfMonthCopy = firstDayOfMonthCopy.subtract(i, 'd');
      fourtyTwoDays.push(firstDayOfMonthCopy);
    }
  }
  // Every other day
  else {
    for (let i = dayBeforeFirstDayOfMonth + 1; i > 0; i--) {
      let firstDayOfMonthCopy = firstDayOfMonth.clone();
      firstDayOfMonthCopy = firstDayOfMonthCopy.subtract(i, 'd');
      fourtyTwoDays.push(firstDayOfMonthCopy);
    }
  }
  return fourtyTwoDays;
};

const getDaysBeforeStart = (firstDayOfMonth, sundayFirst) => {
  if (!sundayFirst) {
    return getDaysBeforeStartMonday(firstDayOfMonth);
  }
  return getDaysBeforeStartSunday(firstDayOfMonth);
};

export const getFourtyTwoDays = (initMonth, initYear, sundayFirst) => {
  let fourtyTwoDays = [];
  const firstDayOfMonth = moment(new Date(initYear, initMonth, 1));

  fourtyTwoDays = getDaysBeforeStart(firstDayOfMonth, sundayFirst);
  // Add in all days this month
  for (let i = 0; i < firstDayOfMonth.daysInMonth(); i++) {
    fourtyTwoDays.push(firstDayOfMonth.clone().add(i, 'd'));
  }
  // Add in all days at the end of the month until last day of week seen
  const lastDayOfMonth = moment(new Date(initYear, initMonth, firstDayOfMonth.daysInMonth()));
  let toAdd = 1;
  let gotAllDays = false;
  while (!gotAllDays) {
    if (fourtyTwoDays.length >= 42) {
      gotAllDays = true;
      break;
    }
    fourtyTwoDays.push(lastDayOfMonth.clone().add(toAdd, 'd'));
    toAdd++;
  }
  return fourtyTwoDays;
};

export const isInbetweenDates = (isStartDate, dayToFindOut, start, end) => {
  let isInBetweenDates;
  if (isStartDate) {
    isInBetweenDates = dayToFindOut.isAfter(start) && dayToFindOut.isBefore(end);
  } else {
    isInBetweenDates = dayToFindOut.isBefore(start) && dayToFindOut.isAfter(end);
  }
  return isInBetweenDates;
};

export const isValidTimeChange = (mode, date, start, end) => {
  const modeStartAndDateSameOrBeforeStart = mode === 'start' && date.isSameOrBefore(end);
  const modeEndAndDateSameOrAfterEnd = mode === 'end' && date.isSameOrAfter(start);
  return modeStartAndDateSameOrBeforeStart || modeEndAndDateSameOrAfterEnd;
};

export const startDateStyle = () => ({
  borderRadius: '20px 0 0 20px',
  borderColour: 'transparent',
  color: '#fff',
  backgroundColor: '#2975A8',
  cursor: 'pointer',
});

export const endDateStyle = () => ({
  borderRadius: '0 20px 20px 0',
  borderColour: 'transparent',
  color: '#fff',
  backgroundColor: '#2975A8',
  cursor: 'pointer',
});

export const inBetweenStyle = () => ({
  borderRadius: '0',
  borderColour: 'transparent',
  color: '#212734',
  backgroundColor: '#BFEEFF',
  cursor: 'pointer',
});

export const normalCellStyle = darkMode => {
  const color = darkMode ? 'white' : '#212734';
  return {
    borderRadius: '0 0 0 0',
    borderColour: 'transparent',
    color,
    backgroundColor: '',
  };
};

export const hoverCellStyle = (between, darkMode) => {
  let borderRadius = '20px 20px 20px 20px';
  const color = darkMode ? 'white' : '#212734';
  const backgroundColor = darkMode ? '#00BDFF' : '#eee';
  if (between) {
    borderRadius = '0 0 0 0';
  }
  return {
    borderRadius,
    borderColour: 'transparent',
    color,
    backgroundColor,
    cursor: 'pointer',
  };
};

export const greyCellStyle = darkMode => {
  const color = darkMode ? '#ffffff' : '#999';
  const backgroundColor = darkMode ? '#818ea5' : '#fff';
  const opacity = darkMode ? '0.5' : '0.25';
  const borderRadius = '0';
  return {
    borderRadius,
    borderColour: 'transparent',
    color,
    backgroundColor,
    cursor: 'pointer',
    opacity,
  };
};

export const invalidStyle = darkMode => {
  const style = greyCellStyle(darkMode);
  style.cursor = 'not-allowed';
  return style;
};

export const rangeButtonSelectedStyle = () => ({
  color: '#FFFFFF',
  fontSize: '14px',
  borderRadius: '20px',
  cursor: 'pointer',
  marginBottom: '8px',
  marginLeft: '4px',
  marginRight: '4px',
  marginTop: '4px',
  backgroundColor: '#2975A8',
});

export const rangeButtonStyle = () => ({
  color: '#FFFFFF',
  fontSize: '14px',
  backgroundColor: '#212734',
  borderRadius: '20px',
  cursor: 'pointer',
  marginBottom: '8px',
  marginLeft: '4px',
  marginRight: '4px',
  marginTop: '4px',
});
