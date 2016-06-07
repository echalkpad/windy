/*
 * fade slide
 */
;(function(factory){if(typeof define==='function'&&define.amd){define(['jquery'],factory)}else{factory(jQuery)}}(function($,undefined){    

	// DEFAULTS
	var pluginName = 'fadeSlide'
      , defaults = {
		    // 自动播放间隔时间
			interval: 3000
		    // 每次播放callback
		  , onmoveend: function () {}
        }

	// CLASS DEFINITION
    function Plugin (element,options) {
        this.$element = $(element)
        this.options = $.extend( {}, defaults, options)
        this._defaults = defaults
        this._name = pluginName
        this.init()
    }

	// init
    Plugin.prototype.init = function () {
		var _this = this
		
		// elements
		this.$list = this.$element.find('.g-fadeSlide-list')
		this.$items = this.$list.children()

		// auto() timeout
		this.timer = false
		// active index
		this.active = 0
		// is moving
		this.moving = false
		// is pausing
		this.pausing = false
		// set steps
		this.steps = this.$items.length

		// reset
		this.$items.eq(this.active).css({
			'display': 'block'
		  , 'opacity': '1'
		})
		
		// bind events
		this.bindEvents()
		
		// play
		this.auto()
	}
	
	// 绑定事件
    Plugin.prototype.bindEvents = function () {
		var _this = this
		
		this.$element
			.on('mouseenter', function () {
				_this.pause()
			})
			.on('mouseleave', function () {
				_this.pausing = false
				_this.auto()
			})
	}
	
	// 自动播放
    Plugin.prototype.auto = function () {
		var _this = this
		
		// is pausing, return
		if (this.pausing) return
		
		// setTimeout
		this.timer && clearTimeout(this.timer)
		this.timer = setTimeout(function () {
			_this.move(1)
		}, this.options.interval)
	}
	
	// 暂停
    Plugin.prototype.pause = function () {
		this.pausing = true
		this.timer = clearTimeout(this.timer)
	}
	
	// 每次播放结束
    Plugin.prototype.end = function (next) {
		var _this = this
				
		// set new active
		this.active = next
		
		// moving: false
		this.moving = false
		
		// auto()
		this.auto()
	}

	// 播放
    Plugin.prototype.move = function (num) {
		var _this = this
		  , active = this.active
		  , next = this.active += num
		  , position = {}

		// clearTimeout
		this.timer && clearTimeout(this.timer)

		// moving: true
		this.moving = true
		
		// set
		if (next >= this.steps) next = 0
		if (next < 0) next = this.steps - 1
		
		// animate
		this.$items
			.eq(active).animate({
				'opacity' : 0
				}, {
				queue: false
			  , duration: 500
			  , complete: function () {
					$(this).css('display', 'none')
				}
			})
			.end()
			.eq(next).css('display', 'block').animate({
				'opacity' : 1
				}, {
				queue: false
			  , duration: 500
			  , complete: function () {
					// callback	: on move end
					if (typeof _this.options.onmoveend == 'function') _this.options.onmoveend.call(_this, next)		
					// end
					_this.end(next)
				}
			})
	}

    return $.fn[pluginName] = function (options) {
      return this.each(function () {
        if (!$(this).data('plugin_' + pluginName)) {
          return $(this).data('plugin_' + pluginName, new Plugin(this, options))
        }
      })
    }
}));