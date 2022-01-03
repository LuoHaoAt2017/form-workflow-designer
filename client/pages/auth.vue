<template>
  <div class="auth-list">
    <a-table
      :columns="columns"
      :data-source="users"
      bordered
      :loading="loading"
    >
      <span slot="customTitle" slot-scope="title">
        {{ title }}
      </span>
      <span slot="customRoles" slot-scope="roleIds, item">
        <a-select
          mode="multiple"
          style="width: 100%"
          :value="roleIds"
          @change="(value) => onChange(item, value)"
        >
          <a-select-option
            v-for="(elem, j) in roles"
            :key="j"
            :value="elem.role_id"
          >
            {{ elem.role_name }}
          </a-select-option>
        </a-select>
      </span>
      <span slot="customUpdated" slot-scope="updated">
        {{ updated.updated_time | formatTime }}
      </span>
    </a-table>
  </div>
</template>
<script>
import moment from "moment";
import { mapState } from "vuex";
import { GetUsersWithRole, UpdateUserRoles, GetRoles } from "@/apis/index";
export default {
  name: "Organization",
  filters: {
    formatTime(value) {
      return moment(value).format("YYYY-MM-DD HH:mm:ss");
    },
  },
  data() {
    return {
      users: [],
      roles: [],
      columns: [
        {
          title: "序号",
          dataIndex: "index",
          key: "index",
        },
        {
          title: "人员名称",
          dataIndex: "name",
          key: "title",
          scopedSlots: { customRender: "customTitle" },
        },
        {
          title: "角色列表",
          dataIndex: "roles",
          key: "roles",
          scopedSlots: { customRender: "customRoles" },
        },
        {
          title: "修改时间",
          dataIndex: "updated_time",
          key: "updated_time",
          scopedSlots: { customRender: "customUpdated" },
        },
      ],
      loading: false
    };
  },
  computed: mapState({
    userInfo: (state) => state.userInfo,
  }),
  mounted() {
    this.getUsers();
    this.getRoles();
  },
  methods: {
    getUsers() {
      this.loading = true;
      GetUsersWithRole()
        .then((resp) => {
          if (resp.successful) {
            this.users = resp.data.map((elem, index) => ({
              index: index,
              key: elem.user_id,
              id: elem.user_id,
              name: elem.user_name,
              updated_time: elem.updatedAt,
              roles: elem.roles.map((x) => x.role_id),
            }));
          }
        })
        .catch((error) => {
          this.$message.error(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    getRoles() {
      GetRoles()
        .then((resp) => {
          if (resp.successful) {
            this.roles = resp.data;
          }
        })
        .catch((error) => {
          this.$message.error(error);
        });
    },
    onChange(user, value) {
      UpdateUserRoles({
        roles: value,
        userId: user.id,
      })
        .then((res) => {
          if (res.successful) {
            user.roles = value;
          }
        })
        .catch((err) => {
          this.$message.error(err);
        });
    },
  },
};
</script>
<style lang="less">
.auth-list {
  height: 100%;
  margin: 0 auto;
}
</style>