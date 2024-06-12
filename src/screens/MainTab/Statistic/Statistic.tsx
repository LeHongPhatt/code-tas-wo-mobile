import Icon from 'assets/svg/Icon';
import {
  BottomSheetModalContainer,
  Buttons,
  HomeLayout,
  SelecterPicker,
  TextCus,
  TouchCus,
  WorkComponent,
} from 'components';
import {BottomSheetCommon} from 'components/BottomSheet';
import {useNotify, useStatistic} from 'hooks';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {FlatList, InteractionManager, ScrollView, View} from 'react-native';
import {Divider} from 'react-native-paper';
import {Colors} from 'theme';
import {
  EAction,
  EStatisticTab,
  IRefBottom,
  IStatistic,
  IStatisticParams,
  SELECT_OPTION,
  EActionModal,
} from 'types';
import {
  checkDayIsAfter,
  formatCurrency,
  formatDMY,
  formatDMYIso,
  getHeight,
  getNow,
  getPrevDay,
  getPrevMonth,
  getWidth,
  styleSpacing,
} from 'utils';
import styles from './styles';
import Form from './Form';
// import {Form} from '../Home/Screens/Driver/Components';
// import {Form} from './Components';

const data = [{}, {}, {}, {}];

const Statistic = () => {
  const [itemSelected, setItemSelected] = useState();
  const [showModal, setShowModal] = useState('');
  const [action, setAction] = useState('');
  const [tabActive, setTabActive] = useState<EStatisticTab>(EStatisticTab.post);
  const [statistic, setStatistic] = useState<IStatistic | null>(null);
  const [startDate, setStartDate] = useState<string>(getPrevMonth());
  const [endDate, setEndDate] = useState<string>(getNow());
  const [search, setSearch] = useState<string>('');
  const refModalStartDate = useRef<IRefBottom>(null);
  const refModalEndDate = useRef<IRefBottom>(null);
  const {onGetStatistic} = useStatistic();
  const {info} = useNotify();

  useEffect(() => {
    _onGetStatistic({
      page: 1,
      limit: 10,
      type: tabActive,
      startTime: formatDMYIso(startDate),
      endTime: formatDMYIso(endDate),
    });
  }, [onGetStatistic, tabActive, startDate, endDate]);

  const _onGetStatistic = ({
    page,
    limit,
    type,
    startTime,
    endTime,
    keyword,
  }: IStatisticParams) => {
    onGetStatistic(
      {
        page: page,
        limit: limit,
        type: type,
        startTime: startTime,
        endTime: endTime,
        keyword: keyword,
      },
      rs =>
        Array.isArray(rs?.data?.result) && setStatistic(rs?.data?.result[0]),
    );
  };

  const _onChangeTab = (tab: EStatisticTab) => {
    setTabActive(tab);
  };

  const mapBgByStatus = (status: EAction) => {
    switch (status) {
      case EAction.PENDING:
        return styles.pending;
      case EAction.RECEIVED:
        return styles.received;
      case EAction.CANCELED:
        return styles.canceled;
      case EAction.COMPLAIN:
        return styles.complain;
      default:
        return;
    }
  };

  const _onConfirmStartDate = (date: any) => {
    if (checkDayIsAfter(formatDMY(date), endDate)) {
      setStartDate(formatDMY(date));
      InteractionManager.runAfterInteractions(() => {
        refModalStartDate.current?.close();
        refModalEndDate.current?.show();
      });
    } else {
      info('Thông báo', 'Ngày bắt đầu không được lớn hơn ngày kết thúc');
    }
  };

  const _onConfirmEndDate = (date: any) => {
    if (checkDayIsAfter(startDate, formatDMY(date))) {
      setEndDate(formatDMY(date));
      InteractionManager.runAfterInteractions(() => {
        refModalEndDate.current?.close();
      });
    } else {
      info('Thông báo', 'Ngày kết thúc không được nhỏ hơn ngày bắt đầu');
    }
  };

  const _onSearchStatistic = (text: string) => {
    _onGetStatistic({
      page: 1,
      limit: 10,
      type: tabActive,
      startTime: formatDMYIso(startDate),
      endTime: formatDMYIso(endDate),
      keyword: text,
    });
  };
  const onEditTicket = formData => {
    setShowModal(false);
  };

  const headerProps = {
    notGoBack: true,
    renderCenter: () => (
      <TextCus black medium>
        Công việc của tôi
      </TextCus>
    ),
    renderRight: () => (
      <TouchCus onPress={() => setAction(EAction.SEARCH)}>
        <Icon.Search />
      </TouchCus>
    ),
  };

  const itemDivider = () => {
    return <View style={getHeight(12)} />;
  };

  const renderTransactionItem = useCallback(({item}) => {
    return (
      <TouchCus key={item} onPress={() => {}}>
        <View
          style={[
            styles.wrapCard,
            styles.wrapShadow,
            styles.cenItem,
            styles.row,
            styleSpacing('px-12'),
            styleSpacing('py-8'),
          ]}>
          {Icon.LocationInfo({color: Colors.mainLight})}
          <View style={[styles.flex1, styleSpacing('ml-8')]}>
            <View style={[styles.row, styles.spaceItem]}>
              <View
                style={[
                  styles.radius37,
                  styleSpacing('px-8'),
                  styleSpacing('py-4'),
                  {backgroundColor: Colors.cardOwner},
                ]}>
                <TextCus label2>{`#${item?.drive_code}`}</TextCus>
              </View>
              <View
                style={[
                  styles.radius37,
                  styleSpacing('px-8'),
                  styleSpacing('py-4'),
                  mapBgByStatus(item?.status),
                ]}>
                <TextCus label2 whiteColor useI18n>
                  {item?.status}
                </TextCus>
              </View>
            </View>
            <TextCus mainLightColor body2 medium mt-4>
              {item?.name}
            </TextCus>
            <View style={[styles.row, styles.spaceItem, styleSpacing('mt-4')]}>
              <TextCus caption1 bgInput>
                {formatDMY(item?.createdAt)}
              </TextCus>
              <TextCus caption1 mainLightColor medium style={styles.shrinkTxt}>
                {`${formatCurrency(item?.amount)}`}đ
              </TextCus>
            </View>
          </View>
        </View>
      </TouchCus>
    );
  }, []);

  const renderData = () => {
    return (
      <View style={{marginTop: 12}}>
        <WorkComponent />
      </View>
    );
  };

  const optAction = {action, setAction};

  return (
    <>
      <HomeLayout
        statusBarMode={'dark-content'}
        // bgColor={Colors.white}
        header={{...headerProps}}
        {...optAction}
        inputProps={{
          onChangeText: text => {
            setSearch(text);
            setTimeout(() => _onSearchStatistic(text), 2000);
          },
          value: search,
        }}
        onPress={() => _onSearchStatistic(search)}>
        <View style={styles.container}>
          <View style={styles.row}>
            <TouchCus
              style={styles.flex1}
              onPress={() => _onChangeTab(EStatisticTab.post)}>
              <View
                style={[
                  styles.cenItemvh,
                  getHeight(33),
                  tabActive === EStatisticTab.post
                    ? styles.tabSelected
                    : styles.tabUnselected,
                ]}>
                <TextCus
                  caption1
                  medium
                  mainColor={tabActive === EStatisticTab.post}
                  bgInput={tabActive === EStatisticTab.pick}>
                  Giao việc
                </TextCus>
              </View>
            </TouchCus>
            <TouchCus
              style={styles.flex1}
              onPress={() => _onChangeTab(EStatisticTab.pick)}>
              <View
                style={[
                  styles.cenItemvh,
                  getHeight(33),
                  tabActive === EStatisticTab.pick
                    ? styles.tabSelected
                    : styles.tabUnselected,
                ]}>
                <TextCus
                  caption1
                  medium
                  mainColor={tabActive === EStatisticTab.pick}
                  bgInput={tabActive === EStatisticTab.post}>
                  Việc của tôi
                </TextCus>
              </View>
            </TouchCus>

            <TouchCus
              style={styles.flex1}
              onPress={() => _onChangeTab(EStatisticTab.end)}>
              <View
                style={[
                  styles.cenItemvh,
                  getHeight(33),
                  tabActive === EStatisticTab.end
                    ? styles.tabSelected
                    : styles.tabUnselected,
                ]}>
                <TextCus
                  caption1
                  medium
                  mainColor={tabActive === EStatisticTab.end}
                  bgInput={tabActive === EStatisticTab.pick}>
                  Hoàn thành
                </TextCus>
              </View>
            </TouchCus>
          </View>
          <ScrollView
            style={{flex: 1}}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[styleSpacing('pt-16')]}>
            {/* {statistic?.drives && (
              <View style={styles.flex1}>
                <FlatList
                  data={statistic.drives}
                  scrollEnabled={false}
                  contentContainerStyle={[
                    styleSpacing('py-16'),
                    styleSpacing('px-16'),
                  ]}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={(_, index) => index.toString()}
                  ItemSeparatorComponent={itemDivider}
                  renderItem={renderTransactionItem}
                />
              </View>
            )} */}
            {data.map(renderData)}
            {/* <WorkComponent /> */}
          </ScrollView>
        </View>
        <TouchCus
          onPress={() => setShowModal(!showModal)}
          style={[styles.bg_button, styles.ra12]}>
          <TextCus whiteColor style={[styles.ffRo]}>
            Giao việc
          </TextCus>
        </TouchCus>
      </HomeLayout>

      {showModal ? (
        <BottomSheetModalContainer
          showIndicator
          title="Giao việc mới"
          onOk={() => {}}
          onClose={() => setShowModal('')}>
          <Form
            isEdit
            ticket={itemSelected}
            style={styleSpacing('mt-12')}
            onEdit={formData => onEditTicket(formData)}
            onClose={function (): void {
              throw new Error('Function not implemented.');
            }}
          />
        </BottomSheetModalContainer>
      ) : null}

      <BottomSheetCommon
        ref={refModalStartDate}
        pressBehavior="close"
        hideBackdrop>
        <SelecterPicker
          selectOptionTitle={'Từ ngày'}
          selectType={SELECT_OPTION.DATE_PICKER}
          maxDate={getPrevDay()}
          onCancelSelect={() => refModalStartDate.current?.close()}
          onConfirmSelect={_onConfirmStartDate}
          selectedPickerDate={startDate}
        />
      </BottomSheetCommon>
      <BottomSheetCommon
        ref={refModalEndDate}
        pressBehavior="close"
        hideBackdrop>
        <SelecterPicker
          selectOptionTitle={'Đến ngày'}
          selectType={SELECT_OPTION.DATE_PICKER}
          maxDate={getNow()}
          onCancelSelect={() => refModalEndDate.current?.close()}
          onConfirmSelect={_onConfirmEndDate}
          selectedPickerDate={endDate}
        />
      </BottomSheetCommon>
    </>
  );
};

export default Statistic;
