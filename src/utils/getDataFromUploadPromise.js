/**
 * Upload Promise is an scalar Upload promise we get that retuns us a string
 * see: https://github.com/jaydenseric/apollo-upload-client
 * 
 * @param {*} uploadPromise 
 * @param {*} options - `
 *  {
 *      asBase64: will return the base64 encoded version of the file
 *      asBuffer: will return an array of Buffer data that represents the file
 *  }`
 * 
 */
export default (uploadPromise) => {

    return uploadPromise.then((file) => {
        const { stream, filename, mimetype } = file;

        let base64img = "";
        let buffers = [];
        let byteLength = 0;

        const base64Concat = (base64chunk) => base64img += base64chunk.toString('base64');
        const bufferPush = (bufferChunk) => buffers.push(bufferChunk);

        return new Promise((resolve, reject) => {
            stream.on('data', function (chunk) {
                bufferPush(chunk);
                base64Concat(chunk.toString('base64'));
                byteLength += chunk.byteLength;
            }).on('error', error => {
                reject(error)
            }).on('end', function () {
                const nameArr = filename.split('.');

                return resolve({
                    bufferArray: Buffer.concat(buffers),
                    base64: `data:${mimetype};base64,${base64img}`,
                    size: byteLength || 0,
                    name: nameArr[0],
                    mimetype: mimetype
                });
            });
        });
    })
}