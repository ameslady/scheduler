import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
  });

  const setDay = (day) => setState({ ...state, day });

  // updates the available spots for a specific day
  const updateSpots = function (state, appointments) {
    const updatedDays = [...state.days];
    const updatedDay = { ...state.days.find((day) => day.name === state.day) };
    const dayIndex = updatedDays.findIndex((day) => day.name === state.day);

    const appointmentIDs = updatedDay.appointments;

    const spots = appointmentIDs.filter(
      (id) => !appointments[id].interview
    ).length;

    updatedDay.spots = spots;
    updatedDays[dayIndex] = updatedDay;

    return updatedDays;
  };

  // creates a new interview
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const days = updateSpots(state, appointments);

    return axios({
      method: "put",
      url: `/api/appointments/${id}`,
      data: { interview },
    }).then((response) => {
      setState({
        ...state,
        appointments,
        days,
      });
    });
  }

  // cancels an existing interview
  function cancelInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: interview,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const days = updateSpots(state, appointments);

    return axios({
      method: "delete",
      url: `/api/appointments/${id}`,
      data: { interview },
    }).then((response) => {
      setState({
        ...state,
        appointments,
        days,
      });
    });
  }

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      const days = all[0].data;
      const appointments = all[1].data;
      const interviewers = all[2].data;

      setState((prev) => ({ ...prev, days, appointments, interviewers }));
    });
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
}
