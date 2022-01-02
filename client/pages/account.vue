<template>
  <div class="account">
  </div>
</template>
<script>
import { Destory } from "../apis";
export default {
  name: "Account",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    destory() {
      Destory({
        username: this.username,
        password: this.password,
      })
        .then((resp) => {
          if (resp.successful) {
            this.$router.push({
              path: "/register",
            });
          }
        })
        .catch((err) => {
          console.error(err);
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