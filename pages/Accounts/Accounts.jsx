import React, { useState } from 'react'
import {
    Button,
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native'


export const Accounts = ({ setBanks }) => {
    const [name, setName] = useState('')    
    const [currencie, setCurrencie] = useState('')
    const [initialAmount, setInitialAmount] = useState('')

    const submitForm = () => {
        setBanks(lastBanks => [...lastBanks, {
            id: (lastBanks[lastBanks.length-1].id)?lastBanks[lastBanks.length-1].id + 1: 1,
            name,
            currencie,
            lastMonthAmount: initialAmount
        }])
    }

    return (
        <View>
            <TextInput 
                placeholder="Nombre de cuenta"
                style={styles.input}
                onChangeText={(text)=>setName(text)}
                value={name}
            />
            <TextInput 
                placeholder="Tipo de moneda"
                style={styles.input}
                onChangeText={(text)=>setCurrencie(text)}
                value={currencie}
            />
            <TextInput 
                placeholder="1000"
                style={styles.input}
                onChangeText={(number)=>setInitialAmount(number)}
                value={initialAmount}
            />
            <Button title="ADD" onPress={submitForm} />
        </View>
    )
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#fff',
  },
});
