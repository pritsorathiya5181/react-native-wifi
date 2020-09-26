import { Alert, Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { CustomButton } from '../components/custom-button';
import LinearGradient from 'react-native-linear-gradient';
import React from 'react';

const MainScreen = ({ navigation }) => {
    return (
        <View>
            {/* <Button
                title="Go to Home screen"
                onPress={() => navigation.navigate("Home")}
            />
            <Button
                title="Go to details screen"
                onPress={() => navigation.navigate("Details")}
            /> */}
            <TouchableOpacity
                style={{ width: "100%", alignItems: "center" }}
                onPress={() => navigation.navigate("Home")}>
                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={['#4c669f', '#3b5998', '#192f6a']}
                    style={styles.linearGradient}>
                    <Text style={styles.buttonText}>
                        Wifi List
                    </Text>
                </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
                style={{ width: "100%", alignItems: "center" }}
                onPress={() => navigation.navigate("Details")}>
                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={['#4c669f', '#3b5998', '#192f6a']}
                    style={styles.linearGradient}>
                    <Text style={styles.buttonText}>
                        Configure Wifi
                    </Text>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    linearGradient: {
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5,
        marginTop: 16,
        width: "80%",
    },
    buttonText: {
        fontSize: 18,
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
    },
});

export default MainScreen;
