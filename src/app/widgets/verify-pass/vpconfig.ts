export class Vpconfig {
  /*
  * @param show 开关
  * */
  constructor(public show: Boolean = false) {
  }

  // 初始化方法
  public static defaultVpconfig = new Vpconfig(false);
}
