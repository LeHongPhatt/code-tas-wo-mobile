import {View} from 'react-native';
import React, {useState, useEffect} from 'react';
import styles from './styles';
import {IconCus, TextCus, TouchCus} from 'components';
import {getHeight, getWidthBySpace, formatCurrency} from 'utils';
import Icon from 'assets/svg/Icon';
import {useAuth} from 'hooks';
import {NavigationService, Routes} from 'navigation';
import {Colors} from 'theme';

const WalletInfo = () => {
  const {profile} = useAuth();
  const [user, setUser] = useState();

  useEffect(() => {
    profile && setUser(profile[0]);
  }, [profile]);

  return (
    <View style={styles.container}>
      <View style={getHeight(12)} />

      <View
        style={[
          styles.row,
          styles.cenItem,
          styles.bg_white,
          styles.p12,
          styles.radius12,
        ]}>
        <View style={[styles.row, styles.cenItem, styles.flex1]}>
          <Icon.QR_code />
          <View style={[styles.ml8]}>
            <TextCus black medium style={[styles.fz14]}>
              Chấm công
            </TextCus>
            <TextCus grayColor style={[styles.fz12]}>
              Chấm công ngày 13/05/2023
            </TextCus>
          </View>
        </View>
        <View style={styles.check}>
          <IconCus size={20} color={Colors.white} name={'check'} />
        </View>
      </View>
      <View style={getHeight(12)} />
      <View
        style={[
          styles.wrapAction,
          styles.radius12,
          styles.p15,
          styles.cenItemvh,
        ]}>
        <View style={[styles.row, styles.spaceItem, getWidthBySpace(64)]}>
          <TouchCus
            style={styles.cenItemvh}
            // onPress={() => NavigationService.navigate(Routes.Recharge)}>
          >
            <Icon.ic_transfer />
            <TextCus body2 black>
              Giao việc
            </TextCus>
          </TouchCus>
          <TouchCus style={styles.cenItemvh} onPress={() => {}}>
            <Icon.ic_my_job />
            <TextCus body2 black>
              Việc của tôi
            </TextCus>
          </TouchCus>
          <TouchCus
            style={styles.cenItemvh}
            onPress={() => NavigationService.navigate(Routes.RequestSupport)}>
            <Icon.ic_vote />
            <TextCus body2 black>
              Đánh Giá
            </TextCus>
          </TouchCus>
        </View>
      </View>
    </View>
  );
};
export default WalletInfo;
