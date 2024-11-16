import { View, Modal, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import Clipboard from '@react-native-clipboard/clipboard'; 
import { useStore } from '@/store/useStore'; 
import React, { useMemo } from "react"; 

const generateJsonSchema = (data: any): any => Array.isArray(data)
  ? { type: "array", items: generateJsonSchema(data[0]) }
  : typeof data === "object" && data !== null
  ? { type: "object", properties: Object.fromEntries(Object.entries(data).map(([key, value]) => [key, generateJsonSchema(value)])) }
  : { type: typeof data };

const JsonSchemaModal = ({ visible, onClose, json, url }: { visible: boolean; onClose: () => void; json: any, url: string }) => {
  const schema = generateJsonSchema(json);
  const colors = useStore((state) => state.colors);
  const copyToClipboard = () => { Clipboard.setString(JSON.stringify(schema, null, 2)); alert("Schema copied to clipboard"); };

  const styles = useMemo(() => StyleSheet.create({
    overlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: "center", alignItems: "center" },
    modalContent: { backgroundColor: colors.background, padding: 20, borderRadius: 8, width: '90%', maxWidth: 600, maxHeight: '80%', alignItems: "center" },
    topDrawer: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
    header: { color: colors.textPrimary, fontWeight: 'bold', fontSize: 20 },
    urlText: { alignSelf:'flex-start', fontSize: 18, color: colors.textPrimary, marginBottom: 10 },
    schemaContainer: { backgroundColor: colors.accent, borderRadius: 8, padding: 10, width: '100%', flex: 1 },
    schemaScrollView: { maxHeight: '100%' },
    schemaText: { fontSize: 14, fontFamily: 'monospace', color: colors.textPrimary, lineHeight: 22 },
    copyButton: { alignSelf: 'flex-end', paddingVertical: 5, paddingHorizontal: 10, backgroundColor: colors.background, borderRadius: 4, marginBottom: 10 },
    copyButtonText: { color: colors.textPrimary, fontSize: 12, fontWeight: 'bold' },
    closeButton: { alignSelf: 'flex-end', backgroundColor: colors.textPrimary, paddingVertical: 4, paddingHorizontal: 12, borderRadius: 4, marginRight: 8, marginBottom: 8 },
    closeButtonText: { color: colors.background, fontSize: 16, fontWeight: 'bold' },
  }), [colors]);

  return (
    <Modal visible={visible} transparent>
      <View style={styles.overlay}>
        <TouchableOpacity style={StyleSheet.absoluteFill} onPress={onClose} />
        <View style={styles.modalContent}>
          <View style={styles.topDrawer}>
            <Text style={styles.header}>Schema</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}><Text style={styles.closeButtonText}>Close</Text></TouchableOpacity>
          </View>
          
          <Text style={styles.urlText}>{url}</Text>
          <View style={styles.schemaContainer}>
            <TouchableOpacity style={styles.copyButton} onPress={copyToClipboard}><Text style={styles.copyButtonText}>Copy</Text></TouchableOpacity>
            <ScrollView style={styles.schemaScrollView}>
              <Text style={styles.schemaText}>{JSON.stringify(schema, null, 2)}</Text>
            </ScrollView>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default JsonSchemaModal;
