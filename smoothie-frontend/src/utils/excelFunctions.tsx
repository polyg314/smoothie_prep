import * as XLSX from 'xlsx';

export function readExcelFile(arrayBuffer, sheetName) {
    // Read the file
    const workbook = XLSX.read(new Uint8Array(arrayBuffer), { type: 'array' });

    // Get the first sheet
    const worksheet = workbook.Sheets[sheetName];

    // Convert the sheet to JSON
    const jsonData = XLSX.utils.sheet_to_json(worksheet);

    return jsonData;
}
