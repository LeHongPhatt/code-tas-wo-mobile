import BottomSheet from '@gorhom/bottom-sheet';
import Icon from 'assets/svg/Icon';
import {BottomSheetPicker, TextCus, TextInputs, TouchCus} from 'components';
import React, {Fragment, useRef, useState, useEffect} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {InteractionManager, Keyboard, View} from 'react-native';
import {Colors} from 'theme';
import {IItemFormCreateTicket, IRefBottom} from 'types';
import {getHeight, paymentMethod, width, withoutLeading0} from 'utils';
// import {PaymentSelected} from '../PaymentSelected';
import styles from './styles';
import {useAuth} from 'hooks';
import {BottomSheetCommon} from 'components/BottomSheet';
import {PaymentSelected} from '../PaymentSelected';

const Form = (props: IItemFormProps) => {
  const {profile} = useAuth();
  const refModalEndDate = useRef<IRefBottom>(null);
  const [user, setUser] = useState();
  useEffect(() => {
    profile && setUser(profile[0]);
  }, [profile]);

  const {style, isEdit = false, ticket, onSubmit, onEdit} = props;
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: {isDirty, isValid, isSubmitting},
  } = useForm<IItemFormCreateTicket>();
  const refModal = useRef<BottomSheet>(null);
  const {t} = useTranslation();

  const isFormError = () => (!isDirty || !isValid) && !isSubmitting;

  const initPaymentType = () => {
    const filterType = paymentMethod.filter(
      e => e.title === ticket?.payment_type,
    );
    if (filterType.length) {
      return filterType[0].title;
    } else {
      return undefined;
    }
  };

  const onConfirmed = value => {
    console.log('====value=========', value);
    setValue('paymentType', value.title);
    InteractionManager.runAfterInteractions(() => {
      refModal.current?.close();
    });
  };

  return (
    <Fragment>
      <View style={[styles.wrap, styles.wrapContent, style]}>
        <View style={(styles.p12, styles.wrapContent)}>
          <Controller
            control={control}
            name="name"
            defaultValue={ticket?.name ?? ''}
            rules={{required: true}}
            render={({field: {onChange, value}}) => (
              <View style={[styles.row, styles.spaceItem, styles.cenItem]}>
                <View style={styles.wp25}>
                  <TextCus body2>Tên việc</TextCus>
                </View>
                <TextInputs
                  style={[styles.input]}
                  autoCapitalize="none"
                  placeholder={'Thảo luận phác thảo Logo'}
                  onChangeText={onChange}
                  value={value.trimStart()}
                  color={Colors.colorLine}
                  success
                  useBottomSheet={true}
                />
              </View>
            )}
          />

          <Controller
            control={control}
            name="amount"
            rules={{required: true}}
            defaultValue={ticket?.amount ? ticket.amount.toString() : ''}
            render={({field: {onChange, value}}) => (
              <View style={[styles.row, styles.spaceItem, styles.cenItem]}>
                <View style={styles.wp25}>
                  <TextCus body2>Mô tả chi tiết</TextCus>
                </View>
                <TextInputs
                  style={[styles.input]}
                  autoCapitalize="none"
                  placeholder={
                    'Các bạn chuẩn bị một số phác thảo idea mình có nhé'
                  }
                  onChangeText={onChange}
                  value={value.trimStart()}
                  color={Colors.colorLine}
                  keyboardType="number-pad"
                  success
                  useBottomSheet={true}
                />
              </View>
            )}
          />
          <Controller
            control={control}
            name="groupDetailId"
            rules={{required: true}}
            defaultValue={
              ticket?.groupDetailId ? ticket.groupDetailId.toString() : ''
            }
            render={({field: {onChange, value}}) => (
              <View style={[styles.row, styles.spaceItem, styles.cenItem]}>
                <View style={styles.wp25}>
                  <TextCus body2>Phân nhóm</TextCus>
                </View>
                <TextInputs
                  style={[styles.input]}
                  autoCapitalize="none"
                  placeholder={'KINH DOANH MN'}
                  onChangeText={onChange}
                  value={value.trimStart()}
                  color={Colors.colorLine}
                  keyboardType="number-pad"
                  success
                  useBottomSheet={true}
                />
              </View>
            )}
          />
          <Controller
            control={control}
            name="paymentType"
            rules={{required: true}}
            defaultValue={initPaymentType()}
            render={({field: {onChange, value}}) => (
              <View style={[styles.row, styles.spaceItem, styles.cenItem]}>
                <View style={styles.wp25}>
                  <TextCus body2>Hình thức thanh toán</TextCus>
                </View>
                {/* <DropdownButtonCus
                  style={styleSpacing('mb-16')}
                  data={paymentMethod}
                  initValue={initPaymentType()}
                  defaultButtonText={'Chọn hình thức thanh toán'}
                  buttonStyle={{width: width * 0.6}}
                  renderDropdownIcon={
                    <View style={styleSpacing('mr-10')}>
                      {Icon.ChevronRight({color: Colors.border})}
                    </View>
                  }
                  onSelect={(selectedItem, _) => {
                    onChange(selectedItem.data);
                  }}
                /> */}
                <TouchCus
                  style={{width: width * 0.6}}
                  onPress={() => {
                    Keyboard.dismiss();
                    refModal.current?.snapToIndex(0);
                  }}>
                  <View pointerEvents="none">
                    <TextInputs
                      style={[styles.input]}
                      autoCapitalize="none"
                      placeholder={'Chọn hình thức thanh toán'}
                      color={Colors.colorLine}
                      success
                      onChangeText={onChange}
                      value={t(`${value ?? ''}`) ?? ''}
                      editable={false}
                      rightIcon={Icon.ChevronRight({color: Colors.border})}
                    />
                  </View>
                </TouchCus>
              </View>
            )}
          />

          <Controller
            control={control}
            name="commission"
            rules={{required: true, max: 100}}
            defaultValue={
              ticket?.commission ? ticket.commission.toString() : ''
            }
            render={({field: {onChange, value}}) => (
              <View style={[styles.row, styles.spaceItem, styles.cenItem]}>
                <View style={styles.wp25}>
                  <TextCus body2>Deadline </TextCus>
                </View>
                <TextInputs
                  style={[styles.input]}
                  autoCapitalize="none"
                  placeholder={'Nhập phần trăm'}
                  onChangeText={val => {
                    const newValue = withoutLeading0(val);
                    onChange(newValue);
                  }}
                  value={value.trimStart()}
                  color={Colors.colorLine}
                  keyboardType="number-pad"
                  success
                  useBottomSheet={true}
                />
              </View>
            )}
          />
          {/* {Number(getValues('commission')) > 100 && (
            <TextCus style={styles.fieldTextRequired}>
              {t('Không thể nhập chiết khấu vượt quá 100%')}
            </TextCus>
          )} */}
          <View style={[styles.row]}>
            <View />
            <TouchCus
              //   disabled={isFormError()}
              onPress={() => onSubmit && handleSubmit(onSubmit)()}
              style={[styles.cenItemvh, styles.btnDisabled]}>
              <TextCus whiteColor semibold mx-32>
                {'Hoàn tất'}
              </TextCus>
            </TouchCus>
          </View>
          <View style={getHeight(40)} />
        </View>
      </View>
      <BottomSheetPicker ref={refModal}>
        <PaymentSelected
          initValue={initPaymentType()}
          control={control}
          onCancelSelect={() => refModal.current?.close()}
          onConfirmSelect={value => onConfirmed(value)}
        />
      </BottomSheetPicker>
      <BottomSheetCommon
        ref={refModalEndDate}
        pressBehavior="close"
        hideBackdrop>
        <TextCus>jahsdkjhákj</TextCus>
      </BottomSheetCommon>
    </Fragment>
  );
};

interface IItemFormProps {
  style?: any;
  isEdit?: boolean;
  ticket?: IItemFormCreateTicket;
  onSubmit?: (a: any) => void;
  onEdit?: (a: any) => void;
  onClose: () => void;
}

export default Form;
