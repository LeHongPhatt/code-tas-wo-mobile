import {IconApp, IconCus, ImageCus, TextCus, TouchCus} from 'components';
import {useAuth, useKey} from 'hooks';
import {NavigationService, Routes} from 'navigation';
import React, {useRef, useState, useEffect} from 'react';
import {View} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import FastImage from 'react-native-fast-image';
import {Colors} from 'theme';
import {slidesIntro} from 'utils';
import styles from './styles';
import LottieView from 'lottie-react-native';
import {Images} from 'assets';

const Intro = () => {
  const {saveKeyStore, getKeyStore} = useKey();
  const {user} = useAuth();
  const [checkintro, setcheckintro] = useState('');
  const [activeDot, setActiveDot] = useState(0);
  const sliderIntro = useRef<AppIntroSlider>(null);

  useEffect(() => {
    _retrieveData();
  }, []);

  const _storeData = async () => {
    saveKeyStore('CHECKINTRO', 'Y');
  };

  const _retrieveData = async () => {
    // try {
    const valueTK = await getKeyStore('CHECKINTRO');
    valueTK && setcheckintro(valueTK);
    // } catch (error) {
    //   // Error retrieving data
    // }
  };
  const checkLogin = () => {
    // console.log('checkLogin', user);

    if (user) {
      NavigationService.replace(Routes.HomeTabs);
    } else {
      NavigationService.navigate(Routes.Login);
    }
  };
  const _renderItem = ({item}) => {
    const {image, subtitle, title} = item;
    return (
      <View style={styles.wrapperIntro}>
        <View style={styles.haflFlex} />
        <View style={styles.contentImage}>
          <ImageCus
            source={image}
            style={styles.image}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>
        <View style={styles.viewContent}>
          <TextCus useI18n style={[styles.fz24]} bold mb-12>
            {title}
          </TextCus>
          <TextCus style={[styles.fz16, styles.font]} useI18n>
            {subtitle}
          </TextCus>
        </View>
      </View>
    );
  };

  return checkintro !== 'Y' ? (
    <AppIntroSlider
      ref={sliderIntro}
      renderItem={_renderItem}
      data={slidesIntro}
      dotStyle={styles.dot}
      activeDotStyle={styles.dotActive}
      renderPagination={() => {
        return (
          <View style={styles.pagination}>
            <View style={styles.contentDot}>
              {slidesIntro.map((_, index: number) => {
                return (
                  <View
                    style={[
                      styles.dot,
                      activeDot === index && styles.dotActive,
                    ]}
                    key={index}
                  />
                );
              })}
            </View>
            <TouchCus
              activeOpacity={0.8}
              style={styles.btn}
              onPress={() => {
                if (activeDot < slidesIntro.length - 1) {
                  sliderIntro.current?.goToSlide(activeDot + 1, true);
                  return;
                }
                _storeData();
                NavigationService.navigate(Routes.Login);
              }}>
              <View style={[styles.center]}>
                <TextCus whiteColor style={[styles.fz14]}>
                  Tiếp tục
                </TextCus>
                <IconCus name={'arrow-right'} color={Colors.white} size={24} />
              </View>
            </TouchCus>
          </View>
        );
      }}
      onSlideChange={(index: number) => {
        setActiveDot(index);
      }}
      bottomButton={true}
      showSkipButton={true}
    />
  ) : (
    <View style={styles.bgLotie}>
      <LottieView
        source={Images.splash}
        autoPlay
        loop={false}
        speed={0.5}
        duration={2000}
        onAnimationFinish={checkLogin}
      />
    </View>
  );
};

export default Intro;
