(function($) {
    'use strict';

    $.sceditor.plugins.placeholder = function() {
        var _this = this;
        var base;
        var placeholderText = '';
        var options;
        _this.signalReady = function(){
            base = this;
            _this.activeDialog = false;
            //var _getRangeHelper = this.getRangeHelper();        
            options = base.opts;
            placeholderText = base.original.attr('placeholder');
            base.val(placeholderText);
        };
        _this.signalFocusEvent = function() {
            var content = base.val();
            if(content === placeholderText)
                base.val('');
        };
        _this.signalBlurEvent = function() {
            var content = base.val();
            if(content === '')
                base.val(placeholderText);
        };
    };
})(jQuery);

