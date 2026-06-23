import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface Props {
  value: string;
  options: string[];
  onSelect: (value: string) => void;
}

export default function SelectSite({
  value,
  options,
  onSelect,
}: Props) {
  const [visible, setVisible] = useState(false);

  const handleSelect = (item: string) => {
    onSelect(item);
    setVisible(false);
  };

  return (
    <>
      <Pressable
        style={styles.titleRow}
        onPress={() => setVisible(true)}
      >
        <Text style={styles.title}>{value}</Text>

        <Ionicons
          name="chevron-down"
          size={18}
          color="#fff"
        />
      </Pressable>

      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <Pressable
          style={styles.backdrop}
          onPress={() => setVisible(false)}
        >
          <View style={styles.dropdown}>
            {options.map(item => (
              <TouchableOpacity
                key={item}
                style={styles.option}
                onPress={() => handleSelect(item)}
              >
                <Text style={styles.optionText}>{item}</Text>

                {item === value && (
                  <Ionicons
                    name="checkmark"
                    size={18}
                    color="#000"
                  />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#fff',
    marginRight: 4,
  },

  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 100,
  },

  dropdown: {
    width: '95%',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 8,
    elevation: 5,
  },

  option: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  optionText: {
    fontSize: 16,
  },
});