var EditorState = require("prosemirror-state").EditorState
var EditorView = require("prosemirror-view").EditorView
var Schema = require("prosemirror-model").Schema

var specs = {
	text: {},
	testview: {
		content: 'text*',
		parseDOM: [{tag: 'div.view'}],
		toDOM: function(node) {
			return ["div", {'class': 'view'}, ["span", {'class': 'text'}, 0]]
		}
	},
	doc: {
		content: 'testview+'
	}
}

var views = {
	testview: function(node, view, getPos, decorations) {
		var dom = document.createElement('div')
		dom.className = 'view'
		dom.setAttribute('contenteditable', 'false')
		var contentDOM = document.createElement('span')
		contentDOM.className = 'text'
		dom.innerHTML = '<i>€</i>'
		dom.appendChild(contentDOM)
		contentDOM.setAttribute('contenteditable', 'true');
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

