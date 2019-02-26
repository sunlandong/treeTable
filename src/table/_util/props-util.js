
// 给props初始化默认值
export function initDefaultProps (propTypes, defaultProps) {
	Object.keys(defaultProps).forEach(k => {
		if (propTypes[k]) {
			propTypes[k].def && (propTypes[k] = propTypes[k].def(defaultProps[k]))
		} else {
			throw new Error(`not have ${k} prop`)
		}
	})
	return propTypes
}
