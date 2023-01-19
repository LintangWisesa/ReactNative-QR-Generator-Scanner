import * as React from 'react';
import { View } from 'react-native';
import { Button } from '@rneui/themed';
import styles from './../styles/Style'

function Home({ navigation }) {
    return (
    <View style={styles.container}>
        <Button
        title="Generate"
        onPress={() => navigation.navigate('QR Generator')}
        icon={{ ...styles.iconButtonHome, name: 'qr-code' }}
        iconContainerStyle={styles.iconButtonHomeContainer}
        titleStyle={styles.titleButtonHome}
        buttonStyle={styles.buttonHome}
        containerStyle={styles.buttonHomeContainer}
        />
        <Button
        title="Scan QR"
        onPress={() => navigation.navigate('QR Scanner')}
        icon={{ ...styles.iconButtonHome, name: 'qr-code-scanner' }}
        iconContainerStyle={styles.iconButtonHomeContainer}
        titleStyle={styles.titleButtonHome}
        buttonStyle={styles.buttonHome}
        containerStyle={styles.buttonHomeContainer}
        />
    </View>
    );
}

export default Home