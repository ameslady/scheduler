import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
  });

  const setDay = (day) => setState({ ...state, day });

  for (const item of state.days) {
    console.log(`🦋 ~ ${item.name} spots:`, item.spots);
  }

  // create function
  // takes state and appointments params
  // create a variable call totalSpots = 0
  // filter state days (store as variable)
  // check parameter of filter === state.day
  // make new variable for appointments
  // for each the variable on line 19
  // check if appointmnets has a interview
  // if it does increase spots
  // if not return the same total spots

  function bookInterview(id, interview) {
    // what exactly are these doing?
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    // mapp through days to see what they equal

    return axios({
      method: "put",
      url: `/api/appointments/${id}`,
      data: { interview },
    }).then((response) => {
      // update days that contains spots
      setState({
        ...state,
        appointments,
      });
    });
  }

  function cancelInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios({
      method: "delete",
      url: `/api/appointments/${id}`,
      data: { interview },
    }).then((response) => {
      // update days that contains spots
      setState({
        ...state,
        appointments,
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
