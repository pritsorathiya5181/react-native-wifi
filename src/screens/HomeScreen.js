// const HomeScreen = ({ navigation }) => {
//     return (
//         <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//             <Text>Home Screen</Text>
//             {/* <Button
//                 title="Go to details screen"
//                 onPress={() => navigation.navigate("Details")}
//             /> */}
//         </View>
//     );
// }

import {
    Image,
    PermissionsAndroid,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import React from 'react';
import wifi from 'react-native-android-wifi';

export default class HomeScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,
            ssid: '',
            password: '',
            isWifiNetworkEnabled: null,
            ssid: null,
            // pass: null,
            ssidExist: null,
            currentSSID: null,
            currentBSSID: null,
            wifiList: null,
            modalVisible: false,
            status: null,
            level: null,
            ip: null,
        };

    }
    componentDidMount() {
        console.log(wifi);
        this.askForUserPermissions();
        this.getWifiNetworksOnPress();
    }

    async askForUserPermissions() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    'title': 'Wifi networks',
                    'message': 'We need your permission in order to find wifi networks'
                }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("Thank you for your permission! :)");
            } else {
                console.log("You will not able to retrieve wifi available networks list");
            }
        } catch (err) {
            console.warn(err)
        }
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
    getWifiNetworksOnPress() {
        wifi.loadWifiList((wifiStringList) => {
            console.log(wifiStringList);
            var wifiArray = JSON.parse(wifiStringList);
            this.setState({
                wifiList: wifiArray,
            });
        },
            (error) => {
                console.log(error);
            }
        );
    }
    renderList() {
        1
        var wifiListComponents = [];
        for (w in this.state.wifiList) {
            wifiListComponents.push(
                <View key={w} style={styles.instructionsContainer}>
                    <Text style={styles.instructionsTitle}>{this.state.wifiList[w].SSID}</Text>
                    <Text>BSSID: {this.state.wifiList[w].BSSID}</Text>
                    <Text>Capabilities: {this.state.wifiList[w].capabilities}</Text>
                    <Text>Frequency: {this.state.wifiList[w].frequency}</Text>
                    <Text>Level: {this.state.wifiList[w].level}</Text>
                    <Text>Timestamp: {this.state.wifiList[w].timestamp}</Text>
                </View>
            );
        }
        return wifiListComponents;
    }

    render() {
        return (
            <View style={styles.container}>

                <ScrollView>
                    {this.renderList()}
                </ScrollView>

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

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#F5FCFF',
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