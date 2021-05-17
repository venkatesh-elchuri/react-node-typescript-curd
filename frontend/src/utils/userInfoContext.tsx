import React,{ useEffect, useState } from 'react';
import {UserObj} from './interface';
import request from './request';
import {GET_USER_LIST,CREATE_USER_INFO,UPDATE_USER_INFO,DELETE_USER_INFO} from './constants';

// export const list = [
//         {
//             fname : "venky",
//             lname : "elchuri",
//             gender: "male",
//             mobile: "1234567896",
//             id: 1
//         },
//         {
//             fname : "ashok",
//             lname : "elchuri",
//             gender: "male",
//             mobile: "977846212",
//             id: 2
//         }
// ];  

export type usersContextState = {
    usersList: UserObj[];
    activeUserId:number|undefined;
    updateList: (data: UserObj) => void;
    onEditUser: (id:number|undefined) => void;
    onDeleteUser: (id:number|undefined) => void;

    // updateUser: (data: UserObj) => void;
}

const createOrUpdateUser = async (userObj:UserObj) =>{
  try{
    let res;
    // if(!userObj.id){
      res = await request(userObj.id ? UPDATE_USER_INFO : CREATE_USER_INFO,{method:'post',body:JSON.stringify(userObj),headers: [
        ["Content-Type", "application/json"],
        ['Access-Control-Allow-Headers', '*']
      ]});
      return res.user;
    // }
  }catch(err){
    console.log("err",err)
  }

}

const deleteuser = async (id:number) =>{
  try{
      await request(`${DELETE_USER_INFO}${id}`,{method:'delete'});
  }catch(err){
    console.log("err",err)
  }
}

export const UserInfoContext = React.createContext<usersContextState>({
    usersList : [], // default value,
    updateList : ()=>{},
    onEditUser : ()=>{},
    onDeleteUser: ()=>{},
    activeUserId:undefined
  });

function UserInfoProvider({ children } :  {children: React.ReactNode}){
    const [usersList, updateUserList] = useState<UserObj[]>([]);
    const [activeUserId, selectUser] = useState<number|undefined>(undefined);
  
    const onEditUser = (id:number|undefined) => selectUser(id);

    const updateList = async (newObj:UserObj) =>{
        const updatedObj = await createOrUpdateUser(newObj);
        if(newObj.id){
            let selectdIdx =  usersList.findIndex((_item)=>_item.id === newObj.id);
            usersList[selectdIdx] = {...usersList[selectdIdx] ,...updatedObj}
            updateUserList([...usersList]);
       }else{

        updateUserList([updatedObj,...usersList]);
       }
    } 
    
    const onDeleteUser = async (id:number | undefined)=>{
        if(id){
            await deleteuser(id);
            let selectdIdx =  usersList.findIndex((_item)=>_item.id = id);
            usersList.splice(selectdIdx,1);
            updateUserList([...usersList]);
        }
    }

    useEffect(() => {
      const getData = async () =>{
        try{
          const {users} = await request(GET_USER_LIST);
          updateUserList(users);
        }catch(err){
          console.log(err);
        }
      } 
      getData();
    },[])
  
    return (
      <UserInfoContext.Provider
        value={{
            usersList,
            updateList,
            onEditUser,
            activeUserId,
            onDeleteUser
        }}
      >
        {children}
      </UserInfoContext.Provider>
    );
  };
  
  export default UserInfoProvider;

