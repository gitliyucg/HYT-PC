import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Vpconfig} from './vpconfig';
declare var $: any;

@Component({
  selector: 'app-verify-pass',
  templateUrl: './verify-pass.component.html',
  styleUrls: ['./verify-pass.component.scss']
})
export class VerifyPassComponent implements OnInit {
  @Input()
  public vpconfig: Vpconfig = Vpconfig.defaultVpconfig;
  @Output() result: EventEmitter<number> = new EventEmitter();
  constructor(public http: HttpClient) {
  }

  ulclick() {
    $('.passmain input').each(function (i) {
      if ($('.passmain input:eq(' + i + ')').val() == '' || $('.passmain input:eq(' + i + ')').val() == null) {
        $('.passmain input:eq(' + i + ')').focus();
      } else {
        if (i < 5) {
          $('.passmain input:eq(' + i + ')').attr('disabled', 'disabled');
          $('.passmain input:eq(' + (i + 1) + ')').removeAttr('disabled');
          $('.passmain input:eq(' + (i + 1) + ')').focus();
        }
      }
    });
  }

  kdown(e) {
    if (e.key == 'Backspace') {
      const i = $('.passmain input').index(e.target);
      if (i > 0) {
        if ($('.passmain input:eq(' + i + ')').val() == '') {
          $('.passmain input:eq(' + (i - 1) + ')').val('');
          $('.passmain input:eq(' + i + ')').attr('disabled', 'disabled');
          $('.passmain input:eq(' + (i - 1) + ')').removeAttr('disabled');
          $('.passmain input:eq(' + (i - 1) + ')').focus();
        } else {
          $('.passmain input:eq(' + i + ')').val('');
          $('.passmain input:eq(' + i + ')').focus();
        }
      } else {
        $('.passmain input:eq(0)').val('');
        $('.passmain input:eq(1)').attr('disabled', 'disabled');
        $('.passmain input:eq(0)').removeAttr('disabled');
        $('.passmain input:eq(0)').focus();
      }
    }
  }

  ngOnInit() {
  }

  // 密码输入
  set(pass, i) {
    if (Number(pass) >= 0) {
      if (i < 5) {
        $('.passmain input:eq(' + i + ')').attr('disabled', 'disabled');
      }
      $('.passmain input:eq(' + (i + 1) + ')').removeAttr('disabled');
      $('.passmain input:eq(' + (i + 1) + ')').focus();
    } else {
      $('.passmain input:eq(' + i + ')').val('');
    }
  }

  passClose() {
    this.vpconfig.show = false;
  }

  validPass(e) {
    const password = $('.passmain input:eq(0)').val() + $('.passmain input:eq(1)').val() + $('.passmain input:eq(2)').val() + $('.passmain input:eq(3)').val() + $('.passmain input:eq(4)').val() + $('.passmain input:eq(5)').val();
    if (password.length != 6) {
      alert('请输入全部密码');
      return false;
    }

    if (password == '111111') {
      alert('为了您的交易安全，请修改初始二级密码');
      return false;
    }
    this.http.get(sessionStorage['http'] + '/action/login/VerifyPass?second=' + password).subscribe(data => {
      this.vpconfig.show = false;
      this.result.emit(0);
      return true;
    }, error2 => {
      alert(error2.error.Message);
      return false;
    });
  }

}
