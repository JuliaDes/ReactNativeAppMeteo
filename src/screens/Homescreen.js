import React, { useEffect, useState } from 'react';
import { ActivityIndicator, SafeAreaView, Text, StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import { fetchOpenWeather, getGPSCoords } from '../API/APIgeodirect';
import Icon from '../../react-native-weather-icons/weatherIcon';
import { iconSet, atmosphere } from './../constant/iconSet';


const Homescreen = () => {

    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [city, setCity] = useState('')
    const icon = atmosphere.includes(data?.weather[0]?.main) ? iconSet["Clouds"] : iconSet[data?.weather[0]?.main]

    console.log(iconSet);

    useEffect(() => {
        const asyncBootstrap = async () => {
            try {
                const coords = await getGPSCoords()
                const data = await fetchOpenWeather(coords)
                console.log("data", data)
                setData(data)
            } catch (err) {
                console.log("erreur", err);
            } finally {
                setLoading(false)
            }

        }
        asyncBootstrap();
    }, [])

    const handleSearch = async () => {
        try {
            const coords = await getGPSCoords(city)
            const data = await fetchOpenWeather(coords)
            console.log("data", data)
            setData(data)
        } catch (err) {
            console.log("erreur", err);
        }
    }

    return (
        loading ? <ActivityIndicator />
            : (
                data && (

                    <SafeAreaView style={styles.sectionContainer}>
                        <View style={styles.inputCont}>
                            <TextInput
                                style={styles.input}
                                placeholder='Noyon'
                                value={city}
                                onChangeText={(text) => {
                                    setCity(text)
                                }}
                            />
                            <TouchableOpacity style={styles.button}
                                onPress={handleSearch}>
                                <Text style={styles.btnText}>Rechercher</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.title}> {data.name} </Text>
                        <Text style={styles.icon}><Icon name={icon} size={150} /></Text>
                        <Text style={[styles.title, styles.temp
                        ]}> {Math.floor(data.main.temp)}°C</Text>
                        <Text style={styles.title}>{data.weather[0].description}</Text>
                        <View style={styles.details}>
                            <View style={styles.item}>
                                <Icon name="wi-strong-wind" size={40} />
                                <Text >Vent</Text>
                                <Text>{data.wind.speed} km/h</Text>
                            </View>
                            <View style={styles.item}>
                                <Icon name="wi-barometer" size={40} />
                                <Text>Pression</Text>
                                <Text>{data.main.pressure}</Text>

                            </View>
                            <View style={styles.item}>
                                <Icon name="wi-humidity" size={40} />
                                <Text>Humidité</Text>
                                <Text>{data.main.humidity} %</Text>
                            </View>
                        </View>
                    </SafeAreaView>
                )
            )

    )
}
export default Homescreen;

const styles = StyleSheet.create({
    sectionContainer: {
        backgroundColor: '#46e0fe',
        height: 900
    },
    title: {
        textAlign: 'center',
        fontSize: 40,
        fontWeight: 'bold',
    },
    temp: {
        color: 'grey',
        fontSize: 35,
    },
    details: {
        flexDirection: 'row',
    },
    item: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
        marginVertical: 15,
        borderWidth: 2,
        borderColor: 'white',
    },
    icon: {
        textAlign: 'center'
    },
    input: {
        flex: 1,
        padding: 10,
        borderWidth: 2,
        borderColor: 'fff'
    },
    inputCont: {
        flexDirection: 'row',
        marginVertical: 10,
        paddingHorizontal: 12
    },
    button: {
        padding: 10,
        // backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnText: {
        textAlign: 'center',
        textTransform: 'uppercase',
        color: 'fff',
        fontWeight: 'bold'
    }
});
