class ResolveImage {
  handleBuffer(buff: ArrayBuffer): Blob {
    const blob = new Blob([new Uint8Array(buff)], { type: 'image/jpeg' }); // Cria um Blob a partir do array de bytes
    return blob;
  }
}

export const resolveImage = new ResolveImage();
