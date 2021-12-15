import React, {Node, useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Button} from 'react-native';
import {Blockchain, Vote} from './BlockchainVoting';
import UserAvatar from 'react-native-user-avatar';

const BlockchainVotingApp: () => Node = () => {
  let blockchain = new Blockchain();
  const [candidateVotes, setCandidateVotes] = useState();
  const [showVotes, setShowVotes] = useState(false);

  useEffect(() => {
    blockchain.createGenesisBlock();
  }, []);

  const handleSetShowVotes = () => {
    setShowVotes(true);

    blockchain.traceChain();

    const votes = blockchain.getVotesCount();

    setCandidateVotes(votes);
  };

  const vote = vote => {
    blockchain.createVote(vote);
    blockchain.minePendingVotes();
  };

  const handleVoteAgain = () => {
    setShowVotes(false);
  };

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {!showVotes && <Text style={{fontSize: 24}}>Escolha um candidato</Text>}
      <View
        style={{
          marginTop: '20%',
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
        }}>
        <TouchableOpacity
          onPress={() => {
            vote(new Vote(1, 0, 0));
          }}>
          <UserAvatar size={100} name="Candidate 1" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            vote(new Vote(0, 1, 0));
          }}>
          <UserAvatar size={100} name="Candidate 2" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            vote(new Vote(0, 0, 1));
          }}>
          <UserAvatar size={100} name="Candidate 3" />
        </TouchableOpacity>
      </View>
      <View
        style={{
          marginTop: '20%',
        }}>
        {!showVotes && (
          <Button
            onPress={() => handleSetShowVotes()}
            title={'Quantidade de votos'}
          />
        )}

        {showVotes && (
          <>
            <View
              style={{
                flexDirection: 'row',
                width: '90%',
                justifyContent: 'space-evenly',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 24}}>{candidateVotes[0]} voto(s)</Text>
              <Text style={{fontSize: 24}}>{candidateVotes[1]} voto(s)</Text>
              <Text style={{fontSize: 24}}>{candidateVotes[2]} voto(s)</Text>
            </View>
            <View
              style={{
                marginTop: '20%',
              }}
            />
            <Button
              onPress={() => handleVoteAgain()}
              title={'Votar novamente'}
            />
          </>
        )}
      </View>
    </View>
  );
};

export default BlockchainVotingApp;
