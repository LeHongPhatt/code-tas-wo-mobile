import {StyleSheet} from 'react-native';
import {Colors} from 'theme';

export default StyleSheet.create({
  container: {
    // backgroundColor: Colors.white,
  },
  pH16: {
    paddingHorizontal: 16,
  },
  wrapImg: {
    width: 42,
    height: 42,
    borderRadius: 21,
  },
  borderWallet: {
    borderWidth: 1,
    borderColor: Colors.mainLight,
    paddingVertical: 15,
  },
  wrapAction: {
    backgroundColor: Colors.main,
    paddingVertical: 5,
    minHeight: 80,
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
  mt8: {
    marginTop: 8,
  },
  bg_white: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginHorizontal: 18,

    flex: 1,
  },
  color85: {
    color: Colors.color85,
  },
  fz10: {
    fontSize: 10,
    color: Colors.color85,
    fontFamily: 'Roboto',
  },
  flex1: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  bg_noti: {
    paddingHorizontal: 5,
    borderRadius: 50,
    backgroundColor: Colors.colorRed,
    alignSelf: 'flex-end',
  },
  white: {
    color: Colors.white,
  },

  squareContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  square: {
    width: 60,
    height: 60,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  circle: {
    width: 28,
    height: 28,
    borderRadius: 30,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'white',
    margin: 5,
  },
  circleTopRight: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  circleBottomLeft: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  circleBottomRight: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  smallAvatar: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
  smallNumber: {
    color: Colors.black,
    fontSize: 6,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Roboto',
  },
  bg_grey: {
    backgroundColor: '#DAE0EB',
  },
});
