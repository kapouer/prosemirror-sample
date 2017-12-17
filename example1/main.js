var EditorState = require("prosemirror-state").EditorState
var EditorView = require("prosemirror-view").EditorView
var Schema = require("prosemirror-model").Schema
var nodes = require("prosemirror-schema-basic").nodes
var marks = require("prosemirror-schema-basic").marks

nodes.testlist = {
	content: "testitem*",
	group: "block",
	parseDOM: [{tag: 'div.list'}],
	toDOM: function(node) {
		return ["div", {'class': 'list'}, 0]
	}
}

nodes.testitem = {
	isLeaf: true,
//	view: function(node, view, getPos, decorations) {
//		console.log("view item")
//		var dom = document.createElement('div')
//		dom.className = 'item'
//		dom.textContent = 'X'
//		return {
//			dom: dom,
//			update: function(node, decorations) { return true },
//			ignoreMutation: function(record) { return true }
//		}
//	},
	parseDOM: [{tag: 'div.item'}],
	toDOM: function(node) {
		return ["div", {'class': 'item'}]
	}
}



var nodeViews = {}
Object.keys(nodes).forEach(function(name) {
	var node = nodes[name]
	if (node.view) nodeViews[name] = node.view
})

document.addEventListener('DOMContentLoaded', function() {
	new EditorView(document.body, {
		state: EditorState.create({
			schema: new Schema({nodes, marks})
		}),
		nodeViews: nodeViews
	})
})

