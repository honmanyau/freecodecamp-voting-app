import firebase from '../firebase';

export const SUBMIT_VOTE = 'SUBMIT_VOTE';
export const CREATE_POLL = 'CREATE_POLL';
export const POLL_ERROR = 'POLL_ERROR';
export const DELETE_POLL = 'DELETE_POLL';
export const EDIT_POLL = 'ADD_POLL_ITEM';



export function submitVote(id, option, count = 1) {
  const path = `/voting-app/polls/${id}/options/${option}/votes`;

  return function(dispatch) {
    const newKey = firebase.database().ref(`/voting-app/public/`).push().key;

    firebase.database().ref(`/voting-app/public/${newKey}`).set({
      id,
      option
    })
      .then(() => {
        firebase.database().ref(path).once('value')
          .then(snapshot => {
            firebase.database().ref(path).set(snapshot.val() + 1)
              .then(() => {
                console.log('Vote count successfully updated for poll ' + id + ' option ' + option + '.')

                firebase.database().ref(`/voting-app/public/${newKey}`).set(null)
                  .then(() => console.log('Vote count successfully updated for poll ' + id + ' option ' + option + '.'))
                  .catch(() => console.log('Error when cleaning up after updating a poll.'))
              })
              .catch(error => console.log('Error occured when updating vote count for poll ' + id + ' option ' + option + '.', error))
          })
          .catch(error => console.log('Error happene when reading vote value of poll ' + id + ' option ' + option + '.', error))
      })
      .catch(error => console.log('Error when preparing a vote.', error));
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
