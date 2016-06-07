/*
 * carousel v1.03
 */
;(function(factory){if(typeof define==='function'&&define.amd){define(['jquery'],factory)}else{factory(jQuery)}}(function($,undefined){    

	// DEFAULTS
	var pluginName = 'carousel'
      , defaults = {
			// 默认显示第几项
			start: 0
			// 每次播放数量
		  , display: 1
		    // 播放方向 x or y
		  , axis: 'x'
		    // 是否显示prev next按钮
		  , control: true
		    // 是否显示编号
		  , indicators: true
		    // 是否自动播放
		  , auto: true
		    // 自动播放间隔时间
		  , interval: 3000
		    // 每次播放持续时间
		  , duration: 200
		    // 每次播放callback
		  , onmovestart: null
		  , onmoveend: null
			// destroy
		  , destroy: false
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

		// destroy
		if (this.options.destroy) return this.destroy()

		// elements
		this.$viewport = this.$element.find('.g-carousel-viewport')
		this.$inner = this.$element.find('.g-carousel-inner')
		this.$items = this.$inner.children()
		this.$control = this.$element.find('.g-carousel-control')
		this.$indicators = this.$element.find('.g-carousel-indicators')

		// active index
		this.active = 0
		// auto() timeout
		this.timer = false
		// resize timeout
		this.timerresize = false
		// is moving
		this.moving = false
		// is pausing
		this.pausing = false
		// is cycle
		this.isCycle = this.getViewportSize() <= this.getItemSize() * this.options.display ? true : false
		// set steps
		this.steps = this.isCycle ? Math.max(1, Math.ceil(this.$items.not('.clone').length / this.options.display)) : '-2'

		// prepare
		this.prepare()

		// bind events
		this.bindEvents()
		
		// auto play
		this.options.auto && this.isCycle && this.auto()
	}

	// 获取$item尺寸
	Plugin.prototype.getItemSize = function () {
		return this.options.axis === 'x' ? this.$items.eq(0).width() : this.$items.eq(0).height()
	}
	
	// 获取$inner尺寸
	Plugin.prototype.getInnerSize = function () {
		return this.options.axis === 'x' ? this.$inner.width() : this.$inner.height()
	}
	
	// 获取$viewport尺寸
	Plugin.prototype.getViewportSize = function () {
		return this.options.axis === 'x' ? this.$viewport.outerWidth() : this.$viewport.outerHeight()
	}
	
	// 准备
    Plugin.prototype.prepare = function () {
		var _this = this
		  , remainder  = this.$items.length % this.options.display
		  , i
		  , item_fill
		
		// !cyle, hide prev button
		if (!this.isCycle) {
			this.$control.filter('.g-carousel-prev').addClass('g-carousel-disabled')
		}
		// cyle, clone item
		else {
			// fill item
			if (!!remainder) {
				item_fill = ['<', this.$items[0].tagName, ' class="', this.$items[0].className, ' fill', '"></', this.$items[0].tagName, '>'].join('')
				for (i = 0; i < this.options.display - remainder; i++) {
					this.$inner.append(item_fill)
				}
				this.$items = this.$inner.children()
			}
			
			// clone item
			for (i = 0; i < this.options.display; i++) {
				this.$items.eq(i).clone(true).addClass('clone').appendTo(this.$inner)
				this.$items.eq(-i - 1).clone(true).addClass('clone').prependTo(this.$inner)
			}
			
			// reset this.$items (contain fill item and clone item)
			this.$items = this.$inner.children()
		}
		
		// initialize control
		!this.options.control && this.$control.hide()
		
		// add indicators's items
		if (this.options.indicators && this.$indicators.length && !this.$indicators.children().length) {
			for (var i = 0; i < this.steps; i++) {
				this.$indicators.append('<li><i></i></li>')
			}
		}
		
		// initialize indicators active
		this.options.indicators ? this.$indicators.children().removeClass('active').eq(this.active).addClass('active') : this.$indicators.hide()
	}

	// 更新
    Plugin.prototype.update = function() {
		var  _this = this

		// remove style
		this.$inner.removeAttr('style')
		this.$items.removeAttr('style')
		
		// update size
		if (this.options.axis === 'x') {
			this.$items.css({
				'float': 'left'
			  ,	'width': this.getItemSize()
			})
			this.$inner.css({
				'width': this.getItemSize() * this.$items.length
			})
		} else {
			this.$items.css({
				'height': this.getItemSize()
			})
			this.$inner.css({
				'height': this.getItemSize() * this.$items.length
			})
		}

		// move to start
		this.move(this.options.start, true)
    }

	// 绑定事件
    Plugin.prototype.bindEvents = function () {
		var _this = this
		  , eid = this.$element.attr('id')
		
		// window resize
		$(window).on('resize.carousel.' + eid, function () {
			// clearTimeout
			_this.timerresize && clearTimeout(_this.timerresize)
			// update
			_this.timerresize = setTimeout(function () {
				if (!_this.$element.data('plugin_' + pluginName)) return
				_this.update()
			}, 200)
		}).triggerHandler('resize.carousel.' + eid)

		// viewport
		if ('ontouchend' in document) {	// touch
			if (this.options.axis === 'y') return
			this.$viewport
				.on('touchstart.carousel', function (e) {
					return _this.touchstart(e)
				})
				.on('touchmove.carousel', function (e) {
					return _this.touchmove(e)
				})
				.on('touchend.carousel', function (e) {
					return _this.touchend(e)
				})
		} else {	// mouseenter/mouseleave
			this.$viewport
				.on('mouseenter.carousel', function () {
					_this.pause()
				})
				.on('mouseleave.carousel', function () {
					_this.pausing = false
					_this.options.auto && _this.auto()
				})
		}
		
		// prev/next button
		if (this.options.control && this.$control.length) {
			this.$element
				.on('click.carousel', '.g-carousel-prev a', function (e) {
					e.preventDefault()
					if (_this.moving) return
					_this.move(-1)
				})
				.on('click.carousel', '.g-carousel-next a', function (e) {
					e.preventDefault()
					if (_this.moving) return
					_this.move(1)
				})
		}
		
		// indicators
		if (this.options.indicators && this.$indicators.length) {
			this.$indicators.children().on('click.carousel', function () {
				if (_this.moving) return
				_this.move($(this).index(), true)
			})
		}
	}
	
	// 事件: touch start
    Plugin.prototype.touchstart = function(e) {
		var _this = this
		  , touches = e.originalEvent.touches[0]
		
		this.touchtimer = Number(new Date())
		this.touchstartx = touches.pageX
		this.touchstarty = touches.pageY
		this.innerPosL = this.$inner.position().left
		
		// pause
		this.pause()
		
		return e.stopPropagation()
    }
	
	// 事件: touch move
    Plugin.prototype.touchmove = function(e) {
		var _this = this
		  , touches = e.originalEvent.touches[0]
		
		if (Math.abs(touches.pageY - this.touchstarty) < Math.abs(touches.pageX - this.touchstartx)) {
			e.preventDefault()
			this.$inner.css('left', (this.innerPosL + touches.pageX - this.touchstartx) + 'px')
		}
		
		return e.stopPropagation()
    }
	
	// 事件: touch end
    Plugin.prototype.touchend = function(e) {
		var _this = this
		  , posL = this.$inner.position().left
		  , half = Math.abs(posL - this.innerPosL) > this.getItemSize() * 0.5 || Math.abs(posL - this.innerPosL) > this.getItemSize() * 0.1 && (Number(new Date()) - this.touchtimer < 250)
		
		// swipe right
		if (posL > this.innerPosL) {
			half ? this.move(-1) : this.move(this.active, true)
		}
		// swipe left
		if (posL < this.innerPosL) {
			half ? this.move(1) : this.move(this.active, true)
		}
		
		// restart
		this.pausing = false
		this.options.auto && this.auto()
		
		return e.stopPropagation()
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
		  , axis = this.options.axis === 'x' ? 'left' : 'top'
		
		// set new active
		this.active = next
		
		// moving: false
		this.moving = false
		
		// styles & auto()
		this.options.indicators && this.$indicators.children().removeClass('active').eq(this.active).addClass('active')
		if (this.isCycle) {
			if (this.active === 0) this.$inner.css(axis, -((this.active + 1) * (this.getItemSize() * this.options.display)))
			if (this.active === this.steps - 1) this.$inner.css(axis, -(this.steps * this.getItemSize() * this.options.display))
			this.options.auto && this.auto()
		} else {
			this.$control.removeClass('g-carousel-disabled')
			if (this.$inner.position()[axis] >= 0) this.$control.filter('.g-carousel-prev').addClass('g-carousel-disabled')
			if (this.$inner.position()[axis] <= this.getViewportSize() - this.getInnerSize()) this.$control.filter('.g-carousel-next').addClass('g-carousel-disabled')
		}
	}

	// 播放
    Plugin.prototype.move = function (num, public) {
		var _this = this
		  , next = public ? num : this.active += num
		  , axis = this.options.axis === 'x' ? 'left' : 'top'
		  , position = {}

		// clearTimeout
		this.timer && clearTimeout(this.timer)

		// moving: true
		this.moving = true
		
		// callback: on move start
		if (typeof this.options.onmovestart == 'function') this.options.onmovestart.call(this, this.active)
		
		// set position[left/top] & next
		if (this.isCycle) {
			position[axis] = -((next + 1) * (this.getItemSize() * this.options.display))
			if (next >= this.steps) next = 0
			if (next < 0) next = this.steps - 1
		} else {
			var cr = -(num * (this.getItemSize() * this.options.display)) + this.$inner.position()[axis]
			  , mx = this.getViewportSize() - this.getInnerSize() 
			if (cr <= mx) cr = mx
			if ((num === 0 && public) || cr >= 0) cr = 0
			position[axis] = cr
		}
		
		// animate
		this.$inner.animate(position, {
			queue: false
		  , duration: _this.options.duration
		  , complete: function () {
				// callback	: on move end
				if (typeof _this.options.onmoveend == 'function') _this.options.onmoveend.call(_this, next)			  
			  	// end
				_this.end(next)
			}
		})
	}
	
	// Destroy plugin
    Plugin.prototype.destroy = function () {
		var _this = this.$element.data('plugin_' + pluginName)

		// no data, return
		if (!_this) return

		// stop animate
		_this.$inner.stop(true)
		
		// clearTimeout
		clearTimeout(_this.timer)
		clearTimeout(_this.timerresize)

		// off event
		$(window).off('.carousel.' + _this.$element.attr('id'))
		_this.$viewport.off('.carousel')
		_this.$element.off('.carousel')
		_this.$indicators.children().off('.carousel')
		
		// remove clone & fill items
		_this.$inner.find('.clone').remove()
		_this.$inner.find('.fill').remove()
		
		// remove styles
		_this.$inner.removeAttr('style')
		_this.$items.removeAttr('style')
		
		// remove indicators
		_this.$indicators.html('')
		
		// remove data
		_this.$element.removeData('plugin_' + pluginName)
		
		// clear _this
		_this = null
	}

    return $.fn[pluginName] = function (options) {
		return this.each(function () {
			if (!!options && !!options.destroy) {
				return new Plugin(this, options)
			}
			if (!$(this).data('plugin_' + pluginName)) {
				return $(this).data('plugin_' + pluginName, new Plugin(this, options))
			}
		})
    }
}));