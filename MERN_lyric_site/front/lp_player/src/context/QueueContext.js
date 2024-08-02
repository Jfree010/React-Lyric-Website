import { createContext, useReducer, useEffect, useState } from 'react';

export const QueueContext = createContext();

export const queueReducer = (state, action) => {
    switch (action.type) {
      case 'FETCH_QUEUE':
        return {
          ...state,
          name: action.payload.name,
          tracks: action.payload.tracks,
          current: action.payload.current
        };
      case 'CLEAR_QUEUE':
        // Clear local storage
        localStorage.removeItem('queue');
        return {
          ...state,
          name: '',
          tracks: [],
          current: {}
        };
      case 'UPDATE_CURRENT':
        // Update local storage and state with new current track
        localStorage.setItem('queue', JSON.stringify({ ...state, current: action.payload.current }));
        return {
          ...state,
          current: action.payload.current
        };
      default:
        return state;
    }
  };
  

export const QueueContextProvider = ({ children }) => {
  const initialState = {
    name: '',
    tracks: [],
    current: {}
  };
  const [playButtonToggle, setPlayButtonToggle] = useState(false)
  const [nonqueue_track, set_nonqueue_track] = useState({})

  // Load state from local storage if available
  const storedState = JSON.parse(localStorage.getItem('queueState')) || initialState;
  const [state, dispatch] = useReducer(queueReducer, storedState);

  // Update local storage whenever state changes
  useEffect(() => {
    localStorage.setItem('queueState', JSON.stringify(state));
  }, [state]);

  return (
    <QueueContext.Provider value={{ queue: state, dispatch, playButtonToggle, setPlayButtonToggle, nonqueue_track, set_nonqueue_track}}>
      {children}
    </QueueContext.Provider>
  );
};
