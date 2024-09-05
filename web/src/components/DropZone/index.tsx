import { Image } from 'iconsax-react';
import { Title, WrapperDropZone } from './styles';
import { useTheme } from 'styled-components';
import { useEffect, useState } from 'react';

type DropZoneProps = {
  onGetFile(value: File | null): void;
};

export function DropZone({ onGetFile }: DropZoneProps) {
  const { COLORS } = useTheme();

  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [imgSelected, setImgSelected] = useState<File | null>(null);
  const [imageEnter, setImageEnter] = useState(false);

  function handleDragOver(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
  }

  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();

      reader.onload = () => setImageSrc(reader.result as string);
      reader.readAsDataURL(file);
      setImgSelected(file);
    }
  }

  useEffect(() => {
    if (imageSrc) {
      onGetFile(imgSelected);
    }
  }, [imageSrc]);

  return (
    <WrapperDropZone
      draggable
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragEnter={() => setImageEnter(true)}
      onDragLeave={() => setImageEnter(false)}
      style={{
        borderColor: imageEnter ? COLORS.ACCENT_100 : COLORS.GRAY_200,
      }}
    >
      {!imageSrc && (
        <>
          <Image
            size="32"
            color={imageEnter ? COLORS.ACCENT_100 : COLORS.GRAY_200}
          />
          <Title
            style={{ color: imageEnter ? COLORS.ACCENT_100 : COLORS.GRAY_200 }}
          >
            {!imageEnter ? 'Arraste sua imagem até aqui' : 'Solte sua imagem'}
          </Title>
        </>
      )}

      {imageSrc && (
        <img
          src={imageSrc}
          alt="Dropped"
          style={{ maxWidth: '100%', maxHeight: '100%' }}
        />
      )}
    </WrapperDropZone>
  );
}
