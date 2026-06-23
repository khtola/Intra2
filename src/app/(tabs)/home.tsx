import DashboardTile from '@/components/DashboardTile';
import Footer from '@/components/Footer';
import SelectSite from '@/components/SelectSite';
import {
  BarnagardColors,
  dashboardItems,
} from '@/constants/barnagard';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const GRID_COLUMNS = 3;
const GRID_GAP = 10;
const GRID_PADDING = 10;
const tileWidth =
  (Dimensions.get('window').width -
    GRID_PADDING * 2 -
    GRID_GAP * (GRID_COLUMNS - 1)) /
  GRID_COLUMNS;

export default function HomeScreen() {
  const [selectedSchool, setSelectedSchool] = useState('Barnagarð');

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.container}>
        <View style={styles.header}>
          <SelectSite 
            value={selectedSchool} 
            options={[
              'Barnagarð',
              'Demo' ,
              'Leikskóli',
              'Grunnskóli',
              'Framhaldsskóli',
            ]}
            onSelect={setSelectedSchool}
          />
          <Pressable
            onPress={() => router.push('/(tabs)/profile')}
            hitSlop={12}
          >
            <Ionicons
              name="menu"
              size={30}
              color={BarnagardColors.headerText}
            />
          </Pressable>
        </View>

        <ScrollView
          contentContainerStyle={styles.gridContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.grid}>
            {dashboardItems.map((item) => (
              <DashboardTile
                key={item.id}
                item={item}
                width={tileWidth}
              />
            ))}
          </View>
        </ScrollView>
        <Footer />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: BarnagardColors.background,
  },
  container: {
    flex: 1,
    backgroundColor: BarnagardColors.background,
  },
  header: {
    width: '100%',
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: BarnagardColors.headerText,
  },
  gridContent: {
    paddingHorizontal: GRID_PADDING,
    paddingBottom: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: GRID_GAP,
  },
});
