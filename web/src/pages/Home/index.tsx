import { WrapperPage } from '../../components/WrapperPage';
import {
  GroupInfo,
  GroupWrapper,
  TextInfo,
  TitleInfo,
  WrapperContent,
  WrapperContentSchedule,
  WrapperTagsItems,
  WrapperTagsListItems,
  WrapperTool,
  WrapperToolBar,
} from './styles';
import { useEffect, useState } from 'react';
import { DatePicker } from '../../components/DatePicker';
import { Spacing } from '../../components/Spacing';
import { SearchBar } from '../../components/SearchBar';
import { ModalComponent } from '../../components/ModalComponent';
import { Add } from 'iconsax-react';
import { useTheme } from 'styled-components';
import { ButtonComponent } from '../../components/ButtonComponent';
import { NewSchedule } from '../../components/_home/NewSchedule';
import { schedulingServices } from '../../services/schedulingServices';
import { Option } from '../../components/DropDownComponent';
import { useLoading } from '../../hooks/useLoading';
import { useToast } from '../../hooks/useToast';
import { useStore } from '../../hooks/useStore';
import { PanelScheduledComponent } from '../../components/PanelScheduledComponent';
import { SideBarDetailComponent } from '../../components/SideBarDetailComponent';
import { IScheduling } from '../../Interfaces';
import { format } from '../../helpers/format';
import { useDialog } from '../../hooks/useDialog';
import { operationServices } from '../../services/operationServices';
import { TagComponent } from '../../components/TagComponent';
import { HeaderTitle } from '../../components/HeaderTitle';

export function Home() {
  const { COLORS } = useTheme();
  const { onShowLoading, onHiddeLoading } = useLoading();
  const { onShowToast } = useToast();
  const { onOpenDialog, onCloseDialog } = useDialog();
  const { fetchItems, items } = useStore();

  const [startDate, setStartDate] = useState(new Date());
  const [toggleOpenModal, setToggleOpenModal] = useState(false);
  const [searchSchedule, setSearchSchedule] = useState('');
  const [searchItem, setSearchItem] = useState('');
  const [filterItemSchedule, setFilterSchedule] = useState(0);
  // const [items, setItems] = useState<IItem[]>([]);

  //sideBar
  const [openDetails, setOpenDetails] = useState(false);
  const [currentScheduled, setCurrentScheduled] = useState<IScheduling | null>(
    null
  );

  ///modal
  const [schedulingDate, setSchedulingDate] = useState(new Date());
  const [currentItem, setCurrentItem] = useState<Option | null>(null);
  const [hourStart, setHourStart] = useState<Option | null>(null);
  const [hourEnd, setHourEnd] = useState<Option | null>(null);
  const [nameOwner, setNameOwner] = useState('');

  async function saveScheduling() {
    if (hourStart && hourEnd && currentItem) {
      try {
        onShowLoading();

        await schedulingServices.create(Number(currentItem.id), {
          date: schedulingDate.toJSON(),
          startTime: hourStart.label,
          endTime: hourEnd.label,
          ownerScheduled: nameOwner,
        });

        await fetchItems();
        onHiddeLoading();

        setToggleOpenModal(false);
        onShowToast({
          status: 'SUCCESS',
          text: 'Agendamento salvo com sucesso.',
        });
      } catch (error) {
        onHiddeLoading();
        console.log(error);

        onShowToast({
          status: 'ERROR',
          text: 'Algo deu errado ao tentar salvar o agendamento.',
        });
      }
    } else {
      onShowToast({
        status: 'WARNING',
        text: 'Todos os campos são obrigatórios.',
      });
    }
  }

  async function deleteScheduled() {
    try {
      onShowLoading();

      const res = (await operationServices.delete(
        String(currentScheduled!.id)
      )) as { message: string };

      await fetchItems();
      onHiddeLoading();
      onCloseDialog();
      setOpenDetails(false);
      setCurrentScheduled(null);

      onShowToast({
        status: 'SUCCESS',
        text: res.message,
      });
    } catch (error) {
      console.log(error);
      onHiddeLoading();
      onCloseDialog();
      onShowToast({
        status: 'ERROR',
        text: 'Erro ao tentar deletar o agendamento.',
      });
    }
  }

  function handleDeleteScheduled() {
    onOpenDialog({
      text: `Deseja realmente deletar esse agendamento?`,
      onActionCancel: () => onCloseDialog(),
      onActionConfirm: () => deleteScheduled(),
    });
  }

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    if (items.length > 0) {
      if (currentItem) {
        const i = items.find((f) => f.id === Number(currentItem.id))!;

        setCurrentItem({ id: String(i.id), label: i.name });
      } else {
        setFilterSchedule(items[0].id);
      }
    }
  }, [items]);

  return (
    <WrapperPage>
      <HeaderTitle>Agenda</HeaderTitle>

      <Spacing spacing={0} />

      <WrapperContent>
        <WrapperTagsItems>
          <TextInfo>Itens agendaveis</TextInfo>
          <SearchBar
            placeholder="Busque pelo nome do item"
            value={searchItem}
            onChange={(e) => setSearchItem(e.target.value)}
          />

          <Spacing spacing={0} />

          <WrapperTagsListItems>
            {items
              .filter((f) =>
                searchItem
                  ? f.name.toLowerCase().includes(searchItem.toLowerCase())
                  : f
              )
              .map((item) => (
                <TagComponent
                  key={item.id}
                  text={item.name}
                  isActive={filterItemSchedule === item.id}
                  onClick={() => setFilterSchedule(item.id)}
                />
              ))}
          </WrapperTagsListItems>
        </WrapperTagsItems>

        <WrapperContentSchedule>
          <WrapperToolBar>
            <WrapperTool>
              <DatePicker currentDate={startDate} onChangeDate={setStartDate} />

              <SearchBar
                style={{ width: '250px' }}
                placeholder="Busque pelo nome de quem agendou"
                value={searchSchedule}
                onChange={(e) => setSearchSchedule(e.target.value)}
              />
            </WrapperTool>

            <WrapperTool>
              <ButtonComponent
                variant="SOLID"
                icon={<Add size="20" color={COLORS.GRAY_100} />}
                positionIcon="RIGHT"
                text="Criar"
                onClick={() => setToggleOpenModal(true)}
              />
            </WrapperTool>
          </WrapperToolBar>

          <PanelScheduledComponent
            onFocusScheduled={setCurrentScheduled}
            onOpenDetailsScheduled={setOpenDetails}
            currentDate={startDate}
            search={searchSchedule}
            items={items.filter((f) => f.id === filterItemSchedule)}
          />
        </WrapperContentSchedule>
      </WrapperContent>

      <ModalComponent
        title="Criar agendamento"
        toggleOpen={toggleOpenModal}
        onActionCancel={setToggleOpenModal}
        onActionConfirm={saveScheduling}
        isDisableConfirm={
          currentItem && hourStart && hourEnd && nameOwner ? false : true
        }
      >
        <NewSchedule
          items={items}
          schedulingDate={schedulingDate}
          onChangeSchedulingDate={setSchedulingDate}
          currentItem={currentItem}
          onChangeCurrentItem={setCurrentItem}
          hourStart={hourStart}
          onChangeHourStart={setHourStart}
          hourEnd={hourEnd}
          onChangeHourEnd={setHourEnd}
          nameOwner={nameOwner}
          onChangeNameOwner={setNameOwner}
        />
      </ModalComponent>

      <SideBarDetailComponent
        title="Detalhes do agendamento"
        open={openDetails}
        onClose={setOpenDetails}
      >
        {currentScheduled && (
          <>
            <GroupInfo>
              <TitleInfo>Agendado por</TitleInfo>
              <TextInfo>{currentScheduled.ownerScheduled}</TextInfo>
            </GroupInfo>

            <Spacing spacing={0} />

            <GroupWrapper>
              <GroupInfo>
                <TitleInfo>Data</TitleInfo>
                <TextInfo>
                  {format.dataScheduledFull(new Date(currentScheduled.date))}
                </TextInfo>
              </GroupInfo>

              <GroupInfo>
                <TitleInfo>Inicia</TitleInfo>
                <TextInfo>
                  {format.hourScheduled(currentScheduled.startTime)}
                </TextInfo>
              </GroupInfo>

              <GroupInfo>
                <TitleInfo>Finaliza</TitleInfo>
                <TextInfo>
                  {format.hourScheduled(currentScheduled.endTime)}
                </TextInfo>
              </GroupInfo>
            </GroupWrapper>

            <Spacing spacing={0} />

            <GroupInfo>
              <TitleInfo>Item agendado</TitleInfo>
              <TextInfo>
                {
                  items.find(
                    (f) => f.id === currentScheduled!.itemSchedulableId
                  )?.name
                }
              </TextInfo>
            </GroupInfo>

            <Spacing spacing={0} />

            <GroupInfo>
              <TitleInfo>Agendado</TitleInfo>
              <TextInfo>
                {format.dataScheduledFull(
                  new Date(currentScheduled.createdAt!)
                )}
              </TextInfo>
            </GroupInfo>

            <Spacing spacing={16} />

            <ButtonComponent
              variant="CANCEL"
              text="Deletar agendamento"
              onClick={handleDeleteScheduled}
            />
          </>
        )}
      </SideBarDetailComponent>
    </WrapperPage>
  );
}
