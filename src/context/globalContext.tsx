import React, {
  createContext,
  ReactElement,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from 'react'

const defaultState = {
  user: null,
  setUser: () => {},
}

interface DefaultState {
  user: null | number
  setUser: Dispatch<SetStateAction<null | number>>
}

const GlobalContext = createContext<DefaultState>(defaultState)

interface ChildrenType {
  children?: ReactElement
}

export const GlobalContextProvider = ({ children }: ChildrenType) => {
  const [user, setUser] = useState<null | number>(null)

  const props = {
    user,
    setUser
  }

  return <GlobalContext.Provider value={props}>{children}</GlobalContext.Provider>
}

export const useGlobalState = () => useContext(GlobalContext)
