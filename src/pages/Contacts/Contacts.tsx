/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRef } from 'react'
import PageHeader from '../../components/PageHeader'
import './Contacts.scss'
import { Divider, InputAdornment, LinearProgress, TextField } from '@mui/material'
import { Search } from '@mui/icons-material'
import InfiniteScroll from '../../shared/components/InfiniteScroll'
import { useGlobalState } from '../../context/globalContext'
import ListContact from './ListContact'
import SingleContactCard from './SingleContactCard'

const Contacts = () => {
  const { user, users, isFetching, handleFetchUsers } = useGlobalState()
  const rootSentinelRef = useRef<HTMLInputElement>(null)
  const handleSubmitSearch = (event: any) => {
    console.log(event.preventDefault())
  }
  const handleInfiniteScroll = () => handleFetchUsers(true)

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