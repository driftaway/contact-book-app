/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useRef, useState } from 'react'
import PageHeader from '../../components/PageHeader'
import './Contacts.scss'
import { Divider, InputAdornment, LinearProgress, TextField } from '@mui/material'
import { Search } from '@mui/icons-material'
import axios from 'axios'
import InfiniteScroll from '../../shared/components/InfiniteScroll'
import { useGlobalState } from '../../context/globalContext'
import ListContact from './ListContact'
import SingleContactCard from './SingleContactCard'

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

const Contacts = () => {
  const { user, users, setUsers } = useGlobalState()
  const [isFetching, setIsFetching] = useState<boolean>(false)
  const rootSentinelRef = useRef<HTMLInputElement>(null)
  const handleFetchUsers = async () => {
    setIsFetching(true)
    try {
      const { data: { results, info }} = (await axios.get(`https://randomuser.me/api?results=50`)) as Awaited<Promise<FetchUserPromise>>
      results?.length && setUsers((current: UserInfo[]) => [...current, ...results])
      setIsFetching(false)
    } catch (err) {
      console.log(err)
    }
  }

  const handleSubmitSearch = (event: any) => {
    console.log(event.preventDefault())
  }

  const handleInfiniteScroll = () => {
    handleFetchUsers()
  }

  useEffect(() => {
    handleFetchUsers()
  }, [])

  return (
    <div className='contacts'>
      <PageHeader title='Contacts' />
      
      <div className='contacts__wrapper'>
        <div className='contacts__wrapper-list'>
          <div>
            <form onSubmit={handleSubmitSearch}>
              <TextField
                type='search'
                // value={searchData.search || ''}
                variant='standard'
                placeholder='Search users'
                fullWidth
                inputProps={{ style: { padding: '30px 10px 30px 30px' } }}
                InputProps={{ 
                  disableUnderline: true, 
                  endAdornment: 
                    <InputAdornment style={{ marginRight: 30 }} position='start'>
                      <Search style={{ fontSize: 30 }} />
                    </InputAdornment>
                }}
              />
            </form>

            {isFetching ? <LinearProgress /> : null}
          </div>

          <Divider />

          <div style={{ height: 'calc(100% - 92px)' }}>
            <InfiniteScroll
              rootSentinelRef={rootSentinelRef}
              onLoadMore={handleInfiniteScroll}
              hasMore={users?.length >= 20}
              // data={users}
              canLoadMore={users?.length < 1000}
              isFetching={isFetching}
            >
              {users?.map(({
                email,
                login: { uuid, username },
                picture: { thumbnail },
                name: { first, last }
              }) => (
                <ListContact 
                  key={uuid}
                  email={email}
                  uuid={uuid}
                  username={username}
                  thumbnail={thumbnail}
                  first={first}
                  last={last}
                />
              ))}
            </InfiniteScroll>
          </div>
        </div>

        <Divider orientation='vertical' />

        {user ? <SingleContactCard /> : null}
      </div>
    </div>
  )
}

export default Contacts