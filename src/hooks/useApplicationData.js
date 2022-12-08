import { useState, useEffect } from 'react';
import axios from 'axios';


export default function useApplicationDate() {
  const setDay = day => setState({ ...state, day });
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  function bookInterview(id, interview) {
    console.log("bookInterview id & interview", id, interview);
    console.log("state:", state);
    // console.log("day:", day);

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const targetDay = state.days.find((day) => day.appointments.includes(id));
    const days = state.days.map((day) => {
      if(day.name === targetDay.name && state.appointments[id].interview === null) {
        return{...day, spots: day.spots -1};
      } else {
        return day;
      }
    });

    return axios.put(`/api/appointments/${id}`, appointment)
    .then(() =>
    setState(prev => ({ 
      ...prev,
      appointments, days
    })));
  };

function cancelInterview(id) {
  const appointment = {
    ...state.appointments[id],
    interview: null
  };
  const appointments = {
    ...state.appointments,
    [id]: appointment
  };

  const targetDay = state.days.find((day) => day.appointments.includes(id));
  const days = state.days.map((day) => {
    if(day.name === targetDay.name) {
      return{...day, spots: day.spots + 1};
    } else {
      return day;
    }
  });

  return axios.delete(`/api/appointments/${id}`, appointment)
  .then(() => 
  setState(prev => ({ 
    ...prev,
    appointments, days
  })));
  
}
  useEffect(() => {
      const promiseOne = axios.get('/api/days');
      const promiseTwo = axios.get('/api/appointments');
      const promiseThree = axios.get('/api/interviewers');
      Promise.all([promiseOne, promiseTwo, promiseThree])
      .then((all)=> {
      setState(prev => ({
        ...prev, 
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data}));
    });
  },[]);

  return { state, setDay, bookInterview, cancelInterview };
};