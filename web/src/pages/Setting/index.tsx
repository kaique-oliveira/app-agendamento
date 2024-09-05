import { Avatar } from '@chakra-ui/react';
import { format } from '../../helpers/format';
import { useEffect, useState } from 'react';
import { resolveImage } from '../../helpers/resolveImage';
import { normalizeOperations } from '../../helpers/normalizeOperation';
import { WrapperPage } from '../../components/WrapperPage';
import { HeaderTitle } from '../../components/HeaderTitle';
import { Spacing } from '../../components/Spacing';
import {
  BtnEditImage,
  BtnEditLogout,
  BtnEditProfile,
  BtnRemoveFeature,
  GroupInfo,
  GroupWrapper,
  HeaderListItems,
  Line,
  ListItems,
  SpanInfo,
  TextInfo,
  TitleInfo,
  TitleNewFeature,
  WrapperAsideBase,
  WrapperButtonNewData,
  WrapperContent,
  WrapperFooterFormNewFeature,
  WrapperFormNewData,
  WrapperHours,
  WrapperListFeature,
  WrapperListItems,
  WrapperMenuHours,
  WrapperOperation,
  WrapperOperations,
} from './styles';
import { ButtonComponent } from '../../components/ButtonComponent';
import { ModalComponent } from '../../components/ModalComponent';
import { DropDownComponent, Option } from '../../components/DropDownComponent';
import { weekDayServices } from '../../services/weekDayServices';
import { MultDropDownComponent } from '../../components/MultDropDownComponent';
import { useToast } from '../../hooks/useToast';
import { operationServices } from '../../services/operationServices';
import { useLoading } from '../../hooks/useLoading';
import { useStore } from '../../hooks/useStore';
import { SideBarDetailComponent } from '../../components/SideBarDetailComponent';
import { ButtonIconComponent } from '../../components/ButtonIconComponent';
import { Add, Edit, Trash } from 'iconsax-react';
import { useTheme } from 'styled-components';
import { useDialog } from '../../hooks/useDialog';
import { DayWeek, IItem, IStoreFull } from '../../Interfaces';
import { CardItemComponent } from '../../components/_settings/CardItemComponent';
import { SearchBar } from '../../components/SearchBar';
import { InputComponent } from '../../components/InputComponent';
import { AnimatePresence } from 'framer-motion';
import { X } from '@phosphor-icons/react';
import { itemServices } from '../../services/itemServices';
import { DetailsItem } from '../../components/_settings/DetailsItem';
import { FormEditProfile } from '../../components/_settings/FormEditProfile';
import { storeServices } from '../../services/storeServices';
import { useAuth } from '../../context/auth';
import { DropZone } from '../../components/DropZone';

const hours = [] as Option[];

export interface Features {
  name: string;
  description: string;
}

export function Setting() {
  const { store, fetchStore, items, fetchItems } = useStore();
  const { setUser } = useAuth();
  const { COLORS } = useTheme();
  const { onOpenDialog, onCloseDialog } = useDialog();

  const { onShowToast } = useToast();
  const { onShowLoading, onHiddeLoading } = useLoading();

  const [weekDays, setWeekDays] = useState<Option[]>([]);

  const [urlImage, setUrlImage] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [hourOpen, setHourOpen] = useState<Option | null>(null);
  const [hourClose, setHourClose] = useState<Option | null>(null);
  const [arrayWeekDays, setArrayWeekDays] = useState<Option[]>([]);

  //detalhes
  const [openDetails, setOpenDetails] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  //item
  const [search, setSearch] = useState('');
  const [currentItem, setCurrentItem] = useState<IItem | null>(null);
  const [openModalNewItem, setOpenModalNewItem] = useState(false);
  const [openModalNewFeature, setOpenModalNewFeature] = useState(false);

  const [nameItem, setNameItem] = useState('');
  const [descriptionItem, setDescriptionItem] = useState('');
  const [features, setFeatures] = useState<Features[]>([]);
  const [nameFeature, setNameFeature] = useState('');
  const [descriptionFeature, setDescriptionFeature] = useState('');
  const [isEditingI, setIsEditingI] = useState(false);

  //profile
  const [profileEdit, setProfileEdit] = useState<IStoreFull | null>(null);
  const [openModalEditProfile, setOpenModalEditProfile] = useState(false);
  const [openModalEditPhoto, setOpenModalEditPhoto] = useState(false);
  const [fileImage, setFileImage] = useState<File | null>(null);

  async function fetchWeekDays() {
    try {
      onShowLoading();

      const res = await weekDayServices.getItems();

      const weekD = [] as Option[];

      for (const weekDay of res) {
        weekD.push({
          id: String(weekDay.index),
          label: weekDay.day,
        });
      }

      setWeekDays(weekD);
      onHiddeLoading();
    } catch (error) {
      console.log(error);
      onHiddeLoading();
    }
  }

  async function saveOperationHour() {
    try {
      if (hourOpen && hourClose && arrayWeekDays.length > 0) {
        onShowLoading();

        await operationServices.create(
          hourOpen.label,
          hourClose.label,
          arrayWeekDays.reduce((acc, obj) => {
            acc.push(Number(obj.id));
            return acc;
          }, [] as number[]),
          store!.id
        );

        await fetchStore();
        onHiddeLoading();
        setOpenModal(false);

        onShowToast({
          status: 'SUCCESS',
          text: 'Horário de funcionamento salvo',
        });
      } else {
        onShowToast({
          status: 'WARNING',
          text: 'Todos os campos são obrigatórios',
        });
      }
    } catch (error) {
      onHiddeLoading();
      onShowToast({
        status: 'ERROR',
        text: 'Algo deu errado ao tentar salvar o horário.',
      });
    }
  }

  async function saveEditOperationHour() {
    try {
      if (hourOpen && hourClose && arrayWeekDays.length > 0 && isEditing) {
        onShowLoading();

        const res = await operationServices.updateHour(
          Number(arrayWeekDays[0].id),
          hourOpen.label,
          hourClose.label
        );

        await fetchStore();
        onHiddeLoading();
        setOpenModal(false);
        setIsEditing(false);

        onShowToast({
          status: 'SUCCESS',
          text: res.message,
        });
      } else {
        onShowToast({
          status: 'WARNING',
          text: 'Os horários são obrigatórios',
        });
      }
    } catch (error) {
      onHiddeLoading();
      onShowToast({
        status: 'ERROR',
        text: 'Algo deu errado ao tentar editar o horário.',
      });
    }
  }

  function handleDeleteHourOperation(operationId: number) {
    onOpenDialog({
      text: 'Deseja realmente deletar o horário de funcionamento?',
      onActionCancel: () => onCloseDialog(),
      onActionConfirm: () => deleteHourOperation(operationId),
    });
  }

  function handleEditHourOperation(
    open: string,
    close: string,
    weekday: DayWeek
  ) {
    setHourOpen({ id: '1', label: open });
    setHourClose({ id: '1', label: close });
    setArrayWeekDays([{ id: weekday.id, label: weekday.day }]);

    setIsEditing(true);
    setOpenModal(true);
  }

  async function deleteHourOperation(operationId: number) {
    try {
      onShowLoading();

      const res = await operationServices.deleteHour(operationId);

      await fetchStore();

      onHiddeLoading();
      onCloseDialog();

      onShowToast({
        status: 'SUCCESS',
        text: res.message,
      });
    } catch (error) {
      onHiddeLoading();
      onShowToast({
        status: 'ERROR',
        text: 'Algo deu errado ao tentar deletar o horário.',
      });
    }
  }

  ///item
  async function saveNewItem() {
    if (nameItem && descriptionItem) {
      try {
        onShowLoading();

        await itemServices.save(nameItem, descriptionItem, features);
        await fetchItems();

        onHiddeLoading();
        setOpenModalNewItem(false);

        onShowToast({
          status: 'SUCCESS',
          text: 'Item salvo com sucesso.',
        });
      } catch (error) {
        console.log(error);
        onHiddeLoading();
        onShowToast({
          status: 'ERROR',
          text: 'Algo deu errado ao tentar salvar o item.',
        });
      }
    } else {
      onShowToast({
        status: 'WARNING',
        text: 'Nome e descrição são obrigatórios',
      });
    }
  }

  async function deleteItem(itemId: number) {
    try {
      onCloseDialog();
      onShowLoading();

      const res = await itemServices.deleteItem(itemId);

      setCurrentItem(null);
      // await fetchStore();
      await fetchItems();

      onHiddeLoading();

      onShowToast({
        status: 'SUCCESS',
        text: res.message,
      });
    } catch (error) {
      onHiddeLoading();
      onShowToast({
        status: 'ERROR',
        text: 'Algo deu errado ao tentar deletar o item.',
      });
    }
  }

  async function saveEditItem() {
    if (nameItem && descriptionItem) {
      try {
        onShowLoading();

        await itemServices.updateItem(
          currentItem!.id,
          nameItem,
          descriptionItem,
          features
        );

        await fetchStore();
        await fetchItems();

        setOpenModalNewItem(false);
        onHiddeLoading();

        onShowToast({
          status: 'SUCCESS',
          text: 'Item editado com sucesso.',
        });
      } catch (error) {
        console.log(error);
        onHiddeLoading();
        onShowToast({
          status: 'ERROR',
          text: 'Algo deu errado ao tentar editar o item.',
        });
      }
    } else {
      onShowToast({
        status: 'WARNING',
        text: 'Nome e descrição são obrigatórios',
      });
    }
  }

  function handleEditItem() {
    setNameItem(currentItem!.name);
    setDescriptionItem(currentItem!.description);

    if (currentItem && currentItem.specificAttributes) {
      const attributes = JSON.parse(
        currentItem.specificAttributes
      ) as Features[];

      setFeatures(attributes);
    }

    setIsEditingI(true);
    setOpenModalNewItem(true);
  }

  function addNewFeature() {
    if (nameFeature && descriptionFeature) {
      setFeatures((prev) => [
        ...prev,
        { name: nameFeature, description: descriptionFeature },
      ]);

      setOpenModalNewFeature(false);
      setNameFeature('');
      setDescriptionFeature('');
    }
  }

  //profile
  async function saveEditProfile() {
    try {
      onShowLoading();

      const res = await storeServices.updateProfile(profileEdit!);
      setUser(res);

      setOpenModalEditProfile(false);
      onHiddeLoading();

      onShowToast({
        status: 'SUCCESS',
        text: 'Perfil editado com sucesso.',
      });
    } catch (error) {
      console.log(error);
      onHiddeLoading();
      onShowToast({
        status: 'ERROR',
        text: 'Algo deu errado ao tentar editar o item.',
      });
    }
  }
  async function saveNewImage() {
    try {
      onShowLoading();

      const res = await storeServices.editImage(
        store!.id,
        fileImage!,
        store!.email
      );

      const token = localStorage.getItem('token');
      res.token = token ?? '';

      setUser(res);
      setOpenModalEditPhoto(false);
      onHiddeLoading();

      onShowToast({
        status: 'SUCCESS',
        text: 'Imagem editada com sucesso.',
      });
    } catch (error) {
      console.log(error);
      onHiddeLoading();
      onShowToast({
        status: 'ERROR',
        text: 'Algo deu errado ao tentar editar a imagem.',
      });
    }
  }

  useEffect(() => {
    fetchStore();
    fetchWeekDays();

    for (let index = 0; index < 24; index++) {
      hours.push({
        id: String(index),
        label: `${index.toString().padStart(2, '0')}:00`,
      });
    }
  }, []);

  useEffect(() => {
    if (store) {
      setUrlImage(
        URL.createObjectURL(resolveImage.handleBuffer(store.img[0].data))
      );
    }

    if (items.length > 0) {
      if (currentItem) {
        setCurrentItem(items.find((f) => f.id === currentItem!.id)!);
      } else {
        setCurrentItem(items[0]);
      }
    }
  }, [store, items]);

  return (
    <WrapperPage>
      <HeaderTitle>{store?.name}</HeaderTitle>

      <Spacing spacing={0} />

      <WrapperContent>
        <WrapperAsideBase>
          <BtnEditLogout
            text="Sair"
            variant="GHOST"
            onClick={() => {
              localStorage.clear();
              location.reload();
            }}
          />

          <BtnEditProfile
            variant="GHOST"
            icon={<Edit size={16} />}
            onClick={() => setOpenModalEditProfile(true)}
          />

          <BtnEditImage
            icon={<Edit size={14} />}
            onClick={() => setOpenModalEditPhoto(true)}
          />

          <Avatar size="xl" src={urlImage} name="Summer" />

          <Spacing spacing={16} />

          <GroupInfo>
            <TitleInfo>E-mail</TitleInfo>
            <TextInfo> {store?.email}</TextInfo>
          </GroupInfo>

          <GroupInfo>
            <TitleInfo>CNPJ</TitleInfo>
            <TextInfo> {store && format.cnpj(store.cnpj)}</TextInfo>
          </GroupInfo>

          <Line />
          <Spacing spacing={0} />

          <GroupInfo>
            <TitleInfo>CEP</TitleInfo>
            <TextInfo>
              {' '}
              {store && store.address && format.cep(store.address.zipCode)}
            </TextInfo>
          </GroupInfo>

          <GroupWrapper>
            <GroupInfo>
              <TitleInfo>Rua</TitleInfo>
              <TextInfo> {store?.address?.street ?? ''}</TextInfo>
            </GroupInfo>

            <GroupInfo>
              <TitleInfo>Número</TitleInfo>
              <TextInfo> {store?.address?.number}</TextInfo>
            </GroupInfo>
          </GroupWrapper>

          <GroupInfo>
            <TitleInfo>Bairro</TitleInfo>
            <TextInfo> {store?.address?.neighborhood}</TextInfo>
          </GroupInfo>

          <GroupInfo>
            <TitleInfo>Cidade</TitleInfo>
            <TextInfo>
              {' '}
              {store?.address?.city} - {store?.address?.uf}
            </TextInfo>
          </GroupInfo>

          <Spacing spacing={16} />

          <ButtonComponent
            style={{ width: '238px' }}
            text="Horários de funcionamento"
            variant="OUTLINE"
            onClick={() => setOpenDetails(true)}
          />
        </WrapperAsideBase>

        <WrapperListItems>
          <TextInfo>Lista de itens agendaveis</TextInfo>

          <HeaderListItems>
            <SearchBar
              placeholder="Busque pelo nome"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <ButtonIconComponent
              icon={<Add size="20" color={COLORS.GRAY_100} />}
              onClick={() => setOpenModalNewItem(true)}
            />
          </HeaderListItems>

          <ListItems>
            {currentItem &&
              items
                .filter((f) =>
                  search
                    ? f.name.toLowerCase().includes(search.toLowerCase())
                    : f
                )
                .map((item) => (
                  <CardItemComponent
                    key={item.id}
                    item={item}
                    isActive={currentItem.id === item.id}
                    onClick={() => setCurrentItem(item)}
                  />
                ))}
          </ListItems>
        </WrapperListItems>

        {currentItem && (
          <DetailsItem
            item={currentItem}
            onActionDeleteItem={deleteItem}
            onActionEditItem={handleEditItem}
          />
        )}
      </WrapperContent>

      <ModalComponent
        title="Criar novo item"
        toggleOpen={openModalNewItem}
        onActionCancel={setOpenModalNewItem}
        onActionConfirm={isEditingI ? saveEditItem : saveNewItem}
        isDisableConfirm={nameItem && descriptionItem ? false : true}
      >
        <InputComponent
          placeholder="Nome do item"
          value={nameItem}
          onChange={(e) => setNameItem(e.target.value)}
        />
        <InputComponent
          placeholder="Descrição breve do item"
          value={descriptionItem}
          onChange={(e) => setDescriptionItem(e.target.value)}
        />

        <SpanInfo>
          Para adicionar mais caracteristicas, clique no botão {<br />} abaixo e
          informe o nome e a descrição.
        </SpanInfo>

        <WrapperButtonNewData>
          <ButtonComponent
            style={{ width: '100%' }}
            variant="OUTLINE"
            text="Adicionar outras caracteristicas"
            onClick={() => setOpenModalNewFeature(true)}
          />

          <AnimatePresence mode="wait">
            {openModalNewItem && openModalNewFeature && (
              <WrapperFormNewData
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{
                  ease: 'linear',
                  duration: 0.1,
                }}
              >
                <TitleNewFeature> Nova característica</TitleNewFeature>
                <InputComponent
                  placeholder="Nome da caracteristica, ex: 'Cor'"
                  value={nameFeature}
                  onChange={(e) => setNameFeature(e.target.value)}
                />
                <InputComponent
                  placeholder="Descrição da caracteristica, ex: 'Vermelho'"
                  value={descriptionFeature}
                  onChange={(e) => setDescriptionFeature(e.target.value)}
                />

                <WrapperFooterFormNewFeature>
                  <ButtonComponent
                    variant="CANCEL"
                    text="Cancelar"
                    onClick={() => setOpenModalNewFeature(false)}
                  />
                  <ButtonComponent
                    isDisable={nameFeature && descriptionFeature ? false : true}
                    variant="SOLID"
                    text="Adicionar"
                    onClick={addNewFeature}
                  />
                </WrapperFooterFormNewFeature>
              </WrapperFormNewData>
            )}
          </AnimatePresence>
        </WrapperButtonNewData>

        <WrapperListFeature>
          {features.length > 0 && (
            <>
              <TitleInfo>Lista de caracteristicas adicionais</TitleInfo>

              {features.map((f, i) => (
                <GroupWrapper
                  key={i}
                  style={{ flexDirection: 'column', gap: 0 }}
                >
                  <TextInfo>{f.name}</TextInfo>
                  <TitleInfo>{f.description}</TitleInfo>

                  <BtnRemoveFeature
                    variant="GHOST"
                    icon={
                      <X
                        size={16}
                        onClick={() => {
                          setFeatures(
                            features.filter((fe) => fe.name !== f.name)
                          );
                        }}
                      />
                    }
                  />
                </GroupWrapper>
              ))}
            </>
          )}
        </WrapperListFeature>
      </ModalComponent>

      <ModalComponent
        title="Novo horário de funcionamento"
        toggleOpen={openModal}
        onActionConfirm={isEditing ? saveEditOperationHour : saveOperationHour}
        onActionCancel={setOpenModal}
        isDisableConfirm={
          hourOpen && hourClose && arrayWeekDays.length > 0 ? false : true
        }
      >
        <GroupWrapper>
          <DropDownComponent
            placeholder="Horário de abertura"
            onChangeOption={setHourOpen}
            value={hourOpen}
            options={hours}
          />

          <DropDownComponent
            isDisable={hourOpen ? false : true}
            placeholder="Horário de fechamento"
            onChangeOption={setHourClose}
            value={hourClose}
            options={hours.filter((_, i) => hours.indexOf(hourOpen!) < i)}
          />
        </GroupWrapper>

        <MultDropDownComponent
          placeholder="Dia da semana"
          onChangeOption={setArrayWeekDays}
          values={arrayWeekDays}
          options={weekDays}
          isDisable={isEditing}
        />
      </ModalComponent>

      <ModalComponent
        title="Editar perfil"
        toggleOpen={openModalEditProfile}
        onActionConfirm={saveEditProfile}
        onActionCancel={setOpenModalEditProfile}
        isDisableConfirm={profileEdit ? false : true}
      >
        <FormEditProfile onChangeProfileEdit={setProfileEdit} />
      </ModalComponent>

      <ModalComponent
        title="Editar Imagem"
        toggleOpen={openModalEditPhoto}
        onActionConfirm={saveNewImage}
        onActionCancel={setOpenModalEditPhoto}
        isDisableConfirm={fileImage ? false : true}
      >
        <DropZone onGetFile={setFileImage} />
      </ModalComponent>

      <SideBarDetailComponent
        title="Horários de funcionamento"
        open={openDetails}
        onClose={setOpenDetails}
      >
        <WrapperOperations>
          {store &&
            store.operation &&
            store.operation.length > 0 &&
            normalizeOperations
              .normalize(store.operation)
              .map((operation, index) => (
                <WrapperOperation key={index}>
                  <TextInfo style={{ color: COLORS.ACCENT_300 }}>
                    {operation.dayWeek.day}
                  </TextInfo>

                  {operation.hours.map((hour, indice) => {
                    return (
                      <WrapperHours key={indice}>
                        <GroupInfo>
                          <TitleInfo>Abre</TitleInfo>
                          <TextInfo>{hour.open}</TextInfo>
                        </GroupInfo>

                        <TitleInfo>-</TitleInfo>

                        <GroupInfo>
                          <TitleInfo>Fecha</TitleInfo>
                          <TextInfo>{hour.close}</TextInfo>
                        </GroupInfo>

                        <WrapperMenuHours>
                          <ButtonIconComponent
                            variant="CANCEL"
                            icon={<Edit size="16" />}
                            onClick={() =>
                              handleEditHourOperation(
                                hour.open,
                                hour.close,
                                operation.dayWeek
                              )
                            }
                          />

                          <ButtonIconComponent
                            variant="CANCEL"
                            icon={<Trash size="16" />}
                            onClick={() =>
                              handleDeleteHourOperation(
                                Number(operation.dayWeek.id)
                              )
                            }
                          />
                        </WrapperMenuHours>
                      </WrapperHours>
                    );
                  })}

                  {store &&
                    store.operation &&
                    normalizeOperations.normalize(store.operation).length -
                      1 !==
                      index && <Line />}
                </WrapperOperation>
              ))}
        </WrapperOperations>

        <Spacing spacing={16} />

        <ButtonComponent
          text="Novo horário"
          onClick={() => setOpenModal(true)}
          style={{ width: '92%' }}
        />
      </SideBarDetailComponent>
    </WrapperPage>
  );
}
