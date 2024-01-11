/* eslint-disable @typescript-eslint/no-explicit-any */
import { debounce } from '@mui/material'
import React, { useEffect, useRef } from 'react'

interface Props {
  readonly children?: any
  readonly hasMore?: boolean
  readonly reverse?: boolean
  readonly threshold?: number
  readonly onLoadMore?: any
  readonly rootSentinelRef?: any
  readonly canLoadMore?: boolean
  readonly isFetching: boolean
}

const InfiniteScroll = ({
  children,
  hasMore,
  reverse = false,
  threshold = 0.9,
  onLoadMore,
  rootSentinelRef,
  canLoadMore,
  isFetching,
}: Props) => {
  const tergetSentinelRef = useRef<any>()
  useEffect(() => {
    const rootSentinel = rootSentinelRef?.current
    const targetSentinel = tergetSentinelRef?.current
    const observer = new IntersectionObserver(
      async ([entry]) => {
        entry.isIntersecting && canLoadMore && !isFetching && onLoadMore()
      },
      {
        root: rootSentinel,
        threshold,
      },
    )
    targetSentinel && observer.observe(targetSentinel)
    return () => targetSentinel && observer.unobserve(targetSentinel)
  }, [threshold, hasMore, onLoadMore])


  const scrollhandler = debounce(async () => {
    console.log(123)
  }, 500)

  useEffect(() => {
    rootSentinelRef?.current?.addEventListener('scroll', scrollhandler)

    return () => {
      rootSentinelRef?.current?.removeEventListener('scroll', scrollhandler)
    }
  }, [children])
  return (
    <div
      ref={rootSentinelRef}
      className='infinite-scroll'
      style={{
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

      {canLoadMore && (
        <div
          ref={tergetSentinelRef}
          style={{
            display: 'flex',
            minHeight: 50,
            visibility: 'hidden',
            marginBottom: '-200px',
          }}
        />
      )}
    </div>
  )
}

export default InfiniteScroll
