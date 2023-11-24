import { Grid, Card, CardContent, Typography, Button, CardActions, Box } from '@mui/material';
import { Ingredient, Smoothie } from '../models/mainModels';
import { objectCopy } from '../utils/miscFunctions';
import NumberInput from './NumberInput';
import PushPinIcon from '@mui/icons-material/PushPin';


export const SmoothieSelect = (props:any) => {


    const handleAddClick = (smoothie) => {
        console.log(smoothie)
        var selectedCopy = objectCopy(props.selectedSmoothies)
        var newSmoothies = selectedCopy.filter(smo => smo.smoothie_id !== smoothie.smoothie_id)
        console.log(newSmoothies)
        newSmoothies.push({...smoothie, count: 1})
        console.log(newSmoothies)
        props.handleSetSelectedSmoothies(newSmoothies)
        // console.log(`Adding ${smoothieName}`);
        // Add logic to handle the addition of the smoothie
    };

    const handleSelectedCountChange = (smoothie_id, v) => {
        console.log(smoothie_id)
        console.log(v)
        var selectedCopy = objectCopy(props.selectedSmoothies)
        if(v === 0){
            var newSmoothies = selectedCopy.filter(smo => smo.smoothie_id !== smoothie_id)
            props.handleSetSelectedSmoothies(newSmoothies)
        }else{
            const updatedArray = selectedCopy.map(item => {
                if (item.smoothie_id === smoothie_id) {
                    return { ...item, count:v};
                }
                return item;
            });
            props.handleSetSelectedSmoothies(updatedArray)
        }
    }


    return(
        <>
        <h3>SELECT SMOOTHIES</h3>
        <Grid container spacing={2} style={{padding: "20px 10px"}}>
            {props.selectedSmoothies.map((smoothie: any, index: number) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={smoothie.smoothie_id} style={{ display: 'flex' }}>
                    <Card style={{ width: '100%', position: 'relative', display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
                            <PushPinIcon color="action" />
                        </Box>
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
                        <Box sx={{ position: 'absolute', bottom: 16, right: 16 }}>
                            <NumberInput value={smoothie.count} smoothie_id={smoothie.smoothie_id} handleSelectedCountChange={handleSelectedCountChange}></NumberInput>
                        </Box>
                    </Card>
                </Grid>
            ))}
            {props.allSmoothies.filter(item1 => !props.selectedSmoothies.some(item2 => item2.smoothie_id === item1.smoothie_id)).map((smoothie: Smoothie, index: number) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={smoothie.smoothie_id} style={{ display: 'flex' }}>
                    <Card style={{ width: '100%', position: 'relative', display: 'flex', flexDirection: 'column' }}>
                        <CardContent>
                            <Typography variant="h5" component="div" gutterBottom style={{textAlign: "left", maxWidth: "calc(100% - 80px)"}}>
                                {smoothie.smoothie_name}
                            </Typography>
                            {smoothie.ingredients.map((ingredient: Ingredient, idx: number) => (
                                <Typography variant="body2" color="text.secondary" key={idx}
                                    style={{textAlign: "left"}}
                                >
                                    {ingredient.ingredient_display + " " + ingredient.ingredient_name}
                                </Typography>
                            ))}
                        </CardContent>
                        <Box sx={{ position: 'absolute',top: 16, right: 16 }}>
                            <Button 
                                variant="outlined" 
                                color="primary" 
                                onClick={() => handleAddClick(smoothie)}
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