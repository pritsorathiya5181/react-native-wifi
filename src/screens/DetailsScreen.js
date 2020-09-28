import { ActivityIndicator, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';

import React from 'react';
import { WebView } from "react-native-webview";
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';


const webviewRef = React.useRef(null);

class DetailsScreen extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            isModalVisible: false,
        }

    }


    // function webViewgoback() {
    //     if (webviewRef.current) webviewRef.current.goBack();
    //     console.log(webviewRef.current);
    // }

    webViewNext = () => {
        if (webviewRef.current) webviewRef.current.goForward();
    }

    LoadingIndicatorView = () => {
        return (
            <ActivityIndicator
                color="#009b88"
                size="large"
                style={styles.ActivityIndicatorStyle}
            />
        );
    }

    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
        // console.log(this.state.ssid, this.state.password);
        wifi.connectToHiddenNetwork(this.state.ssid, this.state.password, (networkAdded) => {
            // console.log(networkAdded);
            if (networkAdded) {
                console.log("Connected successfully!");
            } else {
                console.log("Connection failed!");
            }
        })
    };

    render() {
        return (
            <>
                <SafeAreaView style={styles.flexContainer}>
                    <WebView
                        source={{ uri: "http://192.168.0.1/" }}
                        renderLoading={this.LoadingIndicatorView}
                        startInLoadingState={true}
                        ref={webviewRef}
                    />
                    <View style={styles.tabBarContainer}>
                        {/* <TouchableOpacity onPress={webViewgoback}>
                                <Text style={{ color: "green" }}>Back</Text>
                            </TouchableOpacity> */}
                        <TouchableOpacity onPress={() => navigation.navigate("Main")}>
                            <Text style={{ color: "green" }}>Exit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.webViewNext}>
                            <Text style={{ color: "green" }}>Next</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>

                <TouchableOpacity onPress={this.toggleModal}
                    style={{ position: "absolute", bottom: 50, right: 30 }}>
                    <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        colors={['#4c669f', '#3b5998', '#192f6a']}
                        style={styles.linearGradient}>
                        <Text style={styles.buttonText}>
                            +
                  </Text>
                    </LinearGradient>
                </TouchableOpacity>

                <Modal
                    isVisible={this.state.isModalVisible}>
                    <View style={{ backgroundColor: "#DCDCDC", justifyContent: 'center', alignItems: 'center', borderRadius: 20 }}>

                        <View style={{ marginVertical: 15, alignItems: "center" }}>
                            <Text style={{ fontSize: 20 }}>Enter Wifi Details:</Text>
                        </View>

                        <View style={styles.inputContainer}>
                            <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/message/ultraviolet/50/3498db' }} />
                            <TextInput style={styles.inputs}
                                placeholder="SSID"
                                keyboardType='default'
                                underlineColorAndroid='transparent'
                                onChangeText={(ssid) => this.setState({ ssid })} />
                        </View>

                        <View style={styles.inputContainer}>
                            <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db' }} />
                            <TextInput style={styles.inputs}
                                placeholder="Password"
                                secureTextEntry={true}
                                underlineColorAndroid='transparent'
                                onChangeText={(password) => this.setState({ password })} />
                        </View>

                        <TouchableOpacity onPress={this.toggleModal}
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
                                    Close
                  </Text>
                            </LinearGradient>
                        </TouchableOpacity>


                    </View>
                </Modal>


            </>
        );
    }
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
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 30,
        width: 60,
        height: 60,
    },
    buttonText: {
        marginTop: 10,
        fontSize: 30,
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
    }
});