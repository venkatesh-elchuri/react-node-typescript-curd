import React,{useState} from 'react';
import './App.css';
import { Box, Button } from 'grommet';
import UserInfo from './components/UserInfo';
import UserForm from './components/UserForm';
import UserInfoProvider from './utils/userInfoContext';


function App() {
  const [isFormOpen, toggleFormStatus] = useState(false);

  return (
    <div className="App"> 
    <UserInfoProvider>
      <Box border={{ color: 'brand' }} pad="medium"  >
          <Box align="end"><Button primary label="Add User"  onClick={() => toggleFormStatus(true)}/></Box>

          {isFormOpen && <UserForm toggleFormStatus={toggleFormStatus}/> }
          <UserInfo toggleFormStatus={toggleFormStatus}/>
        </Box>
    </UserInfoProvider>       
     
    </div>
  );
}

export default App;
