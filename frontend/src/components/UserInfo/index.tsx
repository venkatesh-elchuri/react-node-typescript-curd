import React,{ useContext }  from 'react';
import { Box,Card,CardHeader,CardBody,ResponsiveContext,Grid } from 'grommet';
import {UserObj} from '../../utils/interface';
import {UserInfoContext} from '../../utils/userInfoContext';
import { Edit,Trash } from 'grommet-icons';

type UnserInfoProps = {
    toggleFormStatus: Function
}

function UserInfo(Props: UnserInfoProps){
    const {usersList,updateList,onEditUser,onDeleteUser} = useContext(UserInfoContext);
    const {toggleFormStatus} = Props;
    const getUserInfoCards = (usersList:UserObj[]) =>{
        return usersList.map((_userInfo:UserObj)=>{
            return <Card  height="small" width="medium" background="light-1" key={_userInfo.id}>
                    <CardHeader pad="medium" justify="end">
                        <Edit color='plain' onClick={()=>{onEditUser(_userInfo.id);toggleFormStatus(true);}}/> 
                        <Trash color='plain' onClick={()=>{onDeleteUser(_userInfo.id);}} /> 
                    </CardHeader>
                    <CardBody pad="small" style={{textAlign:'left'}}>
                    <Box style={{display : 'block'}}>Full Name : <b>{_userInfo.fname +' ' + _userInfo.lname}</b></Box>

                        <Box>Gender : {_userInfo.gender}</Box>
                        <Box>Mobile : {_userInfo.mobile}</Box>
                    </CardBody>
                  
            </Card>
        })
    }
    return (
        <div> 
            <Grid
            rows="auto"
            columns="medium"
            gap="small"
            >
                {
                    getUserInfoCards(usersList)
                }
            </Grid>
                
        </div>
      );
}

export default UserInfo;