import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from 'expo-location';
import { NavigationContainer } from "@react-navigation/native";
import {createNativeStackNavigator} from '@react-navigation/native';


const settings = {
    backgroundColor: '#00a484'
}

const icons = {
    location_not_known: 'crosshairs',
    location_searching: 'crosshairs-question',
    location_found: 'crosshairs-gps'
}

export default function Map (props) {
    const [marker, setMarker] = useState(null)
    const [icon,setIcon] = useState(icons.location_not_known)
    const [location, setLocation] = useState ({
         latitude: 65.0800,
         longitude: 25.4800,
         latitudeDelta: 0.0922,
         longitudeDelta: 0.0421
    })

const ShowMarker = (e) => {
    const coords = e.nativeEvent.coordinate
    setMarker(coords)
}

const getUserPosition = async () => {
    setIcon(icons.location_searching)
    let {status} = await Location.requestForegroundPermissionsAsync()
    try {
        if (status !== 'granted') {
            console.log('Geolocation failed')
            return
        }
    const position = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.High})
    setLocation({...location,"latitude": position.coords.latitude, "longitude": position.coords.longitude})
}   catch (error) {
    console.log(error)
    }
}

// useEffect(() => {
//     (async() => {
//         getUserPosition()
//     })()
// }, [])

    return (
        <>
        <MapView
        style={styles.map}
        region={props.location}
        mapType={props.mapType}
        onLongPress={ShowMarker}
    >
        {marker &&
        <Marker
        title="my marker"
        coordinate={{latitude: marker.latitude, longitude: marker.longitude}}
        />
        }
    </MapView>
    </>
    ); 
}

const styles = StyleSheet.create({
    map: {
        height: '100%',
        width: '100%'
    }
});