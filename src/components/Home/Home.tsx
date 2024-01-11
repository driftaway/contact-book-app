import LeftMenu from '../LeftMenu/LeftMenu'
import TopBar from '../TopBar/TopBar'
import './Home.scss'

const Home = () => {

  return (
    <div className='home'>
      <LeftMenu />
      
      <TopBar />
    </div>
  )
}

export default Home