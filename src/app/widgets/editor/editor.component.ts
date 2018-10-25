import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  @Output() froala = new EventEmitter();

  // 赋值
  @Input() public froalaText: string;

  public option: Object;

  constructor() {
    this.froalaText = '';
  }

  ngOnInit() {
    window.onload = function () {
      $('.fr-wrapper').next().remove();
    }
    const that = this;
    // 参数配置
    this.option = {
      language: 'zh_cn', // 配置语言
      toolbarSticky: false, // 禁止工具栏浮动
      heightMin: 300,
      heightMax: 500,
      placeholderText: '请输入内容', // 文本框提示内容
      charCounterCount: true, // 是否开启统计字数
      // charCounterMax: 200, // 最大输入字数,目前只支持英文字母
      // 注意导航条的配置, 按照官方的文档,无法配置,只能使用toolbarButtons来配置了。
      toolbarButtonsSM: ['fullscreen', 'bold', 'italic', 'underline', 'strikeThrough',
        '|', 'fontFamily', 'fontSize', 'color', 'inlineStyle', 'paragraphStyle',
        '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote',
        'insertLink', 'insertImage', 'insertVideo', 'insertFile', 'insertTable',
        '|', 'emoticons', 'specialCharacters', 'insertHR', 'clearFormatting',
        '|', 'undo', 'redo', 'html'
      ],
      requestWithCORS: true, // 开启AJAX跨域请求 CORS
      codeMirror: false, // 高亮显示html代码
      codeMirrorOptions: { // 配置html代码参数
        tabSize: 4
      },
      requestHeaders: {Authorization: 'bearer ' + localStorage['token']},
      // 上传图片，视频等稳健配置
      imageDefaultWidth: 750, // 设置图片默认宽度，0为不设置；仅在文本域里限制，不等于缩放
      imageUploadURL: sessionStorage['http'] + '/manage/FileLoad/editor', // GLOBAL.INCONFIG.getIP()+接口名称,
      imageManagerLoadURL: sessionStorage['http'] + '/manage/FileLoad/editor', // 图片管理地址
      // imageUploadURL:"http://11.177.50.63:9999/emanager/sns/uploadPhoto",//本地路径
      imageUploadParams: {}, // 接口其他传参,默认为空对象{},
      imageUploadMethod: 'post', // POST/GET,
      // 事件, 每次输入,就将值传递给父组件, 或者使用失去焦点的时候传递。
      events: {
        'froalaEditor.blur': function (e, editor) {
          that.froala.emit(editor.html.get());
        }
      }
    };
  }

}
