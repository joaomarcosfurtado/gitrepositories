import { FaUserFriends } from 'react-icons/fa'
import { useUserInfo } from '../../hooks/useUserInfo';
import arrowImg from '../../assets/icons/arrow.svg'
import { Link } from 'react-router-dom';
import './styles.scss'

export function UserPageContent () {
  const { userList } = useUserInfo();
  
  return(
    <>
      <header className="userPageHeader">
        <Link to="/">
          <img src={arrowImg} alt="Voltar"/>
        </Link>
      </header>
      <main className="userPageContainer">
        <section className="userPageContent">
          <img src={`https://github.com/${userList.login}.png`} alt=""/>
        
          <strong>{userList.name}</strong>
          <span>{userList.login}</span>

          <p>{userList.bio}</p>

          <div className="userPageFollowInfo">
            <FaUserFriends />
            <span>
              <strong>{userList.followers}</strong> 
              followers
            </span>

            <span>·</span>
            <span>
              <strong>{userList.following}</strong>  
              following
            </span>
          </div>
          
        </section>
      
      </main>
    </>
  );
}