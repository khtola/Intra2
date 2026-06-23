import Footer from '@/components/Footer';
import ProfileMenuRow from '@/components/ProfileMenuRow';
import { BarnagardColors } from '@/constants/barnagard';
import { useClerk, useUser } from '@clerk/expo';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();

  const handleLogout = async () => {
    await signOut();
    router.replace('/sign-in');
  };

  if (!isLoaded) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color={BarnagardColors.background} />
      </View>
    );
  }

  const fullName =
    user?.fullName ??
    ([user?.firstName, user?.lastName].filter(Boolean).join(' ') || 'Bruger');
  const email =
    user?.primaryEmailAddress?.emailAddress ?? 'ingen@email.fo';
  const userId =
    (user?.publicMetadata?.employeeId as string | undefined) ??
    user?.username ??
    user?.id?.slice(-6) ??
    '—';
  const imageUrl = user?.imageUrl;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable
            onPress={() => router.back()}
            hitSlop={12}
            style={styles.backButton}
          >
            <Ionicons
              name="arrow-back"
              size={24}
              color={BarnagardColors.headerText}
            />
          </Pressable>
          <Text style={styles.headerTitle}>Min Profil</Text>
          <View style={styles.headerSpacer} />
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.profileSection}>
            <View style={styles.avatarWrap}>
              {imageUrl ? (
                <Image
                  source={{ uri: imageUrl }}
                  style={styles.avatar}
                  contentFit="cover"
                />
              ) : (
                <View style={[styles.avatar, styles.avatarPlaceholder]}>
                  <MaterialCommunityIcons
                    name="account"
                    size={48}
                    color="#9AA5B5"
                  />
                </View>
              )}
              <Pressable style={styles.uploadButton}>
                <MaterialCommunityIcons
                  name="cloud-upload-outline"
                  size={18}
                  color="#1A1A1A"
                />
              </Pressable>
            </View>

            <Text style={styles.name}>{fullName}</Text>
            <Text style={styles.userId}>{userId}</Text>
            <Text style={styles.email}>{email}</Text>
          </View>

          <Text style={styles.sectionTitle}>Mine indstillinger</Text>
          <ProfileMenuRow
            label="Opdater password"
            icon="lock-outline"
          />
          <ProfileMenuRow
            label="Opdater e-mailadresse"
            icon="email-outline"
          />
          <ProfileMenuRow
            label="Opdater telefonnummer"
            icon="cellphone"
          />
          <ProfileMenuRow
            label="Vælg sprog"
            icon="translate"
          />

          <Text style={styles.sectionTitle}>Intranet</Text>
          <ProfileMenuRow
            label="Barnagarð"
            labelColor={BarnagardColors.link}
            chevronColor={BarnagardColors.link}
            showStatusDot
            onPress={() => router.replace('/(tabs)/home')}
          />
          <ProfileMenuRow
            label="Demo"
            labelColor={BarnagardColors.link}
            chevronColor={BarnagardColors.link}
            showStatusDot
          />

          <ProfileMenuRow
            label="Log out"
            labelColor={BarnagardColors.logout}
            chevronColor={BarnagardColors.logout}
            onPress={handleLogout}
          />
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
    backgroundColor: BarnagardColors.screenBackground,
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BarnagardColors.screenBackground,
  },
  header: {
    backgroundColor: BarnagardColors.background,
    paddingHorizontal: 12,
    paddingBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
    alignItems: 'flex-start',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    color: BarnagardColors.headerText,
  },
  headerSpacer: {
    width: 40,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 24,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarWrap: {
    width: 112,
    height: 112,
    marginBottom: 14,
  },
  avatar: {
    width: 112,
    height: 112,
    borderRadius: 56,
  },
  avatarPlaceholder: {
    backgroundColor: '#D8DEE6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E6EC',
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: BarnagardColors.textPrimary,
    marginBottom: 4,
  },
  userId: {
    fontSize: 15,
    color: BarnagardColors.textSecondary,
    marginBottom: 4,
  },
  email: {
    fontSize: 15,
    color: BarnagardColors.textEmail,
  },
  sectionTitle: {
    fontSize: 15,
    color: BarnagardColors.sectionTitle,
    marginBottom: 10,
    marginTop: 8,
  },
});
