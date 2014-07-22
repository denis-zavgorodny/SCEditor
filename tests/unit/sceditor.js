(function() {
	'use strict';

	// Using BBCode for tests as it normalises the HTML which can be very diffrent in each browser
	module('SCEditor', {
		setup: function() {
			var $textarea = $('#qunit-fixture textarea:first');

			$textarea.sceditor({
				plugins: 'bbcode'
			});

			this.sceditor = $textarea.sceditor('instance');
		},
		teardown: function() {
			this.sceditor.destroy();
			this.sceditor = null;
		}
	});

	test('Insert HTML', function() {
		expect(1);

		this.sceditor.wysiwygEditorInsertHtml('<span>simple <b>test</b></span>');
		equal(
			this.sceditor.val(),
			'simple [b]test[/b]'
		);
	});

	test('Insert HTML two parts', function() {
		expect(1);

		this.sceditor.wysiwygEditorInsertHtml('<span>simple ', '<b>test</b></span>');
		equal(
			this.sceditor.val(),
			'simple [b]test[/b]'
		);
	});

	test('Insert HTML two parts without filter', function() {
		expect(1);

		this.sceditor.insert('<span>simple ', '<b>test</b></span>', false);
		equal(
			this.sceditor.val(),
			'simple [b]test[/b]'
		);
	});

	test('Insert BBCode two parts', function() {
		expect(1);

		this.sceditor.insert('simple ', '[b]test[/b]');
		equal(
			this.sceditor.val(),
			'simple [b]test[/b]'
		);
	});

	test('Insert mixed', function() {
		expect(1);

		this.sceditor.insert('<i>simple</i> [b]test[/b]', null, true, true, true);
		equal(
			this.sceditor.val(),
			'[i]simple[/i] [b]test[/b]'
		);
	});

	test('Insert mixed with escaped HTML', function() {
		expect(1);

		this.sceditor.insert('<i>simple</i>&lt;i&gt;test&lt;/i&gt; [b]test[/b]', null, true, true, true);
		equal(
			this.sceditor.val(),
			// This HTML is in BBCode so it is actually escaped.
			'[i]simple[/i]<i>test</i> [b]test[/b]'
		);
	});

	test('Insert mixed two parts', function() {
		expect(1);

		this.sceditor.insert('<i>simple</i> ', '[b]test[/b]', true, true, true);
		equal(
			this.sceditor.val(),
			'[i]simple[/i] [b]test[/b]'
		);
	});

	test('Val', function() {
		expect(2);

		this.sceditor.val('simple [b]test[/b]');
		equal(
			this.sceditor.val(),
			'simple [b]test[/b]'
		);

		this.sceditor.val('simple <b>test</b>');
		equal(
			this.sceditor.val(),
			'simple <b>test</b>'
		);
	});

	test('Val filter', function() {
		expect(1);

		this.sceditor.val('<span>simple <b>test</b></span>', false);
		equal(
			this.sceditor.val(),
			'simple [b]test[/b]'
		);
	});

	test('Textarea required', function() {
		expect(3);

		this.sceditor.destroy();

		ok(
			!$('#qunit-fixture textarea:first').attr('required'),
			'Required not added'
		);

		var $textarea = $('<textarea required="required" id="#required-test"></textarea>');
		$('#qunit-fixture textarea:first').append($textarea);

		$textarea.sceditor();
		this.sceditor = $textarea.sceditor('instance');
		ok(
			!$textarea.attr('required'),
			'Required removed'
		);

		this.sceditor.destroy();
		ok(
			$textarea.attr('required'),
			'Required preserved'
		);
	});


	module('SCEditor - Commands', {
		setup: function() {
			var $textarea = $('#qunit-fixture textarea:first');

			$textarea.sceditor({
				plugins: 'bbcode'
			});

			this.sceditor = $textarea.sceditor('instance');
		},
		teardown: function() {
			this.sceditor.destroy();
			this.sceditor = null;
		}
	});

	test('Quote', function() {
		expect(1);

		this.sceditor.commands.quote.exec.call(this.sceditor, null, 'Simple <b>test</b>');
		equal(
			this.sceditor.val(),
			'[quote]Simple [b]test[/b][/quote]\n'
		);
	});

	test('Emoticons', function() {
		expect(4);

		this.sceditor.val('[code]test :)[/code]');
		ok(
			this.sceditor.getWysiwygEditorValue(false).indexOf('test :)') > -1,
			'Do not convert emoticons in code blocks'
		);

		this.sceditor.val('[quote]test :)[/quote]');
		ok(
			this.sceditor.getWysiwygEditorValue(false).indexOf('test :)') === -1,
			'Convert emoticons in quotes'
		);

		this.sceditor.val(':);):):):o:)test:)test');
		equal(
			this.sceditor.val(),
			':);):):):o:)test:)test',
			'Order remains the same'
		);

		this.sceditor.val(':);):):):O:)test:)test');
		equal(
			this.sceditor.getWysiwygEditorValue(false).toLowerCase().split('<img ').length,
			8,
			'Multiple emoticons converted'
		);
	});

	test('Emoticons Compat', function() {
		expect(6);

		this.sceditor.destroy();

		var $textarea = $('#qunit-fixture textarea:first');
		$textarea.sceditor({
			plugins: 'bbcode',
			emoticonsCompat: true
		});

		this.sceditor = $textarea.sceditor('instance');


		this.sceditor.val('[code]test :)[/code]');
		ok(
			this.sceditor.getWysiwygEditorValue(false).indexOf('test :)') > -1,
			'Do not convert emoticons in code blocks'
		);

		this.sceditor.val('[quote]test :)[/quote]');
		ok(
			this.sceditor.getWysiwygEditorValue(false).indexOf('test :)') === -1,
			'Convert emoticons in quotes'
		);

		this.sceditor.val(':) ;) :) :):o :) test:)test');
		equal(
			this.sceditor.val(),
			':) ;) :) :):o :) test:)test',
			'Order remains the same'
		);

		this.sceditor.val(':);):):):O :) test:)test');
		equal(
			this.sceditor.getWysiwygEditorValue(false).toLowerCase().split('<img ').length,
			2,
			'Multiple emoticons converted'
		);

		this.sceditor.val(':) ;) :) :):O :) test:)test');
		equal(
			this.sceditor.getWysiwygEditorValue(false).toLowerCase().split('<img ').length,
			5,
			'Multiple emoticons converted'
		);

		this.sceditor.val(':) ;) :) :O:) :) test:)test');
		equal(
			this.sceditor.getWysiwygEditorValue(false).toLowerCase().split('<img ').length,
			5,
			'Multiple emoticons converted'
		);
	});

	test('Newline after blocks', function() {
		expect(4);

		this.sceditor.destroy();

		var $textarea = $('#qunit-fixture textarea:first');
		$textarea.sceditor({
			plugins: 'bbcode',
			emoticonsCompat: true,
			parserOptions: {
				breakAfter: false
			}
		});

		this.sceditor = $textarea.sceditor('instance');


		this.sceditor.val('[code]test :)[/code]');
		ok(
			this.sceditor.getWysiwygEditorValue(false).indexOf('sceditor-nlf'),
			'Add new line after code'
		);

		this.sceditor.val('[quote]test :)[/quote]');
		ok(
			this.sceditor.getWysiwygEditorValue(false).indexOf('sceditor-nlf'),
			'Add new line after quote'
		);

		this.sceditor.val('[quote]test :)[/quote]\n');
		equal(
			this.sceditor.val(),
			'[quote]test :)[/quote]\n',
			'Remove auto inserted new  line after quote'
		);

		this.sceditor.setWysiwygEditorValue('<blockquote>test</blockquote><div class=\"sceditor-nlf\">test</div>');
		equal(
			this.sceditor.val(),
			'[quote]test[/quote]\ntest',
			'Do not remove text inserted into auto added new line'
		);
	});


	module('SCEditor - Escaping');

	test('Regex Escaping', function() {
		expect(2);

		equal(
			$.sceditor.regexEscape('^^ >.< =)'),
			'\\^\\^ >\\.< \\=\\)',
			'Escape possible emoticons'
		);

		equal(
			$.sceditor.regexEscape('- \\ ^ / $ * + ? . ( ) | { } [ ] | ! :'),
			'\\- \\\\ \\^ \\/ \\$ \\* \\+ \\? \\. \\( \\) \\| \\{ \\} \\[ \\] \\| \\! \\:',
			'All special chars'
		);
	});

	test('Escape Entities', function() {
		expect(2);

		equal(
			$.sceditor.escapeEntities('<b> <test="test">'),
			'&lt;b&gt; &lt;test="test"&gt;',
			'Escape HTML'
		);

		equal(
			$.sceditor.escapeEntities('< > & &amp; \' " \r\n \n "     "'),
			'&lt; &gt; &amp; &amp;amp; \' " <br /> <br /> " &nbsp; &nbsp; "',
			'All escaped chars'
		);
	});

	module('SCEditor - Placeholder Plugin', {
		setup: function() {
			var $textarea = $('#qunit-fixture textarea:first');

			$textarea.sceditor({
				plugins: 'bbcode, placeholder'
			});

			this.sceditor = $textarea.sceditor('instance');
		},
		teardown: function() {
			this.sceditor.destroy();
			this.sceditor = null;
		}
	});

	test('Test Denis', function() {
		expect(1);
		console.log(this.sceditor.val());
		equal(
			this.sceditor.val(),
			this.sceditor.original.attr('placeholder'),
			'Placeholdered'
		);

		
	});

})();
