import {
    Image,
    StatusBar,
    StyleSheet,
    Text,
    View
} from 'react-native'
import React, { useEffect } from 'react';

const SplashScreen = ({ navigation }) => {
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('Main');
        }, 2500);
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar hidden={true} />
            <Image style={{ ...styles.background, resizeMode: "contain" }}
                source={require('../Logo.png')}
            />
        </View>
    )
}

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#201E50"
    },
    background: {
        width: "100%",
        height: 150,
    }
});
