import Reflux from 'reflux';
import Actions from '../actions/actions';

const Store = Reflux.createStore({
  listenables: [Actions],

  init() {
    this.state = {
      photos: [],
      imagesLoaded: 0,
      selectedImage: null
    };
  },

  getInitialState() {
    return this.state;
  },

  onFetchRecentPhotosCompleted(response) {
    this.state.photos = this.state.photos.concat(response.photos.photo);
    this.trigger(this.state);
  },

  onImageClicked(photo) {
    this.state.selectedImage = {
      url:photo.url_z,
      title:photo.title.length > 0 ? photo.title : 'No Title ...',
      description: photo.description._content.length > 0 ? photo.description._content : 'No Description ...'
    }
    this.trigger(this.state);
  }

});


export default Store;
