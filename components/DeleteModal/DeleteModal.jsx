import { Modal, Text, View, Button, StyleSheet } from 'react-native'
import React from 'react'

export const DeleteModal = ({ modalVisible, setModalVisible, onDelete }) => {
    return (
      <View style={styles.modalContainer}>
        <Modal visible={modalVisible} transparent animationType="fade" onRequestClose={()=>setModalVisible(false)}>
          <View style={styles.modalStyle}>
            <Text>Estas seguro que deseas borrar?</Text>
            <View style={styles.btnsModal}>
              <Button title="Si" onPress={onDelete} style={styles.btnModal} />
              <Button title="No" onPress={()=>setModalVisible(false)} style={styles.btnModal} />
            </View>
          </View>
        </Modal>
      </View>
    )
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',    
  },
  modalStyle: {
    backgroundColor: '#ffffff',
    width: '75%',
    elevation: 15,
    height: 150,
    borderRadius: 10,
    padding: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnsModal: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  btnModal: {
    flex: 1,
    maxWidth: '40%'
  }
});
