import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import Homescreen from './src/screens/Homescreen';

const App = () => {
 

  return (
    <SafeAreaView>
      <Homescreen />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
 container: {
  flex:1,
  justifyContent:'center',
  alignItems:'center'
 },

});

export default App;
