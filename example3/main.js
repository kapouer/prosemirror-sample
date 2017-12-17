var EditorState = require("prosemirror-state").EditorState
var EditorView = require("prosemirror-view").EditorView
var Schema = require("prosemirror-model").Schema

var specs = {
	text: {},
	paragraph: {
		content: "text*",
		parseDOM: [{tag: 'p'}],
		toDOM: function(node) {
			return ["p", 0]
		}
	},
	testview: {
		content: 'paragraph+',
		parseDOM: [{tag: 'div.view'}],
		toDOM: function(node) {
			return ["div", {'class': 'view'}, ["div", {'class': 'text'}, 0]]
		}
	},
	doc: {
		content: 'testview*'
	}
}

var views = {
	testview: function(node, view, getPos, decorations) {
		var dom = document.createElement('div')
		dom.className = 'view'
		var contentDOM = document.createElement('div')
		contentDOM.className = 'text'
		dom.innerHTML = '<div>€</div>'
		dom.appendChild(contentDOM)
		return {
			dom: dom,
			contentDOM: contentDOM,
			update: function(node, decorations) { return true },
			ignoreMutation: function(record) { return false }
		}
	}
}

document.addEventListener('DOMContentLoaded', function() {
	new EditorView(document.body, {
		state: EditorState.create({
			schema: new Schema({nodes: specs})
		}),
		nodeViews: views
	})
})

