import React from 'react';
import { StyleSheet, View } from 'react-native';

function HomeScreen(props) {
    return (
        <View style={StyleSheet.homePageView}>
            Home page
        </View>
    );
}

const styles = StyleSheet.create({
    homePageView: {
        width: '100%',
        height: '100%',
        backgroundColor: 'light-gray'
    }
})

export default HomeScreen;