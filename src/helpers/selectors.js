// returns an array of appointments for that day
function getAppointmentsForDay(state, day) {
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


// returns an array of interviewers for that day
function getInterviewersForDay(state, day) {
  const todaysInterviewers = [];
  let interviewerIds = [];

  for (const dayObj of state.days) {
    if (dayObj.name === day) {
     interviewerIds = dayObj.interviewers;
    }
  }

  for (const key in state.interviewers) {
    if (interviewerIds.includes(Number(key))) {
      todaysInterviewers.push(state.interviewers[key])
    } 
  }

  return todaysInterviewers;
};


function getInterview(state, interview) {
  let interviewInfo = {
    "student": "test",
    "interviewer": {
      "id": 0,
      "name": "",
      "avatar": ""
    }
  }

  if (!interview) return null;
  
  interviewInfo.student = interview.student;
  interviewInfo.interviewer.id = interview.interviewer;

  for (const key in state.interviewers) {
    if (Number(key) === interview.interviewer) {
      interviewInfo.interviewer.name = state.interviewers[key].name;
      interviewInfo.interviewer.avatar = state.interviewers[key].avatar;
    }   
  }

  return interviewInfo;
};

export { getAppointmentsForDay, getInterviewersForDay, getInterview };