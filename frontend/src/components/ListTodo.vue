<template>
    <div>
        <h1>Todos()</h1>
        <table class="table table-bordered table-hover">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-bind:key="todo in todos" @click="selectTodo(todo)">
                    <th></th>
                    <td></td>
                    <td>
                        <button class="btn btn-danger" @click="deleteTodo(todo)">X</button>
                        <a class="btn btn-primary" v-bind:href="'/todo-update/' + todo.id">&#9998; </a>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import {APIService} from '../APIService';
    const API_URL = 'http://localhost:4000';
    const apiService = new APIService();
    export default {
        name: 'ListTodo', 
        components: {

        },
        data() {
            return {
                todos: [],
                numberOfTodos: 0
            };
        },
        methods: {
            getTodos(){
                apiService.getTodos().then((data) => {
                    this.todos = data.data;
                    this.numberOfproducts = data.count;
                });
            },
            deleteTodo(todo){
                apiService.deleteTodo(todo).then((r) => {
                    if(r.status === 204){
                        alert("Todo deleted.");
                        this.$router.go();
                    }
                })
            },
        },

        mounted() {
            this.getTodos();
        },
    }
</script>

<style scoped>
    .list-horizontal li{
        display: inline-block;
    }

    .list-horizontal li:before {
        content: '\00a0\2022\00a0\00a0';
        color: #999;
        color: rgba(0,0,0,0.5);
        font-size: 11px;
    }

    .list-horizontal li:first-child:before{
        content: '';
    }
</style>