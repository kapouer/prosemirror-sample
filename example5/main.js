var State = require("prosemirror-state")
var EditorView = require("prosemirror-view").EditorView
var Model = require("prosemirror-model")

var specs = {
	text: {},
	paragraph: {
		content: "text*",
		parseDOM: [{tag: 'p'}],
		toDOM: function(node) {
			return ["p", 0]
		}
	},

	title: {
		content: 'text*',
		parseDOM: [{tag: 'div.title'}],
		toDOM: function(node) {
			return ["div", {'class': 'title'}, ["span", {'class': 'text'}, 0]]
		}
	},
	content: {
		content: 'paragraph+',
		parseDOM: [{tag: 'div.content'}],
		toDOM: function(node) {
			return ["div", {'class': 'content'}, 0]
		}
	},
	item: {
		content: 'title content',
		parseDOM: [{tag: 'div.parent'}],
		toDOM: function(node) {
			return ["div", {'class': 'item'}, 0]
		}
	},
	doc: {
		content: 'item*'
	}
}

var views = {
	item: function(node) {
		console.log("create item");
		var dom = document.createElement('div')
		dom.className = 'item'
		return {
			dom: dom,
			contentDOM: dom,
			update: function(node, decorations) { return true },
			ignoreMutation: function(record) { return false }
		}
	},
	title: function(node, view, getPos, decorations) {
		console.log("create title");
		var dom = document.createElement('div')
		dom.className = 'title'
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
	var pm = new EditorView(editor, {
		state: State.EditorState.create({
			schema: new Model.Schema({nodes: specs})
		}),
		nodeViews: views
	})
	window.ProseMirrorDevTools.applyDevTools(pm, {
		EditorState: State.EditorState
	})

	window.addItem = function() {
		var tr = pm.state.tr
		tr.setSelection(State.TextSelection.create(tr.doc, tr.doc.content.size))
		pm.dispatch(tr)
		var item = document.createElement('div')
		item.innerHTML = `<div class="title" contenteditable="false"><span class="text" contenteditable="true">TITLE</span></div><div class="content"><p>CONTENT</p></div>`
		pm.dom.insertBefore(item, pm.dom.firstChild)
	};
})

