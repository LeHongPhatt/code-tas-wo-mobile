import {Images} from 'assets';
import {
  Buttons,
  IconCus,
  ImageCus,
  MainLayout,
  TextCus,
  TextInputs,
  TouchCus,
} from 'components';
import React, {useCallback, useEffect, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {Keyboard, ScrollView, View} from 'react-native';
import {Divider} from 'react-native-paper';
import {Colors} from 'theme';
import {IFormDataLogin} from 'types';
import {
  EnumTermOfUse,
  getHeight,
  isIos,
  openLink,
  strExists,
  styleSpacing,
  yupSchemaLogin,
} from 'utils';
import styles from './styles';
import {NavigationService, Routes} from 'navigation';
import {yupResolver} from '@hookform/resolvers/yup';
import {useAuth} from 'hooks';

export default function Login() {
  const {t} = useTranslation();
  const [mode, setMode] = useState(false);
  const [otpRequested, setOTPRequested] = useState(false);
  const [err, setError] = useState('');

  const {
    control,
    handleSubmit,
    getValues,
    formState: {errors},
  } = useForm<IFormDataLogin>({
    mode: 'onSubmit',
    resolver: yupResolver(yupSchemaLogin),
    defaultValues: {
      phoneNumber: '',
    },
  });
  const {onRequestOTP, onLogin} = useAuth();

  // const onSubmitInputPhone = useCallback(
  //   (value: IFormDataLogin) => {
  //     setOTPRequested(true);
  //     onRequestOTP({phoneNumber: value.phoneNumber});
  //   },
  //   [onRequestOTP],
  // );
  const onSubmitInputPhone = useCallback(
    (value: IFormDataLogin) => {
      // if (!otpRequested) {
      // setOTPRequested(true);
      onRequestOTP({phoneNumber: value.phoneNumber});
      // }
    },
    [onRequestOTP],
  );

  // const onHandleLogin = () => {
  //   Keyboard.dismiss();
  //   onLogin(
  //     {
  //       phoneNumber: getValues('phoneNumber'),
  //       password: getValues('password'),
  //     },
  //     (rs, errorMessage) => {
  //       if (rs) {
  //         NavigationService.replace(Routes.HomeTabs);
  //       } else {
  //         setError(errorMessage);
  //       }
  //     },
  //   );
  // };

  const [keyboardStatus, setKeyboardStatus] = useState('');

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus('Keyboard Shown');
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus('Keyboard Hidden');
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <MainLayout>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.p24]}>
          <View style={styles.wrapLogo}>
            <ImageCus
              source={Images.logo}
              style={styles.boxLogo}
              resizeMode="contain"
            />
          </View>
          <View style={styles.cenItem}>
            <TextCus bold useI18n whiteColor mt-21 style={styles.fs24}>
              auth.login_title
            </TextCus>

            <Divider style={getHeight(24)} />
          </View>
          <Controller
            control={control}
            name={'phoneNumber'}
            defaultValue={''}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <>
                <TextInputs
                  style={[styles.input]}
                  // textStyle={styles.colorInput}
                  autoCapitalize="none"
                  placeholder={t('phone_number') ?? ''}
                  onChangeText={onChange}
                  keyboardType="phone-pad"
                  value={value}
                  onBlur={onBlur}
                  color={Colors.dark}
                  leftIcon={
                    <TextCus black style={styles.p5} body2>
                      +84
                    </TextCus>
                  }
                  autoFocus={true}
                  success
                />
              </>
            )}
          />
          <View style={getHeight(16)} />
          <Controller
            control={control}
            name="password"
            defaultValue={''}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <>
                <TextInputs
                  style={[styles.input, styles.fs16, styles.fw400]}
                  autoCapitalize="none"
                  placeholder={t('auth.password') ?? ''}
                  onChangeText={onChange}
                  value={value}
                  onBlur={onBlur}
                  color={Colors.colorLine}
                  secureTextEntry={!mode}
                  rightIcon={
                    <TouchCus onPress={() => setMode(!mode)} style={styles.pr5}>
                      <IconCus
                        name={mode ? 'eye' : 'eye-slash'}
                        size={18}
                        color={Colors.border}
                      />
                    </TouchCus>
                  }
                  leftIcon={
                    <View style={styleSpacing('mr-16')}>
                      <IconCus
                        style={styles.ml8}
                        name={'lock'}
                        size={18}
                        color={Colors.black}
                      />
                    </View>
                  }
                  autoFocus={true}
                  success
                />
              </>
            )}
          />

          {errors.phoneNumber && (
            <TextCus style={styles.fieldTextRequired}>
              {t(errors?.phoneNumber?.message as string)}
            </TextCus>
          )}
          <TextCus
            mt-4
            medium
            whiteColor
            style={[styles.txtRight, styles.fz12]}
            useI18n>
            forgot_password
          </TextCus>
          {/* <View style={[styles.rowItem, styles.endItem, styleSpacing('mt-8')]}>
            <TouchCus
              onPress={() => {
                // openLink('url', EnumTermOfUse[`${i18n.language}`])
              }}>
              <TextCus caption1 medium mainLightColor>
                Bỏ qua
              </TextCus>
            </TouchCus>
          </View> */}
          {/* <Divider style={getHeight(5)} /> */}
          <View
            style={[
              styles.rowItem,
              styles.cenItemvh,
              styles.flexWrap,
              styleSpacing('mt-24'),
            ]}>
            <TextCus
              whiteColor
              textAlign={'center'}
              style={[styles.fw400, styles.lh24, styles.mr2]}>
              Bằng cách bấm tiếp tục, tôi đồng ý
            </TextCus>
            <TouchCus
              onPress={() => {
                // openLink('url', EnumTermOfUse[`${i18n.language}`]);
                openLink('url', EnumTermOfUse['{i18n.language}']);
              }}>
              <TextCus
                mainLightColor
                style={[
                  styles.fs14,
                  styles.fw500,
                  styles.lh18,
                  styles.underline,
                ]}>
                những điều khoản và điều kiện
              </TextCus>
            </TouchCus>
            <TextCus whiteColor style={[styles.fw500, styles.lh18, styles.mr2]}>
              {' '}
              của ứng dụng
            </TextCus>
          </View>
        </View>
      </ScrollView>
      <View
        style={[
          styles.rowItem,
          styles.p24,
          styles.posAbsolute,
          {bottom: strExists(keyboardStatus) ? 0 : isIos ? 285 : 0},
        ]}>
        <Buttons
          style={[
            styles.flex1,
            styles.btlogi,
            styles.btnActive,
            styles.radius12,
            styles.height48,
          ]}
          // onPress={handleSubmit(onSubmitInputPhone)()}
          onPress={handleSubmit(onSubmitInputPhone)}
          disabled={false}>
          <TextCus
            black
            useI18n
            style={[styles.fz14, styles.fw500, styles.fontRoboto]}
            medium>
            {/* {otpRequested ? 'phat' : 'Lấy Mã OTP'} */}
            lklklklk
          </TextCus>
          <IconCus
            style={styles.ml8}
            name={'arrow-right'}
            size={18}
            color={Colors.black}
          />
        </Buttons>
      </View>
    </MainLayout>
  );
}
