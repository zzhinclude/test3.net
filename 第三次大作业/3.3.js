async function get(url) {
  let res = await fetch(url); // 调用fetch()，前面要加await
  let json = await res.json(); // 将res(服务器响应)解析为JSON格式
  return json;
}

let url = "../news.json";
let newsData = []; //存放新闻数据
let news = document.querySelector(".news"); //新闻容器
let pagination = document.querySelector(".pagination"); //分页容器
let asAll = []; //所有分页a链接
let pageCount = 0; //根据数据的长度计算总共几页
let newsDataRender = []; //每页要显示的数据
let p = 1; //根据p值显示每页的数据(p为当前页码，从1开始)

// 渲染新闻函数
function renderNews() {
  news.innerHTML = " ";
  newsDataRender = newsData.slice((p - 1) * 5, 5 * p); //每页要显示的数据,一页显示5条，p为当前页码
  console.log(newsDataRender);

  let tpl = document.getElementById("tpl").innerHTML;
  //【需要完成代码1】：此处实现新闻模板内容的渲染
  let html = newsDataRender.map((da) => {
    let res = tpl
      .replace("{{title}}", da.title)
       .replace("{{content}}", da.content);
     return res;
   }).join("");
   document.querySelector(".news").innerHTML = html;
}

// 渲染分页器函数
function renderPager() {
  for (let i = 1; i <= pageCount; i++) {
    pagination.innerHTML += `<a class="page-item">${i}</a>`;    //模板字符串
  }
  pagination.innerHTML += `<span class="skip">跳转至 <input type="text"> </span>页`;

  asAll = pagination.querySelectorAll("a"); //所有分页链接
  console.log(asAll);
  //页面刚进来时第一页高亮
  asAll[0].classList.add("page-current");

  //遍历所有分页
  asAll.forEach((item, index) => {
    //点击页数
    item.onclick = function () {
      for (let j = 0; j < asAll.length; j++) {
        asAll[j].classList.remove("page-current"); //去除所有选中项
      }
      this.classList.add("page-current");
      p = index + 1; //点击页数，改变p的值，以改变这个页面要显示的数据，达到分页的效果
      renderNews(); //重新渲染页面
    };
  });
}

//改变选中页高亮函数(点击上一页下一页时调用)
function changePageClass(p) {
  for (let j = 0; j < asAll.length; j++) {
    asAll[j].classList.remove("page-current");
  }
  asAll[p - 1].classList.add("page-current");
}


//主函数
async function run() {
  //读取json
  newsData = await get(url);    //调用get
  console.log(newsData);
  pageCount = Math.ceil(newsData.length / 5); //根据数据的长度计算总共几页

  renderNews();   //渲染新闻模板
  renderPager();  //渲染分页器

  //上一页
  let prev = document.querySelector(".prev");
  prev.onclick = function (e) {
    if (p <= 1) {
      return;
    } else {
      p = p - 1;
      changePageClass(p);
      renderNews();
    }
  };

  //下一页
  let next = document.querySelector(".next");
  next.onclick = function () {
    if (p >= asAll.length) {
      return;
    }
    p = p + 1;
    changePageClass(p);
    renderNews();
  };

  //页码跳转
  let skipInput = document.querySelector(".skip input");
  //【需要完成代码2】：此处实现输入页码回车跳转
  skipInput.onkeypress =function(e){
    var event = window.event||e;
    if(event.keyCode==13)
    {
      let num=skipInput.value*1;
      if(num<1||num>asAll.length)
      {
        alert("错误")
        return;
      }
    p=num;
    changePageClass(p);
    renderNews();   
   }
  }

}

//执行
run();
