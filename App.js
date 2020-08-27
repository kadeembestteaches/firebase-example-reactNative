import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View,TextInput,Button, FlatList, TouchableHighlight } from 'react-native';
import db from "./firebaseConfig.js";

const  App =() => {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [salary, setSalary] = useState(0);
  const [employees, setEmployees] = useState([])

  useEffect(()=>{

     db.collection('users')
    .get()
    .then(querySnapshot => {
      
      const list = [];
      querySnapshot.forEach(doc => {
        console.log("Blah")
        list.push({
          id:doc.id,
          firstName : doc.data().firstName,
          lastName: doc.data().lastName,
          salary : doc.data().salary})
      });

      setEmployees(list);
      
    });


  },[employees])

  const deletePerson = (item)=>
  {
      db.collection('users')
      .doc(item.id)
      .delete()
      .then(() => {
        alert("Item deleted")
      });
  }

  const addNewPerson = ()=>{

   db.collection('users')
    .add({
      
      firstName : firstName,
      lastName : lastName,
      salary : salary
    })
    .then(() => {
     

      setFirstName("");
      setLastName("");
      setSalary("")
      alert('User added!');

    });
  }

  return (
   
    <View style={styles.container}>
        
      <Text  style={styles.label}>First Name </Text>
      <TextInput  style={styles.textBox}
        keyboardType="default" 
        value={firstName} 
        onChangeText={(val)=>setFirstName(val)} />

        <Text  style={styles.label}>  Last Name </Text>
          <TextInput style={styles.textBox} 
          value={lastName} 
          onChangeText={(val)=>{setLastName(val)}} />
      

      <Text  style={styles.label}> Salary </Text>
      <TextInput style={styles.textBox}
      keyboardType="decimal-pad"   
       value={salary} 
       onChangeText={(val)=>{setSalary(val);}} />
      
      
      <Button onPress={addNewPerson} title="Save" />
      <FlatList  
        data={employees}
        renderItem={({item})=>(
          <TouchableHighlight
            key={item.id}
            onPress={()=>{
              deletePerson(item)
            }}
               >
              <Text style={styles.label}>{item.firstName} {item.lastName}</Text>
          </TouchableHighlight>

        )}

        />

      
      </View>
  );
}

const styles = StyleSheet.create({
  
 
  container :
  {
    marginTop:50,
    paddingLeft:32,
    paddingRight:32
  },

  label:{

    fontSize:18,
    color:"red",
    marginBottom:16
  },

  textBox :{

    borderWidth:1,
    borderColor:"black",
    padding:10,
    marginBottom:20

  }
});

export default App;