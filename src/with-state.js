import { Component } from 'react'

const withState = (initialState, render, onComponentWillMount, onComponentDidMount, onComponentWillUpdate, onComponentDidUpdate, 
                    onComponentWillUnmount) => {

  return class AddedStateComponent extends Component {
    constructor(props) {
      super(props)
      this.state = JSON.parse(JSON.stringify(initialState)) //get clone of initialState for every instance of the component
    }
    componentWillMount() {
      onComponentWillMount && onComponentWillMount(this.props, this.state, this.setState.bind(this))
    }
    componentDidMount() {
      onComponentDidMount && onComponentDidMount(this.props, this.state, this.setState.bind(this))
    }
    componentWillUpdate() {
      onComponentWillUpdate && onComponentWillUpdate(this.props, this.state)
    }
    componentDidUpdate() {
      onComponentDidUpdate && onComponentDidUpdate(this.props, this.state)
    }
    componentWillUnmount() {
      onComponentWillUnmount && onComponentWillUnmount(this.props, this.state)
    }
    render() {
      return render(this.props, this.state, this.setState.bind(this))
    }
  }
}

export default withState
