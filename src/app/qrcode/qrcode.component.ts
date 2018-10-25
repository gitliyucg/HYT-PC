import { Component, OnInit } from '@angular/core';
import { environment} from '../../environments/environment';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.scss']
})
export class QrcodeComponent implements OnInit {
  ElementRef: any;
  value = environment.qrcode + '/' + localStorage['un'];
  constructor() {
  }

  ngOnInit() {
  }

  copy() {
    alert('复制成功');
  }

}
