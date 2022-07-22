import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import Drawer from "react-native-drawer";
import { BASE_URL } from "../config";
import { useAuth } from "../context/AuthContext";
import Detail from "../components/Drawers/Detail";
import EventLog from "../components/Drawers/EventLog";


const StockPage = () =>{

    const [user] = useAuth()
    const [data, setData] = useState([])
    const [ordersData, setOrdersData] = useState([])
    const [tempIndex, setTempIndex] = useState(0)
    const [drawerType, setDrawerType] = useState('')
    const [drawerShown, setDrawerShown] = useState(false)

    useEffect(() => {
        fetch(`${BASE_URL}/drones`)
        .then((response) => response.json())
        .then((json) => setData(json))
        .catch((error) => console.log(error))
    }, [])

    const updateState = (id, newStateName) => {
        const newState = data.map(obj => {
          // 👇️ if id equals 2, update country property
          if (obj._id === id) {
            return {...obj, state: newStateName};
          }
          // 👇️ otherwise return object as is
          return obj;
        });
        setData(newState);
      };

    const setDrawerDetail = (index) => {
        setDrawerType('details');
        setTempIndex(index);
        setDrawerShown(true);
    }
    const setDrawerLogs = () => {
        setDrawerType('logs');
        setDrawerShown(true);
    }
    const patchDroneToStock = async (droneId) => {
        const response = await fetch(`${BASE_URL}/drones/${droneId}`, {
            method: 'PATCH',
            body: JSON.stringify({
                state: 'En Stock',
            }),
            headers: {
                'content-type': 'application/json; charset=UTF-8',
                'Authorization': `Bearer ${user.token}`
            },
        })
            .then((response) => response.json())
            .then((json) => console.log(json))
        updateState(droneId, 'En Stock');
        
    }

    const patchDroneToSAV = async (droneId) => {
        const response = await fetch(`${BASE_URL}/drones/${droneId}`, {
            method: 'PATCH',
            body: JSON.stringify({
                state: 'SAV',
            }),
            headers: {
                'content-type': 'application/json; charset=UTF-8',
                'Authorization': `Bearer ${user.token}`
            },
        })
            .then((response) => response.json())
            .then((json) => console.log(json))
        updateState(droneId, 'SAV');
        
    }

    return(
        <>
            <Drawer
                type="displace"
                content={drawerType !== 'details' ? <EventLog data={ordersData}/> : <Detail data={data} itemIndex={tempIndex} handlePressStock={() => patchDroneToStock(data[tempIndex]._id)} handlePressSav={() => patchDroneToSAV(data[tempIndex]._id)}/>}
                open={drawerShown}
                styles={styles.drawer}
                openDrawerOffset={(viewport) => viewport.width - 200}
                onClose={() => setDrawerShown(false)}
            >
                <View style={styles.container}>
                <Pressable
                        onPress={() => setDrawerLogs()}
                        style={{
                        borderWidth: 1,
                        borderColor: 'rgba(0,0,0,0.2)',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 70,
                        position: 'absolute',
                        top: 5,
                        right: 5,
                        height: 70,
                        backgroundColor: '#fff',
                        borderRadius: 3,
                        }}
                    >
                        <Text>.</Text>
                    </Pressable>
                    <Text style={ styles.titleSky }>SKY <Text style={ styles.titleBlack }>DR</Text>O<Text style={ styles.titleBlack }>NE</Text></Text>
                    <Text style={ styles.titleStock }>aperçu du stock</Text>
                    {/* <FlatList
                        style={styles.cell}
                        data={data}
                        keyExtractor={(data) => data.id}
                        renderItem={({ item, index }) =>
                            <View key={index.toString()} style={styles.card}>
                                <Pressable
                                    onPress={() => setModal(item, index)}
                                >
                                    <Text style={styles.textDroneName}>{item.name_d}</Text>
                                    <Text style={styles.textState}>Statut : <Text style={item.state == 'En Stock' ? styles.textStateDrone : styles.textStateDroneUnavailable && item.state == 'En Location' ? styles.textStateDroneResa : styles.textStateDroneUnavailable}>{item.state}</Text></Text>
                                    </Pressable>
                            </View>
                        }
                    /> */}
                    <ScrollView>
                    
                        {data.map((item, index) => {
                            return(
                                <View key={index.toString()} style={styles.card}>
                                    <Pressable
                                        onPress={() => setDrawerDetail(index)}
                                        >
                                        <Text style={styles.textDroneName}>{item.name_d}</Text>
                                        <Text style={styles.textState}>Statut : <Text style={item.state == 'En Stock' ? styles.textStateDrone : styles.textStateDroneUnavailable && item.state == 'En Location' ? styles.textStateDroneResa : styles.textStateDroneUnavailable}>{item.state}</Text></Text>
                                    </Pressable>
                                </View>
                            )
                        })}
                    </ScrollView>
                </View>
            </Drawer>
        </>
    );
}

const styles = StyleSheet.create({
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
        position: 'relative'
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

export default StockPage;