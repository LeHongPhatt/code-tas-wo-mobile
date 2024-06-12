import {StyleSheet} from 'react-native';
import {Colors} from 'theme';

export default StyleSheet.create({
  squareContainer: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  square: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 30,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'white',
    margin: 7,
    // marginRight: 5,
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
  fz10: {
    fontSize: 10,
    fontFamily: 'Roboto',
  },
  colorAD: {
    color: Colors.colorBC,
  },
  ffRo: {
    fontFamily: 'Roboto',
  },
  fz12: {
    fontSize: 12,
  },
  color149: {
    color: '#1492A1',
  },
  ml4: {
    marginLeft: 4,
  },
  mv9: {
    marginVertical: 9,
  },
  mr8: {
    marginRight: 8,
  },
  container: {
    backgroundColor: Colors.white,
    marginHorizontal: 17,
    padding: 12,
    borderRadius: 12,
    shadowOffset: {width: 0, height: 0},
    shadowColor: Colors.black,
    elevation: 7,
  },
  date: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    backgroundColor: Colors.colorDB,
  },
  doing: {
    backgroundColor: Colors.color901,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
});
