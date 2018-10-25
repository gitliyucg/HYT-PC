import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-tuiguang',
  templateUrl: './tuiguang.component.html',
  styleUrls: ['./tuiguang.component.scss']
})
export class TuiguangComponent implements OnInit {
  formModel: FormGroup;
  constructor(public http: HttpClient, public fb: FormBuilder, public router: Router, public info: ActivatedRoute) {
    this.formModel = fb.group({
      ID: [0],
      UserName: ['', [Validators.required, Validators.pattern('^[A-z][0-9A-z]{3,9}$')]],
      PassWord: ['', [Validators.required, Validators.pattern('^.{6,16}$')]],
      Name: ['', Validators.required],
      Phone: ['', [Validators.required, Validators.pattern('^1[3-9]{1}[0-9]{9}$')]],
      IDNumber: ['', [Validators.required, Validators.pattern('(^[1-9]\\d{5}(18|19|([23]\\d))\\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\\d{3}[0-9Xx]$)|(^[1-9]\\d{5}\\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\\d{2}[0-9Xx]$)')]],
      Bank: ['工商银行'],
      BankUName: [''],
      BankNumber: [''],
      BankZhi: [''],
      TuiJianRen: [info.snapshot.params['tg'], Validators.required],
    });

  }

  ngOnInit() {}

  onSubmit(e) {
    e.target.disabled = true;
    this.http.post(sessionStorage['http'] + '/action/Register', this.formModel.value, {responseType: 'text'}).subscribe(data => {
      alert('注册成功');
      this.router.navigate(['/']);
    }, error2 => {
      alert(JSON.parse(error2.error).Message);
      this.formModel.reset();
    });
  }

}
