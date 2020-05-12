<template>
  <div class="contaner">
    <div class="list">
      <el-dropdown @command="handleCommand" :hide-on-click="false">
        <span class="el-dropdown-link">
          歌曲列表
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <div class="musicinfo" style="overflow-y: scroll;">
            <el-dropdown-item v-for="(item,index) in musiclist" :key="index" :command="item">
              <span style=" color: blue; ">{{index+1}}</span>
              <span style=" color: black; ">{{item.name}}</span>
              <span style=" color: red; float:right;  text-align: right;">{{item.artist}}</span>
            </el-dropdown-item>
          </div>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <!-- <div class="search">
 
      <input
        v-model="query"
        @keyup.enter="searchMusic"
        class="input"
        placeholder="搜索歌曲"
        prefix-icon="el-icon-search"
        autocomplete="on"
      />
    </div>-->
    <div class="music-pic" :style="{backgroundImage: 'url('+ pic +')'}"></div>
    <div class="music-contant">
      <div class="name">{{name}}</div>
      <div class="artist">{{artist}}</div>
      <hr />
      <div class="lric">{{artist}}</div>
    </div>
    <audio
      id="music1"
      v-bind:src="musicUrl"
      controls="controls"
      loop="loop"
      ref="audio"
      class="myaudio"
      autoplay="false"
      hidden
    ></audio>
    <div class="music-button">
      <div class="music-button-p">
        <el-button @click="bf" :icon="icon" circle></el-button>
        <el-button @click="rbf" icon="el-icon-refresh" circle></el-button>
      </div>
      <div class="music-play-info">
        <!-- <el-image
          style="width: 50px; height:50px;position:absolute;bottom:0px; margin-left:10px "
          :src="pic"
          fit="cover"
        ></el-image>-->
        <div
          style="width: 75%;background: rgb(100, 255,255); ;position:absolute;bottom:25px; margin-left:50px "
        >
          <el-progress
            :percentage="percentage"
            v-if="percentage"
            :show-text="false"
            color="#8e71c7"
          ></el-progress>
        </div>
      </div>
    </div>
    <div class="music-bgimg" :style="{backgroundImage: 'url('+ pic +')'}"></div>

    <!-- <div class="music-bgimg" :style="{backgroundImage: 'url(static/banner/'+ rand +'.jpg)'}"></div> -->
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "HelloWorld",
  data() {
    return {
      musiclist: [],
      rand: 1,
      pic: "",
      artist: "",
      name: "",
      lric: "",
      musicUrl: "",
      icon: "el-icon-video-play",
      percentage: 0
    };
  },
  methods: {
    handleCommand(command) {
      // console.log(command);
      this.$message({
        message:
          "开始播放歌曲：《" + command.name + "》--演唱者：" + command.artist,
        type: "success",
        center: true
      });
      this.pic = command.cover;
      this.name = command.name;
      this.artist = command.artist;
      this.lric = command.url;
      this.musicUrl = command.url;

      this.rand = (Math.round(Math.random() * 200) % this.musiclist.length) + 1;
      // console.log(this.musicUrl);
    },
    rbf: function() {
      // alert("rbf");
      console.log("rbf");
      var audio = document.getElementById("music1");
      // alert(audio.currentTime);
      audio.currentTime = 0;
    },

    bf: function() {
      var audio = document.getElementById("music1");
      // console.log(audio.duration);
      audio.volume = 0.8;
      if (audio !== null) {
        //检测播放是否已暂停.audio.paused 在播放器播放时返回false.
        // alert(audio.paused);
        if (audio.paused) {
          this.icon = "el-icon-video-play";
          audio.play(); //audio.play();// 这个就是播放
        } else {
          this.icon = "el-icon-video-pause";
          audio.pause(); // 这个就是暂停
        }
      }
    },
    runTime: function() {
      //运行倒计时
      var that = this;
      var timer = setInterval(function() {
        var audio = document.getElementById("music1");
        that.percentage = Math.round(
          (parseInt(audio.currentTime) / parseInt(audio.duration)) * 100
        );
      }, 100);
    }
  },
  created() {
    const that = this;
    const url = "static/music.json";

    //读取数据
    axios.get(url).then(function(resp) {
      that.musiclist = resp.data;
      that.pic = resp.data[0].cover;
      that.artist = resp.data[0].artist;
      that.name = resp.data[0].name;
      that.lric = resp.data[0].url;

      // that.musicUrl = resp.data[0].url;
    });
    that.runTime();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.contaner {
  width: 100%;
  height: 100%;
}
.list {
  /* float: left; */
  /* background: #000; */
  position: absolute;
  margin-left: 4%;
  margin-top: 36px;
  z-index: 1;
  text-align: center;
}
.search {
  /* background: #000; */
  position: absolute;
  margin-left: 15%;
  margin-top: 30px;
  z-index: 1;
  text-align: center;
  /* background: transparent; */
}

input {
  border-radius: 15px;
  padding: 0 0 0 10px;
  height: 35px;

  width: 100px;
  outline: none;
  /* background: transparent; */
  background: rgb(7, 212, 226, 0.5);
  /* border: 1px solid rgb(0, 0, 0); */
  border: unset;
  color: #01070e;
}
input::-webkit-input-placeholder {
  color: #00050a;
  font-size: 15px;
  padding: 10px;
  /* font-weight: bold; */
}
.el-dropdown-link {
  padding: 10px;
  background: rgb(7, 212, 226, 0.5);
  font-size: 15px;

  cursor: pointer;
  color: #00050a;
  border-radius: 20px;
  font-weight: bold;
}
.el-icon-arrow-down {
  font-size: 12px;
}

span {
  font: bold;
  text-overflow: ellipsis !important;
  overflow: hidden !important;
  /* display:inline-block; */
}
.musicinfo {
  /* background: #000; */
  padding: 3px;
  height: 500px;
  font-size: 8px;
  line-height: 15px;
}
.music-bgimg {
  /* background: rgb(226, 226, 228); */
  height: 100%;
  width: 100%;
  background-size: cover;
  background-position: center 50%;
  background-repeat: no-repeat;
  filter: blur(30px);

  /* border:1px solid #CBCBCB; */
  display: block;
}

.music-pic {
  /* float: left; */
  background: rgb(252, 209, 209);
  position: absolute;
  margin-left: 13%;
  height: 300px;
  width: 300px;
  margin-top: 10%;
  z-index: 1;
  border-radius: 150px;
  animation: rotate 15s linear infinite;
}
.music-contant {
  /* background: rgb(252, 209, 209); */
  position: absolute;
  margin-left: 45%;
  height: 500px;
  width: 680px;
  margin-top: 4%;
  z-index: 1;
  /* border-radius: 150px; */
  /* animation: rotate 9s linear infinite; */
}

.name {
  position: relative;
  padding: 10px;
  height: 20px;
  line-height: 20px;
  font-size: 30px;
  text-align: left;
  font-weight: bold;
  /* font-family: ; */
  color: rgb(255, 255, 255);
}
.artist {
  position: relative;
  padding: 10px;
  color: rgb(255, 255, 255);
}
.lric {
  position: relative;
  padding: 10px;
  text-align: center;
}
.music-button {
  background: rgb(212, 212, 212);
  bottom: 0;
  position: absolute;
  width: 50%;
  /* height: 7%; */
  z-index: 1;
  border-radius: 20px;
  margin-left: 25%;
  margin-bottom: 10px;
  /* padding: 0 2% 1px 2%; */
}
.music-button .music-button-p,
.music-button .music-play-info {
  display: table-cell;
}
.music-button-p {
  /* 播放暂停按钮 */
  /* background: #000; */
  /* width: 40%; */
  padding: 10px 0px 10px 10px;
}
.music-music-play-info {
  /* 进度条 */
  /* width: 60%; */
  background: rgb(226, 147, 147);
  padding: 10px 0px 10px 10px;
}
.myaudio {
  width: 100%;
  height: 40px;
  outline: none;
  background-color: #f1f3f4;
}
</style>
