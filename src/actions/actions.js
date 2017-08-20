import Reflux from 'reflux';
import FlickrLib from '../lib/flickrWrapper';


const Actions = Reflux.createActions({
  fetchRecentPhotos: {asyncResult: true},
  imageClicked: {asyncResult: false}
});


Actions.fetchRecentPhotos.listen((page) => {
  FlickrLib.fetchRecentPhotos(page)
      .then(Actions.fetchRecentPhotos.completed)
      .catch(Actions.fetchRecentPhotos.failed);
});

export default Actions;
