<template>
  <el-form ref="form" :model="user" :rules="rules" label-width="80px">
    <el-form-item label="旧密码" prop="oldPassword">
      <el-input v-model="user.oldPassword" placeholder="请输入旧密码" type="password" show-password/>
    </el-form-item>
    <el-form-item label="新密码" prop="newPassword">
      <el-input v-model="user.newPassword" placeholder="请输入新密码" type="password" show-password/>
    </el-form-item>
    <el-form-item label="确认密码" prop="confirmPassword">
      <el-input v-model="user.confirmPassword" placeholder="请确认新密码" type="password" show-password/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" size="mini" @click="submit">保存</el-button>
      <el-button type="danger" size="mini" @click="close">关闭</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import {updateUserPwd} from "@/api/system/user";

import {getPublicKey} from '@/api/login';
import {encrypt} from '@/utils/jsencrypt';

export default {
  data() {
    const equalToPassword = (rule, value, callback) => {
      if (this.user.newPassword !== value) {
        callback(new Error("两次输入的密码不一致"));
      } else {
        callback();
      }
    };
    return {
      user: {
        oldPassword: undefined,
        newPassword: undefined,
        confirmPassword: undefined
      },
      // 表单校验
      rules: {
        oldPassword: [
          {required: true, message: "旧密码不能为空", trigger: "blur"}
        ],
        newPassword: [
          {required: true, message: "新密码不能为空", trigger: "blur"},
          {min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur"},
          {pattern: /^[^<>"'|\\]+$/, message: "不能包含非法字符：< > \" ' \\\ |", trigger: "blur"}
        ],
        confirmPassword: [
          {required: true, message: "确认密码不能为空", trigger: "blur"},
          {required: true, validator: equalToPassword, trigger: "blur"}
        ]
      }
    };
  },
  methods: {
    getPublicKey() {
      return new Promise((resolve, reject) => {
        getPublicKey()
          .then(res => {
            resolve(res)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    submit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.getPublicKey().then(res => {
            const oldPassword =this.user.oldPassword
            const newPassword = this.user.newPassword
            updateUserPwd(oldPassword, newPassword).then(
              response => {
                if (response.code === 200) {
                  this.$message.success("修改成功")
                } else {
                  this.$message.error(response.msg)
                }

              }
            );
          })

        }
      });
    },
    close() {
      this.$tab.closePage();
    }
  }
};
</script>

