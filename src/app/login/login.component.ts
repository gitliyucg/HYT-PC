import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Http} from '@angular/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  public formModel: FormGroup;

  constructor(public router: Router, public fb: FormBuilder, public http: Http) {
    if (localStorage['token'] !== null && localStorage['token'] != undefined) {
      this.router.navigate(['/index']);
    }
    this.formModel = fb.group({
      u: ['', Validators.required],
      p: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  signIn(event) {
    event.target.disabled = true;
    this.http.post(sessionStorage['http'] + '/action/Login/SignIn', this.formModel.value).subscribe(response => {
      localStorage.setItem('token', response.json().token);
      localStorage.setItem('name', response.json().Name);
      localStorage.setItem('ID', response.json().ID);
      localStorage.setItem('un', response.json().UserName);
      localStorage.setItem('lasttime', response.json().LastTime);
      localStorage.setItem('navigation', response.json().Auth);
      this.router.navigate(['/index']);
    }, error2 => {
      event.target.disabled = false;
      alert(error2['_body']);
      return false;
    });
  }

}
