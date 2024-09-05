import { useEffect, useState } from 'react';
import { IItem } from '../../../Interfaces';
import {
  GroupInfo,
  TextInfo,
  TitleInfo,
  WrapperDetail,
  WrapperHeader,
  WrapperMenu,
} from './styles';
import { ButtonIconComponent } from '../../ButtonIconComponent';
import { Edit, Trash } from 'iconsax-react';
import { useDialog } from '../../../hooks/useDialog';

type DetailsItemProps = {
  item: IItem;
  onActionDeleteItem(itemId: number): void;
  onActionEditItem(): void;
};

interface IFeature {
  name: string;
  description: string;
}

export function DetailsItem({
  item,
  onActionDeleteItem,
  onActionEditItem,
}: DetailsItemProps) {
  const { onOpenDialog, onCloseDialog } = useDialog();

  const [features, setFeatures] = useState<IFeature[]>(
    JSON.parse(item.specificAttributes) as IFeature[]
  );

  function handleDeleteItem() {
    onOpenDialog({
      text: 'Deseja realmente deletar esse item? isso apagara todos os agendamentos',
      onActionCancel: () => onCloseDialog(),
      onActionConfirm: () => onActionDeleteItem(item.id),
    });
  }

  useEffect(() => {
    setFeatures(JSON.parse(item.specificAttributes) as IFeature[]);
  }, [item]);

  return (
    <WrapperDetail>
      <WrapperHeader>
        <TitleInfo>Detalhes</TitleInfo>

        <WrapperMenu>
          <ButtonIconComponent
            variant="CANCEL"
            icon={<Edit size="16" />}
            onClick={onActionEditItem}
          />

          <ButtonIconComponent
            variant="CANCEL"
            icon={<Trash size="16" />}
            onClick={handleDeleteItem}
          />
        </WrapperMenu>
      </WrapperHeader>

      <GroupInfo>
        <TitleInfo>Nome</TitleInfo>
        <TextInfo> {item.name}</TextInfo>
      </GroupInfo>

      <GroupInfo>
        <TitleInfo>Descrição</TitleInfo>
        <TextInfo> {item.description}</TextInfo>
      </GroupInfo>

      {features.map((f, i) => (
        <GroupInfo key={i}>
          <TitleInfo>{f.name}</TitleInfo>
          <TextInfo> {f.description}</TextInfo>
        </GroupInfo>
      ))}
    </WrapperDetail>
  );
}
