/* eslint-disable @typescript-eslint/no-empty-function */
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
  users: [],
  setUsers: () => {}
}

interface DefaultState {
  user: null | string
  setUser: Dispatch<SetStateAction<null | string>>
  users: UserInfo[] | []
  setUsers: Dispatch<SetStateAction<UserInfo[] | []>>
}

const GlobalContext = createContext<DefaultState>(defaultState)

interface ChildrenType {
  children?: ReactElement
}

interface UserInfo {
  cell: string
  dob: { date: string, age: number }
  email: string
  gender: string
  id: { name: string, value: string }
  location: { 
    city: string, coordinates: { latitude: string, longitude: string },
    country: string
    postcode: number
    state: string
    street: { number: number, name: string }
    timezone: { offset: string, description: string } 
  },
  login: { 
    md5: string
    password: string
    salt: string
    sha1: string
    sha256: string
    username: string
    uuid: string
  }
  name: {
    title: string
    first: string
    last: string
  },
  nat: string
  phone: string
  picture: {
    large: string
    medium: string
    thumbnail: string
  }
  registered: { date: string, age: number }
}

export const GlobalContextProvider = ({ children }: ChildrenType) => {
  const [users, setUsers] = useState<UserInfo[] | []>([])
  const [user, setUser] = useState<null | string>(null)

  const props = {
    user,
    setUser,
    users, 
    setUsers
  }

  return <GlobalContext.Provider value={props}>{children}</GlobalContext.Provider>
}

export const useGlobalState = () => useContext(GlobalContext)
