import { Header } from '@/components/Header';
import { Container, Form, HeaderList, NumberOfPlayers } from './styles';
import { Highlight } from '@/components/Highlight';
import { ButtonIcon } from '@/components/ButtonIcon';
import { Input } from '@/components/Input';
import { Alert, FlatList, Keyboard, TextInput } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { PlayerCard } from '@/components/PlayersCard';
import { ListEmpty } from '@/components/ListEmpty';
import { Button } from '@/components/Button';
import { Filter } from '@/components/Filter';
import { router, useLocalSearchParams } from 'expo-router';
import { playerAddByGroup } from '@/storage/players/playerAddByGroup';
import { AppError } from '@/utils/AppError';
import { playerGetByGroupAndTeam } from '@/storage/players/playerGetByGroupAndTeam';
import { PlayerStorageDTO } from '@/storage/players/PlayerStorageDTO';
import { playerRemoveByGroup } from '@/storage/players/playerRemoveByGroup';
import { groupRemoveByName } from '@/storage/group/groupRemoveByName';
import { Loading } from '@/components/Loading';

type RouteParams = {
  group: string;
};

export function Players() {
  const [team, setTeam] = useState('Time A');
  const [newPlayerName, setNewPlayerName] = useState('');
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { group } = useLocalSearchParams<RouteParams>();

  const newPlayerNameInputRef = useRef<TextInput>(null);

  async function handleAddPlayer() {
    if (newPlayerName.trim().length === 0) {
      return Alert.alert('Nova pessoa', 'Informe o nome da pessoa para adicionar.');
    }

    if (!team) {
      throw new AppError('Selecione um time.');
    }

    const newPlayer = {
      name: newPlayerName,
      team
    };

    playerAddByGroup(newPlayer, group)
      .then(() => {
        fetchPlayersByTeam();
        setNewPlayerName('');
        newPlayerNameInputRef.current?.blur();
        Keyboard.dismiss();
      })
      .catch((err) => {
        if (err instanceof AppError) {
          return Alert.alert('Nova pessoa', err.message);
        }
        Alert.alert('Nova pessoa', 'Não foi possível adicionar.');
      });
  }

  async function fetchPlayersByTeam() {
    setIsLoading(true);

    playerGetByGroupAndTeam(group, team)
      .then(setPlayers)
      .finally(() => {
        setIsLoading(false);
      });
  }

  async function handlePlayerRemove(playerName: string) {
    playerRemoveByGroup(playerName, group)
      .then(() => {
        fetchPlayersByTeam();
      })
      .catch(() => {
        Alert.alert('Remover pessoa', 'Não foi possível remover essa pessoa.');
      });
  }

  function handleGroupRemove() {
    Alert.alert('Remover', `Deseja remover o a turma ?`, [
      {
        text: 'Sim',
        style: 'destructive',
        onPress: () => {
          groupRemoveByName(group)
            .then(() => router.navigate('/'))
            .catch(() => Alert.alert('Remover grupo', 'Não foi possível remover o grupo.'));
        }
      },
      {
        text: 'Não',
        style: 'cancel'
      }
    ]);
  }

  useEffect(() => {
    fetchPlayersByTeam();
  }, [team]);

  return (
    <Container>
      <Header showBackButton />
      <Highlight title={group} subTitle="adicione a galera e separe os times" />
      <Form>
        <Input
          placeholder="Nome da pessoa"
          autoCorrect={false}
          onChangeText={setNewPlayerName}
          value={newPlayerName}
          inputRef={newPlayerNameInputRef}
          onSubmitEditing={handleAddPlayer}
          returnKeyType="done"
        />
        <ButtonIcon icon="add" onPress={handleAddPlayer} />
      </Form>
      <HeaderList>
        <FlatList
          data={['Time A', 'Time B']}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Filter title={item} isActive={item === team} onPress={() => setTeam(item)} />
          )}
          horizontal
        />
        <NumberOfPlayers>{players.length}</NumberOfPlayers>
      </HeaderList>
      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={players}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <PlayerCard name={item.name} onRemove={() => handlePlayerRemove(item.name)} />
          )}
          ListEmptyComponent={() => <ListEmpty message="Não há pessoas nesse time." />}
          contentContainerStyle={[{ paddingBottom: 100 }, players.length === 0 && { flex: 1 }]}
        />
      )}

      <Button title="Remover Turma" type="SECONDARY" onPress={handleGroupRemove} />
    </Container>
  );
}
