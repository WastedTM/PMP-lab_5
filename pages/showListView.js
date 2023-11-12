import React, {useState} from "react";
import {Text, StyleSheet, View, TextInput, Button, FlatList, Alert, StatusBar, ScrollView} from 'react-native'

const styles = {
    page: {
        flex: 1,
        marginTop: 5,
        alignItems: "center",
    },
    textField: {
        borderWidth: 1,
        borderColor:"gray",

        width: 200,

        padding: 3,
        marginBottom: 10,
    },
    buttonField: {
        marginBottom: 10,
    }
}

class ShowListView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            newTodo: '',
        };
    }

    addTodo = () => {
        const {newTodo, todos} = this.state;
        if (newTodo.trim() !== '') {
            this.setState({
                todos: [...todos, {id: Date.now(), title: newTodo, completed: false}],
                newTodo: '',
            });
        }else{
            Alert.alert("Warning!", "Please, enter your task")
        }
    };

    removeTodo = (id) => {
        const {todos} = this.state;
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        this.setState({todos: updatedTodos});
    };

    toggleTodo = (id) => {
        const {todos} = this.state;
        const updatedTodos = todos.map((todo) =>
            todo.id === id ? {...todo, completed: !todo.completed} : todo
        );
        this.setState({todos: updatedTodos});
    };

    render() {
        const {todos, newTodo} = this.state;

        return (
            <View style={styles.page}>
                <TextInput
                    value={newTodo}
                    onChangeText={(text) => this.setState({newTodo: text})}
                    placeholder="Нове завдання"
                    style={styles.textField}
                />
                <Button title="Додати" onPress={this.addTodo}/>
                <FlatList
                    data={todos}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => (
                        <View>
                            <Text
                                style={{
                                    textDecorationLine: item.completed ? 'line-through' : 'none',
                                    marginBottom: 20,
                                    marginTop: 20,
                                    fontSize: 16,
                                    textAlign: "center"
                                }}
                            >
                                {item.title}
                            </Text>
                            <View style={styles.buttonField}>
                                <Button
                                    title={item.completed ? 'Відновити' : 'Виконано'}
                                    onPress={() => this.toggleTodo(item.id)}
                                />
                            </View>
                            <View style={styles.buttonField}>
                                <Button title="Видалити" onPress={() => this.removeTodo(item.id)}/>
                            </View>

                        </View>
                    )}
                />
                <StatusBar theme = "auto"></StatusBar>
            </View>
        );
    }
}

export default ShowListView;