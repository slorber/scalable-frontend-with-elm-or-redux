import empty from '@f/empty-element'
import createNativeElement from '@f/create-element'
import * as dom from 'deku/lib/dom'
import { insertAtIndex } from 'deku/lib/dom/update'
import { setAttribute } from 'deku/lib/dom/setAttribute'
import { diffNode, Actions } from 'deku/lib/diff'
import { createPath, isThunk, isEmpty, isText } from 'deku/lib/element'

const onCreates = []
const onUpdates = []

const pushCreate = (cb, model) => onCreates.push(() => cb(model))
const pushUpdate = (cb, model) => onUpdates.push(() => cb(model))

const doCreates = () => doEvents(onCreates)
const doUpdates = () => doEvents(onUpdates)
const doEvents = (arr) => {
  while(arr.length !== 0) {
    const cbs = arr.splice(0)
    for(let cb of cbs)
      cb()
  }
}

export default function createRender(container, handler, options = {})
{
  let node = null
  let oldVnode = null
  let rootId = options.id || '0'
  let dispatch = effect => effect && handler(effect)

  if (container) {
    empty(container)
  }

  const update = (newVnode, context) => {
    let changes = diffNode(oldVnode, newVnode, rootId)
    node = changes.reduce(updateElement(dispatch, context), node)
    oldVnode = newVnode
    while(onUpdates.length !== 0 || onCreates.length !== 0) {
      doUpdates()
      doCreates()
    }

    return node
  }

  const create = (vnode, context) => {
    node = createElement(vnode, rootId, dispatch, context)
    if (container)
      container.appendChild(node)
    oldVnode = vnode
    doCreates()

    return node
  }

  return (vnode, context = {}) => (
    node !== null ? update(vnode, context) : create(vnode, context)
  )
}

function createElement(vnode, path, dispatch, context) {
  if( isThunk(vnode) )
    return createThunk(vnode, path, dispatch, context)

  if( isEmpty(vnode) || isText(vnode) )
    return dom.create(vnode, path, dispatch, context)

  return createNative(vnode, path, dispatch, context)
}

function updateElement(dispatch, context) {
  const upd = dom.update(dispatch, context)
  return (DOMElement, action) => {
    Actions.case({
      updateThunk: (prev, next, path) => {
        DOMElement = updateThunk(DOMElement, prev, next, path, dispatch, context)
      },
      updateChildren: (changes) => {
        DOMElement = updateChildren(DOMElement, changes, dispatch, context)
      },
      replaceNode: (prev, next, path) => {
        DOMElement = replaceNode(DOMElement, prev, next, path, dispatch, context)
      },
      _: () => {
        DOMElement = upd(DOMElement, action)
      }
    }, action)
    return DOMElement
  }
}

function createThunk(vnode, path, dispatch, context) {
  const { props, children, component } = vnode
  const onCreate = component.onCreate
  const model = overrideModel(vnode, {
    children,
    props,
    path,
    dispatch,
    context
  })
  const render = typeof component === 'function' ? component : component.render;

  const output = render(model)
  const childPath = createPath(path, output.key || '0')
  const DOMElement = createElement(output, childPath, model.dispatch, context)

  if (onCreate)
    pushCreate(onCreate, model)

  vnode.state = {
    vnode: output,
    model: model
  }
  return DOMElement
}

function createNative(vnode, path, dispatch, context) {
  const { type, attributes, children } = vnode
  const DOMElement = getCachedElement(type)

  for (let name in attributes) {
    setAttribute(DOMElement, name, attributes[name])
  }

  children.forEach((node, index) => {
    if(node === null || node === undefined)
      return

    const child = createElement(node, createPath(path, node.key || index), dispatch, context);
    DOMElement.appendChild(child);
  })

  return DOMElement
}

function updateThunk(DOMElement, prev, next, path, dispatch, context) {
  const { props, children, component } = next
  const prevNode = prev.state.vnode
  const onUpdate = component.options
  const model = overrideModel(next, {
    children,
    props,
    path,
    dispatch,
    context
  })
  const render = typeof component === 'function' ? component : component.render;

  const nextNode = render(model)
  const changes = diffNode(prevNode, nextNode, createPath(path, '0'))
  DOMElement = changes.reduce(updateElement(model.dispatch, context), DOMElement)

  if (onUpdate)
    pushUpdate(onUpdate, model)

  next.state = {
    vnode: nextNode,
    model: model
  }

  return DOMElement
}

function updateChildren(DOMElement, changes, dispatch, context) {
  const childNodes = [...DOMElement.childNodes]
  
  changes.forEach(function (change) {
    Actions.case({
      insertChild: (vnode, index, path) => {
        insertAtIndex(DOMElement, index, createElement(vnode, path, dispatch, context))
      },
      removeChild: (index) => {
        DOMElement.removeChild(childNodes[index]);
      },
      updateChild: (index, actions) => {
        var update = updateElement(dispatch, context);
        actions.forEach(function (action) {
          return update(childNodes[index], action);
        })
      }
    }, change);
  });

  return DOMElement
}

function replaceNode(prev, next, path, dispatch, context) {
  var newEl = createElement(next, path, dispatch, context);
  var parentEl = DOMElement.parentNode;
  if (parentEl)
    parentEl.replaceChild(newEl, DOMElement);

  removeThunks(prev);
  return newEl;
}
/**
 * Recursively remove all thunks
 */
function removeThunks(vnode) {
  while( isThunk(vnode) ) {
    const { component, state } = vnode;
    const onRemove = component.onRemove;
    const model = state.model;

    if (onRemove)
      onRemove(model);

    vnode = state.vnode;
  }

  if (vnode.children) {
    for (var i = 0; i < vnode.children.length; i++)
      removeThunks(vnode.children[i]);
  }
}

function overrideModel(vnode, model) {
  if(vnode.override !== undefined)
    model.dispatch = vnode.override(model.dispatch)

  return model
}

const cache = {}
function getCachedElement (type) {
  let cached = cache[type]
  if (cached === undefined) {
    cached = cache[type] = createNativeElement(type)
  }
  return cached.cloneNode(false)
}
