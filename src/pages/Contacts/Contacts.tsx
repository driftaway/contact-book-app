import React from 'react'
import PageHeader from '../PageHeader'
import './Contacts.scss'

const Contacts = () => {
  return (
    <div className='contacts'>
      <PageHeader title='Contacts' />
      
      <div>
        <div>Search</div>

        <div>List</div>
      </div>
    </div>
  )
}

export default Contacts