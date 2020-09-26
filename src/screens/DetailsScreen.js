import { ActivityIndicator, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, } from 'react-native';

import React from 'react';
import { WebView } from "react-native-webview";

const DetailsScreen = ({ navigation }) => {
    const webviewRef = React.useRef(null);
    // function webViewgoback() {
    //     if (webviewRef.current) webviewRef.current.goBack();
    //     console.log(webviewRef.current);
    // }

    function webViewNext() {
        if (webviewRef.current) webviewRef.current.goForward();
    }

    function LoadingIndicatorView() {
        return (
            <ActivityIndicator
                color="#009b88"
                size="large"
                style={styles.ActivityIndicatorStyle}
            />
        );
    }

    return (
        <>
            <SafeAreaView style={styles.flexContainer}>
                <WebView
                    source={{ uri: "http://192.168.0.1/" }}
                    renderLoading={LoadingIndicatorView}
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
                    <TouchableOpacity onPress={webViewNext}>
                        <Text style={{ color: "green" }}>Next</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </>
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
});