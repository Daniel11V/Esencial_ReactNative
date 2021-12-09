import { StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput, Button } from 'react-native';

import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Accounts } from './pages/Accounts/Accounts'
import { DeleteModal } from './components/DeleteModal/DeleteModal'

export default function App() {
  const [banks, setBanks] = useState([])
  const [textInput, setTextInput] = useState("")
  const [modalVisible, setModalVisible] = useState(false)
  const [bankSelected, setBankSelected] = useState({})

  const onAdd = () => {
    setTextInput('')
    setBanks([...banks, {id: (Math.floor(Math.random()*100) + 1), name: textInput}])
  }

  const onDelete = () => {
    setModalVisible(false)
    setBanks(banks.filter(bank => bank.id != bankSelected.id ))
  }

  const handleClick = (bank) => {
    setBankSelected(bank)
    setModalVisible(true)
  }

  return (
    <View style={styles.container}>
      <DeleteModal modalVisible={modalVisible} setModalVisible={setModalVisible} onDelete={onDelete} />

      <Text>Balance Total</Text>
      {/* <Accounts setBanks={setBanks}/> */}
      <TextInput
        placeholder="write"
        value={textInput}
        onChangeText={(text)=> setTextInput(text)}
        />
      <Button title="Add" onPress={onAdd} />

      <FlatList
        data={banks}
        renderItem={data => (
          <TouchableOpacity onPress={()=>handleClick(data.item)}>
            {console.log(data)&&<Text />}
            <View>
              <Text>{data.item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 50,
    backgroundColor: '#fff'
  }
});
