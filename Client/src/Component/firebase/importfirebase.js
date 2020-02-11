import {storage} from './index'


export  const   getProfilePictureUrl=(uid, callback)=> {
    var pathReference = storage.ref('images/' + uid );
    pathReference.getDownloadURL().then((url) => {
        callback(url);
    }).catch((error) => {
       console.log(error);
    });
}

