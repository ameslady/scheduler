import react from "react";

export function getAppointmentsForDay(state, day) {
  // returns an array of appointments for that day
  const todaysAppointments = [];
  let appointmentKeys = [];
  
  for (const dayObj of state.days) {
    if (dayObj.name === day) {
      appointmentKeys = dayObj.appointments;
    }
  }
  
  for (const key in state.appointments) {
    if (appointmentKeys.includes(Number(key))) {
      todaysAppointments.push(state.appointments[key])
    } 
  }

  return todaysAppointments;
};