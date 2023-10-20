

    function getEndTime(myYear){/*获得myYear值*/
        var myEndTime = new Date(''+myYear+'/06/07 00:00:00');/*定义myEndTime值*/
        return myEndTime;
    }

    function countDown(){
        var mydate = new Date();/*Date对象用于处理日期和时间，Date对象会自动把当前日期和时间保存为其初始值*/
        var year = '2023';/*定义year值为2023*/
        var EndTime = getEndTime(year);/*获得2021年的结束时间*/
        var NowTime = new Date();
        if( (EndTime.getTime() - NowTime.getTime() ) < 0){/*当Nowt ime大于EndTime时执行*/
            year = mydate.getFullYear() + 1;/*getFullYear返回指定日期的年份，year在mydate返 回年份值上+1*/
            EndTime = getEndTime(year);/*EndTime=year值对应年份的结束时间*/
        }
        var t = EndTime.getTime() - NowTime.getTime();/*值为EndT ime与NowTime的差值*/



        var d=Math.floor(t/1000/60/60/24);/*计算天*/
        var h=Math.floor(t/1000/60/60%24);/*计算小时*/
        var m=Math.floor(t/1000/60%60);/*计算分钟*/
        var s=Math.floor(t/1000%60);/*计算秒*/

        document.getElementById('day').innerText = d;
        document.getElementById('hour').innerText = h;
        document.getElementById('minute').innerText = m;
        document.getElementById('second').innerText = s;
        /*将每一个值赋给相应的对象 */
    } 
    setInterval(countDown,1000);/*每秒调用一次countDown函数，用来实时更新*/

