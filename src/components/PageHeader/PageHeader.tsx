import React from 'react'
import './PageHeader.scss'

interface Props {
  readonly title: string
}

const PageHeader = ({ title }: Props) => {
  return (
    <div className='page-header'>
      <span>{title}</span>
    </div>
  )
}

export default PageHeader