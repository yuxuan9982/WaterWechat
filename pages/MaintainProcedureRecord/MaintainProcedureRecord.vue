<template>
	<view>
		<u-tabs :list="tabsList" @click="tabsClick"></u-tabs>
		<zb-table ref="tableSelf" :fit="true" :border="true" :stripe="true" :columns="column1" :data="dataSelf" @trans="trans" @maintain="maintain" @complete="complete" v-show="tabsIndex===0"></zb-table>
		
		<view class="uni-pagination-box"><uni-pagination show-icon :page-size="pageSize" :current="pageCurrent" :total="total" @change="change" v-show="tabsIndex===0"/></view>
		<!-- <my-table></my-table> -->
		<zb-table ref="tableAll" :fit="true" :border="true" :stripe="true" :columns="column2" :data="dataAll" @showDetail="showDetail" v-show="tabsIndex===1"></zb-table>
		<view class="uni-pagination-box"><uni-pagination show-icon :page-size="pageSize2" :current="pageCurrent2" :total="total2" @change="change2" v-show="tabsIndex===1"/></view>
		<u-modal :show="showAllDetail" title="维护项目详情" @confirm="confirmAllDetail">
			<zb-table ref="tableAllDetail" :fit="true" :border="true" :stripe="true" :columns="maintainItemColumns" :data="maintainItemList"  ></zb-table>
		</u-modal>
		<u-modal :show="showTransfer" title="转交维护项目" @confirm="confirmTransfer" @cancel="cancelTransfer" showCancelButton="true">
			<uni-forms ref="form" :modelValue="tranferer" label-width="100px">
				<uni-forms-item label="转交对象" required>
					<uni-easyinput v-model="transferer.name" placeholder="请输入转交对象" ></uni-easyinput>
				</uni-forms-item>
				<uni-forms-item label="转交理由">
					<uni-easyinput type="password" v-model="transferer.reason" placeholder="请输入转交理由"></uni-easyinput>
				</uni-forms-item>
			</uni-forms>
		</u-modal>
		<u-modal :show="showComplete" title="完成维护项目" @confirm="confirmComplete" @cancel="cancelComplete" showCancelButton="true"></u-modal>
	</view>
</template>

<script>
	import RecordData from "./RecordData.js"
	export default {
		data() {
			return {
				tabsList:[{name:"相关任务"},{name:"所有任务"}],
				tabsIndex: 0,
				showAllDetail: false,
				showTransfer: false,
				showComplete: false,
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
				],thcolumn1:[
					{ key: 'taskInfo', title: '维护任务',width:100, fixed:true},
					{ key: 'maintainType', title: '维护类型',width:80},
					{ key: 'pickupTime', title: '领取时间',width:100},
					{ key: 'endTime', title: '截止时间',width:100},
					{ key: 'currentProgress', title: '截止时间',width:150},
					{ key: 'maintainOverview', title: '维护概述',width:150},
					{ key: 'operation', type:'operation',title: '操作',slot:'a'}
				],
				column2:[
					{ name: 'taskInfo', label: '维护任务',width:80, fixed:true},
					{ name: 'maintenancePersonnel', label: '维护人员',width:80, fixed:true},
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
				],maintainItemList:[{
						name: '维护项目1',
						content: '设备清洁',
						maintainData: "维护数据1",
						finishSituation: "完成",
					}, {
						name: '维护项目2',
						content: '设备故障维护',
						maintainData: "维护数据2",
						finishSituation: "完成",
					}, {
						name: '维护项目3',
						content: '维护内容3',
						maintainData: "维护数据3",
						finishSituation: "完成",
					}, {
						name: '维护项目4',
						content: '维护内容4',
						maintainData: "维护数据4",
						finishSituation: "完成",
					}
				],maintainItemColumns:[
					{ name: 'name', label: '维护项目',width:100, fixed:true},
					{ name: 'content', label: '维护项目内容',width:150, fixed:true},
					{ name: 'finishSituation', label: '完成情况',width:100},
				],transferer: {
					name: "",
					reason: "",
				},
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
				  duration:500,
				  title:'查看维护信息'
				})
				console.log(ite,index);
				this.showAllDetail=true;
			},trans(ite,index){
				uni.showToast({
				  icon:'none',
				  duration:500,
				  title:'转交'
				})
				console.log(ite,index);
				this.showTransfer=true;
			},maintain(ite,index){
				uni.showToast({
				  icon:'none',
				  duration:1000,
				  title:'维护'
				})
				console.log(ite,index);
			},complete(ite,index){
				uni.showToast({
				  icon:'none',
				  duration:500,
				  title:'完成'
				})
				console.log(ite,index);
				this.showComplete=true;
			},confirmAllDetail(){
				this.showAllDetail=false;
			},confirmTransfer(){
				this.showTransfer=false;
			},cancelTransfer(){
				this.showTransfer=false;
			},confirmComplete(){
				this.showComplete=false;
			},cancelComplete(){
				this.showComplete=false;
			}
			
		}
	}
</script>

<style>

</style>
