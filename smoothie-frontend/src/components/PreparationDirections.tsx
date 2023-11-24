import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Button, Tooltip } from '@mui/material';
import { calculateTotalIngredients } from '../utils/miscFunctions';

import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

function downloadAsExcel(data, fileName) {
    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    // Convert DataGrid data to worksheet
    const worksheet = XLSX.utils.json_to_sheet(data.rows.map(row => {
        let newRow = {};
        data.columns.forEach(column => {
            newRow[column.headerName] = row[column.field];
        });
        return newRow;
    }));

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // Write workbook and trigger download
    const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'binary' });
    saveAs(new Blob([s2ab(wbout)], { type: 'application/octet-stream' }), `${fileName}.xlsx`);
}

function s2ab(s) {
    const buffer = new ArrayBuffer(s.length);
    const view = new Uint8Array(buffer);
    for (let i = 0; i < s.length; i++) {
        view[i] = s.charCodeAt(i) & 0xFF;
    }
    return buffer;
}



export const PreparationDirections = (props: any) => {



    const handleDownload = () => {
        var columns = getColumns()
        var rows = getRows()
        downloadAsExcel({ columns, rows }, "Preparation Directions");
      };




    var getColumns = () => {

        var allIngredients = Object.keys(calculateTotalIngredients(props.selectedSmoothies))
        var columns: GridColDef[] = [
            // { field: 'id', hide: true, editable: false } as GridColDef,,
            {
                field: 'count',
                headerName: 'Number to Prepare',
                width: 200,
                editable: false,
            },
            {
                field: 'smoothie_name',
                headerName: 'Smoothie',
                editable: false,
                flex: 0.3, 
                minWidth: 400
            }
        ]

        for(let i = 0; i < allIngredients.length; i++){
            columns.push({
                field: allIngredients[i],
                headerName: allIngredients[i].charAt(0).toUpperCase() + allIngredients[i].slice(1),
                width: 200,
                editable: false,
            })
        }

        return columns
    }
    var getRows = () => {
        var rows = []
        console.log(props.selectedSmoothies)
        var allIngredients = Object.keys(calculateTotalIngredients(props.selectedSmoothies))
        for (let i = 0; i < props.selectedSmoothies.length; i++) {
            var currentRow = {}
            currentRow["id"] = i;
            currentRow["smoothie_name"] = props.selectedSmoothies[i]["smoothie_name"];
            currentRow["count"] = props.selectedSmoothies[i]["count"];
            for(let j = 0; j < allIngredients.length; j++){
                var currentIngredient = props.selectedSmoothies[i]["ingredients"].filter(obj => obj.ingredient_name === allIngredients[j])
                if(currentIngredient.length > 0){
                    currentRow[allIngredients[j]] = currentIngredient[0]["ingredient_display"] + " (" + String(currentIngredient[0]["ingredient_weight"]) + "g)"
                }else{
                    currentRow[allIngredients[j]] = 0
                }
            }
            rows.push(currentRow)
        }
        return rows
    }


    return (
        <div style={{ height: "calc(100vh - 300px)", width: '100%', position: 'relative' }}>
            <h3>
                PREPARATION DIRECTIONS
            
                
            </h3>
           
            <Button 
                onClick={handleDownload}
                variant='outlined'
                color='secondary'
                style={{position: 'absolute', right: 0, top: 16}}
                >
                Download as Excel
            </Button>

            <DataGrid
                rows={getRows()}
                columns={getColumns()}
            // pageSize={100}
            />      
          

        </div>
    )
}