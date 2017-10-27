import React, { Component } from 'react';
import '../css/Uptakes.css';
import MyUptake from './Uptake_Mine';
import WHUptake from './Uptake_WH';
import { Link } from 'react-router-dom';

class Uptakes extends Component {
  render() {
    return (
      <div className="wrap">
        <div className="uptakes">
          <div className="my-uptakes">
            <button className="create-button">
              <Link to ='/uptakes/new'>Create</Link>
            </button>
            <h2>My Uptake</h2>
            <MyUptake/>
          </div>
          <div className="wh-uptakes">
            <h2>WHPGH Uptake</h2>
            <WHUptake/>
          </div>
        </div>
      </div>
    );
  }
}

export default Uptakes;