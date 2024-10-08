import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Button, SectionList, Image } from 'react-native';
import {useState} from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Picker } from '@react-native-picker/picker';
import { NativeStackNavigationProp } from '@react-navigation/native-stack'; 
import { RouteProp } from '@react-navigation/native';
import { ScrollView } from 'react-native';



type RootStackParamList = {
  Home: undefined;
  Add: { 
    NameSend: string; 
    DescriptionSend: string; 
    CourseSend: string; 
    PriceSend: string;
    CountSend: number;
  };
  FinalScreen: undefined;
};

type MainScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

interface MainScreenProps {
  navigation: MainScreenNavigationProp;
}


const Stack = createNativeStackNavigator<RootStackParamList>();

   export default function App() {
    return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={MainScreen} />
        <Stack.Screen name="Add" component={ViewHome} />
        <Stack.Screen name="FinalScreen" component={FinalScreen} />
      </Stack.Navigator>
    </NavigationContainer>
   );
   }

    function MainScreen({navigation}:MainScreenProps,{
      
    })
    {
    const [Dish, setDish] = useState('');
    const [Description, setDescription] = useState('');
    const [Course, setCourse] = useState('');
    const [Price, setPrice] = useState('');
    const [dishCount, setDishCount] = useState(0);
    
    console.log("App starting up");
    
    return (
      
      <ScrollView>
      <View style={styles.mainPicture}>
        <Image style={styles.ImageSize}
        source={require('./img/food_logo2.png')}/>
      </View>
      <Text style={styles.welcomeText}>Add items to menu</Text>
    
      <Text>Enter Dish Name</Text>
      <TextInput style={styles.InputBoxs} placeholder='Dish Name'onChangeText={newText => setDish(newText)}/>
   
      <Text>Enter Description</Text>
      <TextInput style={styles.InputBoxs} placeholder='Description'onChangeText={newText => setDescription(newText)}/>
      <Text>Select Course</Text>
      {/* Picker for selecting the course */}
      <Picker
        selectedValue={Course}
        style={styles.picker} 
        onValueChange={(itemValue) => setCourse(itemValue)}
      >
        <Picker.Item label="Starters" value="Starters" />
        <Picker.Item label="Mains" value="Mains" />
        <Picker.Item label="Desserts" value="Desserts" />
      </Picker>
      <Text>Enter Price</Text>
      <TextInput style={styles.InputBoxs} placeholder='Price' onChangeText={newText => setPrice(newText)}/>
      <StatusBar style="auto" />
    <Button title = "Add dish"
      color="#9c7c38"
      onPress={()  => {
        setDishCount(dishCount + 1);
        navigation.navigate('Add',{
          NameSend : Dish,
          DescriptionSend : Description,
          CourseSend : Course,
          PriceSend : Price,
          CountSend: dishCount + 1,
        });
        console.log("Dish added:");
        console.log("Dish Name: " + Dish + 
                    "Description: " + Description + 
                    "Course: "+ Course + 
                    "Price: " + Price)
      }}/>
      
      <Button title="Done Adding Dishes"
  color="#9c7c38"
  onPress={() => {
    // Navigate to a final screen or reset the flow
    console.log("Finished adding dishes, navigating to the next screen.");
    navigation.navigate('FinalScreen');  // Replace 'FinalScreen' with the screen where you want to navigate.
  }}
/>
</ScrollView>      
            
      
  );
}

const styles = StyleSheet.create({
  welcomeText: {
    paddingTop: 40,
    color:'#9c7c38',
    fontWeight:'bold',
    fontSize: 28,
    textAlign: 'center',
  },
  
    mainPicture:{
      paddingTop:40,
      justifyContent: 'center',
      alignItems:'center',
    },
    ImageSize:{
      width: 350,
      height: 350,
    },
    InputFlex:{
      flexDirection: 'row',
      marginTop: 30,
      justifyContent:'space-evenly',
    },
    InputBoxs: {
      height: 50,               // Height of the input box
      borderColor: '#ccc',       // Border color (light gray)
      borderWidth: 1,            // Border width
      borderRadius: 10,          // Rounded corners
      paddingHorizontal: 15,     // Horizontal padding for inner text
      fontSize: 16,              // Font size for the text
      backgroundColor: '#fff',   // Background color (white)
      marginVertical: 10,        // Vertical margin to add space above/below
      color: '#333',             // Text color (dark gray)
      shadowColor: '#000',       // Shadow color
      shadowOffset: { width: 0, height: 2 }, // Shadow offset
      shadowOpacity: 0.2,        // Shadow opacity
      shadowRadius: 4,           // Shadow blur radius
      elevation: 3,              // Elevation for Android
    },
       
    picker: {
      height: 50,
      width: '100%',
      marginVertical: 10,
      backgroundColor: '#fff',
      borderColor: '#ccc',
      borderWidth: 1,
    },
            
    buttonContainer: {
      marginTop: 20,
      flexDirection: 'column', // Stack buttons vertically
      justifyContent: 'center',
    },
    finalScreenContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

            type ViewHomeProps = {
              navigation: NativeStackNavigationProp<RootStackParamList, 'Add'>;
              route: RouteProp<RootStackParamList, 'Add'>;
            };
       
            function ViewHome({ navigation, route }: ViewHomeProps) {
              // Destructure the route params
              const DishGet = route.params.NameSend;
              const DescriptionGet = route.params.DescriptionSend;
              const CourseGet = route.params.CourseSend;
              const PriceGet = route.params.PriceSend;
              const CountGet = route.params.CountSend;
            
              return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                  <Text>Dish: {DishGet}</Text>
                  <Text>Description: {DescriptionGet}</Text>
                  <Text>Course: {CourseGet}</Text>
                  <Text>Price: {PriceGet}</Text>
                  <Text>Total Menu Items: {CountGet}</Text>
                </View>
              );
            }
            function FinalScreen() {
              return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <Text>All dishes have been added!</Text>
                  {/* Add any additional logic here */}
                </View>
              );
            }
        
