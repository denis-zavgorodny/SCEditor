/**
Author: Denis Zavgorodny denis.zavgorodny@gmail.com
17.07.14
Plugin for autoresize textarea
Fix original height calculate method
*/
$.sceditor.plugins.autoheight = function() {
	var base = this;
	var $editorContainer;
	var $wysiwygBody;
	var $wysiwygEditor;

	base.signalReady = function(){
        $editorContainer = $('body').find('.sceditor-container');
		
		$wysiwygEditor = $editorContainer.find('iframe');
		$wysiwygBody = $(this.currentNode()).closest('body');
		$wysiwygBody.css('height', 'auto');
    };

	base.signalKeydownEvent = function() {
		var options = this.opts;
		$wysiwygBody = $(this.currentNode()).closest('body');
		$wysiwygHTML = $(this.currentNode()).closest('html');
		$wysiwygBody.css('height', 'auto');
			//var	currentHeight = $editorContainer.height(),
			var height        = $wysiwygBody.height();
				//padding       = (currentHeight - $wysiwygEditor.height()),
				//maxHeight     = options.resizeMaxHeight || ((options.height) * 2);
			
			options.minHeight = options.minHeight || 26;
			if(height > options.minHeight + 5)
				height += 40;
			if(height > options.minHeight)
				this.height(height);
			else
				this.height(options.minHeight);	

	};
};


