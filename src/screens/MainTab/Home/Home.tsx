import {Image, ScrollView, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {HomeLayout, ImageCus, TextCus, TouchCus} from 'components';
import {Colors} from 'theme';
import styles from './styles';
import {Contact, GroupDriver, SponsoredBy, WalletInfo} from './Components';
import Icon from 'assets/svg/Icon';
import {Images} from 'assets';
import {getPaddingHorizontal, showImgSrc} from 'utils';
import {useAuth, useDriver, useNews} from 'hooks';
import {EAction} from 'types';
import {NavigationService, Routes} from 'navigation';
import {useNotification} from 'hooks';

const Home = () => {
  const {user, profile, getUserProfile} = useAuth();
  const {onDrivers} = useDriver();
  const {onGetNews} = useNews();
  const [me, setMe] = useState();
  const [action, setAction] = useState('');

  const [notiCount, setNotiCount] = useState();
  const {onGetNumberNotification} = useNotification();

  useEffect(() => {
    onGetNumberNotification({}, rs => {
      Array.isArray(rs?.data?.result) && setNotiCount(rs?.data?.result[0]);
    });
  }, []);
  useEffect(() => {
    if (user) {
      onDrivers({});
      onGetNews({});
      getUserProfile();
    }
  }, [JSON.stringify(user)]);

  useEffect(() => {
    if (profile) {
      setMe(profile[0]);
      setAction(EAction.PROFILE);
    }
  }, [profile]);

  const optAction = {action, setAction};

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.main,
        paddingTop: 30,
      }}>
      <View>
        <Image source={Images.logo} style={styles.logo} />
      </View>
      <View style={styles.header}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <ImageCus
            source={showImgSrc('', me?.avatar, Images.driver)}
            style={styles.boxDriver}
          />
          {me?.full_name ? (
            <TextCus whiteColor body1>
              {`Chào, ${me.full_name}`}
            </TextCus>
          ) : (
            <TextCus mainLightColor body1 useI18n>
              hi
            </TextCus>
          )}
        </View>
        <View style={styles.row}>
          <TouchCus
            onPress={() => NavigationService.navigate(Routes.Notification)}
            style={[styles.row, styles.endItemvh]}>
            <Icon.Bell />
            <View style={[styles.badget, styles.cenItemvh, styles.pa5]}>
              <TextCus whiteColor caption2 black semibold>
                {notiCount?.count}
              </TextCus>
            </View>
          </TouchCus>
        </View>
      </View>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View>
          <WalletInfo />
          <GroupDriver />
          <SponsoredBy />
          {/* <Contact /> */}
        </View>
      </ScrollView>
    </View>
  );
};
export default Home;
