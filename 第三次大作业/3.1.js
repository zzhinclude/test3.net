function search() {
    let input = document.getElementById("myInput");
    let filter = input.value.toUpperCase();
    let table = document.getElementById("myTable");
    let tr = table.querySelectorAll("tr");
    // 循环表格每一行，查找匹配项
    for (let i = 0; i < tr.length; i++) {
    let td = tr[i].querySelectorAll("td")[0]; //获得第一列（公司名称）
    if (td) {
    if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
    tr[i].style.display = "";
    } else {
    tr[i].style.display = "none";
    } } } }
    let input = document.getElementById("myInput");
    input.addEventListener("input", search);
    function sortTable(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("myTable");
  switching = true;
  // 设置升序排列
  dir = "asc";
  /* 设置一个循环语句 */
  while (switching) {
    // 设置循环结束标记
    switching = false;
    rows = table.rows;
    /* 循环列表，从第二行开始 */
    for (i = 1; i < (rows.length - 1); i++) {
      // 设置元素是否调换位置
      shouldSwitch = false;
      /* 获取要比较的元素,
      one from current row and one from the next: */
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      /* 判断是否将下一个元素与当前元素进行切换 (asc 或 desc):  */
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          // 设置调换元素标记，并结束当前循环
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          // 设置调换元素标记，并结束当前循环
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /* 如果元素调换位置设置为 true，则进行对调操作 */
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      // 每次对调完成时，将 switchcount 增加 1
      switchcount ++;
    } else {
      /* 如果完成所有元素的排序且 direction 设置为 "asc",这时就将 direction 设置为 "desc" 并再次执行循环 */
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}
