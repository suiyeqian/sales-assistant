import { Injectable }    from '@angular/core';

@Injectable()
export class WaterMarkService {
  watermarkdivs = [];
  defaultSettings = {
    watermark_txt: "销售助手",
    watermark_x: 0,//水印起始位置x轴坐标
    watermark_y: 10,//水印起始位置Y轴坐标
    watermark_rows: 0,//水印行数
    watermark_cols: 0,//水印列数
    watermark_x_space: 25,//水印x轴间隔
    watermark_y_space: 100,//水印y轴间隔
    watermark_font: '微软雅黑',//水印字体
    watermark_color: '#ccc',//水印字体颜色
    watermark_fontsize: '.32rem',//水印字体大小
    watermark_alpha: 0.12,//水印透明度，要求设置在大于等于0.003
    watermark_width: 200,//水印宽度
    watermark_height: 60,//水印长度
    watermark_angle: 36,//水印倾斜度数
  };

  constructor() {
  }

  load(settings = {}): void {
    // if(settings.length===1 && typeof settings ==="object" ) {
      var src = Object.assign({},settings);
      console.log(src);
      for (let key of Object.keys(src)){
        if(src[key]&&this.defaultSettings[key]&&src[key]===this.defaultSettings[key])
          continue;
        else if (src[key])
          this.defaultSettings[key]=src[key];
      }
    // }

    if (this.watermarkdivs && this.watermarkdivs.length > 0) {
      document.body.removeChild(document.getElementById("otdivid"));
      this.watermarkdivs = [];
    }

    //获取页面最大宽度 & 最大长度
    var page_width = Math.max(document.body.scrollWidth,document.body.clientWidth);
    var page_height = Math.max(document.body.scrollHeight,document.body.clientHeight);

    // 创建文档碎片
    var oTemp = document.createDocumentFragment();
    //创建水印外壳div
    var otdiv = document.getElementById("otdivid");
    if(!otdiv){
      otdiv =document.createElement('div');
      otdiv.id="otdivid";
      otdiv.style.pointerEvents = "none";
      document.body.appendChild(otdiv);
    }


    //如果将水印列数设置为0，或水印列数设置过大，超过页面最大宽度，则重新计算水印列数和水印x轴间隔
    if (this.defaultSettings.watermark_cols == 0 || (this.defaultSettings.watermark_x + this.defaultSettings.watermark_width * this.defaultSettings.watermark_cols + this.defaultSettings.watermark_x_space * (this.defaultSettings.watermark_cols - 1) > page_width)) {
      this.defaultSettings.watermark_cols = Math.round((page_width - this.defaultSettings.watermark_x + this.defaultSettings.watermark_x_space) / (this.defaultSettings.watermark_width + this.defaultSettings.watermark_x_space ));
      this.defaultSettings.watermark_x_space = Math.floor((page_width - this.defaultSettings.watermark_x - this.defaultSettings.watermark_width * this.defaultSettings.watermark_cols) / (this.defaultSettings.watermark_cols - 1));
    }
    //如果将水印行数设置为0，或水印行数设置过大，超过页面最大长度，则重新计算水印行数和水印y轴间隔
    if (this.defaultSettings.watermark_rows == 0 || (this.defaultSettings.watermark_y + this.defaultSettings.watermark_height * this.defaultSettings.watermark_rows + this.defaultSettings.watermark_y_space * (this.defaultSettings.watermark_rows - 1) > page_height)) {

      this.defaultSettings.watermark_rows = Math.round((this.defaultSettings.watermark_y_space + page_height - this.defaultSettings.watermark_y) / (this.defaultSettings.watermark_height + this.defaultSettings.watermark_y_space));
      this.defaultSettings.watermark_y_space = Math.floor(((page_height - this.defaultSettings.watermark_y) - this.defaultSettings.watermark_height * this.defaultSettings.watermark_rows) / (this.defaultSettings.watermark_rows - 1));
    }

    var x;
    var y;

    for (var i = 0; i < this.defaultSettings.watermark_rows; i++) {
      y = this.defaultSettings.watermark_y + (this.defaultSettings.watermark_y_space + this.defaultSettings.watermark_height) * i;
      for (var j = 0; j < this.defaultSettings.watermark_cols; j++) {
        x = this.defaultSettings.watermark_x + (this.defaultSettings.watermark_width + this.defaultSettings.watermark_x_space) * j;

        var mask_div = document.createElement('div');
        var oText=document.createTextNode(this.defaultSettings.watermark_txt);
        mask_div.appendChild(oText);
        // 设置水印相关属性
        mask_div.id = 'mask_div' + i + j;
        //设置水印div倾斜显示
        mask_div.style.webkitTransform = "rotate(-" + this.defaultSettings.watermark_angle + "deg)";
        // mask_div.style.MozTransform = "rotate(-" + this.defaultSettings.watermark_angle + "deg)";
        // mask_div.style.msTransform = "rotate(-" + this.defaultSettings.watermark_angle + "deg)";
        // mask_div.style.OTransform = "rotate(-" + this.defaultSettings.watermark_angle + "deg)";
        mask_div.style.transform = "rotate(-" + this.defaultSettings.watermark_angle + "deg)";
        mask_div.style.visibility = "";
        mask_div.style.position = "absolute";
        //选不中
        mask_div.style.left = x + 'px';
        mask_div.style.top = y + 'px';
        mask_div.style.overflow = "hidden";
        mask_div.style.zIndex = "9999";

        mask_div.style.opacity = this.defaultSettings.watermark_alpha.toString();
        mask_div.style.fontSize = this.defaultSettings.watermark_fontsize;
        mask_div.style.fontFamily = this.defaultSettings.watermark_font;
        mask_div.style.color = this.defaultSettings.watermark_color;
        mask_div.style.textAlign = "center";
        mask_div.style.width = this.defaultSettings.watermark_width + 'px';
        mask_div.style.height = this.defaultSettings.watermark_height + 'px';
        mask_div.style.display = "block";

        //附加到文档碎片中
        otdiv.appendChild(mask_div);
        this.watermarkdivs.push(otdiv); //控制页面大小变化时水印字体
      };
    };
    //一次性添加到document中
    document.body.appendChild(oTemp);
  }
}
