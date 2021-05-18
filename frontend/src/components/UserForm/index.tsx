import React,{useEffect,useState,useContext} from 'react';
import { Box, Button, Layer, Form, FormField, TextInput,RadioButtonGroup } from 'grommet';
import {UserInfoContext} from '../../utils/userInfoContext';


interface Props {
    toggleFormStatus: Function
}

const formInitialState = {fname : "", lname : "", gender : "", mobile : "",}

function UserForm(props: Props) {
    const [formvalues,updateFormvalues] = useState(formInitialState);
    const {updateList,activeUserId,usersList,onEditUser} = useContext(UserInfoContext);
    const { toggleFormStatus } = props;
    
    useEffect(()=>{
        const getSeletedData = () => {
            if(activeUserId){
                let selectedItem = usersList.find((_item)=>{
                    return _item.id === activeUserId;
                });
                updateFormvalues({...selectedItem || formInitialState});
            }
        }
        getSeletedData();

    },[activeUserId,usersList])
    return (
        <Box>
            <Layer
                onEsc={() => {toggleFormStatus(false);onEditUser(undefined)}}
                onClickOutside={() => {toggleFormStatus(false);onEditUser(undefined)}}
            >
                <Box pad="xsmall">
                <Form
                    value={formvalues}
                    onChange={nextValue => updateFormvalues(nextValue)}
                    onReset={() => updateFormvalues(formInitialState)}
                    onSubmit={({ value }) => {updateList({...value,id:activeUserId});toggleFormStatus(false);onEditUser(undefined); }}
                >
                    <FormField name="fname" htmlFor="text-input-id" label="First Name">
                        <TextInput id="text-input-id" name="fname" />
                    </FormField>
                    <FormField name="lname" htmlFor="text-input-id" label="Last Name">
                        <TextInput id="text-input-id" name="lname" />
                    </FormField>
                    <FormField name="gender" htmlFor="text-input-id" label="Gender">
                    <RadioButtonGroup
                        name="gender"
                        options={['Male', 'Female']}
                        />
                    </FormField>
                    <FormField name="mobile" htmlFor="text-input-id" label="Mobile">
                        <TextInput id="text-input-id" name="mobile" />
                    </FormField>
                    <Box direction="row" gap="medium">
                        <Button type="submit" primary label="Submit" />
                        <Button type="reset" label="Reset" />
                    </Box>
                </Form>
                </Box>
            </Layer>
        </Box>
    );
}

export default UserForm;