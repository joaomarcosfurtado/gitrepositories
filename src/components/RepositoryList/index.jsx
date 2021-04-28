import { Link } from 'react-router-dom';
import { useUserInfo } from '../../hooks/useUserInfo';
import { RepositoryItem } from '../RepositoryItem'
import './styles.scss'

export function RepositoryList () {
  
  const { 
    repositories, 
    userList, 
    isRepositoriesListActive, 
    username,
  } = useUserInfo()
    
  return (

   <main className="repositoryListContainer">
      {isRepositoriesListActive && (<section className="repositoryListContent">
      <h2>Lista de repositórios de {userList.name} </h2> 
        <div className="repositoryListUserInfo">
                    
          <div className="repositoryListUserInfoLeftSide">
            <img src={`https://github.com/${userList.login}.png`} alt=""/>
            <div className="repositoryListUserText">
              <p>{userList.name}</p>
              <p>{userList.login}</p>
            </div>
          </div>
          
          <Link to={`/${username}`}>Sobre</Link>
          
        </div>

        {/* Alimentando componente para criar a listagem */}
        <ul className="repositoryItemContainer">
          {repositories.map(repository => {
            return <RepositoryItem key={repository.name} repository={repository}/>
          })}
        </ul>
      </section>)}
    
      
    </main>
    
  );
}