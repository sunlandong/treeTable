export default {
  methods: {
    _emit () {
      // 直接调用listeners，底层组件不需要vueTool记录events
      // 快速将arguments复制成一个新的真正数组[].slice.call(arguments, 0)
      const args = [].slice.call(arguments, 0)
      const filterEvent = []
      const eventName = args[0]
      if (args.length && this.$listeners[eventName]) {
        if (filterEvent.includes(eventName)) {
          this.$emit(eventName, ...args.slice(1))
        } else {
          this.$listeners[eventName](...args.slice(1))
        }
      }
    }
  }
}
