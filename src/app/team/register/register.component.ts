import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  formModel: FormGroup;
  constructor(public http: HttpClient, public fb: FormBuilder, public router: Router) {
    this.formModel = fb.group({
      ID: [0],
      UserName: ['', [Validators.required, Validators.pattern('^[A-z][0-9A-z]{3,9}$')]],
      PassWord: ['', [Validators.required, Validators.pattern('^.{6,16}$')]],
      Name: ['', Validators.required],
      Phone: ['', [Validators.required, Validators.pattern('^1[0-9]{10}$')]],
      IDNumber: ['', [Validators.required, Validators.pattern('(^[1-9]\\d{5}(18|19|([23]\\d))\\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\\d{3}[0-9Xx]$)|(^[1-9]\\d{5}\\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\\d{2}[0-9Xx]$)')]],
      Bank: ['工商银行'],
      BankUName: [''],
      BankNumber: [''],
      BankZhi: [''],
      TuiJianRen: ['', Validators.required],
      State: [0],
      ZhiTuiNum: [0],
      uname: [{value: '', disabled: true}, Validators.required]
    });
    this.formModel.get('TuiJianRen').valueChanges.debounceTime(1000).subscribe(val => {
      this.formModel.get('uname').setValue('');
      this.http.get(sessionStorage['http'] + '/action/Users/GetName?un=' + val, {responseType: 'text'}).subscribe(res => {
        this.formModel.get('uname').setValue(res.replace(/\"/g, ''));
      }, error => {
        this.formModel.get('uname').setValue('');
      });
    });
    this.formModel.get('TuiJianRen').setValue(localStorage['un']);

  }

  ngOnInit() {


  }

  onSubmit(e) {
    e.target.disabled = true;
    this.http.post(sessionStorage['http'] + '/action/users/Register', this.formModel.value, {responseType: 'text'}).subscribe(data => {
      alert('注册成功');
      this.router.navigate(['/team']);
    }, error2 => {
      alert(JSON.parse(error2.error).Message);
      e.target.disabled = false;
    });
  }

}
