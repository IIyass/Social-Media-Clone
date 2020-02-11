
import React from 'react';
import {storage}  from './firebase'
import DisplayPicture from './DisplayPicture';
 
class UploadImage extends React.Component {
   
 
constructor(props) {
        super(props);
         this.state = {
              image: null,
              url:"",
             };
         this.handleupload = this.handleupload.bind(this);

    }

 handleupload =()=>{

const UploadTask=storage.ref(`images/${this.state.image.name}`).put(this.state.image);

         UploadTask.on('state_changed',
                    (snapshot)=>{                     
},
(error)=>{
    console.log(error)
},
()=>{
    storage.ref('images').child(this.state.image.name).getDownloadURL().then(url=>{
        this.setState({url})
    });
})
}



    render() {    
        return (
           <div>
               <br/>
            <input type="file" onChange={this.handleChange}/>
            <button onClick={this.handleupload}>upload</button>
            <DisplayPicture url={this.state.url}/>
           </div>
);
}
}
export default UploadImage;