//TODO: Make s3 buckets only readable from this app!
//Right now they're set to public

import AWS from 'aws-sdk';
import shortid from 'shortid';
import mime from 'mime';

// Set the region 
AWS.config.update({ region: 'us-east-2' });
//TODO: dev env vars:
const CROWD_PHOT_DEV_BUCKET = 'crowd-photo-dev';

//TODO: Maybe keep constants for "folder names" but names it same as API should help
export default (fileStream, filename, mimetype, folder) => {
    // Create S3 service object
    const s3 = new AWS.S3({ apiVersion: '2006-03-01' });
    const extension = mime.getExtension(mimetype);

    //This format is basically {API NAME}/{SHORT ID}.{EXT}
    //e.g. PhotoPost/HkuxTFbUM.png
    let awsPath = `${folder}/${shortid.generate()}.${extension}`;

    // call S3 to retrieve upload file to specified bucket
    var uploadParams = {
        Bucket: CROWD_PHOT_DEV_BUCKET,
        Key: awsPath,
        Body: fileStream,
        ContentType: mime.getType(extension),
        ContentEncoding: extension
    };
    
    return new Promise((resolve, reject) => {
        // call S3 to retrieve upload file to specified bucket
        s3.upload(uploadParams, (err, data) => {
            if (err) return reject(err);
            resolve(data.Location);
        });
    });

}