<template>
	<view class="container1">
		<uni-easyinput placeholder="维护任务查询"></uni-easyinput>
		<button style="margin-left: 5px;" size="mini" type="primary">查询</button>
	</view>
	<uni-section title="维护任务表" type="line">
		<view class="uni-container">
			<uni-table ref="table" :loading="loading" border stripe emptyText="暂无更多数据" >
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
							<button class="uni-button" size="mini" type="primary"  >详情</button>
							<button class="uni-button" size="mini" type="primary" style="margin-left: 3px;" >认领</button>
						</view>
					</uni-td>
				</uni-tr>
			</uni-table>
			<view class="uni-pagination-box"><uni-pagination show-icon :page-size="pageSize" :current="pageCurrent" :total="total" @change="change" /></view>
		</view>
	</uni-section>
<!-- 	<u-modal :show="showDetail"></u-modal>
	<u-modal :show="showReceive"></u-modal> -->
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
				showReceive:false
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
