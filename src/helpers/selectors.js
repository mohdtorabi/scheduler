export function getAppointmentsForDay(state, day) {
  let arr = [];

    for (const item of state.days) {
       if (item.name === day) {
        for (const elem of item.appointments) {
          arr.push(state.appointments[elem])
        }
      }
    }
    return arr;
}