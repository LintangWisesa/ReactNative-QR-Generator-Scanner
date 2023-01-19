import React, {useState} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Button, Dialog } from '@rneui/themed';
import styles from './../styles/Style'
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

function QRscanner() {

    const [qrValue, setQrValue] = useState('')
    const [light, setLight] = useState(false)
    const [showDialog, setShowDialog] = useState(false)

    return (
    <View style={styles.container}>
        <QRCodeScanner
            ref={(node) => { this.scanner = node }}
            onRead={(e) => {
                setShowDialog(true)
                setQrValue(e.data)
            }}
            flashMode={light ? RNCamera.Constants.FlashMode.torch : RNCamera.Constants.FlashMode.auto}
            topContent={<></>}
            bottomContent={
                <Button
                    title={`Flash ${light ? 'OFF' : 'ON'}`}
                    icon={{ ...styles.iconButtonHome, size: 20, name: 'qr-code-scanner' }}
                    iconContainerStyle={styles.iconButtonHomeContainer}
                    titleStyle={{ ...styles.titleButtonHome, fontSize: 20 }}
                    buttonStyle={{...styles.buttonHome, height: 50}}
                    containerStyle={{...styles.buttonHomeContainer, marginTop:20, marginBottom:10}}
                    // onPress={() => {this.scanner.reactivate()}}
                    onPress={() => {setLight(!light)}}
                />
            }
        />
        <Dialog
        isVisible={showDialog}
        onBackdropPress={() => setShowDialog(!showDialog)}>
            <Dialog.Title titleStyle={{color:'#000', fontSize:25}} title="Scanned QR:"/>
            <Text style={{color:'#000', fontSize: 25}}>
                {qrValue}
            </Text>
            <Dialog.Actions>
                <Dialog.Button title="Scan Again" onPress={() => {
                    this.scanner.reactivate()
                    setShowDialog(false)
                }}/>
            </Dialog.Actions>
        </Dialog>
    </View>
    );
}

export default QRscanner