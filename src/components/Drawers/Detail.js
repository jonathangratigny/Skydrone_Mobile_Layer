import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Detail = (props) => {
    console.log(props);
    return (
        <>
            {props.data[0] !== undefined &&
                <View style={styles.container}>
                    <Text style={styles.textDroneNameModal}>{props.data[props.itemIndex].name_d}</Text>
                    <Text style={styles.textStateModal}><Text style={props.data[props.itemIndex].state == 'En Stock' ? styles.textStateDrone : styles.textStateDroneUnavailable && props.data[props.itemIndex].state == 'En Location' ? styles.textStateDroneResa : styles.textStateDroneUnavailable}>{props.data[props.itemIndex].state}</Text></Text>
                    <View style={styles.containerBtn}>
                    {props.data[props.itemIndex].state !== 'En Stock' ?
                        <TouchableOpacity
                        style={[styles.button, styles.buttonToStock]}
                        onPress={() => props.handlePressStock()}
                        underlayColor='#fff'>
                            <Text style={styles.textStyle}>Entrée en stock</Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity
                            style={[styles.button, styles.buttonToSAV]}
                            onPress={() => props.handlePressSav()}
                            underlayColor='#fff'>
                            <Text style={styles.textStyle}>Entrée au SAV</Text>
                        </TouchableOpacity>
                    }
                    </View>
                </View>
            }
        </>
    );
};

export default Detail;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFA655',
    },
    drawer: { 
        shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3
    },
    main: {
        paddingLeft: 3
    },
    centeredView:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView:{
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button:{
        borderRadius: 20,
        padding: 15,
        marginTop: 50,
        elevation: 2,
    },
    buttonClose:{
        backgroundColor: "#2196F3",
    },
    buttonToSAV:{
        backgroundColor: "firebrick",
    },
    buttonToStock:{
        backgroundColor: "forestgreen",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
    },
    cell:{
        width: 425,
    },
    titleStock:{
        marginBottom: 20,
        marginTop: 5,
        padding: 10,
        borderRadius: 15,
        color: "#3caae9",
        letterSpacing: 2,
        textAlign: "center",
        fontSize: 18,
        textTransform: "uppercase"
    },
    titleSky:{
        marginBottom: 10,
        marginTop: 10,
        padding: 10,
        borderRadius: 15,
        color: "#3caae9",
        letterSpacing: 2,
        textAlign: "center",
        fontSize: 30,
        fontWeight: "bold",
    },
    titleBlack:{
        color: 'black'
    },
    textStateDrone:{
        padding: 10,
        letterSpacing: 1,
        fontSize: 18,
        textAlign: "center",
        color: "#32cd32",
        fontWeight: "bold"
    },
    textStateDroneUnavailable:{
        color: '#dc143c',
        padding: 10,
        letterSpacing: 1,
        fontSize: 18,
        textAlign: "center",
        fontWeight: "bold"
    },
    textStateDroneResa:{
        color: '#ff8c00',
        padding: 10,
        letterSpacing: 1,
        fontSize: 18,
        textAlign: "center",
        fontWeight: "bold"
    },
    textState:{
        padding: 10,
        letterSpacing: 1,
        fontSize: 18,
        textAlign: "center",
    },
    textStateModal:{
        padding: 5,
        letterSpacing: 1,
        textAlign: "center",
    },
    card:{
        padding: 25,
        margin: 20,
        borderRadius:20,
        borderWidth: 1,
    },
    listWrapper:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderBottomWidth: 1,
    },
    text:{
        flex: 1,
        fontSize: 14,
        textAlign: 'center',
        textTransform: 'capitalize',
        padding: 10,

    },
    textDroneName:{
        flex: 1,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        textTransform: 'uppercase',
        padding: 10,
    },
    textDroneNameModal:{
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        textTransform: 'uppercase',
        padding: 10
    },
    title: {
        marginBottom: 20,
        marginTop: 20,
        padding: 10,
        borderRadius: 15,
        color: "#3caae9",
        letterSpacing: 2,
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold",
        textTransform: 'uppercase'
    },
    containerBtn: {
        alignSelf: "center"
    }
    
})