import {StyleSheet} from 'react-native';
import {Colors} from 'theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgTab,
  },
  bgHead: {
    backgroundColor: Colors.white,
  },
  boxDriver: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 4,
  },
  row: {
    flexDirection: 'row',
  },
  boxLogo: {
    width: 65,
    height: 65,
  },
  badget: {
    backgroundColor: Colors.error,
    borderRadius: 50,
    top: -7,
    right: 7,
  },
  mr17: {marginRight: 17},
  centItem: {
    alignItems: 'center',
  },
  cenItemvh: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  endItemvh: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    backgroundColor: Colors.main,
    paddingBottom: 4,
  },
  pa5: {
    padding: 3,
  },
  logo: {
    width: 108,
    height: 40,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
});
