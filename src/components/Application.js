import React, { useState, useEffect } from "react";
import axios from "axios";
import DayList from "components/DayList";
import "components/Application.scss";
import Appointment from "components/Appointment/index"




const appointments = [
  {
    id: 3,
    time: "8am",
  },
  {
    id: 1,
    time: "930am",
    interview: {
      student: "Stephan",
      interviewer: {
        id: 4,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 2,
    time: "10am",
    interview: {
      student: "Mohammad",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "245pm",
    interview: {
      student: "Kevin",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
];

const appointmentList = (appointments) => {
  
  return (appointments.map((appointment) => (
    <Appointment key={appointment.id} {...appointment} />

  )))
}
export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  const state = { day: "Monday", days: [] };
  setState({ ...state, day: "Tuesday" });
  const setDay = day => setState({ ...state, day });
  useEffect(() => {
    const daydays = 'http://localhost:8001/api/days/'
    axios.get(daydays).then(res => {
      setDay(res.data)
    })
  }, []);
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
            day={state.day}
            setDay={.....}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />

      </section>
      <section className="schedule">
        <ul>
          {appointmentList(appointments)}
        </ul>
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
