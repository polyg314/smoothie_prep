import { Grid, Card, CardContent, Typography, Button, CardActions, Box } from '@mui/material';
import { Ingredient, Smoothie } from '../models/main_models';

export const SmoothieSelect = (props:any) => {


    const handleAddClick = (smoothie) => {
        console.log(smoothie)
        // console.log(`Adding ${smoothieName}`);
        // Add logic to handle the addition of the smoothie
    };


    return(
        <>
        <Grid container spacing={2} style={{padding: "20px 10px"}}>
            {props.allSmoothies.map((smoothie: Smoothie, index: number) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index} style={{ display: 'flex' }}>
                    <Card style={{ width: '100%', position: 'relative', display: 'flex', flexDirection: 'column' }}>
                        <CardContent>
                            <Typography variant="h5" component="div" gutterBottom style={{textAlign: "left", maxWidth: "calc(100% - 80px)"}}>
                                {smoothie.smoothie_name}
                            </Typography>
                            {smoothie.ingredients.map((ingredient: Ingredient, idx: number) => (
                                <Typography variant="body2" color="text.secondary" key={idx}
                                    style={{textAlign: "left"}}
                                >
                                    {ingredient.ingredient_display}
                                </Typography>
                            ))}
                        </CardContent>
                        <Box sx={{ position: 'absolute',top: 16, right: 16 }}>
                            <Button 
                                variant="outlined" 
                                color="primary" 
                                onClick={() => handleAddClick(smoothie.smoothie_name)}
                            >
                                Add
                            </Button>
                        </Box>
                    </Card>
                </Grid>
            ))}
        </Grid>
        </>
    )
}