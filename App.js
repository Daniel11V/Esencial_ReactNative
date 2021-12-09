import { StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput, Pressable } from 'react-native';

import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Accounts } from './pages/Accounts/Accounts'
import { DeleteModal } from './components/DeleteModal/DeleteModal'

export default function App() {
  const [banks, setBanks] = useState([])
  const [textInput, setTextInput] = useState("")
  const [price, setPrice] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [bankSelected, setBankSelected] = useState({})

  const onAdd = () => {
    setTextInput('')
    setPrice('')
    setBanks([...banks, {id: (Math.floor(Math.random()*100) + 1), name: textInput, price: price}])
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
    <View>
      <View style={styles.navbar}>
        <Text style={styles.navbarText}>Esencial</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.nuevaCuenta}>
          <DeleteModal modalVisible={modalVisible} setModalVisible={setModalVisible} onDelete={onDelete} />

          <Text style={styles.title}>Nueva Cuenta</Text>
          {/* <Accounts setBanks={setBanks}/> */}
          <TextInput
            placeholder="Nombre de cuenta"
            style={styles.nuevaCuentaInput}
            maxLength={10}
            selectionColor="#1976D2"
            value={textInput}
            onChangeText={(text)=> setTextInput(text)}
            />
          <TextInput
            placeholder="$0"
            style={styles.nuevaCuentaInput}
            maxLength={10}
            selectionColor="#1976D2"
            value={price}
            onChangeText={(newPrice)=> setPrice(newPrice)}
            />
          <Pressable onPress={onAdd} style={styles.nuevaCuentaSubmit}>
            <Text style={styles.nuevaCuentaSubmitText}>Añadir</Text>
          </Pressable>
        </View>
        <View style={styles.bankList}>
          <Text style={styles.title}>Mis Cuentas</Text>
          <FlatList
            data={banks}
            renderItem={data => (
              <TouchableOpacity onPress={()=>handleClick(data.item)} style={styles.bankListItem}>
                <Text style={styles.bankListInfo}>{data.item.name}</Text>
                <Text style={{...styles.bankListInfo, fontWeight:'bold'}}>{data.item.price} ARS</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
            />
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    marginTop: 30,
    width: '100%',
    height: 50,
    backgroundColor: '#1976D2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navbarText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  container: {
    margin: 30,
  }, 
  title: {
    fontWeight: 'bold',
    fontSize: 28,
    color: 'rgba(0, 0, 0, 0.8)'
  },
  nuevaCuenta:  {
  },
  nuevaCuentaTitle:  {
    
  },
  nuevaCuentaInput:  {
    marginTop: 20,
    marginBottom: 10,
    fontSize: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#1976D2',
  },
  nuevaCuentaSubmit:  {
    marginTop: 20,
    backgroundColor: '#1976D2',
    borderRadius: 10,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6
  },
  nuevaCuentaSubmitText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  bankList: {
    marginTop: 30,
    justifyContent: 'flex-start'
  },
  bankListItem: {
    height: 50,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.05)',
    marginTop: 10,
    paddingHorizontal: 20
  },
  bankListInfo: {
    fontSize: 20,
    color: 'rgba(0,0,0,0.6)',
  }
});
