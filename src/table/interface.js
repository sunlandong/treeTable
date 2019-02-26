import PropTypes from './_util/vue-types'
export const TableRowSelection = {
  type: RowSelectionType,
  selectedRowKeys: PropTypes.array,
  //onChange (selectedRowKeys: string | number[], selectedRows: Object[]) => any )
  getCheckboxProps: PropTypes.func,
  selections: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  hideDefaultSelections: PropTypes.bool,
  fixed: PropTypes.bool,
  columnWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  // onSelect?: SelectionSelectFn<T>
  // onSelectAll?: (selected: boolean, selectedRows: Object[], changeRows: Object[]) => any
  // onSelectInvert?: (selectedRows: Object[]) => any
  selectWay: PropTypes.oneOf(['onSelect,', 'onSelectMultiple', 'onSelectAll', 'onSelectInvert']),
  columnTitle: PropTypes.any
}
export const TableProps = {
  prefixCls: PropTypes.string,
  dropdownPrefixCls: PropTypes.string,
  rowSelection: PropTypes.oneOfType([PropTypes.shape(TableRowSelection).loose, null]),
  pagination: PropTypes.oneOfType([
    PropTypes.shape([
    ])
  ])
}
