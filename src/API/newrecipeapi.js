/**
 * Author: Slavomir Svorada (xsvora02)
 * This serves for uploading recipes to firestore database
 */
import firebase from 'firebase';

export function uploadRecipe(food,ingredient, uploadComplete) {
    firebase.firestore()
    .collection('recipe')
    .add(food).then((snapshot) => {
        snapshot.set(food);
        Object.entries(ingredient).map(([key, value]) => {
            firebase.firestore()
            .collection('ingredient')
            .doc('7pvY5SCEhJWcJt7IBcY9').update({values: firebase.firestore.FieldValue.arrayUnion(key)})
        });
    }).then(() => uploadComplete(food))
    .catch((error) => console.log(error));
}