import AsyncStorage from '@react-native-async-storage/async-storage';
import { PLAYER_COLLECTION } from '../storageConfig';
import { PlayerStorageDTO } from './PlayerStorageDTO';

export async function playersGetByGroup(group: string): Promise<PlayerStorageDTO[]> {
  const storedPlayers = await AsyncStorage.getItem(`${PLAYER_COLLECTION}-${group}`);
  return storedPlayers ? JSON.parse(storedPlayers) : [];
}
