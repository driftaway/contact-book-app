import React, { useMemo } from "react";
import { useGlobalState } from "../../context/globalContext"
import { Avatar, IconButton } from "@mui/material";
import { Close, EmailOutlined, Phone, PhoneAndroid, Place } from "@mui/icons-material";

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

const SingleContactCard = () => {
  const { user, users, setUser } = useGlobalState()
  const {
    name: { first, last },
    login: { username },
    email,
    phone,
    cell,
    picture: { large },
    location: {
      street: { name, number },
      city,
      state,
      postcode 
    } 
  } = useMemo(() => users && users?.find(({ login: { uuid }}) => uuid === user), [user]) as UserInfo
  
  return (
    <div className='contacts__wrapper-single-user'>
      {user ? 
      <div className='contacts__wrapper-single-user-details'>
        <IconButton 
          disableRipple 
          className='contacts__wrapper-single-user-close'
          onClick={() => setUser(null)}
        >
          <Close />
        </IconButton>

        <div style={{ display: 'flex', gap: 20 }}>
          <div>
            <Avatar sx={{ width: 128, height: 128 }}>
              <img src={large} alt={large} />
            </Avatar>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontWeight: 600, fontSize: 32 }}>{`${first} ${last}`}</span>

            <span style={{ fontSize: 16, fontWeight: 600 }}>{username}</span>
          </div>
        </div>

        <div style={{ textTransform: 'uppercase', fontWeight: 600, fontSize: 12 }}>
          Basic details
        </div>

        <div className='contacts__wrapper-single-user-basic'>
          <div>
            <EmailOutlined style={{ fontSize: 24 }} />

            <span>{email}</span>
          </div>

          <div className='contacts__wrapper-single-user-details-phone'>
            <div>
              <PhoneAndroid style={{ fontSize: 24 }} />
              
              <span>{cell}</span>
            </div>

            <div>
            <Phone style={{ fontSize: 24 }} />
            
            <span>{phone}</span>
            </div>
          </div>

          <div>
            <Place style={{ fontSize: 24 }} />

            <span>
              {`${state} ${city} ${postcode} ${name} ${number}`}
            </span>
          </div>
        </div>
      </div> : null}
    </div>
  )
}

export default SingleContactCard