/* eslint-disable @typescript-eslint/no-empty-function */
import axios from 'axios'
import {
  createContext,
  ReactElement,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from 'react'

const defaultState = {
  user: null,
  setUser: () => {},
  users: [],
  setUsers: () => {},
  selectedNationalities: [],
  setSelectedNationalities: () => {},
  isFetching: false,
  setIsFetching: () => {},
  handleFetchUsers: () => {}
}

interface DefaultState {
  user: null | string
  setUser: Dispatch<SetStateAction<null | string>>
  users: UserInfo[] | []
  setUsers: Dispatch<SetStateAction<UserInfo[] | []>>
  selectedNationalities: string[]
  setSelectedNationalities: Dispatch<SetStateAction<string[] | []>>
  isFetching: boolean
  setIsFetching: Dispatch<SetStateAction<boolean>>
  handleFetchUsers: Dispatch<boolean>
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

interface PromiseInfo {
  page: number
  results: number
  seed: string
  version: string
}

interface FetchUserPromise {
  data: {
    results: UserInfo[] | []
    info: PromiseInfo
  }
}

interface QueryPayload {
  nat: string[] | undefined
  results: number
}

export const GlobalContextProvider = ({ children }: ChildrenType) => {
  const [users, setUsers] = useState<UserInfo[] | []>([])
  const [user, setUser] = useState<null | string>(null)
  const [selectedNationalities, setSelectedNationalities] = useState<string[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false)

  const handleFetchUsers = async (isScrolling: boolean) => {
    setIsFetching(true)
    try {
      const payload = {
        results: 50,
        nat: selectedNationalities?.length ? selectedNationalities : undefined
      }

      const query = Object.keys(payload).map((key: string) => payload[key as keyof QueryPayload] && key + '=' + payload[key as keyof QueryPayload])?.join('&');
      const { data: { results }} = (await axios.get(`https://randomuser.me/api?` + query)) as Awaited<Promise<FetchUserPromise>>
      !isScrolling && setUser(null)
      results?.length && setUsers((current: UserInfo[]) => isScrolling ? [...current, ...results] : results)
      setIsFetching(false)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    handleFetchUsers(false)
  }, [selectedNationalities])

  const props = {
    user,
    setUser,
    users, 
    setUsers,
    selectedNationalities,
    setSelectedNationalities,
    isFetching,
    setIsFetching,
    handleFetchUsers
  }

  return <GlobalContext.Provider value={props}>{children}</GlobalContext.Provider>
}

export const useGlobalState = () => useContext(GlobalContext)
