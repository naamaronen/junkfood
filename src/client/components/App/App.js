import React from 'react';
import './App.scss';
import Gallery from '../Gallery';
import { connect } from 'react-redux';
import AppActions from './actions';
import GalleryActions from '../Gallery/actions';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';

class App extends React.Component {
    componentDidMount() {
        this.props.loadTagsEventHandler();
    }

  render() {
        console.log('tags=', this.props.tags);
    return (
      <div className="app-root">
        <div className="app-header">
          <h2>Flickr Gallery</h2>
          <Dropdown
              value={this.props.tag}
              onChange={this.props.updateTagEventHandler}
              options={this.props.tags}
              placeholder="insert a tag"
              editable={true}
            />
          <Button
              label="Search"
              className="p-button-raised p-button-rounded"
              onClick={() => this.props.loadImagesEventHandler(this.props.tag)}
          />
        </div>
        <Gallery/>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
      tag: state['app'].get('tag'),
      tags: state['app'].get('tags').toArray()
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
      loadTagsEventHandler: () => {
          dispatch(AppActions.loadTagsAction());
      },
    updateTagEventHandler: (e) => {
      dispatch(AppActions.updateTagAction(e.value));
    },
    loadImagesEventHandler: (tag) => {
      dispatch(GalleryActions.loadImagesAction(tag))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
