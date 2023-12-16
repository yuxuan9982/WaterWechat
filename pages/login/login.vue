<template>
	<view class="container">
		<uni-forms ref="form" :modelValue="user">
			<uni-forms-item label="账号" required name="userName" >
				<uni-easyinput v-model="user.userName" placeholder="请输入账号"></uni-easyinput>
			</uni-forms-item>
			<uni-forms-item label="密码" required name="password">
				<uni-easyinput type="password" v-model="user.password" placeholder="请输入密码"></uni-easyinput>
			</uni-forms-item>
		</uni-forms>
		<uni-data-checkbox multiple v-model="test" :localdata="testList"></uni-data-checkbox>
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
			},
			test:[0],
			testList:[{"value": 0,"text": "测试"	}],
		}
	},
	onReady() {
		// 需要在onReady中设置规则
		this.$refs.form.setRules(this.rules)
	},
	methods: {
		submit() {
			let self = this;
			if(this.test.length>0){
				console.log("test")
				this.$store.commit("login", {});
				uni.switchTab({
					url:'/pages/MaintainTaskReceive/MaintainTaskReceive'
				});
				return ;
			}
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
				// uni.switchTab({
				// 	url:'/pages/MaintainTaskReceive/MaintainTaskReceive'
				// });
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
		justify-content: center;
		align-items: center;
		display: flex;
		flex-direction: column;
		align-items: center; /* 在主轴上居中对齐 */
		justify-content: center; /* 在交叉轴上居中对齐 */
	}
</style>
