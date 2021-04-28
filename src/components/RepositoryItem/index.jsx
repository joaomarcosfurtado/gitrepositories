import './styles.scss'

export function RepositoryItem (props) {
 
  return(
    <li className="repositoryItemContent">
      <p>{props.repository.name}</p>
      
      <p>
        { props.repository.description }
      </p>

      <p> <strong>Language:</strong> {props.repository.language}</p>
    </li>
  );
}