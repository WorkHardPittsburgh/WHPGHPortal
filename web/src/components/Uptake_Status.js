import React, {Component} from 'react';
import Dropdown from 'react-dropdown';

class UptakeStatus extends Component {
  constructor(props) {
    super(props)
    this.saveChanges = this
      .saveChanges
      .bind(this)
    this.state = {
      active: 'New'
    }
  }
  saveChanges(data) {
    this.setState({active: data.value})
  }
  render() {
    const options = [
      {
        value: 'New',
        label: 'New'
      }, {
        value: 'Accepted',
        label: 'Accepted'
      }, {
        value: 'Rejected',
        label: 'Rejected'
      }
    ]
    return (<Dropdown
      value={this.state.active}
      options={options}
      onChange={this.saveChanges}/>)
  }
}

export default UptakeStatus;