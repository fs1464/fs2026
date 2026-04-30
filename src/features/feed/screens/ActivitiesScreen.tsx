import { Dimensions, FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Heart, MessageCircle, MoveHorizontal as MoreHorizontal, Send, Volume2 } from 'lucide-react-native';
import { colors, fonts, spacing } from '@/constants/theme';

const { height: H } = Dimensions.get('window');

interface Activity {
  id: string;
  image: string;
  author: string;
  avatar: string;
  location: string;
  caption: string;
  likes: string;
  comments: string;
}

const ITEMS: Activity[] = [
  {
    id: 'a1',
    image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1080',
    author: 'Priya M.',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200',
    location: 'Connaught Place, New Delhi',
    caption: 'Morning vibes at CP . the city just waking up',
    likes: '12.4k',
    comments: '320',
  },
  {
    id: 'a2',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1080',
    author: 'Arjun S.',
    avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=200',
    location: 'MG Road, Bengaluru',
    caption: 'Street food tour . what should I try next?',
    likes: '8.1k',
    comments: '214',
  },
  {
    id: 'a3',
    image: 'https://images.pexels.com/photos/220762/pexels-photo-220762.jpeg?auto=compress&cs=tinysrgb&w=1080',
    author: 'Neha K.',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200',
    location: 'Marine Drive, Mumbai',
    caption: 'Sunset never disappoints',
    likes: '22.7k',
    comments: '512',
  },
];

export default function ActivitiesScreen() {
  return (
    <View style={styles.safe}>
      <FlatList
        data={ITEMS}
        keyExtractor={(r) => r.id}
        pagingEnabled
        snapToAlignment="start"
        decelerationRate="fast"
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <ActivityCard item={item} />}
      />
    </View>
  );
}

function ActivityCard({ item }: { item: Activity }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.media} resizeMode="cover" />
      <View style={styles.scrim} />
      <View style={styles.topBar}>
        <Text style={styles.brand}>Nearly</Text>
        <View style={styles.topActions}>
          <Volume2 size={20} color="#fff" strokeWidth={2} />
          <MoreHorizontal size={20} color="#fff" strokeWidth={2} />
        </View>
      </View>
      <View style={styles.rightRail}>
        <Action icon={<Heart size={24} color="#fff" strokeWidth={2} />} label={item.likes} />
        <Action icon={<MessageCircle size={24} color="#fff" strokeWidth={2} />} label={item.comments} />
        <Action icon={<Send size={24} color="#fff" strokeWidth={2} />} label="Share" />
      </View>
      <View style={styles.bottomBar}>
        <View style={styles.authorRow}>
          <Image source={{ uri: item.avatar }} style={styles.authorAvatar} />
          <View style={{ flex: 1 }}>
            <Text style={styles.authorName}>{item.author}</Text>
            <Text style={styles.authorLoc}>{item.location}</Text>
          </View>
          <Pressable style={styles.followBtn}>
            <Text style={styles.followLabel}>Follow</Text>
          </Pressable>
        </View>
        <Text style={styles.caption}>{item.caption}</Text>
      </View>
    </View>
  );
}

function Action({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <View style={{ alignItems: 'center', gap: 4 }}>
      {icon}
      <Text style={styles.actionLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#000' },
  card: { height: H, width: '100%', backgroundColor: '#000' },
  media: { ...StyleSheet.absoluteFillObject },
  scrim: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.2)' },
  topBar: {
    position: 'absolute',
    top: 48,
    left: 0,
    right: 0,
    paddingHorizontal: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brand: { fontFamily: fonts.headline, fontSize: 20, color: '#fff' },
  topActions: { flexDirection: 'row', gap: spacing.lg },
  rightRail: {
    position: 'absolute',
    right: spacing.lg,
    bottom: 180,
    gap: 24,
    alignItems: 'center',
  },
  actionLabel: { fontFamily: fonts.bodySemi, fontSize: 11, color: '#fff' },
  bottomBar: {
    position: 'absolute',
    left: 0,
    right: 80,
    bottom: 110,
    paddingHorizontal: spacing.lg,
    gap: 10,
  },
  authorRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  authorAvatar: { width: 40, height: 40, borderRadius: 20, borderWidth: 2, borderColor: '#fff' },
  authorName: { fontFamily: fonts.headline, fontSize: 15, color: '#fff' },
  authorLoc: { fontFamily: fonts.body, fontSize: 11, color: 'rgba(255,255,255,0.85)' },
  followBtn: { backgroundColor: colors.primary, paddingHorizontal: 14, paddingVertical: 6, borderRadius: 999 },
  followLabel: { fontFamily: fonts.label, fontSize: 12, color: '#fff' },
  caption: { fontFamily: fonts.body, fontSize: 13, color: '#fff', lineHeight: 19 },
});
