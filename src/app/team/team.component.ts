import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'ztree';
declare var $: any;

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
  setting = {
    data: {
      simpleData: {
        enable: true,
        idKey: 'id',
        pIdKey: 'pId',
        rootpId: ''
      }
    },
    // async: {
    //   enable: true,
    //   type: 'get',
    //   dataType: 'text',
    //   // contentType: 'application/json',
    //   //url: sessionStorage['http'] + '/action/Users/GetMember',
    //   autoParam: ['id'],
    // },
    view: {
      showIcon: false,
    }
  };
  zNodes;

  constructor(public http: HttpClient) {

  }

  ngOnInit() {
    this.databind();
  }

  databind() {
    this.http.get(sessionStorage['http'] + '/action/Users/GetMember?id=' + localStorage['un']).subscribe(data => {
      this.zNodes = data;
      $.fn.zTree.init($('#treeid'), this.setting, this.zNodes);
    });
  }
}

