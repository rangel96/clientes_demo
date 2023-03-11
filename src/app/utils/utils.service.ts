import { EventEmitter, Injectable } from '@angular/core';
// import { WorkBook, WorkSheet } from 'xlsx';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {


  // downloadFileExcel(json: any[], filename: string) {
  //   import('xlsx').then(xlsx => {
  //
  //     // Obtener las cabeceras de las columnas
  //     const cabeceras = Object.keys(json[0]).map(cabecera => {
  //       const resultado = cabecera.replace(/([A-Z])/g, ' $1');
  //       return resultado.charAt(0).toUpperCase() + resultado.slice(1);
  //     });
  //
  //     // Reemplazar las cabeceras de las columnas en el objeto de hoja de trabajo
  //     const worksheet: WorkSheet = xlsx.utils.json_to_sheet(json);
  //     worksheet['!cols'] = cabeceras.map(cabecera => ({ wch: cabecera.length }));
  //     cabeceras.forEach((cabecera, indice) => {
  //       const letra = xlsx.utils.encode_col(indice);
  //       worksheet[letra + '1'].v = cabecera;
  //     });
  //
  //     // Creación del archivo en función de la hoja de trabajo
  //     const workbook: WorkBook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
  //     const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
  //     this.saveAsExcelFile(excelBuffer, filename);
  //   });
  // }

  // saveAsExcelFile(buffer: any, fileName: string): void {
  //   import('file-saver').then(fileSaver => {
  //     const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  //     const EXCEL_EXTENSION = '.xlsx';
  //     const data: Blob = new Blob([buffer], {
  //       type: EXCEL_TYPE,
  //     });
  //     fileSaver.saveAs(data, fileName + '_export_' + this.getTodayDate() + EXCEL_EXTENSION);
  //   });
  // }

  /**
   * It takes in a JSON object, the headers you want to use, and the filename you want to save it as, and then it converts
   * it to a CSV file and downloads it
   * @param {any} data - The data you want to download.
   * @param {string[]} headers - The headers of the CSV file.
   * @param {string} filename - The name of the file you want to download.
   * @param {string[]} [keyList] - This is an array of keys that you want to include in the CSV. If you don't pass this,
   * all the keys will be included.
   */
  downloadFileCSV(data: any, headers: string[], filename: string, keyList?: string[]): void {
    const csvData = this.ConvertToCSV(data, headers, keyList);

    const blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    this.downloadFile(url, filename);
  }


  /**
   * It takes an array of objects, a list of headers, and a list of keys and returns a CSV string
   * @param {any} objArray - The array of objects that you want to convert to CSV.
   * @param headerList - This is the list of headers that you want to show in the CSV file.
   * @param [keyList] - This is an optional parameter. If you want to change the order of the columns in the CSV file, you
   * can pass in an array of keys in the order you want them to appear.
   * @returns A string
   */
  protected ConvertToCSV(objArray: any, headerList: { [x: string]: any; }, keyList?: { [x: string]: any; }): string {
    const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
    let str = '';
    let row = '';
    for (const index in headerList) {
      row += headerList[index] + ',';
    }

    row = row.slice(0, -1);
    str += row + '\r\n';
    for (let i = 0; i < array.length; i++) {
      let line = '';
      const objKeys = keyList || headerList;

      for (let index in objKeys) {
        const head = objKeys[index];
        line += array[i][head] + ',';
      }
      str += line + '\r\n';
    }
    return str;
  }


  /**
   * It creates a link element, sets the href attribute to the url, appends the link to the body, clicks the link, and then
   * removes the link from the body
   * @param {string} url - The url of the file you want to download.
   * @param {string} [fileName] - The name of the file you want to download.
   */
  protected downloadFile(url: string, fileName?: string): void {

    // Create button
    const downloadLink = document.createElement('a');
    const isSafariBrowser = navigator.userAgent.indexOf('Safari') !== -1 && navigator.userAgent.indexOf('Chrome') === -1;

    // If Safari or Chrome open in new window to save file with random filename.
    if (isSafariBrowser) {
      downloadLink.setAttribute('target', '_blank');
    }

    // If fileName exist setAttribute download create
    if (fileName) {
      downloadLink.setAttribute('download', fileName + '.csv');
    }

    // Click function and delete button
    downloadLink.setAttribute('href', url);
    downloadLink.style.visibility = 'hidden';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

  }


  /**
   * It creates a button, sets the button's type to 'button', sets the button's data-bs-toggle attribute to 'modal', sets
   * the button's data-bs-target attribute to the targetName parameter, sets the button's style.visibility to 'hidden',
   * adds the button to the document body, clicks the button, and then removes the button from the document body
   * @param {string} targetName - The name of the modal you want to open.
   */
  openModal(targetName: string): void {
    const button = document.createElement('button');
    button.type = 'button';
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', targetName);
    button.style.visibility = 'hidden';
    document.body.appendChild(button);
    button.click();
    document.body.removeChild(button);
  }

  closeModal(): void {
    const button = document.createElement('button');
    button.type = 'button';
    button.setAttribute('data-dismiss', 'modal');
    button.style.visibility = 'hidden';
    document.body.appendChild(button);
    button.click();
    document.body.removeChild(button);
  }

  /**
   * It returns a string in the format of YYYY-MM-DD, where the month and day are padded with a leading zero if they are
   * less than 10
   * @returns A string in the format of YYYY-MM-DD
   */
  getTodayDate(date?: 'dia' | 'mes' | 'anio'): string | number {
    const dateNow = new Date();
    const dateMonth = ((dateNow.getMonth() + 1) < 10) ? ('0' + (dateNow.getMonth() + 1)) : (dateNow.getMonth() + 1);
    const dateDay = (dateNow.getDate() < 10) ? ('0' + dateNow.getDate()) : (dateNow.getDate());
    let valorReturn: string | number;

    switch (date) {
      case 'dia':
        valorReturn = dateDay;
        break;
      case 'mes':
        valorReturn = dateMonth;
        break;
      case 'anio':
        valorReturn = dateNow.getFullYear();
        break;
      default:
        valorReturn = `${ dateNow.getFullYear() }-${ dateMonth }-${ dateDay }`;
        break;
    }

    return valorReturn;
  }


}
