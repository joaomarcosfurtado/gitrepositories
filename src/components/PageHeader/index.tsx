import { useUserInfo } from '../../hooks/useUserInfo';
import githubImg from '../../assets/images/github.png'
import './styles.scss'

export function PageHeader () {
  const { 
    handleGetUsername,
    getUserRepository,
    getUserStarred,
    loadRepositoryList,
    username,
  } = useUserInfo()
  

  return (
    <header className="pageHeader">
        <div className="pageHeaderContent">
          
          <div className="pageHeaderTitle">
            <img src={githubImg} alt="Imagem do usuário"></img>
            <span>Git Repos</span>
          </div>
          
          <div className="pageHeaderSearch">
            <form className="pageHeaderInput" autoComplete="off">
              <input 
                type="text" 
                name="pageHeaderInput" 
                placeholder="Pesquise por um usuário"
                value={username}
                onChange={(e) => handleGetUsername(e.target.value)}
              />
            </form>
            <button 
              onClick={(e) => {
                  e.preventDefault()
                  loadRepositoryList('repositories')
                  getUserRepository()
                }}
            > 
              Repositórios
            </button>
            <button
              onClick={(e) => {
                e.preventDefault()
                loadRepositoryList('starreds')
                getUserStarred()
              }}
            >
              Starreds
            </button>
          </div>
        </div>
    </header>
  );
}