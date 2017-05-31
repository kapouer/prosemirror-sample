var EditorState = require("prosemirror-state").EditorState
var EditorView = require("prosemirror-view").EditorView
var Schema = require("prosemirror-model").Schema
var nodes = require("prosemirror-schema-basic").nodes
var marks = require("prosemirror-schema-basic").marks

nodes.list = {
	content: "item*",
	group: "block",
	parseDOM: [{tag: "div", attrs: {'class': 'list'}}],
	toDOM: function(node) {
		return ["div", {'class': 'list'}, 0]
	}
}

nodes.item = {
	isLeaf: true,
	parseDOM: [{tag: "div", attrs: {'class': 'item'}}],
	toDOM: function(node) {
		return ["div", {'class': 'item'}]
	}
}
document.addEventListener('DOMContentLoaded', function() {
	new EditorView(document.body, {
		state: EditorState.create({schema: new Schema({nodes, marks})}),
	})
})

