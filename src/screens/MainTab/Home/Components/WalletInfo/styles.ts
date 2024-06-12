import {StyleSheet} from 'react-native';
import {Colors} from 'theme';

export default StyleSheet.create({
  container: {
    // backgroundColor: Colors.white,
    paddingHorizontal: 16,
  },
  borderWallet: {
    borderWidth: 1,
    borderColor: Colors.mainLight,
    paddingVertical: 15,
  },
  wrapAction: {
    backgroundColor: Colors.white,
    // paddingVertical: 5,
    minHeight: 80,
    padding: 15,
  },
  radius4: {borderRadius: 4},
  p12: {padding: 12},
  mr8: {marginRight: 8},
  row: {flexDirection: 'row'},
  cenItem: {
    alignItems: 'center',
  },
  endItem: {
    justifyContent: 'flex-end',
  },
  spaceItem: {
    justifyContent: 'space-between',
  },
  cenItemvh: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  check: {
    width: 32,
    height: 32,
    backgroundColor: Colors.main,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
  },
  flex1: {
    flex: 1,
  },
  bg_white: {
    backgroundColor: Colors.white,
  },
  radius12: {
    borderRadius: 12,
  },
  ml8: {
    marginLeft: 8,
  },
  fz12: {
    fontSize: 12,
  },
  fz14: {
    fontSize: 14,
  },
  p15: {
    // padding: 105,
  },
});
