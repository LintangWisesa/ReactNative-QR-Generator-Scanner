import React, { useState, useRef, createRef } from 'react';
import { View, Platform, PermissionsAndroid, Text } from 'react-native';
import { Button, Icon, Input, Dialog } from '@rneui/themed';
import styles from './../styles/Style'
import QRCode from 'react-native-qrcode-svg'
import Share from 'react-native-share'
import RNFetchBlob from 'rn-fetch-blob'

function QRgenerator() {

    const [QRvalue, setQRValue] = useState('lintang');
    const [QRImage, setQRImage] = useState('');
    const [showDialog, setShowDialog] = useState(false);
    const [loading, setloading] = useState(false);

    const shareQR = () => {
        QRImage.toDataURL((data) => {
            const shareImageBase64 = {
                title: "QR",
                message: "Here is my QR code!",
                url: `data:image/jpeg;base64,${data}`
            };
            setQRImage(String(shareImageBase64.url));
            Share.open(shareImageBase64);
        })
    }

    const downloadQR = () => {
        setShowDialog(true)
        setloading(true)
        QRImage.toDataURL(async(data) => {
            const shareImageBase64 = {
                title: "QR",
                message: "Here is my QR code!",
                url: `data:image/jpeg;base64,${data}`
            };
            setQRImage(String(shareImageBase64.url))

            if (Platform.OS === 'ios') {
                saveImage(String(shareImageBase64.url));
            } else {
                try {
                    const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: 'Storage Permission Required',
                        message: 'App needs access to your storage to download the QR code image',
                    }
                    );
                    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                        console.log('Storage Permission Granted');
                        saveImage(String(shareImageBase64.url));
                    } else {
                        console.log('Storage Permission Not Granted');
                    }
                } catch (err) {
                    console.log(err)
                }
            }
        });
    }

    const saveImage = (qr) => {
        setloading(false)
        qr = qr.split('data:image/jpeg;base64,')[1]
        
        let date = new Date();
        const { fs } = RNFetchBlob;
        let filename = '/qr_' + Math.floor(date.getTime() + date.getSeconds() / 2) + '.jpeg';
        let PictureDir = fs.dirs.DownloadDir + filename;

        fs.writeFile(PictureDir, qr, 'base64')
        .then(() => {
            RNFetchBlob.android.addCompleteDownload({
                title: '🎁 Here is your QR code!',
                useDownloadManager: true,
                showNotification: true,
                notification: true,
                path: PictureDir,
                mime: 'image/jpeg',
                description: 'Image',
            });
        })
        .catch((err) => {console.log('ERR: ', err)})
    }

    return (
        <View style={styles.container}>
            <Input
                placeholder='Type your text here...'
                onChangeText={ val => {setQRValue(val)}}
                leftIcon={
                <Icon
                    name='qr-code'
                    type='material'
                    size={24}
                    color='rgba(255, 193, 7, 1)'
                />
                }
            />
            <QRCode
                value={QRvalue ? QRvalue : 'lintang'}
                size={200}
                // logo={{uri: yourqrlogo}}
                logoSize={60}
                logoBackgroundColor='transparent'
                getRef={(ref) => setQRImage(ref)}
            />
            <Button
                title="Share QR"
                icon={{ ...styles.iconButtonHome, size: 20, name: 'share' }}
                iconContainerStyle={styles.iconButtonHomeContainer}
                titleStyle={{ ...styles.titleButtonHome, fontSize: 20 }}
                buttonStyle={{...styles.buttonHome, height: 50}}
                containerStyle={{...styles.buttonHomeContainer, marginTop:20, marginBottom:10}}
                onPress={shareQR}
            />
            <Button
                title="Download"
                icon={{ ...styles.iconButtonHome, size: 20, name: 'file-download' }}
                iconContainerStyle={styles.iconButtonHomeContainer}
                titleStyle={{ ...styles.titleButtonHome, fontSize: 20 }}
                buttonStyle={{...styles.buttonHome, height: 50}}
                containerStyle={{...styles.buttonHomeContainer, marginTop:10, marginBottom:10}}
                onPress={downloadQR}
            />
            <Dialog
            isVisible={showDialog}
            onBackdropPress={() => setShowDialog(!showDialog)}
            >
                {
                    loading
                    ?
                    <Dialog.Loading />
                    :
                    <>
                    <Dialog.Title titleStyle={{color:'#000', fontSize:25}} title="Download QR"/>
                    <Text style={{color:'#000', fontSize: 18}}>
                        Your QR code has been downloaded successfully. Check it on your <Text style={{fontWeight:'bold'}}>Downloads</Text> folder.
                    </Text>
                    </>
                }
            </Dialog>
        </View>
    );
}

export default QRgenerator