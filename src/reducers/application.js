export const SET_DAY = "SET_DAY";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_INTERVIEW = "SET_INTERVIEW";


/* const changeSpots = (add) => {
  const dayobj = state.days.find(d => {
    return d.name === state.day
  });
  return dayobj.spots += add
} */

function remainingSpotForDay(day, appointments) {
  const spotsForDay = day.appointments;
  let availSpots = 0;
  spotsForDay.forEach((appId) => {
    if (!appointments[appId].interview) {
      availSpots++;
    }
  });
  return availSpots;
}

function showDaysWithSpots(days, appointments) {
  const showedDays = days.map((day) => ({
    ...day,
    spots: remainingSpotForDay(day, appointments),
  }));
  return showedDays;
}

export default function reducer(state, action) {
  if (action.type === SET_DAY) {
    return { ...state, day: action.day };
  }

  if (action.type === SET_APPLICATION_DATA) {
    return {
      ...state,
      days: action.days,
      appointments: action.appointments,
      interviewers: action.interviewers,
    };
  }

  if (action.type === SET_INTERVIEW) {
    const appointment = {
      //adding interview data to the already existing appoitnment in the appointments object
      ...state.appointments[action.id],
      interview: action.interview,
    };

    const appointments = {
      ...state.appointments,
      [action.id]: appointment,
    };

    const days = showDaysWithSpots(state.days, appointments);
    return {
      ...state,
      appointments,
      days,
    };
  }

  throw new Error(
    `Tried to reduce with unsupported action type: ${action.type}`
  );
}