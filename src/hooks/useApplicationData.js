import { useReducer, useEffect } from "react";
import axios from "axios";
import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW
} from "reducers/application";


export default function useApplicationData () {

  const [state, dispatch] = useReducer(reducer,{
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => dispatch({ type: SET_DAY, day });


  



  function bookInterview(id, interview) {
  
    /* const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const diff = !state.appointments[id].interview ? -1 : 0;
    return axios
      .put(
          `http://localhost:8001/api/appointments/${id}`, 
          {interview}
      )
      .then(res => {
        if (res.status === 204) {
          changeSpots(diff)
          setState({
            ...state,
            appointments
          })
        }
      }) */
      return axios
      .put(`http://localhost:8001/api/appointments/${id}`, { interview })
      .then(response => {
        if (response) {
          dispatch({ type: SET_INTERVIEW, id, interview });
        }
      });
  }


  function cancelInterview(id) {

    /* const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios
      .delete(`http://localhost:8001/api/appointments/${id}`)
      .then(res => {
        if (res.status === 204) {
          changeSpots(1)
          setState({
            ...state,
            appointments
          })
        }
      }) */
    return axios.delete(`http://localhost:8001/api/appointments/${id}`).then(response => {
        if (response) {
          dispatch({ type: SET_INTERVIEW, id, interview: null});
        }
      });
  
    
  }

  useEffect(() => {
    
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers")
    ]).then((all) => {
      const days = all[0].data;
      const appointments = all[1].data;
      const interviewers = all[2].data;
      dispatch({
        type: SET_APPLICATION_DATA,
        days,
        appointments,
        interviewers
      });
    });
}, []);

  return { 
    state,
    setDay,
    bookInterview,
    cancelInterview };

}

/* useEffect (() => {
  var webDays = new WebSocket("ws://localhost:8001/api/days", "protocolOne");
  var webAppointments = new WebSocket("ws://localhost:8001/api/appointments", "protocolOne");
  var webInterviewers = new WebSocket("ws://localhost:8001/api/interviewers", "protocolOne");
  Promise.all([
    axios.get(webDays),
    axios.get(webAppointments),
    axios.get(webInterviewers)
  ]).then((all) => {
      setState(prev => ({
        ...prev, 
        days: all[0].data, 
        appointments: all[1].data, 
        interviewers: all[2].data
      })
    );
  });
}, []); */