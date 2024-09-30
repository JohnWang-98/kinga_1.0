import IAlert from "./alert.interface";
import AlertLogic from "./alert.logic";
import React from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";

export default function Alert(props: IAlert) {
  const {
    visible,
    title,
    message,
    onCancel,
    onConfirm,
    cancelText,
    confirmText,
  } = props;
  const {} = AlertLogic();

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.modalBackground}>
        <View className="bg-white items-center px-5 py-4 rounded-lg w-72">
          <Text style={styles.alertTitle} className="font-600">
            {title}
          </Text>
          <Text style={styles.alertMessage} className="font-400 text-sm">
            {message}
          </Text>

          <View style={styles.buttonGroup}>
            <TouchableOpacity style={styles.alertButton} onPress={onCancel}>
              <Text style={styles.alertButtonText} className="font-400 ">
                {cancelText}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.alertButton} onPress={onConfirm}>
              <Text style={styles.alertButtonText} className="font-400">
                {confirmText}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  alertTitle: {
    fontSize: 20,
    marginBottom: 10,
  },
  alertMessage: {
    textAlign: "center",
    marginBottom: 20,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  alertButton: {
    flex: 1,
    alignItems: "center",
    padding: 5,
  },
  alertButtonText: {
    fontSize: 16,
    color: "#007BFF",
  },
});
