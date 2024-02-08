const FILE_BASE_NAME = 'tmp_base64src';

const base64src = function(base64data) {
  return new Promise((resolve, reject) => {
    const [, format, bodyData] = /data:image\/(\w+);base64,(.*)/.exec(base64data) || [];
    if (!format) {
      reject(new Error('ERROR_BASE64SRC_PARSE'));
    }

    const filePath = `${FILE_BASE_NAME}.${format}`;
    const buffer = Uint8Array.from(atob(bodyData), c => c.charCodeAt(0));

    const blob = new Blob([buffer], { type: `image/${format}` });
    const urlCreator = window.URL || window.webkitURL;
    const imageUrl = urlCreator.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `image.${format}`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    resolve(filePath);
  });
};

export default base64src;
