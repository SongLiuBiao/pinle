<!--
  -    Copyright (c) 2018-2025, songfayuan All rights reserved.
  -
  - Redistribution and use in source and binary forms, with or without
  - modification, are permitted provided that the following conditions are met:
  -
  - Redistributions of source code must retain the above copyright notice,
  - this list of conditions and the following disclaimer.
  - Redistributions in binary form must reproduce the above copyright
  - notice, this list of conditions and the following disclaimer in the
  - documentation and/or other materials provided with the distribution.
  - Neither the name of the 霖梓控股 developer nor the names of its
  - contributors may be used to endorse or promote products derived from
  - this software without specific prior written permission.
  - Author: songfayuan (1414798079@qq.com)
  -->

<template>
  <div class="pull-chheight wel-contailer">
    <div class="banner-text">
      <h2>品乐后台管理系统</h2>
      <span align="center">
       <img src="https://img.shields.io/badge/Avue-1.5.4.RC1-green.svg" alt="Build Status">
        <img src="https://img.shields.io/badge/Spring%20Cloud-EdgwareSR4-orange.svg" alt="Coverage Status">
        <img src="https://img.shields.io/badge/Spring%20Boot-1.5.13-blue.svg" alt="Downloads">
        <img src="https://img.shields.io/npm/v/npm.svg" alt="Version">
        <img src="https://img.shields.io/npm/l/vue.svg" alt="License">
      </span>
      <br/>
      <span>
          <el-collapse v-model="activeNames">
            <el-collapse-item title="企业官网" name="1">
              <a href="http://www.lzkonggu.com/index.html" target="_blank">
                <div>霖梓控股 | 让Business更美好，一点点</div>
              </a>
            </el-collapse-item>
            <el-collapse-item title="丝惜云呼叫中心" name="2">
              <a href="http://47.97.127.95/login?redirect=devices" target="_blank">
                <div>丝惜云呼叫中心 · 呼叫系统</div>
              </a>
            </el-collapse-item>
          </el-collapse>
        </span>
      <span>
        </span><br>
      <span :class="['actor',{typeing:isText}]">{{text}}</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: 'wel',
  data() {
    return {
      activeNames: ['1', '2'],
      DATA: [],
      text: '',
      actor: '',
      count: 0,
      isText: false
    }
  },
  computed: {
    ...mapGetters(['website'])
  },
  created() {
    this.DATA = this.website.wel.list
    this.actor = this.DATA[this.count] || '';
    setTimeout(() => {
      this.isText = true
      this.setData()
    }, 2000)
  },
  methods: {
    getData() {
      if (this.count < this.DATA.length - 1) {
        this.count++
      } else {
        this.count = 0
      }
      this.isText = true
      this.actor = this.DATA[this.count]
    },
    setData() {
      let num = 0
      let count = 0
      let active = false
      let timeoutstart = 5000
      let timeoutend = 1000
      let timespeed = 10
      setInterval(() => {
        if (this.isText) {
          if (count == this.actor.length) {
            active = true
          } else {
            active = false
          }
          if (active) {
            num--
            this.text = this.actor.substr(0, num)
            if (num == 0) {
              this.isText = false
              setTimeout(() => {
                count = 0
                this.getData()
              }, timeoutend)
            }
          } else {
            num++
            this.text = this.actor.substr(0, num)
            if (num == this.actor.length) {
              this.isText = false
              setTimeout(() => {
                this.isText = true
                count = this.actor.length
              }, timeoutstart)
            }
          }
        }
      }, timespeed)
    }
  }
}
</script>

<style scoped="scoped" lang="scss">
.wel-contailer {
  position: relative;
}
.banner-text {
  position: relative;
  padding: 0 20px;
  font-size: 20px;
  text-align: center;
  color: #333;
}
.banner-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.8;
  display: none;
}
.actor {
  height: 250px;
  overflow: hidden;
  font-size: 18px;
  color: #333;
}

.actor:after {
  content: "";
  width: 3px;
  height: 25px;
  vertical-align: -5px;
  margin-left: 5px;
  background-color: #333;
  display: inline-block;
  animation: blink 0.4s infinite alternate;
}

.typeing:after {
  animation: none;
}

@keyframes blink {
  to {
    opacity: 0;
  }
}
</style>
