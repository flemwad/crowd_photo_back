export default (stream, asBase64, asBuffer) => {

    let base64Arr = [];
    let buffers = [];

    const base64Concat = (base64chunk) => base64Arr.push(base64chunk.toString('base64'));
    const bufferPush = (bufferChunk) => buffers.push(bufferChunk);

    return new Promise((resolve, reject) => {
        stream.on('data', function (chunk) {
            if (asBuffer) bufferPush(chunk);
            if (asBase64) base64Concat(chunk.toString('base64'));
        }).on('error', error => {
            reject(error)
        }).on('end', function () {
            return resolve({
                base64: asBase64 ? base64Arr.join() : null,
                buffer: asBuffer ? Buffer.concat(buffers) : null
            });
        });
    });
}