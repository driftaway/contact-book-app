/* eslint-disable @typescript-eslint/no-explicit-any */
// import { debounce } from '@mui/material'
import { useEffect, useRef } from 'react'
import { useGlobalState } from '../../context/globalContext'
import { Button } from '@mui/material'

interface Props {
  readonly children?: any
  readonly reverse?: boolean
  readonly threshold?: number
  readonly onLoadMore?: any
  readonly rootSentinelRef?: any
}

const InfiniteScroll = ({
  children,
  reverse = false,
  threshold = 0,
  rootSentinelRef,
}: Props) => {
  const { 
    users, 
    isFetching, 
    handleFetchUsers, 
    search, 
    setShouldShowPrefetched 
  } = useGlobalState()
  const tergetSentinelRef = useRef<any>()
  useEffect(() => {
    const rootSentinel = rootSentinelRef?.current
    const targetSentinel = tergetSentinelRef?.current
    const observer = new IntersectionObserver(
      async ([entry]) => {
        const parentHeight = rootSentinelRef?.current?.clientHeight
        let childrenHeight = 0
        rootSentinelRef?.current && Array?.from(rootSentinelRef?.current?.children)?.forEach(
          (child: any) => (childrenHeight = childrenHeight + child?.clientHeight),
        )
        const isIntersecting = !(childrenHeight >= 50 && (parentHeight > childrenHeight))

        if (!isIntersecting) return false

        if (
          entry.isIntersecting && 
          users?.length > 0 && 
          users?.length < 1000 && 
          !isFetching
        ) {
          setShouldShowPrefetched(true)
          handleFetchUsers(true)
        }
      },
      {
        root: rootSentinel,
        threshold,
      },
    )
    targetSentinel && observer.observe(targetSentinel)
    return () => targetSentinel && observer.unobserve(targetSentinel)
  }, [threshold, users, isFetching])

  return (
    <>
      <div
        ref={rootSentinelRef}
        className='infinite-scroll'
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          width: '100%',
          overflow: 'auto',
          ...(reverse && {
            display: 'flex',
            flexDirection: 'column-reverse',
          }),
        }}
      >
        {children}

        {users?.length < 1000 && (
          <div
            ref={tergetSentinelRef}
            style={{
              display: 'flex',
              minHeight: 50,
              visibility: 'hidden',
            }}
          />
        )}

        {users?.length < 1000 && search?.length ? 
          <Button
            disabled={isFetching}
            onClick={() => handleFetchUsers(true)}
            style={{ marginTop: '-50px', textTransform: 'capitalize' }}
          >
            Load more users
          </Button> 
        : null}
      </div>
    </>
  )
}

export default InfiniteScroll
