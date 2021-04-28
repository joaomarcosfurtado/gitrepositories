import { ReactNode, useContext, useState, createContext } from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import { api } from "../services/api";

interface RepositoryProps {
  name: string;
  description: string;
  languange: string;
}

interface UserListProps {
  name: string;
  login: string;
}

interface UserInfoContextData {
  handleGetUsername: (username: string) => void;
  getUserRepository: () => void; 
  getUserStarred: () => void;
  loadRepositoryList: (repositoryType: string) => void;
  repositories: RepositoryProps[];
  userList: UserListProps[];
  isRepositoriesListActive : boolean;
  username: string;
  whichWasLastApiResult: string;
}

interface UserInfoProviderProps {
  children: ReactNode;
}


export const UserInfoContext = createContext( {} as UserInfoContextData );

export function UserInfoProvider( {children}: UserInfoProviderProps ) {
    
  const [ repositories, setRepositories ] = useState<RepositoryProps[]>([])
  const [ username, setUsername ] = useState('')
  
  // Essa variável é utilizada para fazer a verificação
  // se a busca ocorre com o mesmo usuário da anterior 
  const [ oldUsername, setOldUsername] = useState('')
  
  // Essa variável armazena o tipo de busca escolhida pelo usuário
  const [ whichWasLastApiResult, shetWichWasLastApiResult ] = useState('') 


  const [ userList, setUserList ] = useState<UserListProps[]>([])
  const [ isRepositoriesListActive, setIsRepositoriesListActive ] = useState(false)
   

  // Essa constante é utilizada para pegar as informações de 
  // todos repisitórios e informações do usuário, ou seja carrega os arrays
  // tanto de Repositórios quanto as informações dos usuarios
  const getUserRepository = async () => {
    
    // Validações de preenchimento para não utilizar a API sem necessidade
    if(username === '') {
      toast.error('Nenhum usuário foi selecionado.')
      setRepositories([])
      setUserList([])
      setIsRepositoriesListActive(false)
      return
    }

    if(username === oldUsername && whichWasLastApiResult === 'repositories') {
      return
    }
    
    // Consumindo API
    try {
      await api.get(`users/${username}/repos`, { 
      })
      .then(res => {
        setOldUsername(username)
        shetWichWasLastApiResult('repositories');
        const request = res.data;
        setRepositories(request);
        setIsRepositoriesListActive(true)
      })
      .catch(function (error: { status: any; }) {
        toast.error('Usuário inexistente')   
        return            
      });

      await api.get(`users/${username}`, {
      })
      .then(res => {
        const request = res.data;
        setUserList(request);
      })
      .catch(function (error: { status: any; }) {
      });  

    } catch {
      toast.error('Erro ao buscar repositório')  
    }
    
  }

  // Essa constante é utilizada para pegar as informações dos repisitórios
  // Starreds e informações do usuário, ou seja carrega os arrays
  // tanto de Repositórios quanto as informações dos usuarios

  const getUserStarred = async () => {
    
    // Validações de preenchimento para não utilizar a API sem necessidade
    if(username === '') {
      toast.error('Nenhum usuário foi selecionado.')
      return
    }

    if(username === oldUsername && whichWasLastApiResult === 'starreds') {
      return
    }
    
    //Consumindo API
    try {
      await api.get(`users/${username}/starred?page=1&per_page=10000`, {
      })
      .then(res => {
        setOldUsername(username)
        shetWichWasLastApiResult('starreds');
        const request = res.data;
        setRepositories(request);
        setIsRepositoriesListActive(true)
      })
      .catch(function (error: { status: any; }) {
        toast.error('Usuário inexistente')   
        return  
      });

      api.get(`users/${username}`, {
      })
      .then(res => {
        const request = res.data;
        setUserList(request);
      })
      .catch(function (error: { status: any; }) {
      });  

    } catch {
      toast.error('Erro ao buscar repositório')
    }
  }
   
  // Essa função tem como obetivo popular a variável username 
  function handleGetUsername (username: string) {
    setUsername(username);
  }

  // Essa função é utilizada para desativar os repositórios ativos
  // com o intuito de re-utilizar a animação de abertura toda vez
  // Que o botão de busca for clicado;
  const loadRepositoryList = async (repositoryType: string) => {

    // Travamento de busca do mesmo usuário
    if(username === oldUsername && whichWasLastApiResult === repositoryType) {
      return
    }

    await setIsRepositoriesListActive(false)
  }

  return (
    <UserInfoContext.Provider 
      value={{
        repositories,
        userList,
        handleGetUsername,
        getUserRepository,
        getUserStarred,
        loadRepositoryList,
        isRepositoriesListActive,
        username,
        whichWasLastApiResult,
      }}
    >  
      {children} 
    </UserInfoContext.Provider> 
  )
}

export function useUserInfo(): UserInfoContextData {
  const context = useContext(UserInfoContext);

  return context;
}