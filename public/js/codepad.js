$(window).load(function(){
	if(!$('#editor-code').length) return;

	var changeEditorType = function(type){
		editor.session.setMode("ace/mode/" + type);
		$("#mode").val(type);
	}
	// initial code editor
	editor = ace.edit("editor-code");
	changeEditorType(padData.type);
	editor.setTheme("ace/theme/chrome");
	editor.setShowPrintMargin(false);

	// change language on code
	$("#mode").on("change", function(){
		var codeMode = $(this).val();
		editor.session.setMode("ace/mode/" + codeMode);
		madpadSocket.emit('modeChanged', {room: padName, codeMode: codeMode});
	})

	// if someone else changed the codemode
	madpadSocket.on('changeMode', function(newCode){
		changeEditorType(newCode);
	});
	
	// share document
	sharejs.open(padName, 'text', function(error, doc) {
		doc.attach_ace(editor);	
		// go to the top line of the codepad editor when text loads
		// otherwise we will end up at the bottom of the content
		setTimeout(function(){editor.gotoLine(1)}, 1);
	});

});