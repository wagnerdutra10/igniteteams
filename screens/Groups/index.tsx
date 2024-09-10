import { FlatList } from 'react-native';
import { Container } from './styles';
import { Header } from '@/components/Header';
import { Highlight } from '@/components/Highlight';
import { GroupCard } from '@/components/GroupCard';
import { useCallback, useState } from 'react';
import { ListEmpty } from '@/components/ListEmpty';
import { Button } from '@/components/Button';
import { router, useFocusEffect } from 'expo-router';
import { groupsGetAll } from '@/storage/group/groupsGetAll';

export default function Groups() {
  const [groups, setGroups] = useState<string[]>([]);

  function handleNewGroup() {
    router.navigate('/new-group');
  }

  function handleOpenGroup(group: string) {
    router.navigate({ pathname: '/players', params: { group } });
  }

  function fetchGroups() {
    groupsGetAll().then(setGroups);
  }

  useFocusEffect(useCallback(fetchGroups, []));

  return (
    <Container>
      <Header />
      <Highlight title="Turmas" subTitle="Jogue com a sua turma" />
      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <GroupCard title={item} onPress={() => handleOpenGroup(item)} />}
        contentContainerStyle={groups.length === 0 ? { flex: 1 } : null}
        ListEmptyComponent={() => <ListEmpty message="Que tal cadastrar a primeira turma ?" />}
      />
      <Button title="Criar nova turma" onPress={handleNewGroup} />
    </Container>
  );
}
