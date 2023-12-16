<template>
	<view class="container">
		<uni-forms ref="form" :modelValue="user">
			<uni-forms-item label="账号" required name="userName">
				<uni-easyinput v-model="user.userName" placeholder="请输入账号"></uni-easyinput>
			</uni-forms-item>
			<uni-forms-item label="密码" required name="password">
				<uni-easyinput v-model="user.password" placeholder="请输入密码"></uni-easyinput>
			</uni-forms-item>
		</uni-forms>
		<button class="button" @click="submit" style="background-color: #2D8CF0;color: white;">登陆</button>
	</view>
</template>
<script>
export default {
	data() {
		return {
			user: {
				userName: "",
				password: "",
		    },
			rules: {
				userName: [
					{ required: true, message: '用户名必填', trigger: 'blur' }
				],
				password: [
					{ required: true, message: '密码必填', trigger: 'blur' },
				]
			}
		}
	},
	onReady() {
		// 需要在onReady中设置规则
		this.$refs.form.setRules(this.rules)
	},
	methods: {
		submit() {
			let self = this;
			self.$ajax
			.postjson("/user/login", {
			  loginName: self.user.userName,
			  password: self.user.password,
			})
			.then((res) => {
			  if (res.success) {
				console.log(res);
				sessionStorage.setItem("token", res.data.token);
				sessionStorage.setItem(
				  "departmentId",
				  res.data.departmentId != null ? res.data.departmentId : -1
				);
				var user = res.data.user;
				user["authorities"] = res.data.authorities;
				console.log(user);
				this.$store.commit("login", user);
				console.log("登录成功·");
			  } else {
				console.log("登录失败，请检查用户名和密码!");
			  }
			});
		}
	}
}
</script>
<style>
	.container {
		padding: 20px;
		font-size: 14px;
		line-height: 24px;
		justify-content: center;
		align-items: center;
	}
</style>
