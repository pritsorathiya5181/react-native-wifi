import { ActivityIndicator, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';

import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import { WebView } from "react-native-webview";

const DetailsScreen = () => {
    const [isModalVisible, setisModalVisible] = useState(false);
    const [ssid, setssid] = useState('');
    const [password, setPassword] = useState('');

    const webviewRef = React.useRef(null);

    // function webViewgoback() {
    //     if (webviewRef.current) webviewRef.current.goBack();
    //     console.log(webviewRef.current);
    // }

    const webViewNext = () => {
        if (webviewRef.current) webviewRef.current.goForward();
    }

    const LoadingIndicatorView = () => {
        return (
            <ActivityIndicator
                color="#009b88"
                size="large"
                style={styles.ActivityIndicatorStyle}
            />
        );
    }
    let runFirst;
    const toggleModal = () => {
        console.log(isModalVisible);
        setTimeout(() => {
            setisModalVisible(!isModalVisible);
        }, 3000);
        // console.log(ssid, password);
        // console.log(runFirst);
    };

    setTimeout(toggleModal, 3000);

    return (
        <React.Fragment>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>

                <View style={{ marginVertical: 15, alignItems: "center" }}>
                    <Text style={{ fontSize: 20 }}>Enter Wifi Details:</Text>
                </View>

                <View style={styles.inputContainer}>
                    <Image style={styles.inputIcon}
                        source={{ uri: 'https://png.icons8.com/message/ultraviolet/50/3498db' }} />
                    <TextInput style={styles.inputs}
                        placeholder="SSID"
                        keyboardType='default'
                        underlineColorAndroid='transparent'
                        onChangeText={(s) => setssid(s)}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Image style={styles.inputIcon}
                        source={{ uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db' }} />
                    <TextInput style={styles.inputs}
                        placeholder="Password"
                        secureTextEntry={true}
                        underlineColorAndroid='transparent'
                        onChangeText={(pass) => setPassword(pass)} />
                </View>

                <TouchableOpacity onPress={toggleModal}
                    style={{ width: "100%", alignItems: "center", marginVertical: 15 }}>
                    <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        colors={['#4c669f', '#3b5998', '#192f6a']}
                        style={{
                            paddingLeft: 15,
                            paddingRight: 15,
                            paddingVertical: 10,
                            borderRadius: 50,
                            width: "50%",
                        }}>
                        <Text style={{
                            fontSize: 20,
                            fontFamily: 'Gill Sans',
                            textAlign: 'center',
                            color: '#ffffff',
                            backgroundColor: 'transparent',
                        }}>
                            Connect</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>



            <Modal isVisible={isModalVisible}>
                <View style={styles.webView}>
                    <WebView
                        source={{ uri: "http://192.168.4.1/" }}
                        renderLoading={LoadingIndicatorView}
                        startInLoadingState={true}
                        ref={webviewRef}
                        injectedJavaScript={`
                        document.querySelector("#ssid").value = '${ssid}';
                        document.querySelector("#pass").value = '${password}';
                        document.querySelector("#connect").click();
                        true; // note: this is required, or you'll sometimes get silent failures
                      `}
                    // javaScriptEnabledAndroid={true}
                    />
                    <TouchableOpacity onPress={toggleModal}
                        style={{ position: "absolute", bottom: 50, right: 30 }}>
                        <LinearGradient
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            colors={['#4c669f', '#3b5998', '#192f6a']}
                            style={styles.linearGradient}>
                            <Text style={styles.buttonText}>
                                x</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </Modal>
        </ React.Fragment>
    );
}

export default DetailsScreen;

const styles = StyleSheet.create({
    ActivityIndicatorStyle: {
        flex: 1,
        justifyContent: "center",
    },
    flexContainer: {
        flex: 1,
    },
    tabBarContainer: {
        backgroundColor: "#d3d3d3",
        height: 56,
        alignItems: "center",
        flexDirection: "row",
        paddingHorizontal: 16,
        justifyContent: "space-between",
    },
    button: {
        fontSize: 24,
    },
    arrow: {
        color: "#ef4771",
    },
    icon: {
        width: 20,
        height: 20,
    },
    instructionsContainer: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#CCCCCC',
    },
    instructionsTitle: {
        marginBottom: 10,
        color: '#333333',
        fontWeight: "bold",
        fontSize: 21,
        letterSpacing: 1.5,
    },
    linearGradient: {
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        width: 40,
        height: 40,
    },
    buttonText: {
        // marginTop: 10,
        fontSize: 20,
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        color: '#ffffff',
        backgroundColor: 'transparent',
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        borderBottomWidth: 1,
        width: 250,
        height: 45,
        marginVertical: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputs: {
        height: 45,
        marginLeft: 16,
        borderBottomColor: '#FFFFFF',
        flex: 1,
    },
    inputIcon: {
        width: 30,
        height: 30,
        marginLeft: 15,
        justifyContent: 'center'
    },
    buttonContainer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 250,
        borderRadius: 30,
    },
    loginButton: {
        backgroundColor: "#00b5ec",
    },
    loginText: {
        color: 'white',
    },
    webView: {
        height: "80%",
        backgroundColor: "#fff"
    }
});
