<template>
  <div class="register">
    <a-form
      autocomplete="off"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 18 }"
    >
      <a-form-item label="用户名">
        <a-input type="text" name="username" v-model="username" />
      </a-form-item>
      <a-form-item label="密码">
        <a-input type="password" name="password" v-model="password" />
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 20, offset: 4 }">
        <a-button-group style="width: 100%">
          <a-button type="danger" style="width: 50%" @click="register">
            注册
          </a-button>
          <a-button type="primary" style="width: 50%" @click="goto">
            前往登录
          </a-button>
        </a-button-group>
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
import { Register } from "../apis";
export default {
  name: "Register",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    register() {
      Register({
        username: this.username,
        password: this.password,
      })
        .then((resp) => {
          if (resp.successful) {
            this.$router.push({
              name: "Login",
            });
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    goto() {
      this.$router.push({
        name: "Login",
      });
    },
  },
};
</script>
<style lang="less" scoped>
form {
  width: 80%;
  margin: 200px auto;
  padding: 50px 100px;
  border: thin solid #eee;
  border-radius: 4px;
  .form-group {
    display: flex;
    label {
      width: 150px;
    }
  }
}
</style>