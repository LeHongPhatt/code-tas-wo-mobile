import {Images} from 'assets';
import Icon from 'assets/svg/Icon';
import {ImageCus} from 'components/ImageCus';
import {TextCus} from 'components/TextCus';
import React from 'react';
import {StyleProp} from 'react-native';
import {ViewStyle, View, Image} from 'react-native';
import LinearGradient, {
  LinearGradientProps,
} from 'react-native-linear-gradient';
import styles from './styles';
import {showImgSrc} from 'utils';
import {IconCus} from 'components/IconCus';
import {Colors} from 'theme';
interface Props {
  children: React.ReactNode;
  linear?: LinearGradientProps;
  styleLinear?: StyleProp<ViewStyle>;
  colors?: (string | number)[];
}
const WorkComponent: React.FC<Props> = ({
  children,
  linear,
  styleLinear,
  colors,
}) => {
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image source={Images.driver} />
        <View style={{flex: 1, marginLeft: 6}}>
          <TextCus semibold style={[styles.ffRo]}>
            Thảo luận phác thảo Logo
          </TextCus>
          <TextCus style={[styles.fz10, styles.colorAD]}>
            Giao bởi Nguyễn Văn Huy, lúc 08:20 20/04/2023
          </TextCus>
        </View>
        <Image source={Images.driver} />
      </View>
      <TextCus style={[styles.fz12, styles.ffRo, styles.mv9]}>
        Các bạn chuẩn bị một số phác thảo idea mình có nhé
      </TextCus>
      <View style={{flexDirection: 'row'}}>
        <TextCus style={[styles.fz12, styles.ffRo, styles.mr8]}>
          Người thực hiện
        </TextCus>
        <View style={styles.squareContainer}>
          <View style={styles.square}>
            <View style={styles.circle}>
              <ImageCus source={Images.driver} style={styles.smallAvatar} />
            </View>
            <View style={[styles.circle, styles.circleTopRight]}>
              <ImageCus source={Images.driver} style={styles.smallAvatar} />
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View style={styles.date}>
          <TextCus medium style={[styles.fz12, styles.color149]}>
            Thời hạn: 24/10
          </TextCus>
        </View>
        <View style={styles.doing}>
          <IconCus size={16} color={Colors.white} name={'check'} />
          <TextCus style={[styles.ffRo, styles.ml4]} whiteColor medium>
            Đang làm
          </TextCus>
        </View>
      </View>
    </View>
  );
};
export default WorkComponent;
