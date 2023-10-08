const base64ToBlob = (base64String: string, contentType = "image/jpeg") => {
    const byteCharacters = atob(base64String);
    const arrayBuffer = new ArrayBuffer(byteCharacters.length);
    const view = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteCharacters.length; i++) {
      view[i] = byteCharacters.charCodeAt(i);
    }

    return new Blob([arrayBuffer], { type: contentType });
  };
export default base64ToBlob;