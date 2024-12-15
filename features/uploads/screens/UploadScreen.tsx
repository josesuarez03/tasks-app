import React from 'react';
import { View, StyleSheet } from 'react-native';
import FileUploader from '../components/FileUploader';

const UploadScreen = () => {
  return (
    <View style={styles.container}>
      <FileUploader />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
});

export default UploadScreen;
