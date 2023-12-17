<template>
	<view>
		<u-tabs :list="tabsList" @click="tabsClick"></u-tabs>
		<zb-table ref="tableSelf" :border="true" :stripe="true" :columns="column1" :data="dataSelf" @trans="trans" @maintain="maintain" @complete="complete" v-show="tabsIndex===0"></zb-table>
		<view class="uni-pagination-box"><uni-pagination show-icon :page-size="pageSize" :current="pageCurrent" :total="total" @change="change" v-show="tabsIndex===0"/></view>
		
		<zb-table ref="tableAll" :border="true" :stripe="true" :columns="column2" :data="dataAll" @showDetail="showDetail" v-show="tabsIndex===1"></zb-table>
		<view class="uni-pagination-box"><uni-pagination show-icon :page-size="pageSize2" :current="pageCurrent2" :total="total2" @change="change2" v-show="tabsIndex===1"/></view>
	</view>
</template>

<script>
	import RecordData from "./RecordData.js"
	export default {
		data() {
			return {
				tabsList:[{name:"相关任务"},{name:"所有任务"}],
				tabsIndex: 0,
				column1:[
					{ name: 'taskInfo', label: '维护任务',width:100, fixed:true},
					{ name: 'maintainType', label: '维护类型',width:80},
					{ name: 'pickupTime', label: '领取时间',width:100},
					{ name: 'endTime', label: '截止时间',width:100},
					{ name: 'currentProgress', label: '截止时间',width:150},
					{ name: 'maintainOverview', label: '维护概述',width:150},
					{ name: 'operation', type:'operation',label: '操作',width:220,renders:[
						  {
							name:'转交',
							type:"primary",
							func:'trans' // func 代表子元素点击的事件 父元素接收的事件 父元素 @edit
						  },
						  {
							name:'维护',
							type:'primary', // type 为custom的时候自定义按钮
							func:'maintain',
						  }, 
						  {
							name:'完成',
							type:'primary', // type 为custom的时候自定义按钮
							func:'complete',
						  },
					]},
				],column2:[
					{ name: 'taskInfo', label: '维护任务',width:100, fixed:true},
					{ name: 'maintenancePersonnel', label: '维护人员',width:100, fixed:true},
					{ name: 'maintainType', label: '维护类型',width:80},
					{ name: 'pickupTime', label: '领取时间',width:100},
					{ name: 'endTime', label: '截止时间',width:100},
					{ name: 'currentProgress', label: '截止时间',width:150},
					{ name: 'maintainOverview', label: '维护概述',width:150},
					{ name: 'operation', type:'operation',label: '操作',width:200,renders:[
						  {
							name:'查看维护信息',
							type:"primary",
							func:'showDetail' // func 代表子元素点击的事件 父元素接收的事件 父元素 @edit
						  }
					]},
				],
				dataSelf:[],
				dataAll:[],
				pageSize: 9,
				// 当前页
				pageCurrent: 1,
				// 数据总量
				total: 0,
				pageSize2: 9,
				// 当前页
				pageCurrent2: 1,
				// 数据总量
				total2: 0,
			}
		},onLoad() {
			this.getData(1);
			this.getData2(1);
		},
		methods: {
			tabsClick(item){
				this.tabsIndex=item.index;
				console.log(this.tabsIndex);
			},
			// 分页触发
			change(e) {
				this.$refs.tableSelf.clearSelection()
				this.getData(e.current)
			},
			// 搜索
			search() {
				this.getData(1, this.searchVal)
			},// 获取数据
			getData(pageCurrent, value = '') {
				this.pageCurrent = pageCurrent
				this.request({
					pageSize: this.pageSize,
					pageCurrent: pageCurrent,
					value: value,
					success: res => {
						// console.log('data', res);
						this.dataSelf = res.data
						this.total = res.total
					}
				})
			},
			//伪request请求
			request(options) {
				const { pageSize, pageCurrent, success, value } = options
				let total = RecordData.length
				let data = RecordData.filter((item, index) => {
					const idx = index - (pageCurrent - 1) * pageSize
					return idx < pageSize && idx >= 0
				})
				if (value) {
					data = []
					RecordData.forEach(item => {
						if (item.name.indexOf(value) !== -1) {
							data.push(item)
						}
					})
					total = data.length
				}
	
				setTimeout(() => {
					typeof success === 'function' &&
						success({
							data: data,
							total: total
						})
						}, 500)
			},
			// 分页触发
			change2(e) {
				this.$refs.tableAll.clearSelection()
				this.getData2(e.current)
			},
			// 搜索
			search2() {
				this.getData2(1, this.searchVal)
			},// 获取数据
			getData2(pageCurrent, value = '') {
				this.pageCurrent2 = pageCurrent
				this.request({
					pageSize: this.pageSize2,
					pageCurrent: pageCurrent,
					value: value,
					success: res => {
						// console.log('data', res);
						this.dataAll = res.data
						this.total2 = res.total
					}
				})
			},
			showDetail(ite,index){
				uni.showToast({
				  icon:'none',
				  duration:3000,
				  title:'查看维护信息'
				})
				console.log(ite,index);
			},trans(ite,index){
				uni.showToast({
				  icon:'none',
				  duration:3000,
				  title:'转交'
				})
				console.log(ite,index);
			},maintain(ite,index){
				uni.showToast({
				  icon:'none',
				  duration:3000,
				  title:'维护'
				})
				console.log(ite,index);
			},complete(ite,index){
				uni.showToast({
				  icon:'none',
				  duration:3000,
				  title:'完成'
				})
				console.log(ite,index);
			}
			
		}
	}
</script>

<style>

</style>
