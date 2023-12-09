import React, { useState } from 'react';
import { TextField, Button, Box, Container } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useUser } from '../contexts/userContext';
import addIngredientType from '../API/ingredients/addIngredientType';



export const AllIngredientTypes = (props: any) => {

    const [ingredientType, setIngredientType] = useState('');

    const [loading, setLoading] = useState(false);

    const {user}  = useUser()

        
    const handleChange = (event) => {
        setIngredientType(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        addIngredientType({ingredient_type: ingredientType}, user.jwt).then(res => {
            console.log(res)
        })
        
        // try {
        //   // Simulate an async operation like an API call
        //   await new Promise(resolve => setTimeout(resolve, 2000));
          
        //   console.log('Submitted ingredient type:', ingredientType);
        //   // Reset the input field after submit
        //   setIngredientType('');
        // } catch (error) {
        //   console.error('Error during form submission:', error);
        // } finally {
        //   setLoading(false);
        // }
      };
    
    return (
        <>
            <Container maxWidth="xl">
                <Box
                    component="form"
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: '100%'
                    }}
                    onSubmit={handleSubmit}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        fullWidth
                        label="Add Ingredient Type"
                        variant="outlined"
                        value={ingredientType}
                        onChange={handleChange}
                        sx={{ mr: 2, flexGrow: 1 }}
                    />
                    <LoadingButton
                        type="submit"
                        variant="contained"
                        color="primary"
                        loading={loading}
                        >
                        Submit
                        </LoadingButton>
                </Box>
            </Container>
        </>
    )
}