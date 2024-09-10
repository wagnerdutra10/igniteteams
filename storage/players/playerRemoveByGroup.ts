import AsyncStorage from '@react-native-async-storage/async-storage';
import { playersGetByGroup } from './playersGetByGroup';
import { PLAYER_COLLECTION } from '../storageConfig';

export async function playerRemoveByGroup(playerName: string, group: string) {
  const storedPlayers = await playersGetByGroup(group);

  const players = storedPlayers.filter((player) => player.name !== playerName);
  await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, JSON.stringify(players));
}
