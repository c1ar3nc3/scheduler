import { useState, useEffect } from "react";
import axios from "axios";

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

  function reducer(state, action) {
    switch (action.type) {
      case SET_DAY:
        return { ...state, day: action.value }
      case SET_APPLICATION_DATA:  
        return {days: action.value[0].data, appointments: action.value[1].data, interviewers: action.value[2].data}
      case SET_INTERVIEW: 
        return { ...state, appointments: action.value}
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  }


export default function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, {
      day: "Monday",
      days: [],
      appointments: {},
      interviewers: {},
    });

  
  const setDay = day => dispatch({type: SET_DAY, value:day})

  // const [state, setState] = useState({
  //   day: "Monday",
  //   days: [],
  //   appointments: {},
  //   interviewers: {},
  // });

  // const setDay = day => setState({...state, day})

  useEffect(() => {
    Promise.all([
      axios.get('api/days'),
      axios.get('api/appointments'),
      axios.get('api/interviewers'),
    ]).then((all) => {
        dispatch({ SET_APPLICATION_DATA, value: all })
      })
  }, [])

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
      }
    }

    return axios.delete(`/api/appointments/${id}`, appointment)
      .then(() => {dispatch({ SET_INTERVIEW, value: appointments });
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
      }
    }
    return axios.put(`/api/appointments/${id}`, interview)
      .then(() => {dispatch({ type: SET_INTERVIEW, value: appointments});
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
  }
}