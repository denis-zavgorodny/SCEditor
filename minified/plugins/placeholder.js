/* SCEditor v1.4.5 | (C) 2011-2013,2014 Sam Clarke, Denis Zavgorodny fork | sceditor.com/license */

!function(a){"use strict";a.sceditor.plugins.placeholder=function(){var a,b,c=this,d="";c.signalReady=function(){a=this,c.activeDialog=!1,b=a.opts,d=a.original.attr("placeholder"),a.val(d)},c.signalFocusEvent=function(){var b=a.val();b===d&&a.val("")},c.signalBlurEvent=function(){var b=a.val();""===b&&a.val(d)}}}(jQuery);
//# sourceMappingURL=placeholder.js.map