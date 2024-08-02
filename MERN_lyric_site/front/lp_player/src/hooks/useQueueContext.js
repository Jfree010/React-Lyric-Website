import { QueueContext } from '../context/QueueContext'
import { useContext } from 'react'

export const useQueueContext = () => {
  const context = useContext(QueueContext)

  if(!context) {
    throw Error('useQueueContext must be used inside an FavoriteContextProvider')
  }

  return context
}
