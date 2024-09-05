import { SearchNormal1 } from 'iconsax-react';
import { InputSearchBar, WrapperSearchBar } from './styles';
import { useTheme } from 'styled-components';

type SearchBarProps = React.InputHTMLAttributes<HTMLInputElement>;

export function SearchBar({ ...rest }: SearchBarProps) {
  const { COLORS } = useTheme();

  return (
    <WrapperSearchBar>
      <SearchNormal1
        style={{ position: 'absolute', left: 6, top: 7 }}
        size="20"
        color={COLORS.GRAY_200}
      />
      <InputSearchBar {...rest} />
    </WrapperSearchBar>
  );
}
