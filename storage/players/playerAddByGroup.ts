import AsyncStorage from '@react-native-async-storage/async-storage';
import { PlayerStorageDTO } from './PlayerStorageDTO';
import { PLAYER_COLLECTION } from '../storageConfig';
import { playersGetByGroup } from './playersGetByGroup';
import { AppError } from '@/utils/AppError';

export async function playerAddByGroup(newPlayer: PlayerStorageDTO, group: string) {
  const storedPlayers = await playersGetByGroup(group);

  const playerAlreadyExists = storedPlayers.find((player) => player.name === newPlayer.name);

  if (playerAlreadyExists) {
    throw new AppError('Essa pessoa já está adicionada em um time aqui.');
  }

  const storage = JSON.stringify([...storedPlayers, newPlayer]);

  AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, storage);
}
