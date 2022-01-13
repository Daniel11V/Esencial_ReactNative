import React, { useEffect, useState } from "react"
import { View, Text, FlatList, ScrollView } from "react-native"
import BluetoothListLayout from "../components/bluetooth-list-layout"
import Toggle from "../components/toggle"
import Subtitle from "../components/subtitle"
import BluetoothSerial from "react-native-bluetooth-serial-next"
import Device from "../components/device"
import Device1 from "../components/device1"

function BluetoothList(props) {

    const [lista, setLista] = useState([]);
    const [lista1, setLista1] = useState([]);
    const [bolEneable, setBolEneable] = useState(false);

    useEffect(() => {
        async function init() {
            const enable = await BluetoothSerial.requestEnable();
            const lista1 = await BluetoothSerial.discoverUnpairedDevices();
            const lista = await BluetoothSerial.list();
            setLista(lista);
            setLista1(lista1);
            setBolEneable(enable);
            console.log(enable, lista, lista1)
        }

        init();

        return () => {
            async function remove() {
                await BluetoothSerial.stopScanning();
                console.log("termino scan")
            }
            remove()
        }
    }, [])

    const enableBluetooth = async () => {
        console.log("pendejo")
        try {
            await BluetoothSerial.requestEnable();
            const lista = await BluetoothSerial.list();
            console.log("hola")
            const lista1 = await BluetoothSerial.discoverUnpairedDevices();
            console.log("adios")
            await BluetoothSerial.stopScanning();
            setBolEneable(true);
            setLista(lista);
            setLista1(lista1);
            console.log(lista, lista1, bolEneable)
        } catch (error) {
            console.log(error);
        };
    }

    const disableBluetooth = async () => {
        try {
            await BluetoothSerial.disable();
            await BluetoothSerial.stopScanning();
            setBolEneable(false);
            setLista([]);
            setLista1([]);
        } catch (error) {
            console.log(error)
        }
    }

    const toggleBluetooth = value => {
        if (value) {
            return enableBluetooth();
        }
        disableBluetooth();
    };
    const conect = () => {
        console.log("hey")
    }
    const pair = async (id) => {
        try {
            BluetoothSerial.pairDevice(id);
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <BluetoothListLayout title="Bluetooh">
            <Toggle value={bolEneable} onValueChange={toggleBluetooth} />
            <ScrollView>
                <Subtitle title="Dispositivos emparejados" />
                {lista.map((item, i) => {
                    if (lista.length) {
                        return <Device key={i} info={item} onPress={conect} />
                    } else {
                        return <Text style={{ fontSize: 20 }}>No hay dispositivos</Text>
                    }
                })}
                {/* <FlatList nestedScrollEnabled
                    data={lista}
                    ListEmptyComponent={() => }
                    renderItem={renderItem}
                    /> */}
                <Subtitle title="Dispositivos disponibles" />
                {lista1.map((item, i) => {
                    if (lista1.length) {
                        return <Device1 key={i} info={item} onPress={() => pair(props.id)} />
                    } else {
                        return <Text style={{ fontSize: 20 }}>No hay dispositivos</Text>
                    }
                })}
                {/* <FlatList nestedScrollEnabled
                    data={lista1}
                    ListEmptyComponent={() => <Text style={{ fontSize: 20 }}> </Text>}
                    renderItem={renderItem1}
                /> */}
            </ScrollView>
        </BluetoothListLayout>

    )
}

export default BluetoothList