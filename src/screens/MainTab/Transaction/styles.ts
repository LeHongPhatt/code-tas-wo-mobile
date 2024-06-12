import {StyleSheet} from 'react-native';
import {Colors} from 'theme';
import {width} from 'utils';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E4E4E4',
  },
  wrapCard: {
    height: (width * 120) / 343,
    borderRadius: 8,
    backgroundColor: Colors.mainLight,
  },
  row: {flexDirection: 'row'},
  cenItem: {
    alignItems: 'center',
  },
  cenItemvh: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  spaceItem: {
    justifyContent: 'space-between',
  },
  fs24: {
    fontSize: 24,
  },
  lh34: {
    lineHeight: 34,
  },
  radius4: {
    borderRadius: 4,
  },
  radius29: {
    borderRadius: 29,
  },
  radius100: {
    borderRadius: 100,
  },
  borderWhisper: {
    borderWidth: 1,
    borderColor: Colors.whisper,
  },
  active: {
    backgroundColor: '#c7e0e3',
    borderWidth: 1,
    borderColor: Colors.main,
  },
  deactive: {
    backgroundColor: Colors.white,
  },
  wrapShadow: {
    shadowOffset: {width: 1.5, height: 1.5},
    shadowOpacity: 0.3,
    shadowColor: Colors.dark,
    elevation: 5,
  },
  flex1: {
    flex: 1,
  },
  wrapContent: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: Colors.white,
  },
  shrinkTxt: {flexShrink: 1},
  between: {
    justifyContent: 'space-between',
  },
  mh16: {
    marginHorizontal: 16,
  },
  p8: {paddingHorizontal: 8},
});
