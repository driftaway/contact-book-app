import { Avatar } from "@mui/material"
import { useGlobalState } from "../../context/globalContext"

interface UserData {
  readonly email: string
  readonly username: string
  readonly uuid: string
  readonly first: string
  readonly last: string
  readonly thumbnail: string
}

const ListContact = (userData: UserData) => {
  const { user, setUser } = useGlobalState()
  const { uuid, first, last, email, username, thumbnail } = userData
  return (
    <div
      className={`contacts__wrapper-list-item${uuid === user ? ' active' : ''}`}
      onClick={() => setUser(uuid)}
    >
      <Avatar>
        <img src={thumbnail} alt={thumbnail} />
      </Avatar>

      <div className='contacts__wrapper-list-item-details'>
        <span style={{ fontWeight: 600, fontSize: 20 }}>{`${first} ${last}`}</span>

        <span style={{ fontSize: 12, fontWeight: 600 }}>{username}</span>

        <span style={{ fontSize: 12 }}>{email}</span>
      </div>
    </div>
  )
}

export default ListContact