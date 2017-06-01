var EditorState = require("prosemirror-state").EditorState
var EditorView = require("prosemirror-view").EditorView
var Schema = require("prosemirror-model").Schema
var nodes = require("prosemirror-schema-basic").nodes
var marks = require("prosemirror-schema-basic").marks

nodes.list = {
	content: "item*",
	group: "block",
	parseDOM: [{tag: '[block-type="list"]', attrs: {'block-type': 'list'}}],
	toDOM: function(node) {
		return ["div", {'block-type': 'list'}, 0]
	}
}

nodes.item = {
	isLeaf: true,
	parseDOM: [{tag: '[block-type="item"]', attrs: {'block-type': 'item'}}],
	toDOM: function(node) {
		var dom = document.createElement('div')
		dom.textContent = 'X'
		dom.setAttribute('block-type', 'item');
		return dom
	}
}
document.addEventListener('DOMContentLoaded', function() {
	new EditorView(document.body, {
		state: EditorState.create({schema: new Schema({nodes, marks})}),
	})
})

