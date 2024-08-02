import { useAuthContext } from './useAuthContext'

export const useLogout = () => {
  const { dispatch } = useAuthContext()
  // const { dispatch: workoutsDispatch} = useWorkoutsContext()

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user')

    // dispatch logout action
    dispatch({ type: 'LOGOUT' }) //logs out
    /*
    workoutsDispatch({type: 'SET_WORKOUTS', payload: null}) //clears user data
    */
  }

  return { logout }
}