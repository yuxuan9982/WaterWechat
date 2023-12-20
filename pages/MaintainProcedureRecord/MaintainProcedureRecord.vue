<template>
	<view>
		<u-tabs :list="tabsList" @click="tabsClick"></u-tabs>
		<view style="height: 600px" v-show="tabsIndex===0">
			<zb-table ref="tableSelf" :fit="true"  :stripe="true" :columns="column1" :data="dataSelf" @trans="trans" @maintain="maintain" @complete="complete" @open="open" v-show="tabsIndex===0"
			:isShowLoadMore="true" @pullUpLoading="pullUpLoadingAction">
			</zb-table>
		</view>
		
		<!-- <my-table ref="tableAll" :columns="mycolumn1" :dataList="dataSelf" :bindclicklistitem="handleClickAction"></my-table> -->
		
		<view style="height: 600px" v-show="tabsIndex===1">
		<zb-table ref="tableAll" :fit="true" :border="true" :stripe="true" :columns="column2" :data="dataAll" @showDetail="showDetail" @open="open"  v-show="tabsIndex===1"
		:isShowLoadMore="true" @pullUpLoading="pullUpLoadingAction2"></zb-table>
		</view>
		
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
		<u-modal :show="showOpen" title="" @confirm="confirmOpen">
			<uni-forms ref="form" :modelValue="MaintainTask" label-width="100px">
				<uni-forms-item label="维护任务">
					<uni-easyinput disabled  v-model="MaintainTask.taskName" ></uni-easyinput>
				</uni-forms-item>	
				<uni-forms-item label="维护人员">
					<uni-easyinput disabled  v-model="MaintainTask.maintenancePersonnel" ></uni-easyinput>
				</uni-forms-item>	
				<uni-forms-item label="维护类型">
					<uni-easyinput disabled  v-model="MaintainTask.maintainType" ></uni-easyinput>
				</uni-forms-item>
				<uni-forms-item label="领取时间">
					<uni-easyinput disabled  v-model="MaintainTask.pickupTime" ></uni-easyinput>
				</uni-forms-item>
				<uni-forms-item label="截止时间" >
					<uni-easyinput disabled  v-model="MaintainTask.endTime" ></uni-easyinput>
				</uni-forms-item>	
				<uni-forms-item label="当前进度" >
					<uni-easyinput disabled  v-model="MaintainTask.currentProgress" ></uni-easyinput>
				</uni-forms-item>	
				<uni-forms-item label="维护概述" >
					<uni-easyinput disabled  v-model="MaintainTask.maintainOverview" ></uni-easyinput>
				</uni-forms-item>	
				<!-- <uni-forms-item label="维护项目列表" ></uni-forms-item> -->
				<!-- <uni-table  border stripe >
					<uni-tr>
						<uni-th width="300rpx" align="center">维护项目</uni-th>
						<uni-th width="300rpx" align="center">维护项目内容</uni-th>
					</uni-tr>
					<uni-tr v-for="(item, index) in maintainListData" :key="index">
						<uni-td align="center">{{ item.name }}</uni-td>
						<uni-td align="center">{{ item.content }}</uni-td>
					</uni-tr>
				</uni-table>
				 -->
			</uni-forms>
		</u-modal>
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
				showOpen: false,
				num1: 0,
				MaintainTask:{
					taskName: "维护任务1",
					maintenancePersonnel: "工程师A",
					maintainType: "线上",
					pickupTime: "2023-10-01",
					endTime: "2023-11-01",
					currentProgress: "任务待被领取",
					maintainOverview:"设备常规检查",
					comment:"按要求完成",
				},
				column1:[
					{ name: 'taskName', label: '维护任务',width:100, fixed:true},
					// { name: 'maintainType', label: '维护类型',width:80},
					// { name: 'pickupTime', label: '领取时间',width:100},
					// { name: 'endTime', label: '截止时间',width:100},
					// { name: 'currentProgress', label: '截止时间',width:150},
					// { name: 'maintainOverview', label: '维护概述',width:150},
					{ name: 'operation', type:'operation',label: '操作',width:220,renders:[
						  {
							name:'转交',
							type:"primary",
							func:'trans' ,// func 代表子元素点击的事件 父元素接收的事件 父元素 @edit
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
						  },{
							name:'展开',
							type:'custom', // type 为custom的时候自定义按钮
							class: 'custom',
							func:'open',
						  },
					]},
				],mycolumn1:[
					{ key: 'taskName', title: '维护任务'},
					{ key: 'maintainType', title: '维护类型'},
					{ key: 'maintainOverview', title: '维护概述'},
					// {
					//     title: "操作",
					//     key: "action",
					//     type: "action"
					// }
				],
				column2:[
					{ name: 'taskName', label: '维护任务',width:80, fixed:true},
					{ name: 'maintenancePersonnel', label: '维护人员',width:80, fixed:true},
					// { name: 'maintainType', label: '维护类型',width:80},
					// { name: 'pickupTime', label: '领取时间',width:100},
					// { name: 'endTime', label: '截止时间',width:100},
					// { name: 'currentProgress', label: '截止时间',width:150},
					// { name: 'maintainOverview', label: '维护概述',width:150},
					{ name: 'operation', type:'operation',label: '操作',width:200,renders:[
						  {
							name:'查看维护信息',
							type:"primary",
							func:'showDetail' // func 代表子元素点击的事件 父元素接收的事件 父元素 @edit
						  },{
							name:'展开',
							type:'custom', // type 为custom的时候自定义按钮
							class: 'custom',
							func:'open',
						  },
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
				showLoadMore: false,
				loadMoreText: '上拉加载更多',
			}
		},onLoad() {
			this.dataSelf=RecordData.slice(0,15);
			this.dataAll=RecordData.slice(0,15);
		},methods: {
			tabsClick(item){
				this.tabsIndex=item.index;
				console.log(this.tabsIndex);
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
			},open(ite,index){
				uni.showToast({
				  icon:'none',
				  duration:500,
				  title:'展开'
				})
				console.log(ite,index);
				this.MaintainTask.comment=ite.comment;
				this.MaintainTask.currentProgress=ite.currentProgress;
				this.MaintainTask.endTime=ite.endTime;
				this.MaintainTask.maintainOverview=ite.maintainOverview;
				this.MaintainTask.maintainType=ite.maintainType;
				this.MaintainTask.maintenancePersonnel=ite.maintenancePersonnel;
				this.MaintainTask.pickupTime=ite.pickupTime;
				this.MaintainTask.taskName=ite.taskName;
				this.MaintainTask.maintenancePersonnel=ite.maintenancePersonnel;
				this.showOpen=true;
				// 切换展开状态
			},confirmOpen(){
				this.showOpen=false;
			},handleClickAction(e){
				this.showOpen=true;
			},
			pullUpLoadingAction(done){
				if(this.dataSelf.length==RecordData.length){
				  return
				}
				setTimeout(()=>{
				  this.dataSelf.push(RecordData[this.dataSelf.length]);
				  if(this.dataSelf.length==RecordData.length){
					this.$refs.tableSelf.pullUpCompleteLoading('ok')
				  }else {
				    this.$refs.tableSelf.pullUpCompleteLoading()
				  }
				},1000)
			},
			pullUpLoadingAction2(done){
				if(this.dataAll.length==RecordData.length){
				  return
				}
				setTimeout(()=>{
				  this.dataAll.push(RecordData[this.dataAll.length]);
				  if(this.dataAll.length==RecordData.length){
					this.$refs.tableAll.pullUpCompleteLoading('ok')
				  }else {
				    this.$refs.tableAll.pullUpCompleteLoading()
				  }
				},1000)
			}
			
			
		}
	}
</script>

<style>
.custom{
	margin-left: 20px;
}
</style>
