import { Avatar } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { Calendar2, HambergerMenu, Setting2 } from 'iconsax-react';
import { resolveImage } from '../../helpers/resolveImage';
import { useAuth } from '../../context/auth';
import { useTheme } from 'styled-components';
import {
  BtnNav,
  BtnNavContent,
  BtnResizeNavBar,
  TitleBtn,
  WrapperMenu,
  WrapperNavBar,
} from './styles';

type NavBarType = {
  isResize: boolean;
  onResize(): void;
};

export function NavBar({ isResize, onResize }: NavBarType) {
  const { COLORS } = useTheme();

  const [currentPath, setCurrentPath] = useState(location.pathname);
  const { user } = useAuth();
  const [urlImage, setUrlImage] = useState('');

  useEffect(() => {
    if (user && user.img && user.img.length > 0) {
      setUrlImage(
        URL.createObjectURL(resolveImage.handleBuffer(user.img[0].data))
      );
    }
  }, [user]);

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location.pathname]);

  return (
    <WrapperNavBar $isBig={isResize}>
      <WrapperMenu>
        <BtnResizeNavBar
          size="sm"
          aria-label="menu-resize"
          variant="gosht"
          onClick={onResize}
        >
          <HambergerMenu size="22" color={COLORS.GRAY_200} />
        </BtnResizeNavBar>

        <BtnNav to={'/'}>
          <BtnNavContent
            $isBig={isResize}
            color={currentPath === '/' ? COLORS.ACCENT_300 : COLORS.GRAY_200}
          >
            <Calendar2
              size={18}
              variant={currentPath === '/' ? 'Bold' : 'Linear'}
            />

            <TitleBtn
              $isBig={isResize}
              color={currentPath === '/' ? COLORS.ACCENT_300 : COLORS.GRAY_200}
            >
              Agenda
            </TitleBtn>
          </BtnNavContent>
        </BtnNav>

        {/* <BtnNav to={'/items'}>
          <BtnNavContent
            $isBig={isResize}
            color={
              currentPath === '/items' ? COLORS.ACCENT_300 : COLORS.GRAY_200
            }
          >
            <Category
              size={18}
              variant={currentPath === '/items' ? 'Bold' : 'Linear'}
            />

            <TitleBtn
              $isBig={isResize}
              color={
                currentPath === '/items' ? COLORS.ACCENT_300 : COLORS.GRAY_200
              }
            >
              Itens
            </TitleBtn>
          </BtnNavContent>
        </BtnNav> */}

        <BtnNav to={'/settings'}>
          <BtnNavContent
            $isBig={isResize}
            color={
              currentPath === '/settings' ? COLORS.ACCENT_300 : COLORS.GRAY_200
            }
          >
            <Setting2
              size={18}
              variant={currentPath === '/settings' ? 'Bold' : 'Linear'}
            />

            <TitleBtn
              $isBig={isResize}
              color={
                currentPath === '/settings'
                  ? COLORS.ACCENT_300
                  : COLORS.GRAY_200
              }
            >
              Ajustes
            </TitleBtn>
          </BtnNavContent>
        </BtnNav>
      </WrapperMenu>

      <Avatar
        alignSelf="flex-start"
        w="32px"
        h="32px"
        name={user?.name}
        src={urlImage}
      />
    </WrapperNavBar>
  );
}
