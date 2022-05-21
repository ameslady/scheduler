import React, { useState, useEffect } from "react";
import axios from "axios";
import DayList from "components/DayList.js";
import Appointment from "components/Appointment";
import "components/Application.scss";
import { getAppointmentsForDay } from "helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {}
  });

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  
  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments')
    ]).then((all) => {
      const days = all[0].data;
      const appointments = all[1].data;

      setState(prev => ({...prev, days, appointments }));
    })
  }, []);


  const appointmentItems = dailyAppointments.map((appointment) => 
    <Appointment 
      key={appointment.id} 
      {...appointment}
    />
  );

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
        <DayList
          days={state.days}
          value={state.day}
          onChange={setDay}
        />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentItems}
      </section>
    </main>
  );
}
