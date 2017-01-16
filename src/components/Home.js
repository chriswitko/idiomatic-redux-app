import React, { Component, Children, cloneElement } from 'react';
import {ReactDOM, render, findDOMNode} from 'react-dom';
import Siema from 'siema';
import Nav from './Nav';
import {Editor, EditorState, convertFromHTML, ContentState} from 'draft-js';
import brace from 'brace';
import AceEditor from 'react-ace';
import {stateToHTML} from 'draft-js-export-html';
import {stateFromHTML} from 'draft-js-import-html';
import DraftPasteProcessor from 'draft-js/lib/DraftPasteProcessor';
import Frame from 'react-frame-component'
import interact from 'interact.js'

import Draggable, {DraggableCore} from 'react-draggable'; // Both at the same time

import styles from '../css/style.css';


import 'brace/mode/html';
import 'brace/mode/java';
import 'brace/theme/github';

class MyComp extends Component {
  componentDidMount() {
    this.addZone()
    this.setChildAttrs()
  }

  componentDidUpdate() {
    this.addZone()
    this.setChildAttr()
  }

  dragMoveListener (event) {
    var target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform =
    target.style.transform =
      'translate(' + x + 'px, ' + y + 'px)';
    // target.style.left = x + 'px'
    // target.style.top = y + 'px'

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  }

  addZone () {
    interact('.dropzone').dropzone({
      // only accept elements matching this CSS selector
      accept: '.draggable',
      // Require a 75% element overlap for a drop to be possible
      overlap: 0.75,

      // listen for drop related events:

      ondropactivate: function (event) {
        // add active dropzone feedback
        event.target.classList.add('drop-active');
      },
      ondragenter: function (event) {
        var draggableElement = event.relatedTarget,
            dropzoneElement = event.target;
        // feedback the possibility of a drop
        dropzoneElement.classList.add('drop-target');
        draggableElement.classList.add('can-drop');
        draggableElement.textContent = 'Dragged in';
      },
      ondragleave: function (event) {
        // remove the drop feedback style
        event.target.classList.remove('drop-target');
        event.relatedTarget.classList.remove('can-drop');
        event.relatedTarget.textContent = 'Dragged out';
      },
      ondrop: function (event) {
        event.relatedTarget.textContent = 'Dropped2';
        // event.target.
        console.log('dragged', event)
        console.log('event.dragEvent', event.dragEvent)
        event.relatedTarget.style.left = event.dragEvent.snap.dx + 'px'//event.dragEvent.dy +
        event.relatedTarget.style.top =  event.dragEvent.snap.dy + 'px'

        // event.relatedTarget.style.left = 0;
        // event.relatedTarget.style.top = 0;
        // event.target.children.push(event.relatedTarget)
        event.target.appendChild(event.relatedTarget)
        console.log('event.target', event.target)

      },
      ondropdeactivate: function (event) {
        // remove active dropzone feedback
        event.target.classList.remove('drop-active');
        event.target.classList.remove('drop-target');
      }
    });    
  }

  resizableListener (event) {
    var target = event.target,
        x = (parseFloat(target.getAttribute('data-x')) || 0),
        y = (parseFloat(target.getAttribute('data-y')) || 0);

    // update the element's style
    target.style.width  = event.rect.width + 'px';
    target.style.height = event.rect.height + 'px';

    // translate when resizing from top or left edges
    x += event.deltaRect.left;
    y += event.deltaRect.top;

    target.style.webkitTransform = target.style.transform =
        'translate(' + x + 'px,' + y + 'px)';

    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
    target.textContent = Math.round(event.rect.width) + '×' + Math.round(event.rect.height);    
  }

  setChildAttrs() {
    const { children } = this.props
    console.log('childAttrs', children)

    const setAttrs = el => {
      el.classList.add('draggable')
      console.log('el', el)

    this.interactable = interact(el);
    this.interactable
        .draggable({
          snap: {
                targets: [
                  interact.createSnapGrid({ x: 1, y: 1 })
                ],
                range: Infinity,
                relativePoints: [ { x: 0, y: 0 } ]
              },
          //     inertia: true,
          //     restrict: {
          //       restriction: this.parentNode,
          //       elementRect: { top: 0, left: 0, bottom: 1, right: 1 },
          //       endOnly: true
          //     },       
            onmove: this.dragMoveListener
        }).resizable({
          preserveAspectRatio: true,
          edges: { left: true, right: true, bottom: true, top: true }
        })
        .on('resizemove', this.resizableListener);     
    }
      // .forEach(attr => {
      //   console.log('attr', attr)
      //   el.style = 'hello'
      // })

    // for each child ref find DOM node and set attrs
    Object.keys(this.refs).forEach(ref => setAttrs(findDOMNode(this.refs[ref])))
  }

  componentWillUnmount () {
    this.interactable.unset();
    this.interactable = null;
  }

  render() {
    const { children } = this.props
    return (<div className="dropzone" style={{border: '1px solid red', width: '500px', height: '300px'}} > {
        Children.map(children, (child, idx) => {
          const ref = `child${idx}`
          return cloneElement(child, { ref });
      })} </div>)
  }
}

class MyEditor extends React.Component {
  constructor(props) {
    super(props);
    
    const sampleMarkup =
      '<b>Bold text</b>, <i>Italic text</i><br/ ><br />' +
      '<a href="http://www.facebook.com">Example link</a>' + 
      '<img src="https://scontent.xx.fbcdn.net/v/t1.0-1/c0.0.320.320/p320x320/15873276_10154860977474293_2459111570042632076_n.jpg?oh=2bf9c092c981dc9d8dc57c363f3b5f1b&oe=5923B5D6" width="100" height="100"/>'
      ;

    const blocksFromHTML = convertFromHTML(sampleMarkup);
    const state = ContentState.createFromBlockArray(blocksFromHTML);

    this.state = {
      editorState: EditorState.createWithContent(state),
    };

    // this.state = {
    //   editorState: stateFromHTML('<p>hello</p>') //EditorState.createEmpty(),
    // };
      // defaultHtml: stateFromHTML('<p>hello</p>') // <img src="https://scontent.xx.fbcdn.net/v/t1.0-1/c0.0.320.320/p320x320/15873276_10154860977474293_2459111570042632076_n.jpg?oh=2bf9c092c981dc9d8dc57c363f3b5f1b&oe=5923B5D6"/>

    this.onChange = (editorState) => {
      let html = stateToHTML(editorState.getCurrentContent());

      console.log('html', html)
      this.setState({editorState});
    }
  }

  render() {
    return (
        <Editor 
        editorState={this.state.editorState} 
        onChange={this.onChange}
        placeholder="Start your comment here..."
        defaultValue={this.state.defaultHtml}
        />
    );
  }
}






class Home extends Component {
  constructor(props={}) {
    super();

    this.prev = this.prev.bind(this)
    this.next = this.next.bind(this)

    this.state = props
  }

  eventLogger (e, data) {
    console.log('Event: ', event);
    console.log('Data: ', data);
  };  
  // getInitialState() {
  //   return {data: []};
  // }
  onChangeAce(newValue) {
    console.log('change',newValue);
  }

  componentDidMount() {
    this.siema = new Siema();
  }

  prev() {
    this.siema.prev()
  };
  
  next() {
    this.siema.next()
  };  

  onStart() {
    // this.setState({activeDrags: ++this.state.activeDrags});
  }

  onStop(e) {
    // this.setState({activeDrags: --this.state.activeDrags});
    console.log('end e', e)
    // console.log('end', e)
  }

  render() {
    const dragHandlers = {onStart: this.onStart, onStop: this.onStop};
    return (
      <div>
        <Nav />
        <div className="siema">
          <div><img src="https://pawelgrzybek.com/siema/assets/siema--pink.svg" alt="Siema image" /></div>
          <div><img src="https://pawelgrzybek.com/siema/assets/siema--yellow.svg" alt="Siema image" /></div>
          <div><img src="https://pawelgrzybek.com/siema/assets/siema--pink.svg" alt="Siema image" /></div>
          <div><img src="https://pawelgrzybek.com/siema/assets/siema--yellow.svg" alt="Siema image" /></div>
        </div>
        <button onClick={this.prev}>Prev</button>
        <button onClick={this.next}>Next</button>
        <div style={{border: '1px solid black'}}>
          <p>Edit</p>
          <MyEditor />
        </div>        
        <div>
          <AceEditor
              mode="html"
              theme="github"
              onChange={this.onChangeAce}
              name="blah1"
              setOptions={{
                tabSize: 2,
                fontSize: 14,
                showGutter: true
              }}
            />        
        </div>
        <div>
          <MyComp id="first" childAttr={{'data-x':'value'}}>
            <img src="https://scontent.xx.fbcdn.net/v/t1.0-1/c0.0.320.320/p320x320/15873276_10154860977474293_2459111570042632076_n.jpg?oh=2bf9c092c981dc9d8dc57c363f3b5f1b&oe=5923B5D6" width="100" height="100" style={{position: 'absolute'}}/>
            <div style={{backgroundColor: 'yellow', display: 'table'}}>top frame</div>
            <div style={{backgroundColor: 'blue', display: 'table'}}>special image</div>
          </MyComp>
          <MyComp if="second" childAttr={{'data-x':'value'}}>
            <div style={{backgroundColor: 'yellow', display: 'table'}}>left frame</div>
            <div style={{backgroundColor: 'blue', display: 'table'}}>special image</div>
          </MyComp>
        </div>
        
      </div>
    );
  }  
}
// <div style={{height: '300px', width: '300px', border: '1px solid blue', position: 'relative', overflow: 'auto'}}>
//           <Draggable
//             axis="both"
//             handle=".handle"
//             defaultPosition={{x: 0, y: 0}}
//             position={null}
//             grid={[25, 25]}
//             zIndex={100}
//             onStart={this.handleStart}
//             onDrag={this.handleDrag}
//             onStop={this.handleStop}
//             {...dragHandlers}
//             >
//             <div>
//               <div className="handle">Drag from here</div>
//               <div>This readme...</div>
//             </div>
//           </Draggable>
//         </div>

// <Frame initialContent='<style>#avatar {position:aboslute;top:0;left:0;border:2px solid red;}</style><img width="50" height="50" id="avatar" src="https://scontent.xx.fbcdn.net/v/t1.0-1/c0.0.320.320/p320x320/15873276_10154860977474293_2459111570042632076_n.jpg?oh=2bf9c092c981dc9d8dc57c363f3b5f1b&oe=5923B5D6"/>'></Frame>
export default Home;
