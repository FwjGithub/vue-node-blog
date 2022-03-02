<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<style>
html,
body{
    margin: 0;
    font-size: 14px;
}

a{
    color: #3c3c3c;
}
h1,p,ul,li {
    margin: 0;
}
li {
    list-style: none;
}
.el-message {
    z-index: 10000 !important;
}
#app{
    height: 100vh;
}
.mb-20{
    margin-bottom: 20px;
}
</style>
