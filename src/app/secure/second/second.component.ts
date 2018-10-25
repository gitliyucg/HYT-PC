import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-second',
  templateUrl: './second.component.html',
  styleUrls: ['./second.component.scss']
})
export class SecondComponent implements OnInit {
  formModel: FormGroup;
  constructor(public fb: FormBuilder, public http: HttpClient, public router: Router, public info: ActivatedRoute) {
    this.formModel = fb.group({
      oldPass: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
      PassWord: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
      Confirm: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
    }, {
      validator: this.MatchPassword
    });
  }

  ngOnInit() {
  }

  onSubmit(e) {
    e.target.disabled = true;
    this.http.put(sessionStorage['http'] + '/action/Users/EditSecond', this.formModel.value).subscribe(data => {
      alert('修改成功');
      this.router.navigate(['/secure']);
    }, error2 => {
      alert(error2.error.Message);
      e.target.disabled = false;
    });
  }

  MatchPassword(AC: AbstractControl) {
    const password = AC.get('PassWord').value; // to get value in input tag
    const confirmPassword = AC.get('Confirm').value; // to get value in input tag
    if (password != confirmPassword) {
      AC.get('Confirm').setErrors( {MatchPassword: true} );
    } else {
      return null;
    }
  }

}
