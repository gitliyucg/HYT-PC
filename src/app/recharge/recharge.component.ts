import {Component, OnInit, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Pagination} from '../widgets/pagination/pageconfig';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FileItem, FileUploader, ParsedResponseHeaders} from 'ng2-file-upload';

@Component({
  selector: 'app-recharge',
  templateUrl: './recharge.component.html',
  styleUrls: ['./recharge.component.scss']
})
export class RechargeComponent implements OnInit {
  model: Array<any> = [];
  // 传出分页总数
  @Output()
  public pagination: Pagination = Pagination.defaultPagination;
  formModel: FormGroup;
  uploader: FileUploader = new FileUploader({url: sessionStorage['http'] + '/action/FileLoad/cz', headers: [
    {name: 'Authorization', value:  'bearer ' + localStorage['token']}
  ]});
  imgErr: Boolean = false;
  btnOn: Boolean = true;
  show = false;
  bizhi = '0';
  mins = 0;
  maxs = 0;
  constructor(public fb: FormBuilder, public http: HttpClient, public router: Router) {
    this.formModel = fb.group({
      UID: [localStorage['ID']],
      UserName: [localStorage['un']],
      Moneys: ['', [Validators.required, Validators.min(this.mins), Validators.max(this.maxs)]],
      Pic: [''],
      State: ['正在处理中']
    });
    http.get(sessionStorage['http'] + '/action/Deposits/GetParams').subscribe(data => {
      this.bizhi = data['bi'];
      this.mins = data['mins'];
      this.maxs = data['maxs'];
      this.formModel.get('Moneys').setValidators([Validators.required, Validators.min(this.mins), Validators.max(this.maxs)]);
    });
  }

  public ngOnInit(): void {
    this.uploader.onBeforeUploadItem = (item) => {
      item.withCredentials = false;
    };
    this.uploader.onSuccessItem = (item, response, status, headers) => this.onSuccessItem(item, response, status, headers);
    this.pagination.currentPage = 1;
    this.initList();
    this.pagination.changePage = (() => {
      this.initList();
    });
  }

  onSuccessItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
    const res = response.replace(/\"/g, '');
    this.formModel.get('Pic').setValue(res);
    if (res == '' || res == 'null' || res == 'undefined') { // 上传错误
      this.imgErr = true;
      this.show = false;
    } else {
      this.imgErr = false;
      this.haha();
    }
  }

  private initList(): void {
    const page = this.pagination.currentPage;
    const url = sessionStorage['http'] + '/action/Deposits/GetList?u=' + localStorage['un'] + '&num=' + page;

    this.http.get(url)
      .subscribe(v => {
        this.model = JSON.parse(v['data']);
        this.pagination.totalItems = v['total'];
      });
  }

  GetTimes(time) {
    try {
      if (time != null) {
        return time.split('T')[0];
      }
    } catch (e) {
      return time;
    }
  }

  imgValid(img) {
    const arr = img.split('.');
    const exname = arr[arr.length - 1].toLowerCase();
    const imgList = { jpg: 0, jpeg: 0, bmp: 0, png: 0, gif: 0};
    return imgList[exname];
  }

  file(e) {
    this.formModel.get('Pic').setValue('');
    if (e.target.value == '' && this.uploader.queue.length >= 1) {
      this.uploader.removeFromQueue(this.uploader.queue[0]);
    }

    if (this.uploader.queue.length > 1) {
      this.uploader.removeFromQueue(this.uploader.queue[0]);
    }
    if (this.imgValid(e.target.value) == undefined) {
      this.btnOn = true;
      this.imgErr = true;
    } else {
      this.btnOn = false;
      this.imgErr = false;
    }
  }

  onSubmit(e) {
    if (this.formModel.get('Pic').value.length > 9) {
      this.haha();
    } else {
      // 判断是否选择了上传图片
      if (this.uploader.queue.length == 0) {
        alert('请上传图片');
        return false;
      } else if (this.formModel.value.Pic.length < 10) {
        this.show = true;
        this.uploader.queue[this.uploader.queue.length - 1].upload();
      }
    }
  }

  haha() {
    if (this.formModel.value.Pic.indexOf('Deposits') > 0) {
      this.show = true;
      this.btnOn = true;
      this.http.post(sessionStorage['http'] + '/action/Deposits/cz', this.formModel.value).subscribe(data => {
        this.show = false;
        alert('充值成功');
        this.router.navigate(['/']);
      }, error2 => {
        this.show = false;
        alert(error2.error.Message);
        this.btnOn = false;
      });
    } else {
      alert('汇款小票错误');
      this.show = false;
    }
  }

  getImg(img) {
    return sessionStorage['http'] + img;
  }

}
