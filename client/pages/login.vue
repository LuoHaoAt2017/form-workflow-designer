<template>
  <div class="login">
    <a-form
      autocomplete="off"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 20 }"
    >
      <a-form-item label="用户名">
        <a-input type="text" name="username" v-model="username" />
      </a-form-item>
      <a-form-item label="密码">
        <a-input type="password" name="password" v-model="password" />
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 20, offset: 4 }">
        <a-button-group style="width: 100%">
          <a-button type="primary" style="width: 50%" @click="login">
            登录
          </a-button>
          <a-button type="danger" style="width: 50%" @click="goto">
            前往注册
          </a-button>
        </a-button-group>
        <a-divider />
        <a-row type="flex" justify="center" :gutter="32">
          <a-col>
            <a-icon
              type="github"
              style="font-size: 32px; cursor: pointer"
              @click="github"
            />
          </a-col>
          <a-col>
            <a-icon
              type="dingding"
              style="font-size: 32px; cursor: pointer"
              @click="dingding"
            />
          </a-col>
        </a-row>
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
import { Login, AuthGithub, AuthDing } from "../apis";
import { SetUserInfo } from "@/store/types";
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      Login({
        username: this.username,
        password: this.password,
      })
        .then((resp) => {
          if (resp.successful) {
            this.$store.commit(SetUserInfo, resp.data);
            this.$router.push({
              name: "Home"
            });
          }
        })
        .catch((err) => {
          this.$message.error(err.errorMesg);
        });
    },
    goto() {
      this.$router.push({
        name: "Register",
      });
    },
    github() {
      AuthGithub()
        .then(function () {})
        .catch(function () {});
    },
    dingding() {
      AuthDing()
        .then(function () {})
        .catch(function () {});
    },
  },
};
</script>
<style lang="less" scoped>
form {
  width: 80%;
  border: thin solid #eee;
  border-radius: 4px;
  .form-group {
    display: flex;
    label {
      width: 150px;
    }
  }
}
.login {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
</style>