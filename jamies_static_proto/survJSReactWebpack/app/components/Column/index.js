import React, { Component } from 'react';
import Sortable from 'sortablejs';
import Issue from '../Issue';

// import styles from './Column.scss';
// import CSSModules from 'react-css-modules';
// @CSSModules(styles)
export default class Column extends Component {
  constructor (props, context) {
    super(props, context)

    let arr = [];
    let seq = 1;

    for (let i = 0; i < 5; i++) {
      arr.push(seq++)
    };

    this.state = {
      seq: seq,
      arr: arr
    }
  }

  componentDidMount () {
    Sortable.create(this.refs.list, {
      group: 'issues',
      ghostClass: 'issueGhost',
      animation: 150,
      onStart: (e) => { console.log('onStart', e) },
      onEnd: (e) => { console.log('onEnd', e) },
      onAdd: (e) => { console.log('onAdd', e) },
      onRemove: (e) => { console.log('onRemove', e) }
    });
  }

  render() {
    let { arr } = this.state;

    return (
      <section className='column'>
        <header className='drag-handle'>
          <span>Column { this.props.id }</span>
          <button className='button' onClick={ this.handleAddIssue.bind(this) }>Add</button>
        </header>
        <div ref='list'>
          {
            arr.map((x) => {
              return (
                <Issue key={ x } col={ this.props.id } id={ x } />
              )
            })
          }
        </div>
      </section>
    )
  }

  handleAddIssue () {
    let { seq, arr } = this.state;

    arr.push(seq++);

    this.setState({
      seq: seq,
      arr: arr
    });
  }
}
