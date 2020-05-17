
import { useState, useEffect } from 'react'
import { storage } from '../apis/fbConfig';
import axios from 'axios';
    
    //from ResourceList() into useResources()
    //by extracting this logic into a seperate funct.
    //we can use it in another component with another
    const UploadImage = image => {
        const [downloadUrl, setDownloadUrl] = useState('')
        //console.log('resource', resource)
        const getUrl =  (image) => {
            const uploadTask =  storage.ref(`images/${image.name}`).put(image)
            uploadTask.on('state_changed',
            (snapshot) =>{ 
                console.log('snapshot', snapshot)
            },
            (error) => {
                console.log('error', error)
            },
            () => {
            const url =storage.ref('images').child(image.name).getDownloadURL()
                setDownloadUrl(url)
                console.log('uploade url', url)
            
            })
        }
        useEffect(() => {getUrl(image)}, [image])
        
        return downloadUrl;
    }

    export default  UploadImage;