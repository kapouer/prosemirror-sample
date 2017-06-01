var EditorState = require("prosemirror-state").EditorState
var EditorView = require("prosemirror-view").EditorView
var Schema = require("prosemirror-model").Schema
var nodes = require("prosemirror-schema-basic").nodes
var marks = require("prosemirror-schema-basic").marks

nodes.testlist = {
	content: "testitem*",
	group: "block",
	parseDOM: [{tag: '[block-type="list"]'}],
	toDOM: function(node) {
		return ["div", {'block-type': 'list'}, 0]
	}
}

nodes.testitem = {
	isLeaf: true,
	parseDOM: [{tag: '[block-type="item"]'}],
	toDOM: function(node) {
		return ["div", {'block-type': 'item'}]
	}
}
document.addEventListener('DOMContentLoaded', function() {
	new EditorView(document.body, {
		state: EditorState.create({schema: new Schema({nodes, marks})}),
	})
})

