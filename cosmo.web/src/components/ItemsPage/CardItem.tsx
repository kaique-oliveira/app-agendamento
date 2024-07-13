import { HStack, Text, VStack } from '@chakra-ui/react';
import { IItem } from '../../Interfaces';
import { useEffect, useRef } from 'react';
import { ArrowRight2 } from 'iconsax-react';

type CardItemType = {
  item: IItem;
  itemSelected: IItem | null;
  onSelectedItem(item: IItem): void;
};

export function CardItem({ item, itemSelected, onSelectedItem }: CardItemType) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      if (itemSelected && item.id === itemSelected.id) {
        inputRef.current.checked = true;
      } else {
        inputRef.current.checked = false;
      }
    }
  }, [itemSelected]);

  return (
    <VStack
      transition="all .2s"
      w="100%"
      p="8px 16px"
      gap="2px"
      borderRadius="12px"
      bg="#fff"
      border={
        itemSelected?.id === item.id ? '1px solid #6236F5' : '1px solid #fff'
      }
      onClick={() => onSelectedItem(item)}
      cursor="pointer"
      boxShadow={
        itemSelected?.id === item.id
          ? 'rgba(100, 100, 111, 0.1) 0px 0px 6px'
          : 'rgba(100, 100, 111, 0.09) 0px 0px 2px'
      }
    >
      <input
        style={{ display: 'none' }}
        ref={inputRef}
        type="radio"
        name="card-item"
      />

      <HStack w="100%">
        <VStack
          w="100%"
          alignItems="flex-start"
          gap="0px"
          color={itemSelected?.id === item.id ? '#582ce9' : '#555555'}
        >
          <Text transition="all .2s" fontWeight={600} fontSize="14px">
            {item.name}
          </Text>
          <Text transition="all .2s" fontWeight={400} fontSize="14px">
            {item.description}
          </Text>
        </VStack>

        <ArrowRight2
          size="18"
          color={itemSelected?.id === item.id ? '#582ce9' : '#555555'}
        />
      </HStack>
    </VStack>
  );
}
