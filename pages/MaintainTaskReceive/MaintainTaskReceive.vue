<template>
	<view class="container1">
		<uni-easyinput placeholder="维护任务查询"></uni-easyinput>
		<button style="margin-left: 5px;" size="mini" type="primary">查询</button>
	</view>
	<uni-section title="维护任务表" type="line">
		<view class="uni-container">
			<!-- <uni-table ref="table" :loading="loading" border stripe emptyText="暂无更多数据" >
				<uni-tr>
					<uni-th width="100" align="center">维护任务</uni-th>
					<uni-th width="80" align="center">维护类型</uni-th>
					<uni-th width="150" align="center">设置</uni-th>
				</uni-tr>
				<uni-tr v-for="(item, index) in tableData" :key="index">
					<uni-td align="center">{{ item.taskName }}</uni-td>
					<uni-td align="center">{{ item.maintainType }}</uni-td>
					<uni-td align="center">
						<view class="uni-group" style="display: flex;">
							<button class="uni-button" size="mini" type="primary" @click="clickDetail" >详情</button>
							<button class="uni-button" size="mini" type="primary" style="margin-left: 3px;" @click="clickReceive">认领</button>
						</view>
					</uni-td>
				</uni-tr>
			</uni-table > -->
			<zb-table ref="table" :border="true" :stripe="true" :columns="column1" :data="tableData" @dele="dele" @edit="buttonEdit"></zb-table>
			<view class="uni-pagination-box"><uni-pagination show-icon :page-size="pageSize" :current="pageCurrent" :total="total" @change="change" /></view>
		</view>
	</uni-section>
	<u-modal :show="showDetail" title="维护任务详情" @confirm="confirm1" width="700rpx">
		<view class="uni-container">
		<uni-forms ref="form" :modelValue="MaintainTask" label-width="100px">
			<uni-forms-item label="维护任务" key="customerName">
				<uni-easyinput disabled  v-model="MaintainTask.taskName" ></uni-easyinput>
			</uni-forms-item>	
			<uni-forms-item label="客户">
				<uni-easyinput disabled  v-model="MaintainTask.customerName" ></uni-easyinput>
			</uni-forms-item>
			<uni-forms-item label="维护类型" >
				<uni-data-checkbox v-model="maintainTypes" :localdata="maintainTypesData"></uni-data-checkbox>
			</uni-forms-item>	
			<uni-forms-item label="维护项目列表" ></uni-forms-item>
			<uni-table  border stripe >
				<uni-tr>
					<uni-th width="300rpx" align="center">维护项目</uni-th>
					<uni-th width="300rpx" align="center">维护项目内容</uni-th>
				</uni-tr>
				<uni-tr v-for="(item, index) in maintainListData" :key="index">
					<uni-td align="center">{{ item.name }}</uni-td>
					<uni-td align="center">{{ item.content }}</uni-td>
				</uni-tr>
			</uni-table>
			
		</uni-forms>
		</view>
	</u-modal>
	<u-modal :show="showReceive" title="维护任务领取" @confirm="confirm2" @cancel="cancel2" showCancelButton="true">
		
	</u-modal>
</template>

<script>
	import tableData from './tableData.js'
	export default {
		data() {
			return {
				searchVal: '',
				tableData: [],
				// 每页数据量
				pageSize: 10,
				// 当前页
				pageCurrent: 1,
				// 数据总量
				total: 0,
				loading: false,
				showDetail: false,
				showReceive:false,
				MaintainTask:{
					taskName:"1",
					customerName:"2",
					maintainType:"3"
				},
				maintainTypes:0,
				maintainTypesData:[{"value": 0,"text": "线上","disable":true	},{"value": 1,"text": "线下","disable":true}],
				maintainListData:[
					{
					  name:'维护项目1',
					  content:'设备清洁',
					},{
					  name:'维护项目2',
					  content:'设备故障维护',
					},{
					  name:'维护项目3',
					  content:'维护内容3',
					},{
					  name:'维护项目4',
					  content:'维护内容4',
					},
				],
				column1:[
				    { type:'index', width:60 },
				    { name: 'taskName', label: '维护任务',width:80},
				    { name: 'maintainType', label: '维护类型',},
					{ name: 'operation', type:'operation',label: '操作',renders:[
						  {
							name:'编辑',
							class:'edit',
							type:"primary",
							func:'edit' // func 代表子元素点击的事件 父元素接收的事件 父元素 @edit
						  },
						  {
							name:'删除',
							type:'warn', // type 为custom的时候自定义按钮
							class:"del",
							func:'dele',
						  },
					]},
				],
			}
		},
		onLoad() {
			this.getData(1)
		},
		methods: {
			// 分页触发
			change(e) {
				this.$refs.table.clearSelection()
				this.getData(e.current)
			},
			// 搜索
			search() {
				this.getData(1, this.searchVal)
			},// 获取数据
			getData(pageCurrent, value = '') {
				this.loading = true
				this.pageCurrent = pageCurrent
				this.request({
					pageSize: this.pageSize,
					pageCurrent: pageCurrent,
					value: value,
					success: res => {
						// console.log('data', res);
						this.tableData = res.data
						this.total = res.total
						this.loading = false
					}
				})
			},
			//伪request请求
			request(options) {
				const { pageSize, pageCurrent, success, value } = options
				let total = tableData.length
				let data = tableData.filter((item, index) => {
					const idx = index - (pageCurrent - 1) * pageSize
					return idx < pageSize && idx >= 0
				})
				if (value) {
					data = []
					tableData.forEach(item => {
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
			clickDetail(){
				this.showDetail=true;
			},confirm1(){
				this.showDetail=false;
			},clickReceive(){
				this.showReceive=true;
			},confirm2(){
				this.showReceive=false;
			},cancel2(){
				this.showReceive=false;
			},dele(ite,index){
				uni.showToast({
				  icon:'none',
				  duration:3000,
				  title:'点击删除'
				})
				// alert('点击删除')
				console.log(ite,index)
				this.showReceive=true;
			  },buttonEdit(ite,index){
				uni.showToast({
				  icon:'none',
				  duration:3000,
				  title:'点击编辑'
				})
				console.log(ite,index);
				this.MaintainTask.taskName=ite.taskName;
				this.MaintainTask.maintainType=ite.maintainType;
				this.MaintainTask.customerName=ite.customerName;
				this.showDetail=true;
			}
		}
	}
</script>

<style>
	.container1{
		padding: 20px;
		font-size: 14px; 
		line-height: 16px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
