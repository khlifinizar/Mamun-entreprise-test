import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileUpload } from 'primeng-lts/fileupload';
import { BackendApiService } from '../services/backend-api.service';
import { WebSocketAPIService } from '../services/web-socket-api.service';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css'],
})
export class ManagerComponent implements OnInit, OnDestroy {

  collation = ["Full", "Normal"];
  selectedCollation: any;
  download: boolean = false;
  public records1: any[] = [];
  public records2: any[] = [];
  @ViewChild('file1') firstFile!: FileUpload;
  @ViewChild('file2') secondFile!: FileUpload;
  registerForm!: FormGroup;
  submitted = false;
  numberlines: any;
  proceesData: boolean = false;
  data:any;
  renderdata: boolean= false;

  constructor(private formBuilder: FormBuilder, private backendApi: BackendApiService, private webSocketApi: WebSocketAPIService) {
    this.webSocketApi._connect();
    this.webSocketApi.progressBar.subscribe(value => {
      this.proceesData = value;
    });
    this.webSocketApi.dataObs.subscribe(value=>{
      this.data = value;
      this.renderdata =true;
    })

  }
  ngOnDestroy(): void {
    this.webSocketApi._disconnect();

  }

  ngOnInit() {
    //create  form validators
    this.registerForm = this.formBuilder.group({
      csv1: ['', Validators.required],
      csv2: ['', Validators.required],
      collationtype: ['', ],
      numberlines: ['', Validators.required],
      download: ['', ]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  async onSubmit() {
    this.submitted = true;

    //******************* */ if form is invalid
    if (this.registerForm.invalid) {
      return;
    }


    //send data to backend in order to process it 
    this.proceesData = true;
    this.webSocketApi._send(await this.prepaeToSend(this.registerForm.value));
    //this.backendApi.sendDataToBackend(this.registerForm.value);
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
    this.firstFile.clear();
    this.secondFile.clear();
    this.renderdata =false;
  }

  //handling the issue of  formcontrol an input file 
  onBasicUpload(event: any, fileInputIndex: String) {

    switch (fileInputIndex) {
      case "csv1": this.registerForm.get("csv1")?.setErrors(null);
        this.uploadListener(event.files[0], "csv1");
        this.registerForm.get("csv1")?.setValue(event.files[0]);
        break;
      default: this.registerForm.get("csv2")?.setErrors(null);
        this.uploadListener(event.files[0], "csv2");
        this.registerForm.get("csv2")?.setValue(event.files[0]);
        break;
    }

  }

  async prepaeToSend(value: any): Promise<any> {


//notfyinf the service of the state of check button in order to proceed after response
    this.webSocketApi.download=value.download;
    let Payload = {
      collationtype: value.collationtype,
      csv1: this.records1,
      csv2: this.records2,
      download: value.download,
      numberlines: value.numberlines
    }

    return JSON.stringify(Payload);
  };
  async uploadListener($event: any, fileInputIndex: String): Promise<any> {

    let text = [];


    let input = $event;
    let reader = new FileReader();
    reader.readAsText(input);

    reader.onload = async () => {
      let csvData = reader.result;
      let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);

      let headersRow = this.getHeaderArray(csvRecordsArray);

      switch (fileInputIndex) {
        case "csv1": this.records1 = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow);
          break;
        default: this.records2 = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow);
          break;
      }
      return
    };

    reader.onerror = function () {
      console.log('error is occured while reading file!');
    };

    switch (fileInputIndex) {
      case "csv1": return this.records1;
        break;
      default: return this.records2;
        break;
    }
  }

  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headersRow: any) {
    let csvArr = [];
    csvArr.push(headersRow[0].trim())

    for (let i = 1; i < csvRecordsArray.length; i++) {
      let curruntRecord = (<string>csvRecordsArray[i]).split(',');
      if (curruntRecord.length == headersRow.length) {
        let csvRecord: any;
        csvRecord = curruntRecord[0].trim();

        csvArr.push(csvRecord);
      }
    }
    return csvArr;
  }



  getHeaderArray(csvRecordsArr: any) {
    let headers = (<string>csvRecordsArr[0]).split(',');
    let headerArray = [];
    for (let j = 0; j < headers.length; j++) {
      headerArray.push(headers[j]);
    }
    return headerArray;
  }
}