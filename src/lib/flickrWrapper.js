import config from 'config';
import $ from 'jquery';

let params = {
  api_key: config.api_key,
  format: 'json',
  extras:'description,url_q,url_z',
  nojsoncallback: 1,
  page: 1,
  method: 'flickr.photos.getRecent'
}

const FlickrWrapper = {
  fetchRecentPhotos(page) {
    params.page=page;
    return new Promise((resolve, reject) => {
      $.ajax({
        type: 'GET',
        dataType: 'json',
        url: config.base_url,
        data: params,
        success: resolve,
        error: reject
      });
    });
  }
}
export default FlickrWrapper;
