import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { BASE_URL } from '../../config';
import { useAuth } from '../../context/AuthContext';

const EventLog = (props) => {

    const [user] = useAuth();
    const [data, setData] = useState([]);

    const styleByState = (state) => {
        switch (state) {
            case 'Terminée':
                return styles.logend
                break;
            case 'En attente de validation':
                return styles.logwait
                break;
        
            default:
                return styles.logdef
                break;
        }
    }

    useEffect(() => {
        fetch(`${BASE_URL}/orders`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json; charset=UTF-8',
                'Authorization': `Bearer ${user.token}`
            },
        })
        .then((response) => response.json())
        .then((json) => setData(json))
        .catch((error) => console.log(error))
    }, [])
    return (
        <>
            <View style={styles.container}>
                <Text>Logs</Text>
                <ScrollView>
                    {data && data.map((order, index) => {
                        console.log(order.state_o);
                        return(
                            <>
                                <View key={`order${index}`} style={styleByState(order.state_o)}>
                                    <Text>i</Text>
                                </View>
                            </>
                        )
                    })}
                </ScrollView>
            </View>
        </>
    );
};

export default EventLog;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    logend:{
        backgroundColor: '#0CC078',
    },
    logwait:{
        backgroundColor: '#FCFC99',
    },
    logdef:{
        backgroundColor: '#219EE6',
    },
})