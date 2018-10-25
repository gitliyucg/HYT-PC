import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import { Router} from '@angular/router';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})

export class InfoComponent implements OnInit {
  formModel: FormGroup;
  name;
  idnumber;
  tuijianr;
  data;
  constructor(public fb: FormBuilder, public http: HttpClient, public router: Router) {
    this.formModel = fb.group({
      Bank: ['工商银行', [Validators.required]],
      BankUName: ['', [Validators.required]],
      BankNumber: ['', [Validators.required]],
      BankZhi: ['', [Validators.required]],
    });

    http.get(sessionStorage['http'] + '/action/Secure/getinfo').subscribe(data => {
      this.data = data;
      this.formModel.get('Bank').setValue(data['Bank'] == null ? '工商银行' : data['Bank']);
      this.formModel.get('BankUName').setValue(data['BankUName']);
      this.formModel.get('BankNumber').setValue(data['BankNumber']);
      this.formModel.get('BankZhi').setValue(data['BankZhi']);
      this.name = data['Name'];
      this.idnumber = data['IDNumber'];
      this.tuijianr = data['TuiJianRen'];
    }, error2 => {
      alert(error2.error.Message);
      this.router.navigate(['/']);
    });
  }

  ngOnInit() {
  }

  onSubmit(e) {
    e.target.disabled = true;
    if (this.data['Bank'] == this.formModel.get('Bank').value && this.data['BankUName'] == this.formModel.get('BankUName').value && this.data['BankNumber'] == this.formModel.get('BankNumber').value && this.data['BankZhi'] == this.formModel.get('BankZhi').value) {
      alert('修改成功');
      this.router.navigate(['/secure']);
      return false;
    }
    this.http.put(sessionStorage['http'] + '/action/Secure/EditInfo', this.formModel.value).subscribe(data => {
      alert('修改成功');
      this.router.navigate(['/secure']);
    }, error2 => {
      alert(error2.error.Message);
      e.target.disabled = false;
    });
  }

}
