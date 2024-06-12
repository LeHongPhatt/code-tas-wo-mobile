import {FlatList, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import {ImageCus, TextCus, TouchCus} from 'components';
import {getHeight, showImgSrc} from 'utils';
import {Divider, List} from 'react-native-paper';
import {Images} from 'assets';
import {NavigationService, Routes} from 'navigation';
import {Colors} from 'theme';
import Icon from 'assets/svg/Icon';
import {useDriver} from 'hooks';
import moment from 'moment';

const GroupDriver = () => {
  const {list, onDrivers} = useDriver();
  console.log('===========list========', list);
  console.log('===========rows========', rows);
  const [rows, setRows] = useState();
  const [total, setTotal] = useState(0);
  useEffect(() => {
    list?.result && setRows(list?.result);
    list?.total && setTotal(list?.totalItems);
  }, [list]);

  const renderDriverGroup = item => {
    return (
      <View>
        <View style={[styles.pH16, styles.mt8, styles.bg_white]}>
          <List.Item
            title={
              <View>
                <View style={{flex: 1}}>
                  <TextCus medium body1>
                    {item?.city_name}
                  </TextCus>
                  <TextCus style={[styles.fz10]}>
                    @Lam vừa hoàn thành công việc
                  </TextCus>
                </View>
              </View>
            }
            onPress={() => {
              onDrivers({id: item?.id});
              NavigationService.navigate(Routes.ListDriver, {
                icon: item?.image,
                name: item?.city_name,
                id: item?.id,
                province: item,
              });
            }}
            left={() => renderDriverGroupLeft(item)}
            right={() => renderDriverGroupRight(item)}
          />
        </View>
      </View>
    );
  };

  const renderDriverGroupLeft = item => {
    const numSmallAvatars = 3; // Number of small avatars to show
    // const smallAvatarSize = 20; // Size of small avatars
    const smallAvatarSize = 20; // Size of small avatars
    return (
      <View style={styles.squareContainer}>
        <View style={styles.square}>
          <View style={styles.circle}>
            <ImageCus
              source={showImgSrc('', item?.image, Images.driver)}
              style={styles.smallAvatar}
            />
          </View>
          <View style={[styles.circle, styles.circleTopRight]}>
            <ImageCus
              source={showImgSrc('', item?.image, Images.driver)}
              style={styles.smallAvatar}
            />
          </View>
          <View style={[styles.circle, styles.circleBottomLeft]}>
            <ImageCus
              source={showImgSrc('', item?.image, Images.driver)}
              style={styles.smallAvatar}
            />
          </View>
          <View
            style={[
              styles.circle,
              styles.circleBottomRight,
              styles.bg_grey,
              {alignItems: 'center', justifyContent: 'center'},
            ]}>
            <TextCus style={styles.smallNumber}>+{total}</TextCus>
          </View>
        </View>
      </View>
    );
  };

  const renderDriverGroupRight = item => {
    console.log('=============item-===========', item);
    return (
      <View style={{right: -15}}>
        <TextCus style={[styles.fz10]}>
          {moment(item?.updatedAt).format('mm')} phút
        </TextCus>
        <View style={styles.bg_noti}>
          <TextCus style={[styles.fz10, styles.white]}>12</TextCus>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={getHeight(24)} />
      <View style={[styles.row, styles.spaceItem, styles.pH16]}>
        <TextCus black body1>
          Nhóm làm việc
        </TextCus>
        <TouchCus
          onPress={() => {
            NavigationService.navigate(Routes.ProvinceList);
          }}>
          <TextCus>
            <TextCus style={[styles.color85]}>Tất cả</TextCus>
            <TextCus style={[styles.color85]}> ({total})</TextCus>
          </TextCus>
        </TouchCus>
      </View>
      <View style={getHeight(12)} />
      <View>
        <FlatList
          data={rows}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item}) => renderDriverGroup(item)}
        />
      </View>
    </View>
  );
};
export default GroupDriver;
