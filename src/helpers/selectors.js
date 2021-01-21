 export function getAppointmentsForDay(state, day) {
  const allDays = state.days.filter(oneDay => oneDay.name === day);
  //return empty array when day is not found or data = empty
  if (allDays === [] || allDays[0] === undefined) {
    return [];
  }
  //create empty array to hold all appointments for day
  const apptsForDay = [];
  //match appt ID's and push all into empty array
  allDays[0].appointments.forEach(a => {
    for (let b in state.appointments) {
      if (state.appointments[b].id === a) {
        apptsForDay.push(state.appointments[b])
      }
    }
  })
  return apptsForDay;
}