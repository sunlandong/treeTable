<template>
	<div>
		<h1>你好</h1>
		<div>好的</div>
	</div>
</template>
<script>
	import Column from './Column.vue'
	import ColmnGroup from './ColumnGroup.vue'
	import BaseMixin from './_util/BaseMixin'
	function noop() {}

	function stopPropagation(e) {
		e.stopPropagation()
		if (e.nativeEvent && e.nativeEvent.stopImmediatePropagation) {
			e.nativeEvent.stopImmediatePropagation()
		}
	}

	function getRowSelection(props) {
		return props.rowSelection || {}
	}
	const defaultPagination = {
		onChange: noop,
		onShowSizeChange: noop
	}
	const emptyObject = {}
	export default {
		name: 'Table',
		components: {
			Column,
			ColmnGroup
		},
    mixins: [BaseMixin],
    props: {
      prefixCls: {
        type: String
      },
      dropdownPrefixCls: {
        type: String
      },
      pagination
    },
		data() {
			return {
				text: '我的'
			}
		}
	}
</script>
<style lang="less" scoped>

</style>
