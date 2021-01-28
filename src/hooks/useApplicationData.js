import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({...state, day});

  useEffect(() => {
    Promise.all([
      axios.get('api/days'),
      axios.get('api/appointments'),
      axios.get('api/interviewers'),
    ]).then((all) => {
        setState(prev => ({
          ...prev, 
          days: all[0].data, 
          appointments: all[1].data, 
          interviewers: all[2].data }))
      }).catch((err) => console.log(err));
  }, []);

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const days = [...state.days];
    for (let dayId in days) {
      let day = days[dayId];
      if (day.appointments.includes(id)) {
        const addDay = {...day, spots: day.spots + 1};
        days[dayId] = addDay;
      };
    };

    return axios.delete(`/api/appointments/${id}`, appointment)
      .then(() => {
        setState({
          ...state,
          appointments,
          days
        });
      });
  };

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const days = [...state.days];
    for (let dayId in days) {
      let day = days[dayId];
      if (day.appointments.includes(id)) {
        const lessDay = {...day, spots: day.spots - 1};
        days[dayId] = lessDay;
      };
    };

    return axios.put(`/api/appointments/${id}`, appointment)
      .then(() => {
        setState({
        ...state,
        appointments,
        days
      });
    });
  };

  function editInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => {
        setState({
        ...state,
        appointments,
      });
    });
  };

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
    editInterview
  };
};