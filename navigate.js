import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ShowListView from "./pages/showListView";

const Stack = createStackNavigator();
export default function Navigate(){
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Task1" component={ShowListView} options={{ headerShown: false }}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}