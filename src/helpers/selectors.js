 export function getAppointmentsForDay(state, day) {
  const allDays = state.days.filter(oneDay => oneDay.name === day);
  if (allDays === [] || allDays[0] === undefined) {
    return [];
  }
  const apptsForDay = [];
  allDays[0].appointments.forEach(a => {
    for (let b in state.appointments) {
      if (state.appointments[b].id === a) {
        apptsForDay.push(state.appointments[b])
      }
    }
  })
  return apptsForDay;
}


export function getInterview(state, interview) {
  if (interview) {
    return {
      ...interview,
      interviewer: state.interviewers[interview.interviewer],
    };
  }
  return null;
}



export function getInterviewersForDay(state, day) {
  const allDays = state.days.filter(oneDay => oneDay.name === day);
  if (allDays === [] || allDays[0] === undefined) {
    return [];
  }
  const intsForDay = [];
  allDays[0].interviewers.forEach(a => {
    for (let b in state.interviewers) {
      if (state.interviewers[b].id === a) {
        intsForDay.push(state.interviewers[b])
      }
    }
  })
  return intsForDay;
}