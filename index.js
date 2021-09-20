import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  asset,
  Environment,
} from 'react-360';

import EventEmitter from "EventEmitter";

import ScenePage from './src/components/ScenePage.react';
import SubtitleText from './src/components/SubtitleText.react';

const SCENE_DEF = [
  {
    type: 'photo',
    title: 'Welcome to your Virtual Classroom',
    source: asset('classroom.jpg'),
    // audio: asset('cafe.wav'),
    next: 1,
    subtitle: '',
  },
  {
    type: 'video',
    title: 'Example of 360 video',
    source: {url: asset('video360.mp4').uri},
    next: 2,
    subtitle: 'This is a 360 street view, example of 360 video mode.',
  },
  {
    type: 'photo',
    title: 'Introduction to Nodejs',
    source: asset('360_world.jpg'),
    screen: {url: asset('introduction.mp4').uri},
    next: 3,
    subtitle: 'Brief introduction to the powerful javascript framework',
  },
  {
    type: 'video',
    title: 'Example of 360 video',
    source: {url: asset('video360.mp4').uri},
    next: 4,
    subtitle: 'This is a 360 street view, example of 360 video mode.',
  },
  {
    type: 'photo',
    title: 'V8 Engine',
    source: asset('360_world.jpg'),
    screen: {url: asset('engine.mp4').uri},
    next: 0,
    subtitle: 'Brief introduction to the nodejs engine',
  },
];

const dataStore = new EventEmitter();

export default class Classroom extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      index: 0,
    };
  }

  _onClickNext = () => {
    const nextID = SCENE_DEF[this.state.index].next;
    this.setState({index: nextID});
    dataStore.emit('dataChange', nextID);
  };

  render() {
   const currentScene = SCENE_DEF[this.state.index];
    const nextScene = SCENE_DEF[SCENE_DEF[this.state.index].next];
    return (
      <View style={styles.panel}>
        <ScenePage
          currentScene={currentScene}
          nextScene={nextScene}
          onClickNext={this._onClickNext} />
      </View>
    );
  }
};

export class Subtitle extends React.Component {
  state = {
    index: 0,
  };

  componentWillMount() {
    dataStore.addListener('dataChange', this._onDataChange);
  }
  componentWillUnmount() {
    dataStore.removeListener('dataChange', this._onDataChange);
  }
  _onDataChange = (index) => {
    this.setState({index: index});
  };
  render() {
    const currentScene = SCENE_DEF[this.state.index];
    return (
      <View style={styles.subtitle}>
        <SubtitleText text={currentScene.subtitle} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  panel: {
    // Fill the entire surface
    width: 1000,
    height: 600,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  subtitle: {
    width: 600,
    justifyContent: 'center',
    alignItems: 'center',
    top: 600,
  },
});

AppRegistry.registerComponent('Classroom', () => Classroom);
AppRegistry.registerComponent('Subtitle', () => Subtitle);
