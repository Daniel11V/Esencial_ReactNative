import { Modal, Text, View, Button, StyleSheet } from 'react-native'
import React from 'react'

export const DeleteModal = ({ modalVisible, setModalVisible, onDelete }) => {
    return (
      <Modal visible={modalVisible} transparent animationType="fade" onRequestClose={()=>setModalVisible(false)}>
        <View style={styles.modalStyle}>
          <Text>Estas seguro que deseas borrar?</Text>
          <View style={styles.btnsModal}>
            <Button title="Si" onPress={onDelete} style={styles.btnModal} />
            <Button title="No" onPress={()=>setModalVisible(false)} style={styles.btnModal} />
          </View>
        </View>
      </Modal>
    )
}

const styles = StyleSheet.create({
  modalStyle: {
    backgroundColor: '#ffffff',
    alignSelf: 'center',
    justifyContent: 'center',
    width: '75%'
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
