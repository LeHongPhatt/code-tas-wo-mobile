import React, {useState} from 'react';
import {View} from 'react-native';
import styles from './styles';
import {EAction, IItemBookingInfo} from 'types';
import {
  width,
  getPaddingHorizontal,
  getPaddingVertical,
  getHeight,
} from 'utils';
import Icon from 'assets/svg/Icon';
import {Colors} from 'theme';
import {TouchCus, TextCus} from 'components';
import {Divider} from 'react-native-paper';

export function CardDetail(props: ICardBookingInfo) {
  const {bookingInfo, onConfirm, isOwner = false, style} = props;
  const [showDetail, setShowDetail] = useState(false);
  console.log('=====dtai=========', bookingInfo);

  return (
    <View
      style={[
        styles.wrapCardInfo,
        width,
        styles.wrapShadow,
        getPaddingVertical(8),
        style,
      ]}>
      <View style={getPaddingHorizontal(16)}>
        <View
          style={[styles.spaceItem, styles.row, styles.topItem, styles.border]}>
          <View style={[styles.row, styles.cenItem, styles.flex]}>
            <View style={[]}>
              {bookingInfo?.name && (
                <TextCus black body2 style={[styles.fz14]}>
                  Thảo luận phác thảo Logo
                </TextCus>
              )}

              <View style={styles.mt4}>
                <TextCus label1 style={[styles.greyColor]}>
                  Giao bởi Nguyễn Văn Huy, lúc 08:20 22/04/2023
                </TextCus>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View>
        <Divider
          style={[getHeight(1), styles.mv16, {backgroundColor: Colors.whisper}]}
        />
        <View style={getPaddingHorizontal(16)}>
          <View style={[styles.row, styles.spaceItem]}>
            <TextCus caption1 medium useI18n bgInput>
              delivery
            </TextCus>
            <TextCus caption1 medium mainLightColor>
              {bookingInfo?.owner?.full_name || ''}
            </TextCus>
          </View>
          <View style={[styles.row, styles.spaceItem, styles.mt8]}>
            <TextCus caption1 medium useI18n bgInput>
              pay_method
            </TextCus>
            <TextCus caption1>{bookingInfo?.payment_type}</TextCus>
          </View>
          <View style={[styles.row, styles.spaceItem, styles.mt8]}>
            <TextCus caption1 medium useI18n bgInput>
              amount
            </TextCus>
            <TextCus caption1>{bookingInfo?.amount}</TextCus>
          </View>
          <View style={[styles.row, styles.spaceItem, styles.mt8]}>
            <TextCus caption1 medium useI18n bgInput>
              referral_fee
            </TextCus>
            <TextCus caption1>{`${bookingInfo?.commission ?? ''}%`}</TextCus>
          </View>
          {bookingInfo?.status === EAction.PENDING && !isOwner && (
            <View style={[styles.rightItem, styles.mt8]}>
              <TouchCus
                style={[
                  styles.pending,
                  styles.btnAction,
                  styles.radius4,
                  styles.cenItemvh,
                ]}
                onPress={() => onConfirm?.()}>
                <TextCus whiteColor body2 medium useI18n>
                  confirm
                </TextCus>
              </TouchCus>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

export interface ICardBookingInfo {
  style?: any;
  bookingInfo: IItemBookingInfo;
  isOwner?: boolean;
  onConfirm?: () => void;
}
