import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {uploadImage} from '../redux/actions';

function mapStateToProps(state) {
  return {images: state.images};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    uploadImage: uploadImage
  }, dispatch)
}

class Uploader extends Component {
  render() {
    return (
      <div className="row">
        <div className="span6">
          <Dropzone
            className="dropzone"
            accept="image/jpeg, image/png"
            onDrop={(images) => this.props.uploadImage(images)}>
            <div className="d-flex align-items-center">
              <p className="lead">Click or Drop to upload more images.</p>
            </div>
          </Dropzone>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Uploader);
