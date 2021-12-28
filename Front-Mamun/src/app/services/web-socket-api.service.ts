import { Inject, Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { DOCUMENT } from '@angular/common';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class WebSocketAPIService {

  
  webSocketEndPoint: string = 'http://localhost:8080/ws';
    topic: string = "/token/";
    stompClient: any;
    download:Boolean= false;
    isProgressBar:boolean =false;
    data:any;
    dataObs: Subject<boolean> = new Subject<boolean>();
    progressBar: Subject<boolean> = new Subject<boolean>();
    window: (Window & typeof globalThis) | null;
    
    constructor(@Inject(DOCUMENT) private document: Document){
        this.window = this.document.defaultView;
        this.progressBar.subscribe((value) => {
            this.isProgressBar = value
        });
        this.progressBar.next(false);
        this.dataObs.subscribe((value)=>{
            this.data = value;
        })
    }
    changeData(data:any) {
        this.dataObs.next(data);
    }
    toggleProgressbarVisibility() {
        this.progressBar.next(!this.isProgressBar);
    }
    _connect() {
        console.log("Initialize WebSocket Connection");
        let ws = new SockJS(this.webSocketEndPoint);
        this.stompClient = Stomp.over(ws);
        const _this = this;
        _this.stompClient.connect({}, function (frame: any) {
            _this.stompClient.subscribe(_this.topic, function (sdkEvent: any) {
                _this.onMessageReceived(sdkEvent);
            });
        }, this.errorCallBack);
    };

    _disconnect() {
        if (this.stompClient !== null) {
            this.stompClient.disconnect();
        }
        console.log("Disconnected");
    }

    // on error, schedule a reconnection attempt
    errorCallBack(error: string) {
        console.log("errorCallBack -> " + error)
        setTimeout(() => {
            this._connect();
        }, 5000);
    }

 /**
  * Send message to  web socket
  * @param {*} message 
  */
    _send(message: any) {
        console.log("calling logout api via web socket");
        this.stompClient.send("/app", {}, message);
        this.toggleProgressbarVisibility();

    }

    onMessageReceived(message: any) {
        console.log("Message Recieved from Server :: " + message);
        var sampleArr = this.base64ToArrayBuffer(message.body);
         this.saveByteArray("Sample Report", sampleArr);
         this.toggleProgressbarVisibility();
        //this.appComponent.handleMessage(JSON.stringify(message.body));
    }

     base64ToArrayBuffer(base64: string) {
        var binaryString = window.atob(base64);
        var binaryLen = binaryString.length;
        var bytes = new Uint8Array(binaryLen);
        for (var i = 0; i < binaryLen; i++) {
           var ascii = binaryString.charCodeAt(i);
           bytes[i] = ascii;
        }
        return bytes;
     }
      saveByteArray(reportName: any, byte: BlobPart) {
        var blob = new Blob([byte], {type: "text/csv;charset=utf-8;"});
        if(this.download){
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        var fileName = reportName;
        link.download = fileName;
        link.click();}
        else{
            this.readfile(blob);
        }


    };

     readfile(blob: Blob): any {

        let text = [];
    
    
        let reader = new FileReader();
        reader.readAsText(blob);
    
        reader.onload = async () => {
          let csvData = reader.result;
          let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);
          let rows;
    
          let headersRow = this.getHeaderArray(csvRecordsArray);
    
         
            
          this.changeData(this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow));
        };
    
        reader.onerror = function () {
          console.log('error is occured while reading file!');
        };
    
      }
    
      getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headersRow: any) {
        let csvArr = [];
        csvArr.push(headersRow)
    
        for (let i = 1; i < csvRecordsArray.length; i++) {
          let curruntRecord = (<string>csvRecordsArray[i]).split(',');
          if (curruntRecord.length == headersRow.length) {
            let csvRecord: any;
            csvRecord = curruntRecord;
    
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
