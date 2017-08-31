import firebase from '../firebase';

export const SUBMIT_VOTE = 'SUBMIT_VOTE';
export const CREATE_POLL = 'CREATE_POLL';
export const POLL_ERROR = 'POLL_ERROR';
export const DELETE_POLL = 'DELETE_POLL';
export const EDIT_POLL = 'ADD_POLL_ITEM';



export function submitVote(pollId, option) {
  const path = `/voting-app/polls/${pollId}/options/${option}/count`;
  console.log(path);

  return function(dispatch) {
    firebase.database().ref(path).once('value')
      .then(snapshot => {
        return firebase.database().ref(path).set(snapshot.val() + 1)
          .then(() => console.log("Successfully updated option " + option + "'s count of poll " + pollId + "."))
          .catch(error => console.log("Error occured when updating option " + option + "'s of poll " + pollId + "."));
      })
      .catch(error => {
        return console.log("Error when getting a snapshot of: ", path)
      });
  }
}

export function createPoll(newPoll) {
  return function(dispatch) {
    firebase.database().ref(`/voting-app/users/${newPoll.ownerUid}/newPoll`).set(newPoll)
      .then(() => {
        console.log("New poll data sent!")
      })
      .catch(error => console.log("Error when creating new poll.", error));
  }
}

export function editPoll(editedPoll) {
  return function(dispatch) {
    firebase.database().ref(`/voting-app/users/${editedPoll.ownerUid}/editedPoll`).set(editedPoll)
      .then(() => {
        console.log("Edited poll data sent!")
      })
      .catch(error => console.log("Error when editing poll.", error));
  }
}

export function deletePoll(pollData) {
  const pollPath = `/voting-app/polls/${pollData.id}/`;

  return function(dispatch) {
    firebase.database().ref(pollPath + 'delete').set(true)
      .catch(error => console.log('Error when marking a poll to be deleted.'))
  }
}
