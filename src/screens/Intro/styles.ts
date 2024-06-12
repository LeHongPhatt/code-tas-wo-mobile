import {StyleSheet} from 'react-native';
import {Colors} from 'theme';
import {width} from 'utils';
export default StyleSheet.create({
  textWhite: {
    color: Colors.white,
    fontSize: 15,
  },
  contentDot: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 24,
  },
  dot: {
    width: 11,
    height: 11,
    marginRight: 8,
    borderRadius: 10,
    borderWidth: 1,
  },
  dotActive: {
    backgroundColor: Colors.main,
    width: 11,
  },
  wrapperIntro: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  image: {
    flex: 1,
    width,
  },
  bgLotie: {flex: 1, backgroundColor: Colors.main},
  contentImage: {
    flex: 1,
    marginBottom: 40,
  },
  viewContent: {
    flex: 1,
    paddingHorizontal: 17,
  },
  haflFlex: {
    flex: 1 / 2,
  },
  pagination: {
    position: 'absolute',
    bottom: 40,
    paddingHorizontal: 17,
    width: '100%',
  },

  btn: {
    backgroundColor: Colors.main,
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 12,
  },
  fz14: {
    fontSize: 14,
    fontWeight: 'normal',
    marginRight: 8,
  },
  fz24: {
    fontSize: 24,

    fontFamily: 'Roboto',
  },
  fz16: {
    fontSize: 16,
  },
  font: {
    fontFamily: 'Roboto',
  },
  center: {flexDirection: 'row', alignItems: 'center'},
});
