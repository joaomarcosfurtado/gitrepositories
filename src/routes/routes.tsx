import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { useUserInfo } from '../hooks/useUserInfo';

import Homepage from '../pages/Homepage';
import UserPage from '../pages/UserPage';


const Routes = (): JSX.Element => {
  const { username } = useUserInfo();
  
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Homepage} />
        <Route path={`/${username}`} component={UserPage} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;