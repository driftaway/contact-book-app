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
  const { user, users, isFetching, search, setSearch, shouldShowPrefetched } = useGlobalState()
  const rootSentinelRef = useRef<HTMLDivElement>(null)

  const filteredUsers = () => {
    const prefetchUsers = shouldShowPrefetched ? users : [...users]?.slice(0, -50)
    return prefetchUsers?.filter(({ name: { first, last } }) => {
      return `${first} ${last}`.toLowerCase().includes(search.toLowerCase())
    })
  }

  return (
    <div className='contacts'>
      <PageHeader title='Contacts' />

      <div className='contacts__wrapper'>
        <div className='contacts__wrapper-list'>
          <div>
            <form>
              <TextField
                type='search'
                value={search}
                variant='standard'
                onChange={(event) => setSearch(event.target.value)}
                placeholder='Search users'
                fullWidth
                inputProps={{ style: { padding: '30px 10px 30px 30px' } }}
                InputProps={{
                  disableUnderline: true,
                  endAdornment: (
                    <InputAdornment style={{ marginRight: 30 }} position='start'>
                      <Search style={{ fontSize: 30 }} />
                    </InputAdornment>
                  ),
                }}
              />
            </form>

            {isFetching ? <LinearProgress /> : null}
          </div>

          <Divider />

          <div style={{ height: 'calc(100% - 84px)' }}>
            <InfiniteScroll totalResults={users?.length} rootSentinelRef={rootSentinelRef}>
              {filteredUsers()?.map(
                ({
                  email,
                  login: { uuid, username },
                  picture: { thumbnail },
                  name: { first, last },
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
                ),
              )}
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
