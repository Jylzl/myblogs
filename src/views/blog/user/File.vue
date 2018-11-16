<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <h3 class="aside-title">归档</h3>
        </div>
        <div class="aside-content">
            <ul class="archive-list">
                <!--归档统计-->
                <li>
                    <a href="#">
                        2018年7月
                        <span class="count float-right">269篇</span>
                    </a>
                </li>
                <!--归档统计-->
                <li>
                    <a href="#">
                        2018年6月
                        <span class="count float-right">2篇</span>
                    </a>
                </li>
                <!--归档统计-->
                <li>
                    <a href="#">
                        2018年5月
                        <span class="count float-right">7篇</span>
                    </a>
                </li>
                <!--归档统计-->
                <li>
                    <a href="#">
                        2018年4月
                        <span class="count float-right">936篇</span>
                    </a>
                </li>
            </ul>
        </div>
    </el-card>
</template>
<style scoped>
.box-card {
  border-radius: 0;
  margin-bottom: 8px;
}
.box-card h3.aside-title {
  font-size: 14px;
  color: #333;
}
.box-card h3.aside-title::before {
  display: inline-block;
  margin-right: 8px;
  content: "";
  width: 4px;
  height: 22px;
  vertical-align: -6px;
  background-color: #ca0c16;
}
.aside-content ul li {
  margin-top: 8px;
}
.aside-content ul li:first-child {
  margin-top: 0;
}
.aside-content ul li a {
  display: block;
  color: #333;
}
.aside-content ul li a span.count {
  font-size: 12px;
  color: #858585;
}
</style>

