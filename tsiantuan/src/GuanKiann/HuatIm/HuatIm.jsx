import React from 'react';
import SoundsMapping from './SoundsMapping';
import HapSing from './HapSing';
import Debug from 'debug';
import { gaThiann } from '../../GA';
import './HuatIm.css';

var debug = Debug('itaigi:HuatIm');

export default class HuatIm extends React.Component {

  constructor(props) {
    super(props);
    this.state = { r2Failed: false };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.音標 !== this.props.音標) {
      this.setState({ r2Failed: false });
    }
  }

  play(id) {
    let { hanji, 音標 } = this.props;
    document.getElementById(id).play();
    gaThiann(hanji, 音標);
  }

  onR2Error() {
    this.setState({ r2Failed: true });
  }

  render() {
    let { 音標, hanji } = this.props;
    if (!音標) {
      return <span className='HuatIm hidden'></span>;
    }

    let id = SoundsMapping.map(音標);
    if (id === undefined || this.state.r2Failed) {
      return <HapSing 音標={音標} hanji={hanji}/>;
    }

    return (
    <span className='HuatIm'>
      <audio id={'audio_' + id}
        preload='metadata'
        onError={this.onR2Error.bind(this)}>
        <source type='audio/mpeg'
          src={'https://r2-assets.moedict.tw/audio/t/'
          + id + '.mp3?v=sutian-20260901'}
          onError={this.onR2Error.bind(this)} />
      </audio>
      <button onClick={this.play.bind(this, 'audio_' + id)}
        className='ui compact icon button' title='發音'>
        <i className='icon play'></i>
      </button>
    </span>
    );
  }
};
